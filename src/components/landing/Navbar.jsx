import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Products", href: "#solutions" },
  { label: "Why Aiaura", href: "#why" },
  { label: "How It Works", href: "#how" },
  { label: "Integrations", href: "#integrations" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(252,252,254,0.92)" : "rgba(252,252,254,0)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(123,116,220,0.08)" : "1px solid transparent",
          transition: "background 0.35s, border-color 0.35s, backdrop-filter 0.35s",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "0 24px",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 1,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: "#7B74DC",
                letterSpacing: "-0.03em",
              }}
            >
              AIAUR
            </span>
            <span
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: "#2A9D8F",
                letterSpacing: "-0.03em",
              }}
            >
              A
            </span>
          </a>

          {/* Desktop links */}
          <div style={{ display: "none" }} className="md-nav">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#6E6D7A",
                  textDecoration: "none",
                  padding: "4px 0",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#7B74DC")}
                onMouseLeave={(e) => (e.target.style.color = "#6E6D7A")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#cta"
            className="nav-cta-desktop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 22px",
              borderRadius: 100,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              background: "#7B74DC",
              color: "#FCFCFE",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(123,116,220,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Book a Call <ArrowUpRight size={14} />
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            style={{
              display: "flex",
              padding: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#7B74DC",
            }}
            className="hamburger-btn"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "#FCFCFE",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(123,116,220,0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  color: "#7B74DC",
                  letterSpacing: "-0.03em",
                }}
              >
                AIAUR<span style={{ color: "#2A9D8F" }}>A</span>
              </span>

              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#7B74DC",
                }}
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 32px",
                gap: 12,
              }}
            >
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                    fontSize: 36,
                    color: "#7B74DC",
                    textDecoration: "none",
                    paddingBottom: 8,
                    borderBottom: "1px solid rgba(123,116,220,0.07)",
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>

            <div style={{ padding: 24 }}>
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "16px",
                  borderRadius: 100,
                  background: "#7B74DC",
                  color: "#FCFCFE",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Book a Call <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .md-nav {
            display: flex !important;
            gap: 36px;
          }
          .hamburger-btn {
            display: none !important;
          }
          .nav-cta-desktop {
            display: inline-flex !important;
          }
        }
        @media (max-width: 767px) {
          .nav-cta-desktop {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
