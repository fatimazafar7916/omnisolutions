import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-forest-deep text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-2xl">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-mint" />
              <span>Aiaura</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-cream/70">
              Twelve AI employees for US car rental operators. Answer every call, reply to every DM,
              close every booking — 24/7, in your brand voice.
            </p>
          </div>

          <div>
            <h4 className="font-display text-base text-mint">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/75">
              <li>
                <Link to="/solutions" className="hover:text-mint">
                  12 AI Employees
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-mint">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="hover:text-mint">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-mint">
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base text-mint">Built for</h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/75">
              <li>Hyper-Exotic Fleets</li>
              <li>Luxury Rentals</li>
              <li>Premium Operators</li>
              <li>Multi-Location Standard</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Aiaura. Built for US car rental operators.</p>
          <p>Made with intent in the United States.</p>
        </div>
      </div>
    </footer>
  );
}
