import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const verifiable = z.object({
  verified: z.boolean().default(false),
  source: z.string(),
  lastVerified: z.string().nullable().default(null),
});

const fleet = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/fleet' }),
  schema: z.object({
    name: z.string(),                       // e.g. "Bronto S70XDT on Scania 8x8"
    shortName: z.string(),                  // e.g. "70 m Bronto"
    unitClass: z.enum(['truck-mounted', 'trailer-mounted', 'insulated', 'plant']),
    oem: z.string().optional(),
    model: z.string().optional(),
    chassis: z.string().optional(),
    workingHeight: z.number().optional(),   // metres
    outreach: z.number().optional(),        // metres
    swlKg: z.string().optional(),           // "120 to 700"
    insulated: z.string().optional(),       // "LV", "HV" or undefined
    maxWindMs: z.number().optional(),
    gvwT: z.number().optional(),
    transport: z.object({ length: z.number().optional(), width: z.number().optional(), height: z.number().optional() }).optional(),
    jacking: z.object({ normal: z.string().optional(), narrow: z.string().optional(), oneSide: z.string().optional() }).optional(),
    cage: z.string().optional(),
    rotation: z.string().optional(),
    licence: z.string().optional(),         // "HR" etc
    fourWd: z.boolean().optional(),
    status: z.enum(['in-service', 'on-order', 'to-confirm']).default('to-confirm'),
    homeDepots: z.array(z.string()).default([]),   // depot ids
    idealFor: z.array(z.string()).default([]),
    image: z.string().optional(),           // filename in src/assets/photos
    order: z.number().default(50),
    meta: verifiable,
    notes: z.string().optional(),
  }),
});

const depots = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/depots' }),
  schema: z.object({
    name: z.string(),
    role: z.enum(['Head office', 'Workshop and fleet yard', 'Depot']),
    state: z.enum(['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT']),
    street: z.string().optional(),
    suburb: z.string(),
    postcode: z.string().optional(),
    phone: z.object({ display: z.string(), tel: z.string() }).optional(),
    email: z.string().optional(),
    hours: z.string().optional(),
    timezone: z.string(),
    confirmed: z.boolean().default(false), // only confirmed depots get pages and structured data
    geo: z.object({ lat: z.number(), lng: z.number() }).optional(),
    mapZoom: z.number().int().min(10).max(18).default(15), // lower for rural sites so the map carries context
    mapUrl: z.string().optional(),
    capabilities: z.array(z.string()).default([]),
    order: z.number().default(50),
    meta: verifiable,
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    navLabel: z.string(),
    summary: z.string(),
    order: z.number(),
    group: z.enum(['Telecommunications', 'Hire', 'Workshop']),
    scope: z.array(z.string()),
    proof: z.array(z.string()).default([]),
    relatedFleet: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    serviceType: z.string(),               // schema.org serviceType
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['press', 'company']),
    source: z.string().optional(),
    url: z.string().url().optional(),
    summary: z.string(),
    verified: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    programme: z.string().optional(),
    state: z.string().optional(),
    services: z.array(z.string()).default([]),
    year: z.string().optional(),
    summary: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    published: z.boolean().default(false), // client-approved case studies only
  }),
});

export const collections = { fleet, depots, services, news, projects };
