import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Plug2, Mic, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';

const STEPS = [
  {
    icon: Plug2,
    step: '01',
    title: 'Connect your stack',
    body: 'We integrate with HubSpot, Twilio, Stripe, HQ Rental, Instagram, WhatsApp, Gmail, Outlook, Google Business, and any other tool you run. No code, no migrations.',
    detail: [
      'Discovery call to map your current ops',
      'Channel & CRM connection (typically same-day)',
      'Read-only audit of your last 90 days of conversations',
    ],
  },
  {
    icon: Mic,
    step: '02',
    title: 'Train on your brand voice',
    body: 'We ingest your call recordings, sales scripts, fleet PDFs, pricing rules, and FAQs. Each AI employee gets tuned to sound exactly like your best closer.',
    detail: [
      'Brand voice cloning across voice + text',
      'Pricing & policy guardrails baked in',
      'Multi-location and per-tier personalities',
    ],
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Go live in 14 days',
    body: 'Week one: shadow mode (AI drafts, you review). Week two: tune & flip live. From day 15, your AI staff is closing bookings 24/7.',
    detail: [
      'Shadow-mode training week',
      'Daily QA with your ops lead',
      'White-glove launch + ongoing optimization',
    ],
  },
] as const;

const FAQ = [
  {
    q: 'Do I need any developers?',
    a: 'No. Setup is fully managed by our team. If you can grant access to your CRM and channels, you can launch Aiaura.',
  },
  {
    q: 'Will it sound robotic?',
    a: "No. Our voice and text agents are tuned to your actual brand voice using your own recordings and copy. Most renters never realize they're talking to AI.",
  },
  {
    q: 'What if a complex situation comes up?',
    a: 'Your AI staff hand off cleanly to your team — with full conversation context, lead score, and recommended next step. Humans stay in the loop where it matters.',
  },
  {
    q: 'Which channels are covered?',
    a: 'Voice, SMS, Instagram DM, WhatsApp, Messenger, Gmail, Outlook, web chat, and your booking forms. Add more on request.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Helmet>
        <title>How It Works — Aiaura</title>
        <meta
          name="description"
          content="Connect your stack, train on your brand voice, and go live in 14 days. Here's exactly how Aiaura deploys 12 AI employees into your car rental operation."
        />
        <meta property="og:title" content="How It Works — Aiaura" />
        <meta property="og:description" content="Three steps. Fourteen days. Zero developers." />
      </Helmet>
      <Navbar />
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-mint">
            The 14-day rollout
          </span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">
            From kickoff to closing bookings in two weeks.
          </h1>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl space-y-8 px-6 py-20">
          {STEPS.map((s) => {
            const I = s.icon;
            return (
              <div
                key={s.step}
                className="grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft md:grid-cols-[auto_1fr]"
              >
                <div className="flex flex-col items-start gap-3">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-deep text-cream">
                    <I className="h-6 w-6" />
                  </div>
                  <span className="font-display text-3xl text-mint">{s.step}</span>
                </div>
                <div>
                  <h2 className="font-display text-2xl text-foreground">{s.title}</h2>
                  <p className="mt-2 text-muted-foreground">{s.body}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-foreground">
                    {s.detail.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-forest" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-mint-soft/40">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center font-display text-4xl">Common questions</h2>
          <div className="mt-10 space-y-5">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-display text-lg text-forest-deep">{f.q}</h3>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-forest-deep text-cream hover:bg-forest"
            >
              <Link to="/contact">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
