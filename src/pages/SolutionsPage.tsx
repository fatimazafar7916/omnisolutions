import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EMPLOYEES } from '@/lib/employees';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';

export default function SolutionsPage() {
  return (
    <>
      <Helmet>
        <title>12 AI Employees — Aiaura</title>
        <meta
          name="description"
          content="Voice, DM, email, lead qualification, follow-up, reviews, insurance, quoting, booking, concierge, multilingual sales, and ops reporting — twelve AI employees built for car rental."
        />
        <meta property="og:title" content="12 AI Employees — Aiaura" />
        <meta
          property="og:description"
          content="Twelve specialists for car rental operators. Voice, DMs, email, follow-up, reviews, and more."
        />
      </Helmet>
      <Navbar />
      <section className="global-section bg-ink text-cream">
        <div className="section-container text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-mint">
            The full roster
          </span>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-5xl text-balance md:text-6xl">
            Twelve AI employees, each a specialist in one corner of your rental operation.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-cream/75">
            They share context, hand off cleanly, and learn from every conversation. Always-on,
            always in your brand voice.
          </p>
        </div>
      </section>

      <section className="global-section bg-background">
        <div className="section-container">
          <div className="grid gap-6 md:grid-cols-2">
            {EMPLOYEES.map((e) => {
              const Icon = e.icon;
              return (
                <article
                  key={e.slug}
                  className="group flex flex-col rounded-3xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-soft text-forest-deep">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-mint-soft px-3 py-1 text-xs font-medium text-forest-deep">
                      {e.roi}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl text-foreground">{e.name}</h2>
                  <p className="mt-1 text-sm text-forest">{e.tagline}</p>
                  <p className="mt-3 text-muted-foreground">{e.description}</p>
                  <Link
                    to={`/solutions/${e.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-forest-deep underline-offset-4 hover:underline"
                  >
                    Read the full spec <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-16 text-center">
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
