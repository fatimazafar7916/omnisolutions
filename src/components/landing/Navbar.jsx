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
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Floating pill navbar */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 16,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          padding: "0 24px",
          pointerEvents: "none",
        }}
      >
        {/* Desktop navbar - pill with border */}
        <div
          className="nav-desktop-pill"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: scrolled
              ? "rgba(255,255,255,0.97)"
              : "rgba(255,255,255,0.90)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 100,
            padding: "6px 6px 6px 6px",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)"
              : "0 4px 16px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
            width: "100%",
            maxWidth: 860,
            pointerEvents: "all",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              flexShrink: 0,
              padding: "0 8px",
              marginLeft: 8,
            }}
          >
            <span style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 17,
              color: "#22C55E",
              letterSpacing: "0.02em",
            }}>
              AIAUR
            </span>
            <span style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 17,
              color: "#A3E635",
              letterSpacing: "0.02em",
            }}>
              A
            </span>
          </a>

          {/* Desktop nav links - centered */}
          <div className="nav-links-desktop" style={{ display: "none", flex: 1, justifyContent: "center" }}>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#3D3C47",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: 100,
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(34,197,94,0.08)";
                  e.currentTarget.style.color = "#22C55E";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#3D3C47";
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* Desktop CTA */}
            <a
              href="#cta"
              className="nav-cta-desktop"
              style={{
                display: "none",
                alignItems: "center",
                gap: 6,
                padding: "9px 20px",
                borderRadius: 100,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                background: "var(--brand-gradient)",
                color: "#fff",
                textDecoration: "none",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(34,197,94,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(34,197,94,0.4)";
                e.currentTarget.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(34,197,94,0.3)";
                e.currentTarget.style.filter = "brightness(1)";
              }}
            >
              Book a Call <ArrowUpRight size={13} />
            </a>

            {/* Hamburger - desktop only inside pill */}
            <button
              onClick={() => setOpen(true)}
              className="hamburger-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#141419",
                border: "none",
                cursor: "pointer",
                color: "#fff",
              }}
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>

        {/* Mobile navbar - no border, just logo + hamburger */}
        <div
          className="nav-mobile-bar"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            pointerEvents: "all",
            padding: "0 4px",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <span style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: "#22C55E",
              letterSpacing: "0.02em",
            }}>
              AIAUR
            </span>
            <span style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: "#A3E635",
              letterSpacing: "0.02em",
            }}>
              A
            </span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label="Open menu"
          >
            <Menu size={28} color="#22C55E" strokeWidth={2.5} />
          </button>
        </div>
      </motion.div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 16,
              left: 24,
              right: 24,
              zIndex: 200,
              background: "#fff",
              borderRadius: 24,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
              overflow: "hidden",
            }}
          >
            {/* Mobile header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 16px",
              borderBottom: "1px solid #F0EFF5",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "0 4px",
                }}>
                  <span style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800, fontSize: 16, color: "#22C55E",
                    letterSpacing: "0.02em",
                  }}>AIAUR</span>
                  <span style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800, fontSize: 16, color: "#A3E635",
                    letterSpacing: "0.02em",
                  }}>A</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "#F5F4FA",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#141419",
                }}
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            {/* Mobile links */}
            <div style={{ padding: "8px 8px" }}>
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: "block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 15,
                    color: "#3D3C47",
                    textDecoration: "none",
                    padding: "12px 16px",
                    borderRadius: 12,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#F5F4FA"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile CTA */}
            <div style={{ padding: "8px 16px 16px" }}>
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 6,
                  width: "100%",
                  padding: "13px",
                  borderRadius: 100,
                  background: "var(--brand-gradient)",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                Book a Call <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Desktop: show pill navbar, hide mobile bar */
        @media (min-width: 768px) {
          .nav-desktop-pill {
            display: flex !important;
          }
          .nav-mobile-bar {
            display: none !important;
          }
          .nav-links-desktop {
            display: flex !important;
            align-items: center;
            gap: 2px;
            flex: 1;
            justify-content: center;
          }
          .hamburger-btn {
            display: none !important;
          }
          .nav-cta-desktop {
            display: inline-flex !important;
          }
        }

        /* Mobile: hide pill navbar, show clean bar */
        @media (max-width: 767px) {
          .nav-desktop-pill {
            display: none !important;
          }
          .nav-mobile-bar {
            display: flex !important;
          }
          .nav-cta-desktop {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
