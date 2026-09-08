# Open items for Quantum Comms before launch

Everything below is a fact the website cannot state until the company confirms it, or a document the company must supply. Each item names where it surfaces. Items are grouped by section; the first group applies to the whole site.

## Whole site

1. **Fleet register.** Confirm every unit in `src/content/fleet/` is still in service, add units bought since 2019 (press reports about 30 Bronto platforms), confirm the S104HLA delivery and commissioning date, and supply OEM, model and SWL for the Actros and MAN units. Until then the site shows figures from the 2019 fleet portfolio with a 'to confirm' note and never states a fleet count or a maximum reach as a headline.
2. **Depots.** Confirm whether Penrith (or Newcastle), Middle Beach SA and Success WA are staffed depots. Supply street address, local phone and hours for each. Set `confirmed: true` in `src/content/depots/` to publish them.
3. **ISO certificates.** Supply the three certificate PDFs, confirm certificate numbers, certifying body and expiry. The compliance page currently marks the numbers unverified.
4. **Leadership.** Confirm Andrew Drenovski's title and supply profiles for operations, HSEQ and workshop leads if they are to be listed.
5. **Programmes and clients.** Confirm which of the six programmes and three tier-one clients named in the 2019 capability statement may still be published.
6. **Insurances.** Supply insurance types and limits (public liability, workers compensation, motor and plant, professional indemnity if held) for the compliance page and prequalification pack.
7. **Legal review.** Privacy policy, website terms, hire terms and accessibility statement are drafts marked for review.
8. **Press links.** Confirm the URLs and quotes for the June 2025 and February 2026 news items.
9. **Milestone years.** Confirm 2015 (comms and civils) and 2020 (fabrication at Bylands).
10. **Photos.** The site uses photos from the previous website's media library. Confirm rights, and supply a photo of each fleet unit and of each depot.
11. **Form delivery.** Provide the mailboxes for hire, tenders, HSEQ and careers enquiries, and confirm the email sending domain (DKIM) and whether a CRM or Teams channel should receive a copy.

## Services

1. Steel fabrication: confirm CNC plasma cutting thickness (2022 site copy claimed 25 mm) and brake press length and tonnage (2022 copy claimed 3.2 m, 120 t). Both are withheld from the page behind a notice until confirmed.
2. Steel fabrication: confirm the welding standard the workshop fabricates to and whether welder qualification records can be supplied with quotes.
3. Steel fabrication: 2022 copy claimed an express 5-day turnaround and 'over 120 years combined knowledge'; both omitted. Confirm whether any lead-time commitment should be published.
4. Steel fabrication: 'fabricating since 2020' is taken from the 2022 site copy and the About timeline; confirm the year.
5. Thermal coating: confirm which steps are performed in-house at Bylands (grit blast, thermal spray, sealing) and which use partners (hot-dip galvanising assumed external). The page currently describes blasting and thermal spray as in-house.
6. Thermal coating: confirm the surface preparation and coating standards the workshop works and inspects to (e.g. AS 4312 corrosivity categories, AS/NZS 2312 series) and what coating record is supplied per batch.
7. Thermal coating: 2022 copy quoted protection lives of 25, 45 and 85 years for zinc, zinc alloy and alloy systems; omitted as unverified. Confirm whether any design-life figures should be published and their basis.
8. Thermal coating: confirm whether client-supplied steel is accepted for coating, or workshop-fabricated steel only.
9. Service and maintenance: confirm whether servicing, inspections and ten-year major inspections are offered to third-party EWP owners or are fleet-only. The page is written as fleet-first with a notice.
10. Service and maintenance: confirm the inspection standard the workshop works to (e.g. AS 2550.10 major inspections) and whether the service lead should be named with credentials (2022 copy carried an unnamed Bronto specialist bio, not used).
11. Service and maintenance: confirm Ruthmann platforms are in the fleet. The 2022 services copy mentions a Ruthmann Steiger, but no Ruthmann unit exists in src/content/fleet.
12. Civil works: confirm the plant list (capability statement Rev 10) is current and which items are offered for dry hire; the 2019 rates sheet lists skid steer, 3 t excavator and 3 t and 8 t crane trucks at POA.
13. Civil works: confirm rooftop re-sheeting and sealing, earthing, and pit and riser installation are current scopes (sourced from 2022 site copy only).
14. All services: relatedFleet lists were chosen by relevance (6x6 units for civil access, 55 m and 70 m Brontos for head frame installs, all in-service units for maintenance). Client to confirm which units actually support each service.

## Fleet and hire

1. Every fleet register entry has meta.verified false and lastVerified null; the register index and each unit page therefore display 'not yet verified against the current fleet'. Client to confirm each unit is still in service and set lastVerified.
2. 104 m Bronto S104HLA: confirm delivery and commissioning date, and supply outreach, SWL, transport dimensions and jacking footprint from the OEM data sheet. The page renders it as 'on order, cannot be booked' until then.
3. Per-unit photos: no register entry has an image, so every unit page shows a representative fleet photo with a caption saying so. Supply one photo per unit (filename in src/assets/photos or a photos key) and an alt description.
4. Platform OEM and SWL for the 55 m Actros 4144, and platform OEM for the 54 m MAN TGS and 46 m Scania P400, currently render as 'To be confirmed' from the register.
5. Trailer-mounted units: the register has none. Supply make/model, working height, outreach, SWL, aggregate trailer mass, towing licence class, home depot and status for each. The 2019 rate card listed a car-licence unit in this class.
6. HV insulated unit: capability statement Rev 10 says LV and HV insulated units are available but the register carries only the LV Isuzu. Supply make, model, rating, working height and status. Also reconcile the capability statement's 16 m insulated unit against the register's 15 m LV unit.
7. Generator range (kVA), number of units and fuel cell sizes: the old site copy stated a range but it is not in company.ts, so the page shows a placeholder notice. Confirm from the fleet register.
8. The old site listed additional hire items not in company.plant (bog mats, box/tandem/tri-axle trailers, shipping containers, telehandler, forklifts, portable welder, dual-axle float). Confirm which are current so they can be added to plant lists.
9. Current hire minimums and conditions: the 2019 rate card gives weekday and weekend/public-holiday minimum hours, an overtime threshold and rate, a per-night travel allowance, a multi-month dry-hire minimum then month by month, a daily-distance threshold for the vehicle allowance, and a dilapidation report fee. All are rendered as concepts only. Confirm current values for the rate card and /hire-terms/.
10. Confirm the dry-hire conditions taken from the 2019 rate card are still current: operator induction on the unit, one-day competency course with replacement operator if not deemed competent, and full pre and post dilapidation reports.
11. Home depots: every register unit lists craigieburn only, while the capability statement says EWPs operate from Melbourne, Newcastle and Brisbane. Confirm which units are based at Narangba QLD and whether a NSW base exists so homeDepots can be set per unit.
12. Confirm electrical spotters remain available with the fleet (stated in capability statement Rev 10) and that AusNet Services Accredited Delivery Partner status can be published (headlineFacts.ausnetAdp is unverified; the insulated page says it is being confirmed).
13. Confirm the how-hire-works statement that units are serviced to the manufacturer's schedule by the company's own workshop (inferred from the Bylands depot's 'EWP service and maintenance' capability).
14. Confirm that dielectric test records for insulated units and calibration certificates for instruments can be supplied on request, as the insulated and plant pages invite readers to ask for them.

## Locations, compliance and capability statement

1. Depots: confirm which depots are staffed. NSW (Penrith per the 2022 footer vs Newcastle per the capability statement), SA Middle Beach and WA Success are unconfirmed and appear only as 'coverage' states; company.depotPolicy.note (which reads as an internal note) renders publicly in a .notice on /locations/ and /capability-statement/ until this is resolved.
2. Bylands and Narangba depot records are unverified: both currently carry the head office phone number and hours. Supply local numbers and hours, or confirm that head office routes calls; the depot pages show a 'contact details are being confirmed' notice until meta.verified is set.
3. Fleet home depots: every fleet unit is homed at craigieburn, so the Narangba and Bylands pages show 'no units registered to this depot yet'. Confirm which units are based in Queensland (Narangba lists 'Truck-mounted EWP fleet' as a capability) and update homeDepots.
4. Certifications: certificate numbers (211-Q-5, 211-E-4, 211-S-5) and the 2029 expiry were read from the JAS-ANZ register and render with an 'Unverified, to be confirmed' chip. Supply the certificate PDFs, the certified scope wording, expiry dates and the certification body's name (registrar currently renders as 'JAS-ANZ accredited body').
5. Insurances: supply insurer, policy number, limit and expiry for public and products liability, workers compensation (per state), motor vehicle and mobile plant, and confirm whether professional indemnity is held. The section is a placeholder notice until then.
6. Training matrix, specialist inductions (AusNet ADP, Rail Industry Worker, Broadcast Australia), operator credentials and the vehicle kit come from Capability Statement Rev 10 (2019); confirm they are current. The source string renders as a caption.
7. Programmes: confirm which 'current programmes' are still current. programmes.source, including 'Client to confirm which are current before launch', renders in a notice on the capability statement.
8. Prequalification pack: confirm the 'typically includes' list on /compliance/ (ISO certificates, certificates of currency, HSEQ policies, training records for the nominated crew, site safety pack with risk assessments and plant SWMS, log book and service history for hired units) matches what the company actually issues.
9. Capability statement PDF: the Download PDF button is a disabled placeholder. Decide where the generated PDF will live (the sitemap filter already excludes /downloads/) and wire the link at launch.
10. Hire features on the capability statement list 'high-voltage insulated units available on request, per our capability statement'; the fleet register only has an LV unit. Confirm HV availability and the 16 m insulated unit the capability statement mentions.
11. On-site practice bullets on /compliance/ (site-specific SWMS, lift plans and rescue plans per job; log books and daily prestarts on hired plant; reporting through the client's portal) are drawn from the capability statement and existing service copy. Confirm wording with HSEQ.
12. Depot hours in structured data: openingHoursSpecification is emitted only where a depot's hours string matches company.hours. Narangba hours display as Brisbane time (AEST, no daylight saving); confirm.

## About, news, projects and careers

1. About timeline: confirm the year comms rigging/civils began (previous website says 2015) and the year steel fabrication started at Bylands (previous website says 2020). Both are typed as local constants in src/pages/about/index.astro with verified:false and render 'Date to be confirmed'; ideally add a milestones register to src/data/company.ts and remove the local constants.
2. Leadership: confirm Andrew Drenovski's title (site copy says Owner and Director, press says CEO, company.ts uses Managing Director with verified:false). Supply any further leadership or management profiles (operations, HSEQ, workshop) or confirm the section should show one person only; the page carries a notice placeholder.
3. Crews: confirm the geography statement on /about/ (rigging crews at the VIC and QLD depots, civil and road-access crews in VIC) still holds; it comes from Capability Statement Rev 10 (2019).
4. Programmes: confirm which of the six 'current' programmes are still active and whether Service Stream, Visionstream and ICS Industries may be named publicly as past clients. The pastWork line 'Tower, mast and pole builds over 100 m including all civil works' renders unqualified on /projects/ because it sits in the register; confirm it is acceptable.
5. Case studies: none are published. Supply client-approved case studies using src/content/projects/example-greenfield-build.md as the template (set published:true, replace every bracketed placeholder, obtain written consent for client name and any reference).
6. News: confirm the article URLs and exact dates for the two press entries (Vertikal.net, Access Briefing and Cranes & Lifting, June 2025; Prime Mover Magazine, February 2026), add them as url: in the front matter and set verified:true so the pending-link notices disappear.
7. Careers: confirm the wording that missing training 'can be arranged at the start', that apprentices and trainees are considered, that advanced rigging is preferred for tower crews and what plant competencies civil operators must hold (the capability statement does not specify these), that diesel mechanics work from the Bylands workshop with field call-outs, and that callers can ask head office for the crew supervisor for their trade.
8. Careers: confirm that no individual vacancies should be listed and that expressions of interest via the enquiry form (topic=careers) reach the right person; confirm retention of EOIs is covered by the privacy policy.
9. Photos: confirm consent for identifiable workers in basketOnMonopole (Careers hero, Projects strip), riggerOnMonopole (Careers), civilSlabRemote (About), civilExcavator (Careers) and fleetYard (About hero).

## Contact and legal pages

1. Thank-you page tells the enquirer an acknowledgement email quoting their reference will arrive. functions/api/enquiry.ts only sends it when RESEND_API_KEY and ENQUIRY_FROM are set in the Cloudflare Pages project. Confirm email delivery is configured before launch or soften that step.
2. Privacy policy: confirm whether Quantum Comms is an APP entity (annual turnover above the small-business threshold, or opted in). The draft is written as if the APPs apply in full.
3. Privacy policy: name the transactional email provider (Resend, per the function), the CRM or shared mailbox that receives the webhook copy, and retention periods for enquiries and recruitment expressions of interest. Confirm the 30-day access and complaint response commitment.
4. Hire terms: confirm the weekday, weekend and public-holiday minimum hire, the dry-hire minimum term, cancellation notice period, standby and weather stand-down rules, dilapidation report fee approach, public liability limit and plant insurance arrangement, damage waiver option, and payment terms. No figures from the 2019 rate sheet were republished.
5. Hire terms: the published wind limit is computed from the fleet register (currently the same rating on every unit that has maxWindMs). The Actros 55 m, MAN 54 m and S104HLA entries have no maxWindMs; add ratings to those yaml files so the figure covers the whole fleet.
6. Accessibility statement: the known-limitations section is a placeholder. An independent WCAG 2.2 AA audit and screen-reader review are described as planned before launch; record their findings there, and only then publish a conformance status.
7. Downloads: no PDFs are hosted. Client to supply the capability statement PDF, ISO 9001/14001/45001 certificates, insurance certificates of currency, and OEM spec sheets, and decide whether any should be published rather than issued on request.
8. Contact page shows only confirmedDepots() (Craigieburn, Bylands, Narangba). Penrith, Middle Beach and Success remain unconfirmed and are referenced only as coverage states. Bylands and Narangba currently carry the head-office phone number; confirm local numbers and hours.
9. All four legal drafts (privacy, terms, hire terms, accessibility) need a lawyer's review. Their last-updated lines render currentYear with 'draft' and no day/month until approved.
10. Contact JSON-LD labels the office line contactType 'sales' and the mobile 'customer support'. Confirm the preferred labels, or supply a dedicated hire-desk number if one exists.
11. 404 page's 'report a broken link' mailto goes to admin@quantumcomms.com.au. Confirm that mailbox is monitored for website issues.
