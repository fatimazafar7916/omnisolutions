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
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          width: "calc(100% - 48px)",
          maxWidth: 900,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: scrolled
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 100,
            padding: "8px 8px 8px 16px",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)"
              : "0 4px 16px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Logo circle */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#141419",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <span style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 14,
              color: "#7B74DC",
              letterSpacing: "-0.02em",
            }}>
              A
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="nav-links-desktop" style={{ display: "none" }}>
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
                  e.currentTarget.style.background = "rgba(123,116,220,0.08)";
                  e.currentTarget.style.color = "#7B74DC";
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
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                background: "#141419",
                color: "#fff",
                textDecoration: "none",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2D2C38";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#141419";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Book a Call <ArrowUpRight size={13} />
            </a>

            {/* Hamburger */}
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
                  width: 32, height: 32, borderRadius: "50%",
                  background: "#141419",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800, fontSize: 13, color: "#7B74DC",
                  }}>A</span>
                </div>
                <span style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700, fontSize: 16, color: "#141419",
                  letterSpacing: "-0.02em",
                }}>
                  AIAUR<span style={{ color: "#2A9D8F" }}>A</span>
                </span>
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
                  background: "#141419",
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
        @media (min-width: 768px) {
          .nav-links-desktop {
            display: flex !important;
            align-items: center;
            gap: 2px;
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
        @media (max-width: 480px) {
          /* Navbar pill width on small screens */
          div[style*="calc(100% - 48px)"] {
            width: calc(100% - 32px) !important;
          }
        }
      `}</style>
    </>
  );
}
