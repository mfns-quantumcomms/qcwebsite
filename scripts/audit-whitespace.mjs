/**
 * Finds sections that leave a large part of the row unused on a wide screen.
 *
 * A narrow column of text sitting alone in a 1600 px row is the single clearest tell of an
 * amateur layout, so this measures, for every section, how much of the available width the
 * content actually reaches, and reports the ones that waste it.
 *
 * Run against the preview server:  npm run build && npm run preview &  then  npm run audit:space
 */
import { spawn } from 'node:child_process';
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.env.AUDIT_BASE ?? 'http://127.0.0.1:4322';
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9335;
const WIDTHS = [1440, 1920];
const MIN_RATIO = 0.66;   // content should reach at least two thirds of the row
const MIN_HEIGHT = 220;   // ignore slim bands, where a short row is fine

async function routes() {
  const dist = path.join(ROOT, 'dist');
  const out = [];
  async function walk(dir, prefix) {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (e.isDirectory()) await walk(path.join(dir, e.name), `${prefix}${e.name}/`);
      else if (e.name === 'index.html') out.push(prefix || '/');
    }
  }
  await walk(dist, '/');
  return out.sort();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cdp() {
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--no-sandbox',
    '--disable-gpu', '--hide-scrollbars', '--disable-extensions', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
  let version;
  for (let i = 0; i < 60; i++) {
    try { version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break; } catch { await sleep(250); }
  }
  if (!version) { chrome.kill(); throw new Error('Chrome did not start'); }
  const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pending = new Map();
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { const { resolve, reject } = pending.get(m.id); pending.delete(m.id); m.error ? reject(new Error(m.error.message)) : resolve(m.result); }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => { const n = ++id; pending.set(n, { resolve, reject }); ws.send(JSON.stringify({ id: n, method, params })); });
  await send('Page.enable'); await send('Runtime.enable');
  return { send, close: () => { ws.close(); chrome.kill(); } };
}

const PROBE = `(() => {
  const MIN_RATIO = ${MIN_RATIO}, MIN_HEIGHT = ${MIN_HEIGHT};
  const out = [];
  for (const section of document.querySelectorAll('main section, main > div > section')) {
    const rect = section.getBoundingClientRect();
    if (rect.height < MIN_HEIGHT) continue;
    const holder = section.querySelector('.container') || section;
    const hr = holder.getBoundingClientRect();
    if (hr.width < 600) continue;
    // A full-bleed photograph or panel behind the section fills the row on its own, so the
    // narrow text column in front of it is deliberate, not wasted space.
    const bleed = [...section.children].some((child) => {
      if (child === holder || child.contains(holder)) return false;
      const cr = child.getBoundingClientRect();
      return cr.width >= rect.width - 2 && cr.height >= rect.height * 0.8;
    });
    if (bleed) continue;
    // Reach of the actual content: the furthest right edge of any element that draws something.
    let maxRight = hr.left;
    let counted = 0;
    for (const el of holder.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || cs.opacity === '0') continue;
      const draws = (el.childElementCount === 0 && (el.textContent || '').trim())
        || ['IMG','SVG','VIDEO','TABLE','INPUT','SELECT','TEXTAREA','BUTTON'].includes(el.tagName)
        || cs.backgroundImage !== 'none'
        || (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && el !== holder)
        || cs.borderTopWidth !== '0px' || cs.borderLeftWidth !== '0px';
      if (!draws) continue;
      counted++;
      if (r.right > maxRight) maxRight = r.right;
    }
    if (!counted) continue;
    const used = maxRight - hr.left;
    const ratio = used / hr.width;
    if (ratio < MIN_RATIO) {
      const heading = section.querySelector('h1, h2, h3');
      out.push({
        ratio: Math.round(ratio * 100),
        wasted: Math.round(hr.width - used),
        height: Math.round(rect.height),
        cls: (section.className || '').toString().slice(0, 60),
        heading: heading ? heading.textContent.trim().slice(0, 52) : '(no heading)',
      });
    }
  }
  return JSON.stringify(out);
})()`;

const { send, close } = await cdp();
const list = await routes();
const findings = [];
for (const route of list) {
  for (const w of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 1000, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: BASE + route });
    await sleep(300);
    const { result } = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true });
    for (const f of JSON.parse(result.value)) findings.push({ route, width: w, ...f });
  }
}
close();

const byRoute = new Map();
for (const f of findings) {
  if (!byRoute.has(f.route)) byRoute.set(f.route, []);
  byRoute.get(f.route).push(f);
}
for (const [route, items] of [...byRoute].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n${route}  (${items.length})`);
  const seen = new Set();
  for (const i of items) {
    const key = i.heading + i.width;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`   @${i.width}  ${i.ratio}% used, ${i.wasted}px wasted, h=${i.height}px  "${i.heading}"  .${i.cls.split(' ').join('.')}`);
  }
}
await mkdir(path.join(ROOT, '.cache'), { recursive: true });
await writeFile(path.join(ROOT, '.cache/whitespace-report.json'), JSON.stringify(findings, null, 2));
console.log(`\n${list.length} routes x ${WIDTHS.length} widths. ${findings.length} sections use less than ${Math.round(MIN_RATIO * 100)}% of the row.`);
console.log('Full report: .cache/whitespace-report.json');
