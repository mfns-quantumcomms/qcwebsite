export type NavItem = { label: string; href: string; children?: NavItem[] };

export const primaryNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Comms and rigging', href: '/services/comms-and-rigging/' },
      { label: 'Civil works', href: '/services/civil-works/' },
      { label: 'Steel fabrication', href: '/services/steel-fabrication/' },
      { label: 'Thermal coating', href: '/services/thermal-coating/' },
      { label: 'EWP service and maintenance', href: '/services/service-and-maintenance/' },
    ],
  },
  {
    label: 'Fleet',
    href: '/fleet/',
    children: [
      { label: 'Truck-mounted EWPs', href: '/fleet/' },
      { label: 'Trailer-mounted EWPs', href: '/fleet/trailer-mounted/' },
      { label: 'Insulated units', href: '/fleet/insulated/' },
      { label: 'Generators and plant', href: '/fleet/generators-and-plant/' },
      { label: 'How hire works', href: '/fleet/how-hire-works/' },
    ],
  },
  { label: 'Projects', href: '/projects/' },
  { label: 'Locations', href: '/locations/' },
  { label: 'Compliance', href: '/compliance/' },
  { label: 'About', href: '/about/' },
];

export const utilityNav: NavItem[] = [
  { label: 'Capability statement', href: '/capability-statement/' },
  { label: 'Careers', href: '/careers/' },
  { label: 'News', href: '/about/news/' },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  { heading: 'Services', items: primaryNav[0].children! },
  { heading: 'Fleet and hire', items: primaryNav[1].children! },
  {
    heading: 'Company',
    items: [
      { label: 'About', href: '/about/' },
      { label: 'Projects', href: '/projects/' },
      { label: 'Safety and compliance', href: '/compliance/' },
      { label: 'Capability statement', href: '/capability-statement/' },
      { label: 'News', href: '/about/news/' },
      { label: 'Careers', href: '/careers/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    heading: 'Legal',
    items: [
      { label: 'Privacy policy', href: '/privacy/' },
      { label: 'Website terms', href: '/terms/' },
      { label: 'Hire terms', href: '/hire-terms/' },
      { label: 'Accessibility', href: '/accessibility/' },
    ],
  },
];
