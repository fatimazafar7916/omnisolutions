import { Helmet } from 'react-helmet-async';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { EMPLOYEES } from '@/lib/employees';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';

export default function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const employee = EMPLOYEES.find((e) => e.slug === slug);

  if (!employee) {
    return <Navigate to="/solutions" replace />;
  }

  const Icon = employee.icon;

  return (
    <>
      <Helmet>
        <title>{employee.name} — Aiaura</title>
        <meta name="description" content={employee.description} />
        <meta property="og:title" content={`${employee.name} — Aiaura`} />
        <meta property="og:description" content={employee.description} />
      </Helmet>
      <Navbar />
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm text-cream/70 hover:text-mint"
          >
            <ArrowLeft className="h-4 w-4" /> All employees
          </Link>
          <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-mint text-forest-deep">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-5xl text-cream md:text-6xl">{employee.name}</h1>
              <p className="mt-2 text-lg text-mint">{employee.tagline}</p>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-lg text-cream/80">{employee.description}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-foreground">What it does</h2>
              <ul className="mt-5 space-y-3">
                {employee.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-deep text-cream">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-foreground">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg text-foreground">Integrates with</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {employee.integrations.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border border-border bg-mint-soft px-3 py-1 text-sm text-forest-deep"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-forest-deep p-6 text-cream">
                <div className="text-xs uppercase tracking-wider text-mint">Typical impact</div>
                <div className="mt-2 font-display text-2xl">{employee.roi}</div>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-3xl bg-mint-soft p-10 text-center">
            <h3 className="font-display text-3xl text-forest-deep">
              Want to see {employee.name} run on your fleet?
            </h3>
            <p className="mt-3 text-forest-deep/80">Live in 14 days. No developers required.</p>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-full bg-forest-deep text-cream hover:bg-forest"
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
