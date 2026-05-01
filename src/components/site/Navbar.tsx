import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Solutions", to: "/solutions" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Integrations", to: "/integrations" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent",
      )}
    >
      <div className="section-container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl text-forest-deep">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-forest-deep" />
          <span>Aiaura</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-forest-deep"
              activeProps={{ className: "text-forest-deep" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="rounded-full bg-forest-deep px-5 text-cream hover:bg-forest">
            <Link to="/contact">Book a Demo</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden rounded-md p-2 text-forest-deep"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-foreground/80"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-3 rounded-full bg-forest-deep text-cream hover:bg-forest">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Book a Demo
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
