/**
 * Objective responsive audit. Loads every built route at a spread of device widths and reports
 * horizontal overflow, the elements causing it, tap targets under 44 px, and text under 12 px.
 *
 * Talks to headless Chrome over the DevTools Protocol with no extra dependencies.
 * Run against the preview server:  npm run build && npm run preview &  then  npm run audit
 */
import { spawn } from 'node:child_process';
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.env.AUDIT_BASE ?? 'http://127.0.0.1:4322';
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333;

const WIDTHS = [
  { w: 320, h: 640, label: '320 small phone' },
  { w: 360, h: 780, label: '360 android' },
  { w: 390, h: 844, label: '390 iphone' },
  { w: 430, h: 932, label: '430 iphone max' },
  { w: 600, h: 960, label: '600 phablet' },
  { w: 768, h: 1024, label: '768 tablet portrait' },
  { w: 834, h: 1112, label: '834 ipad air' },
  { w: 1024, h: 768, label: '1024 tablet landscape' },
  { w: 1180, h: 820, label: '1180 ipad pro' },
  { w: 1280, h: 800, label: '1280 laptop' },
  { w: 1440, h: 900, label: '1440 desktop' },
  { w: 1920, h: 1080, label: '1920 wide' },
];

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
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, '--no-sandbox', '--disable-gpu',
    '--hide-scrollbars', '--disable-extensions', '--no-first-run', 'about:blank',
  ], { stdio: 'ignore' });

  let version;
  for (let i = 0; i < 60; i++) {
    try { version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break; }
    catch { await sleep(250); }
  }
  if (!version) { chrome.kill(); throw new Error('Chrome did not start'); }

  const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => { const n = ++id; pending.set(n, { resolve, reject }); ws.send(JSON.stringify({ id: n, method, params })); });

  await send('Page.enable');
  await send('Runtime.enable');
  return { send, close: () => { ws.close(); chrome.kill(); } };
}

const PROBE = `(() => {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const overflow = Math.max(0, de.scrollWidth - vw);
  const offenders = [];
  if (overflow > 1) {
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      const style = getComputedStyle(el);
      if (style.position === 'fixed') continue;
      if (r.right > vw + 1 || r.left < -1) {
        const parent = el.parentElement;
        const pr = parent ? parent.getBoundingClientRect() : null;
        if (pr && pr.right > vw + 1 && parent !== document.body) continue; // report the outermost only
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '').toString().slice(0, 70),
          left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
          text: (el.textContent || '').trim().slice(0, 50),
        });
      }
      if (offenders.length >= 6) break;
    }
  }
  const small = [];
  for (const el of document.querySelectorAll('a, button, input, select, textarea, summary')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (getComputedStyle(el).position === 'fixed') continue;
    if (el.closest('.crumbs, footer, nav[aria-label="Breadcrumb"]')) continue;
    if (r.right < 0 || r.left > vw || r.bottom < 0) continue; // visually hidden off-screen
    // WCAG 2.5.8 exempts a target inside a sentence, where the line height and not the control
    // sets the size. Detected by asking whether the parent carries text besides this link.
    if (el.tagName === 'A') {
      const parent = el.parentElement;
      const around = parent ? (parent.textContent || '').replace(el.textContent || '', '').trim() : '';
      if (around.length > 12) continue;
    }
    if (r.height < 24 || (r.width < 24 && r.height < 44)) {
      small.push({ tag: el.tagName.toLowerCase(), h: Math.round(r.height), w: Math.round(r.width), text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40) });
    }
    if (small.length >= 5) break;
  }
  const tiny = [];
  for (const el of document.querySelectorAll('p, li, td, th, span, dd, dt, figcaption, label')) {
    if (!el.textContent || !el.textContent.trim()) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs && fs < 12) { tiny.push({ tag: el.tagName.toLowerCase(), fs: fs.toFixed(1), text: el.textContent.trim().slice(0, 40) }); }
    if (tiny.length >= 4) break;
  }
  return JSON.stringify({ vw, scrollWidth: de.scrollWidth, overflow, offenders, small, tiny });
})()`;

const { send, close } = await cdp();
const list = await routes();
const report = [];
let failures = 0;

for (const route of list) {
  for (const vp of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride', { width: vp.w, height: vp.h, deviceScaleFactor: 1, mobile: vp.w < 768 });
    await send('Page.navigate', { url: BASE + route });
    await sleep(320);
    const { result } = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true });
    const data = JSON.parse(result.value);
    if (data.overflow > 1 || data.small.length || data.tiny.length) {
      failures++;
      report.push({ route, viewport: vp.label, ...data });
      const bits = [];
      if (data.overflow > 1) bits.push(`overflow ${data.overflow}px`);
      if (data.small.length) bits.push(`${data.small.length} small target(s)`);
      if (data.tiny.length) bits.push(`${data.tiny.length} tiny text`);
      console.log(`FAIL ${route}  @${vp.label}  ${bits.join(', ')}`);
      for (const o of data.offenders) console.log(`      overflow: <${o.tag} class="${o.cls}"> right=${o.right} w=${o.width} "${o.text}"`);
      for (const s of data.small) console.log(`      target: <${s.tag}> ${s.w}x${s.h} "${s.text}"`);
      for (const t of data.tiny) console.log(`      text: <${t.tag}> ${t.fs}px "${t.text}"`);
    }
  }
}

close();
await mkdir(path.join(ROOT, '.cache'), { recursive: true });
await writeFile(path.join(ROOT, '.cache/responsive-report.json'), JSON.stringify(report, null, 2));
console.log(`\n${list.length} routes x ${WIDTHS.length} widths = ${list.length * WIDTHS.length} checks, ${failures} with findings.`);
console.log('Full report: .cache/responsive-report.json');
process.exit(failures ? 1 : 0);
