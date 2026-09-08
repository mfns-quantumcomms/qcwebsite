/**
 * Display metadata for the three service groups. The group ids are the `group` enum in
 * src/content.config.ts. Underscore prefix keeps this file out of Astro's routing.
 * No numeric claims live here; everything factual comes from the collections or company.ts.
 */
export type ServiceGroup = 'Telecommunications' | 'Workshop' | 'Hire';

type Link = { label: string; href: string };

export type GroupMeta = {
  eyebrow: string;
  heading: string;
  blurb: string;
  fleetHeading: string;
  fleetIntro: string;
  links: Link[];
  cta: { heading: string; text: string; primary: Link; secondary: Link };
};

export const groupOrder: ServiceGroup[] = ['Telecommunications', 'Workshop', 'Hire'];

export const groupMeta: Record<ServiceGroup, GroupMeta> = {
  Telecommunications: {
    eyebrow: 'Telecommunications services',
    heading: 'Site works for carriers, broadcast and utilities',
    blurb: 'Rigging crews and civil crews that take a telecommunications site from permits to handover, under carrier inductions and certified management systems.',
    fleetHeading: 'Units used on this work',
    fleetIntro: 'Working height, outreach and safe working load are taken from each unit\'s page in the fleet register. Status is shown as recorded.',
    links: [
      { label: 'Compliance and prequalification', href: '/compliance/' },
      { label: 'Programmes and projects', href: '/projects/' },
    ],
    cta: {
      heading: 'Scoping a site programme?',
      text: 'Send the design pack and we will price it. Insurances, licences, policies and the prequalification pack are available through the compliance page.',
      primary: { label: 'Request a prequalification pack', href: '/compliance/' },
      secondary: { label: 'Contact a depot', href: '/contact/' },
    },
  },
  Workshop: {
    eyebrow: 'Workshop services',
    heading: 'Fabrication and coating at Bylands',
    blurb: 'Steelwork fabricated and coated at our own workshop, for our crews and for clients who need telecommunications steel on a known lead time.',
    fleetHeading: 'Units that install our steelwork',
    fleetIntro: 'Steel from the workshop is usually fitted by our own crews from these units. Specifications are from each unit\'s page in the fleet register.',
    links: [{ label: 'Bylands workshop', href: '/locations/bylands/' }],
    cta: {
      heading: 'Have drawings for the workshop?',
      text: 'Send drawings, quantities and a delivery address for a fabricated, coated and delivered price. The workshop is at Bylands, north of Melbourne.',
      primary: { label: 'Contact the workshop', href: '/contact/' },
      secondary: { label: 'Capability statement', href: '/capability-statement/' },
    },
  },
  Hire: {
    eyebrow: 'Fleet and hire',
    heading: 'Truck-mounted EWPs, plant and the workshop behind them',
    blurb: 'Wet or dry hire of truck-mounted platforms, insulated units, generators and plant, with the service division that keeps every unit inspection-current.',
    fleetHeading: 'Units the workshop keeps in service',
    fleetIntro: 'The in-service units on the fleet register. Each unit\'s page lists its specification and status as recorded.',
    links: [
      { label: 'Fleet register', href: '/fleet/' },
      { label: 'How hire works', href: '/fleet/how-hire-works/' },
      { label: 'Generators and plant', href: '/fleet/generators-and-plant/' },
    ],
    cta: {
      heading: 'Hiring a unit, or need one serviced?',
      text: 'See how wet and dry hire work, then talk to the depot nearest your site. Hire terms and operator requirements are published.',
      primary: { label: 'How hire works', href: '/fleet/how-hire-works/' },
      secondary: { label: 'Contact a depot', href: '/contact/' },
    },
  },
};
