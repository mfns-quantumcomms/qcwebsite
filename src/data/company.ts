/**
 * Single source of truth for every fact the website states about the company.
 * Pages, structured data and the capability statement read from here. Nothing numeric
 * should be typed into a template. Each claim carries a `verified` flag and the
 * document it came from; unverified claims are never rendered as headline stats.
 *
 * How to update: edit the value, set `verified: true`, update `lastVerified`.
 */

export type Verifiable<T> = {
  value: T;
  verified: boolean;
  source: string;
  lastVerified: string | null; // ISO date
};

export const company = {
  legalName: 'Quantum Comms Pty Ltd',
  tradingName: 'Quantum Comms',
  formerName: 'Quantum Travel Towers',
  abn: '32 603 340 932',
  acn: '603 340 932',
  foundedYear: 2013,
  descriptor: 'Rigging · Civils · EWP',
  tagline: 'Rigging, civils and EWP for the networks Australia runs on.',
  /* Brand Guidelines 2026, section 01. The short statement the brand leads with. */
  statement: 'Reach, delivered safely.',
  siteUrl: 'https://www.quantumcomms.com.au',
  email: 'admin@quantumcomms.com.au',
  phoneMain: { display: '03 9219 0948', tel: '+61392190948' },
  phoneMobile: { display: '0488 869 377', tel: '+61488869377' },
  hours: 'Monday to Friday, 7:00 am to 4:00 pm, Melbourne time',
  hoursSpec: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '16:00' },
  afterHours: 'For urgent site issues on an active job, call the depot number on your job sheet or the mobile above.',
  hqAddress: { street: 'Unit 1, 4-6 Nova Court', suburb: 'Craigieburn', state: 'VIC', postcode: '3064', country: 'AU' },
  geo: { lat: -37.6003655, lng: 144.9484998 },
  social: {
    linkedin: 'https://au.linkedin.com/company/quantum-comms',
    instagram: 'https://www.instagram.com/quantumcomms/',
  },
  googleMaps: 'https://www.google.com/maps/place/Quantum+Comms/@-37.6002324,144.9463137,17z/data=!3m1!4b1!4m5!3m4!1s0x6ad651ef015e3481:0xc8135d887c78971a!8m2!3d-37.6003655!4d144.9484998',
} as const;

/** Leadership. Titles vary across public sources; the site uses one. Confirm with the client. */
export const leadership = [
  { name: 'Andrew Drenovski', title: 'Managing Director', verified: false, source: 'Site copy names him as Owner and Director; press quotes him as CEO' },
];

/** Certifications. Certificate numbers reported from the JAS-ANZ register during the audit; client to confirm before launch. */
export const certifications: Array<{
  standard: string; scope: string; certificate: Verifiable<string>; registrar: string; expires: Verifiable<string>;
}> = [
  { standard: 'ISO 9001:2015', scope: 'Quality management', registrar: 'JAS-ANZ accredited body', certificate: { value: '211-Q-5', verified: false, source: 'JAS-ANZ register lookup, 7 Sep 2026', lastVerified: null }, expires: { value: '2029', verified: false, source: 'JAS-ANZ register lookup', lastVerified: null } },
  { standard: 'ISO 14001:2015', scope: 'Environmental management', registrar: 'JAS-ANZ accredited body', certificate: { value: '211-E-4', verified: false, source: 'JAS-ANZ register lookup, 7 Sep 2026', lastVerified: null }, expires: { value: '2029', verified: false, source: 'JAS-ANZ register lookup', lastVerified: null } },
  { standard: 'ISO 45001:2018', scope: 'Occupational health and safety', registrar: 'JAS-ANZ accredited body', certificate: { value: '211-S-5', verified: false, source: 'JAS-ANZ register lookup, 7 Sep 2026', lastVerified: null }, expires: { value: '2029', verified: false, source: 'JAS-ANZ register lookup', lastVerified: null } },
];

/** Headline capability facts. Only `verified: true` items may be rendered as stats. */
export const headlineFacts: Record<string, Verifiable<string>> = {
  tradingSince: { value: '2013', verified: true, source: 'Capability Statement Rev 10; ABR record active since Dec 2014', lastVerified: '2026-09-07' },
  isoTriple: { value: 'ISO 9001, 14001 and 45001', verified: false, source: 'JAS-ANZ register lookup during audit; certificate PDFs to be supplied', lastVerified: null },
  carrierInductions: { value: 'Telstra, Optus, Vodafone, NBN and Broadcast Australia inductions', verified: false, source: 'Capability Statement Rev 10 training section', lastVerified: null },
  ausnetAdp: { value: 'AusNet Services Accredited Delivery Partner', verified: false, source: 'Capability Statement Rev 10', lastVerified: null },
  staff: { value: 'about 40 field and technical staff', verified: false, source: 'Capability Statement Rev 10 (40); site copy (over 40)', lastVerified: null },
  fleetCount: { value: 'to be confirmed', verified: false, source: 'Site 28; Capability Statement 12; press June 2025 reports 30 Bronto platforms', lastVerified: null },
  maxReach: { value: 'to be confirmed', verified: false, source: 'Fleet Portfolio 2019 tops out at 70 m; press reports 104 m S104HLA on order', lastVerified: null },
};

/** Programmes named in the company's own capability statement. Wording kept as written there. */
export const programmes = {
  current: ['Telstra blackspot and greenfields', 'Vodafone eJV', 'Eltek solar greenfields', 'Telstra GOA project', 'Telstra FIDO', 'Broadcast Australia civil works'],
  pastClients: ['Service Stream', 'Visionstream', 'ICS Industries'],
  pastWork: [
    'Full eJV and LTE greenfield builds', 'Optus and Vodafone eJV site upgrades', 'LTE site upgrades', 'Tall tower, mast and pole builds including all civil works',
    'Full Telstra L700 greenfield builds', 'Telstra 4G', 'Mast and tower restrengthening', 'Full site decommissions', 'Cable and feeder runs', 'Cable tray installation',
    'NBN sites', 'Head frame swap-outs', 'Fibre installation', 'Tower painting and camouflaging', 'Line-of-sight surveys', 'Microwave link and waveguide installation',
    'Fault finding and repair', 'Hut installations and swaps', 'ODU slabs and swap-outs', 'Broadcast installation', 'Optic fibre on tram poles and distribution poles',
  ],
  source: 'Capability Statement Rev 10 (2019). Client to confirm which are current before launch.',
};

/** Training and inductions, from the capability statement. */
export const training = {
  everyFieldEmployee: [
    ['Tower rescue', 'annually'], ['Working at heights', 'every two years'], ['First aid', 'every three years'], ['CPR', 'annually'],
    ['RadHaz / EME awareness', 'every three years'], ['General construction induction (White Card)', 'once'],
    ['Optus induction', 'annually'], ['Vodafone induction', 'every two years'], ['Telstra induction', 'every three years'],
  ],
  specialist: ['AusNet Services HV lines (Accredited Delivery Partner)', 'Rail Industry Worker', 'Broadcast Australia'],
  vehicleKit: ['Radiation monitor (RadMan)', 'IVMS', 'First aid kit', 'Barriers and signage', 'Anemometer', 'Tower rescue kit', 'Spill kit', 'Two-way radios', 'SDS register', 'Site safety pack with risk assessments and plant SWMS'],
  operatorCredentials: ['HR licence', 'First aid and CPR', 'Working at heights', 'Tower rescue', 'All telecommunications carrier inductions', 'Rigging and dogging experience'],
  source: 'Capability Statement Rev 10 training section',
};

/** Plant and instruments from the capability statement (not individually registered as fleet units). */
export const plant = {
  earthmoving: ['12 t excavator with rock breaker', '5 t excavator', '3 t excavator', 'Skid steer', 'Trencher', 'Augers 600, 1200, 1500, 1800 and 2100 mm'],
  trucks: ['Crane trucks (2)', 'Tipper truck', '6x6 tipper truck and float'],
  rigging: ['Capstan winches (3)', 'Gin poles'],
  instruments: ['720-757 MHz PIM tester', 'Anritsu Site Master', 'Fibre test kit', 'BER tester', 'JMA connector tools', 'Personal RF monitors'],
  power: ['Diesel generators (range to be confirmed from the fleet register)'],
  source: 'Capability Statement Rev 10; generator page copy',
};

/** Which depots exist is disputed across the company's own documents. Only `confirmed` depots get pages. */
export const depotPolicy = {
  note: 'Capability Statement Rev 10 lists Victoria, New South Wales and Queensland. The 2022 website footer added South Australia and Western Australia. Client to confirm staffed depots before launch.',
};

/** Company milestones. Only verified entries render with a year; others render with a qualifier. */
export const milestones: Array<{ year: string; event: string; verified: boolean; source: string }> = [
  { year: '2013', event: 'Began trading as Quantum Travel Towers, hiring truck-mounted EWPs mainly to the telecommunications industry', verified: true, source: 'Capability Statement Rev 10' },
  { year: '2015', event: 'Expanded into telecommunications rigging and civil works as Quantum Comms', verified: false, source: '2022 website copy and LinkedIn; client to confirm year' },
  { year: '2020', event: 'Opened the Bylands workshop for steel fabrication and coating', verified: false, source: '2022 website copy; client to confirm year' },
  { year: '2025', event: 'Ordered a 104 m Bronto S104HLA, reported as the first in Australia', verified: false, source: 'Trade press, June 2025; delivery to be confirmed' },
];

export const currentYear = new Date().getFullYear();
