/**
 * Bakes a static location map for every confirmed depot.
 *
 * Tiles are fetched once from OpenStreetMap at build time, composited with a pin, and written
 * to src/assets/maps/. The published pages then serve a local image: no third-party request
 * from a visitor's browser, nothing to allow through the content security policy, no API key,
 * and the map still renders if OSM is unreachable later.
 *
 * Run: npm run maps    (results are cached in .cache/tiles, delete it to refetch)
 * Attribution to OpenStreetMap contributors is required wherever these images appear.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { parse } from 'yaml';
import { readdir } from 'node:fs/promises';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEPOTS = path.join(ROOT, 'src/content/depots');
const OUT = path.join(ROOT, 'src/assets/maps');
const CACHE = path.join(ROOT, '.cache/tiles');
const UA = 'QuantumCommsSiteBuild/1.0 (+https://www.quantumcomms.com.au; admin@quantumcomms.com.au)';

const DEFAULT_ZOOM = 15;
const TILE = 256;
const COLS = 5;
const ROWS = 4;
const OUT_W = 1000;
const OUT_H = 620;

const lngToX = (lng, z) => ((lng + 180) / 360) * 2 ** z;
const latToY = (lat, z) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tile(z, x, y) {
  const key = `${z}_${x}_${y}.png`;
  const cached = path.join(CACHE, key);
  if (existsSync(cached)) return readFile(cached);
  const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'image/png' } });
  if (!res.ok) throw new Error(`tile ${z}/${x}/${y} failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(CACHE, { recursive: true });
  await writeFile(cached, buf);
  await sleep(250); // stay well inside the OSM tile usage policy
  return buf;
}

function pinSvg(w, h, cx, cy) {
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(${cx} ${cy})">
      <ellipse cx="0" cy="4" rx="15" ry="5" fill="rgba(20,33,61,0.28)"/>
      <path d="M0 2 C -13 -14, -18 -24, -18 -32 A 18 18 0 1 1 18 -32 C 18 -24, 13 -14, 0 2 Z"
            fill="#1E7A33" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="0" cy="-33" r="6.5" fill="#FFFFFF"/>
    </g>
  </svg>`);
}

async function buildDepot(slug, depot) {
  const ZOOM = depot.mapZoom ?? DEFAULT_ZOOM;
  const { lat, lng } = depot.geo;
  const fx = lngToX(lng, ZOOM);
  const fy = latToY(lat, ZOOM);
  const x0 = Math.floor(fx) - Math.floor(COLS / 2);
  const y0 = Math.floor(fy) - Math.floor(ROWS / 2);

  const parts = [];
  for (let dx = 0; dx < COLS; dx++) {
    for (let dy = 0; dy < ROWS; dy++) {
      parts.push({ input: await tile(ZOOM, x0 + dx, y0 + dy), left: dx * TILE, top: dy * TILE });
    }
  }
  const canvasW = COLS * TILE;
  const canvasH = ROWS * TILE;
  const mosaic = await sharp({ create: { width: canvasW, height: canvasH, channels: 3, background: '#e9edf1' } })
    .composite(parts)
    .png()
    .toBuffer();

  // Pixel position of the depot inside the mosaic, then a crop centred on it.
  const px = (fx - x0) * TILE;
  const py = (fy - y0) * TILE;
  const left = Math.max(0, Math.min(canvasW - OUT_W, Math.round(px - OUT_W / 2)));
  const top = Math.max(0, Math.min(canvasH - OUT_H, Math.round(py - OUT_H / 2)));

  const cropped = await sharp(mosaic).extract({ left, top, width: OUT_W, height: OUT_H }).toBuffer();
  const withPin = await sharp(cropped)
    .composite([{ input: pinSvg(OUT_W, OUT_H, Math.round(px - left), Math.round(py - top)) }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  await mkdir(OUT, { recursive: true });
  const file = path.join(OUT, `${slug}.jpg`);
  await writeFile(file, withPin);
  return { slug, file: path.relative(ROOT, file), bytes: withPin.length };
}

const files = (await readdir(DEPOTS)).filter((f) => f.endsWith('.yaml'));
const results = [];
for (const f of files) {
  const slug = f.replace(/\.yaml$/, '');
  const depot = parse(await readFile(path.join(DEPOTS, f), 'utf8'));
  if (!depot.confirmed) {
    console.log(`skip ${slug}: not confirmed`);
    continue;
  }
  if (!depot.geo) {
    console.log(`skip ${slug}: no geo`);
    continue;
  }
  try {
    const r = await buildDepot(slug, depot);
    console.log(`built ${r.slug}  ${(r.bytes / 1024).toFixed(0)} KB  ${r.file}`);
    results.push(r);
  } catch (err) {
    console.error(`failed ${slug}: ${err.message}`);
    process.exitCode = 1;
  }
}
console.log(`\n${results.length} depot map(s) written to src/assets/maps/`);
