/**
 * Rewrites root-absolute links in the built site so it can be served from a sub-path.
 *
 * GitHub Pages serves a project site at https://<owner>.github.io/<repo>/, but every link in this
 * site is written from the root ("/fleet/"). Rather than thread a base path through every page,
 * this rewrites the built HTML, CSS and the sitemap once, after the build.
 *
 * Run automatically by the Pages workflow:  BASE_PATH=/qcwebsite node scripts/rebase-links.mjs
 * Does nothing when BASE_PATH is empty, which is the case for a root deployment such as
 * Cloudflare Pages or the live domain.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const raw = (process.env.BASE_PATH ?? '').trim();
if (!raw || raw === '/') {
  console.log('BASE_PATH not set, leaving the build at the root.');
  process.exit(0);
}
const BASE = '/' + raw.replace(/^\/+|\/+$/g, '');

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

// Attributes that carry a path, plus url() in CSS. Protocol-relative and absolute URLs, anchors,
// mailto:, tel: and anything already carrying the base are all left alone.
const ATTR = new RegExp(`(\\s(?:href|src|action|poster|content|data-src)=")/(?!/|${BASE.slice(1)}/)`, 'g');
const SRCSET = /(\ssrcset=")([^"]+)"/g;
const CSSURL = /url\((['"]?)\/(?!\/)/g;

let files = 0;
let edits = 0;
for await (const file of walk(DIST)) {
  const ext = path.extname(file);
  if (!['.html', '.css', '.xml', '.txt', '.js'].includes(ext)) continue;
  const before = await readFile(file, 'utf8');
  let after = before;

  if (ext === '.html') {
    after = after.replace(ATTR, `$1${BASE}/`);
    after = after.replace(SRCSET, (_m, lead, set) => {
      const rewritten = set
        .split(',')
        .map((part) => part.trim().replace(/^\/(?!\/)/, `${BASE}/`))
        .join(', ');
      return `${lead}${rewritten}"`;
    });
  } else if (ext === '.css') {
    after = after.replace(CSSURL, `url($1${BASE}/`);
  } else if (ext === '.xml' || ext === '.txt') {
    // Sitemap and robots carry absolute URLs already, so only fix a bare root path.
    after = after.replace(/(<loc>)https?:\/\/[^<]*?\/(?=<)/g, '$1');
  }

  if (after !== before) {
    await writeFile(file, after);
    edits++;
  }
  files++;
}
console.log(`Rebased ${edits} of ${files} built files onto ${BASE}`);
