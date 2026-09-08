/**
 * Curated photos from the client's own library (downloaded from the 2022 site's media uploads).
 * Semantic names so pages never reference raw filenames. Alt text lives with the usage.
 */
import fleetLineupSunset from '@assets/photos/fleet-lineup-sunset.jpg';
import ewpLatticeTower from '@assets/photos/ewp-lattice-tower-powerlines.jpg';
import ewpHilltop from '@assets/photos/ewp-hilltop-site.jpg';
import basketOnMonopole from '@assets/photos/basket-on-monopole-aerial.jpg';
import towerErection from '@assets/photos/tower-erection-crane.jpg';
import ewpCityFacade from '@assets/photos/ewp-city-facade.jpg';
import riggerOnMonopole from '@assets/photos/rigger-on-monopole.jpg';
import ewpRooftop from '@assets/photos/ewp-rooftop-building.jpg';
import ewpGreenSite from '@assets/photos/ewp-green-site.jpg';
import civilSlabCrew from '@assets/photos/civil-slab-crew.jpg';
import civilSlabRemote from '@assets/photos/civil-slab-pour-remote.jpg';
import civilPierCage from '@assets/photos/civil-pier-cage.jpg';
import civilAnchorCage from '@assets/photos/civil-anchor-bolt-cage.jpg';
import civilConduit from '@assets/photos/civil-conduit-trench.jpg';
import civilExcavator from '@assets/photos/civil-excavator-trench.jpg';
import civilPour from '@assets/photos/civil-concrete-pour.jpg';
import poleInstall from '@assets/photos/pole-install-powerlines.jpg';
import fleetYard from '@assets/photos/fleet-yard-overhead.jpg';
import solarFrame from '@assets/photos/solar-frame-greenfield.jpg';
import solarArray from '@assets/photos/solar-array-greenfield.jpg';
import headframe from '@assets/photos/headframe-antennas.jpg';
import truckUnitDepot from '@assets/photos/truck-unit-depot.jpg';
import generatorFenced from '@assets/photos/generator-site-fenced.jpg';
import generator25 from '@assets/photos/generator-25kva.jpg';
import generatorGreenfield from '@assets/photos/generator-greenfield.jpg';
import excavatorContainer from '@assets/photos/excavator-container.jpg';
import augerLarge from '@assets/photos/auger-large.jpg';
import augerTruck from '@assets/photos/auger-on-truck.jpg';
import monopoleSky from '@assets/photos/monopole-sky.jpg';
import rockBreak from '@assets/photos/civil-rock-break.jpg';

export const photos = {
  fleetLineupSunset, ewpLatticeTower, ewpHilltop, basketOnMonopole, towerErection, ewpCityFacade, riggerOnMonopole, ewpRooftop, ewpGreenSite,
  civilSlabCrew, civilSlabRemote, civilPierCage, civilAnchorCage, civilConduit, civilExcavator, civilPour, poleInstall, fleetYard,
  solarFrame, solarArray, headframe, truckUnitDepot, generatorFenced, generator25, generatorGreenfield, excavatorContainer, augerLarge, augerTruck, monopoleSky, rockBreak,
};
export type PhotoKey = keyof typeof photos;

/** Alt text for each photo, written for a reader who cannot see it. */
export const alts: Record<PhotoKey, string> = {
  fleetLineupSunset: 'Line of Quantum Comms truck-mounted EWPs parked in a paddock at sunset',
  ewpLatticeTower: 'Truck-mounted EWP extended beside a lattice transmission tower under high-voltage lines',
  ewpHilltop: 'Truck-mounted EWP set up on a hilltop telecommunications site',
  basketOnMonopole: 'Aerial view of an EWP basket with two riggers working at the top of a monopole',
  towerErection: 'New lattice tower section being lifted into place by crane with crew on site',
  ewpCityFacade: 'Truck-mounted EWP reaching a high-rise facade in a city street',
  riggerOnMonopole: 'Rigger in harness and helmet climbing a monopole against a blue sky',
  ewpRooftop: 'Truck-mounted EWP boom reaching a rooftop telecommunications installation',
  ewpGreenSite: 'Green truck-mounted EWP set up on grass beside a fenced telecommunications compound',
  civilSlabCrew: 'Crew screeding a concrete equipment slab inside formwork on a greenfield site',
  civilSlabRemote: 'Concrete truck and crew pouring an equipment slab on a rural site',
  civilPierCage: 'Reinforcing cage for a bored pier foundation before the pour',
  civilAnchorCage: 'Circular anchor-bolt cage for a monopole foundation with reinforcing steel',
  civilConduit: 'Orange conduit laid in a narrow trench across a site',
  civilExcavator: 'Excavator digging a foundation trench in red soil',
  civilPour: 'Freshly poured concrete slab with edge formwork',
  poleInstall: 'Pole being lifted into position beside a transmission line with EWP support',
  fleetYard: 'Overhead view of the fleet yard with several truck-mounted EWPs and support vehicles',
  solarFrame: 'Steel solar panel frame under construction at a remote telecommunications site',
  solarArray: 'Completed solar array powering a remote telecommunications site',
  headframe: 'Antenna head frame with panel antennas at the top of a monopole',
  truckUnitDepot: 'Truck-mounted EWP parked at the depot',
  generatorFenced: 'Site generator inside a fenced compound beside a telecommunications shelter',
  generator25: 'Twenty-five kVA diesel generator in a green enclosure',
  generatorGreenfield: 'Generator and switchboard on a newly built greenfield site',
  excavatorContainer: 'Excavator working beside a shipping container on site',
  augerLarge: 'Large-diameter piling auger on the back of a truck',
  augerTruck: 'Auger and drilling attachment loaded on a truck',
  monopoleSky: 'Monopole with antennas against a cloudy sky',
  rockBreak: 'Excavator breaking rock in a foundation excavation',
};
