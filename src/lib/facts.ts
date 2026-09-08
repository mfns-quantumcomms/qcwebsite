import { getCollection, type CollectionEntry } from 'astro:content';

/** Depots the client has confirmed. Only these get pages, contact cards and LocalBusiness data. */
export async function confirmedDepots() {
  const all = await getCollection('depots');
  return all.filter((d) => d.data.confirmed).sort((a, b) => a.data.order - b.data.order);
}

/** States we list as service coverage: confirmed depots plus unconfirmed ones shown as coverage only. */
const STATE_ORDER = ['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'] as const;
export const stateNames: Record<string, string> = {
  VIC: 'Victoria', NSW: 'New South Wales', QLD: 'Queensland', SA: 'South Australia',
  WA: 'Western Australia', TAS: 'Tasmania', NT: 'Northern Territory', ACT: 'Australian Capital Territory',
};
/** States with any depot on the register (confirmed or not), in a fixed geographic order. */
export async function coverageStates() {
  const all = await getCollection('depots');
  const states = new Set(all.map((d) => d.data.state));
  return STATE_ORDER.filter((s) => states.has(s)) as string[];
}

export async function fleetInService() {
  const all = await getCollection('fleet');
  return all
    .filter((u) => u.data.status === 'in-service')
    .sort((a, b) => (b.data.workingHeight ?? 0) - (a.data.workingHeight ?? 0) || a.data.order - b.data.order);
}

export async function fleetAll() {
  const all = await getCollection('fleet');
  return all.sort((a, b) => (b.data.workingHeight ?? 0) - (a.data.workingHeight ?? 0) || a.data.order - b.data.order);
}

/** Tallest working height among in-service, verified units. Returns null if nothing is verified. */
export async function verifiedMaxHeight(): Promise<number | null> {
  const units = await fleetInService();
  const heights = units.filter((u) => u.data.meta.verified && u.data.workingHeight).map((u) => u.data.workingHeight!);
  return heights.length ? Math.max(...heights) : null;
}

/** Tallest working height on the register regardless of verification, with its status. Used with a qualifier. */
export async function registerMaxHeight(): Promise<{ height: number; status: string; name: string } | null> {
  const units = await fleetAll();
  const withHeight = units.filter((u) => u.data.workingHeight);
  if (!withHeight.length) return null;
  const top = withHeight[0];
  return { height: top.data.workingHeight!, status: top.data.status, name: top.data.shortName };
}

export function unitHref(u: CollectionEntry<'fleet'>) {
  return `/fleet/${u.id}/`;
}

export function depotHref(d: CollectionEntry<'depots'>) {
  return `/locations/${d.id}/`;
}

/** The wording used wherever the register holds no value for a field. Never a dash glyph. */
export const NOT_STATED = 'Not stated';

/** Metres for display. A missing value reads as words so it makes sense in a table cell. */
export function fmtHeight(m?: number) {
  return m ? `${m} m` : NOT_STATED;
}
