import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { INTEGRATIONS } from '@/lib/employees';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';

export default function IntegrationsPage() {
  const grouped = INTEGRATIONS.reduce<Record<string, typeof INTEGRATIONS>>((acc, i) => {
    acc[i.category] = acc[i.category] ? [...acc[i.category], i] : [i];
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>Integrations — Aiaura</title>
        <meta
          name="description"
          content="Aiaura plugs into HubSpot, Twilio, Stripe, HQ Rental, Instagram, WhatsApp, and every other tool US car rental operators already run."
        />
        <meta property="og:title" content="Integrations — Aiaura" />
        <meta
          property="og:description"
          content="Connect Aiaura to the tools you already run. No migration required."
        />
      </Helmet>
      <Navbar />
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-mint">
            Integrations
          </span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">
            Connects to the tools you already run.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-cream/75">
            No migration. No rip-and-replace. Aiaura sits on top of your existing stack and
            amplifies it.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl space-y-12 px-6 py-20">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h2 className="font-display text-2xl text-forest-deep">{category}</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {items.map((i) => (
                  <div
                    key={i.name}
                    className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft"
                  >
                    <div className="font-display text-lg text-foreground">{i.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-3xl bg-mint-soft p-10 text-center">
            <h3 className="font-display text-3xl text-forest-deep">Don't see your tool?</h3>
            <p className="mt-3 text-forest-deep/80">
              We add new integrations every week. Tell us what you run.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-full bg-forest-deep text-cream hover:bg-forest"
            >
              <Link to="/contact">Request an integration</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
