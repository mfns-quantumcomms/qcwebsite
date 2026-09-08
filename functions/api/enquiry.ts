/// <reference types="@cloudflare/workers-types" />
/**
 * Cloudflare Pages Function: POST /api/enquiry
 * Accepts the site's HTML forms (progressive enhancement: works without JS),
 * validates, checks honeypot + time-to-submit + Cloudflare Turnstile (if configured),
 * sends the enquiry via Resend (if RESEND_API_KEY set) and/or a webhook (ENQUIRY_WEBHOOK_URL),
 * then redirects to /thank-you/. Never trusts client input for routing.
 *
 * Environment variables (Pages project settings):
 *   TURNSTILE_SECRET      optional. Enables Turnstile verification when present.
 *   RESEND_API_KEY        optional. Sends email via Resend HTTP API.
 *   ENQUIRY_FROM          e.g. "Quantum Comms website <website@quantumcomms.com.au>" (domain must be verified with DKIM)
 *   ENQUIRY_TO_DEFAULT    e.g. "admin@quantumcomms.com.au"
 *   ENQUIRY_TO_HSEQ, ENQUIRY_TO_TENDERS, ENQUIRY_TO_CAREERS, ENQUIRY_TO_HIRE   optional routing mailboxes
 *   ENQUIRY_WEBHOOK_URL   optional. Receives JSON copy of every submission (CRM / Teams / shared mailbox).
 */
interface Env {
  TURNSTILE_SECRET?: string; RESEND_API_KEY?: string; ENQUIRY_FROM?: string; ENQUIRY_TO_DEFAULT?: string;
  ENQUIRY_TO_HSEQ?: string; ENQUIRY_TO_TENDERS?: string; ENQUIRY_TO_CAREERS?: string; ENQUIRY_TO_HIRE?: string; ENQUIRY_WEBHOOK_URL?: string;
}

const TOPICS: Record<string, { label: string; toKey: keyof Env }> = {
  hire: { label: 'EWP or plant hire', toKey: 'ENQUIRY_TO_HIRE' },
  works: { label: 'Rigging or civil works', toKey: 'ENQUIRY_TO_DEFAULT' },
  prequal: { label: 'Prequalification or tender pack', toKey: 'ENQUIRY_TO_TENDERS' },
  hseq: { label: 'Safety, quality or compliance', toKey: 'ENQUIRY_TO_HSEQ' },
  careers: { label: 'Careers', toKey: 'ENQUIRY_TO_CAREERS' },
  other: { label: 'Something else', toKey: 'ENQUIRY_TO_DEFAULT' },
};

const clean = (v: FormDataEntryValue | null, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();
  const redirect = (to: string) => Response.redirect(new URL(to, request.url).toString(), 303);

  // Honeypot and time-to-submit (bots fill hidden fields and submit instantly)
  if (clean(form.get('company_website'))) return redirect('/thank-you/');
  const started = Number(clean(form.get('_t')));
  if (Number.isFinite(started) && started > 0 && Date.now() - started < 3000) return redirect('/thank-you/');

  const name = clean(form.get('name'), 120);
  const email = clean(form.get('email'), 200);
  const phone = clean(form.get('phone'), 40);
  const organisation = clean(form.get('organisation'), 160);
  const topicKey = clean(form.get('topic'), 20) in TOPICS ? clean(form.get('topic'), 20) : 'other';
  const depot = clean(form.get('depot'), 60);
  const message = clean(form.get('message'), 4000);
  const consent = clean(form.get('consent')) === 'yes';
  const source = clean(form.get('_source'), 120);

  const errors: string[] = [];
  if (name.length < 2) errors.push('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email');
  if (message.length < 10) errors.push('message');
  if (!consent) errors.push('consent');
  if (errors.length) return redirect(`/contact/?error=${errors.join(',')}#enquiry`);

  if (env.TURNSTILE_SECRET) {
    const token = clean(form.get('cf-turnstile-response'), 4000);
    const ip = request.headers.get('CF-Connecting-IP') ?? '';
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
    }).then((r) => r.json() as Promise<{ success: boolean }>).catch(() => ({ success: false }));
    if (!verify.success) return redirect('/contact/?error=verification#enquiry');
  }

  const id = `QC-${Date.now().toString(36).toUpperCase()}`;
  const topic = TOPICS[topicKey];
  const to = env[topic.toKey] || env.ENQUIRY_TO_DEFAULT;
  const payload = { id, receivedAt: new Date().toISOString(), topic: topic.label, name, email, phone, organisation, depot, message, source, page: request.headers.get('Referer') ?? '' };

  const text = [
    `Enquiry ${id}`, `Topic: ${topic.label}`, `Name: ${name}`, `Organisation: ${organisation || '-'}`, `Email: ${email}`, `Phone: ${phone || '-'}`,
    `Preferred depot: ${depot || '-'}`, `Page: ${payload.page}`, '', message,
  ].join('\n');

  const tasks: Promise<unknown>[] = [];
  if (env.RESEND_API_KEY && env.ENQUIRY_FROM && to) {
    tasks.push(fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: env.ENQUIRY_FROM, to: [to], reply_to: email, subject: `[${id}] ${topic.label} enquiry from ${name}${organisation ? `, ${organisation}` : ''}`, text }),
    }));
    // acknowledgement to the enquirer
    tasks.push(fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: env.ENQUIRY_FROM, to: [email], subject: `We received your enquiry (${id})`, text: `Thanks ${name}. Your enquiry ${id} has reached Quantum Comms. We respond during business hours, Monday to Friday 7 am to 4 pm AEST. If it is urgent, call 03 9219 0948.\n\nYour message:\n${message}` }),
    }));
  }
  if (env.ENQUIRY_WEBHOOK_URL) {
    tasks.push(fetch(env.ENQUIRY_WEBHOOK_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }));
  }
  const results = await Promise.allSettled(tasks);
  const failed = results.filter((r) => r.status === 'rejected' || (r.status === 'fulfilled' && r.value instanceof Response && !r.value.ok));
  if (tasks.length && failed.length === tasks.length) {
    console.error('enquiry delivery failed', id, failed);
    return redirect('/contact/?error=delivery#enquiry');
  }
  return redirect(`/thank-you/?ref=${id}`);
};
