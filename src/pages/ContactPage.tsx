import { Helmet } from 'react-helmet-async';
import { Mail, Phone, Clock } from 'lucide-react';
import { LeadForm } from '@/components/site/LeadForm';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Book a Demo — Aiaura</title>
        <meta
          name="description"
          content="See your custom 12-employee Aiaura setup in a 30-minute demo. Tailored to your fleet, your channels, and your brand voice. Live in 14 days."
        />
        <meta property="og:title" content="Book a Demo — Aiaura" />
        <meta
          property="og:description"
          content="30-minute walkthrough tailored to your rental operation. Live in 14 days."
        />
      </Helmet>
      <Navbar />
      <section className="global-section bg-background">
        <div className="section-container grid gap-16 md:grid-cols-[1fr_1.1fr] md:items-start">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-forest">
              Book a Demo
            </span>
            <h1 className="mt-3 font-display text-5xl md:text-6xl">
              Let's see how much revenue you're leaving on the table.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              30-minute walkthrough tailored to your fleet, your channels, and your brand voice.
              We'll show you exactly which of the 12 AI employees would move the needle first.
            </p>

            <ul className="mt-10 space-y-5">
              <Item
                icon={Clock}
                title="Response within 1 business day"
                body="Usually faster — our own AI handles inbound demo requests."
              />
              <Item
                icon={Mail}
                title="hello@aiaura.ai"
                body="For partnership and press inquiries."
              />
              <Item
                icon={Phone}
                title="Built in the United States"
                body="US-based ops team, available across all timezones."
              />
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
            <h2 className="font-display text-2xl text-foreground">Tell us about your fleet</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Takes under a minute. We'll bring back a tailored plan.
            </p>
            <div className="mt-6">
              <LeadForm source="contact_page" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function Item({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-4">
      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint-soft text-forest-deep">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-display text-lg text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{body}</div>
      </div>
    </li>
  );
}
