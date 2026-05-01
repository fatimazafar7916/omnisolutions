import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle } from "lucide-react";

const TRUST = [
  "14-day money-back refund",
  "No long-term contract",
  "Bank-level security",
  "Live in 14 days",
];

export default function CTASection() {
  return (
    <section id="cta" className="global-section" style={{ background: "#FCFCFE" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            borderRadius: 24,
            background: "var(--brand-gradient)",
            padding: "clamp(24px, 4vw, 42px) clamp(20px, 3vw, 32px)",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          {/* Decoration */}
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "rgba(42,157,143,0.10)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(200,165,90,0.07)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              style={{
                display: "inline-block",
                padding: "5px 14px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.3)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: 16,
                letterSpacing: "0.05em",
              }}
            >
              Start Recovering Revenue Today
            </span>

            <h2
              style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(20px, 2.8vw, 34px)",
                letterSpacing: "-0.03em",
                color: "#fff",
                lineHeight: 1.1,
                margin: "0 0 2px",
              }}
            >
              Stop losing rentals
            </h2>

            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(20px, 2.8vw, 34px)",
                color: "#FFFFFF",
                lineHeight: 1.1,
                margin: "0 0 16px",
              }}
            >
              to whoever picks up first.
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(14px, 1.4vw, 16px)",
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.6,
                maxWidth: 500,
                margin: "0 auto 32px",
              }}
            >
              Join US car rental operators who never miss a call, a DM, or a booking — ever again.
              Set up in 14 days. No long-term contract.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
                marginBottom: 28,
              }}
            >
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "12px 28px",
                  borderRadius: 100,
                  background: "#fff",
                  color: "#22C55E",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                Book a Free Call <ArrowUpRight size={14} />
              </a>

              <a
                href="#solutions"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "12px 28px",
                  borderRadius: 100,
                  background: "transparent",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Explore Products
              </a>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px 20px",
                justifyContent: "center",
              }}
            >
              {TRUST.map((t) => (
                <span
                  key={t}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  <CheckCircle size={12} color="#fff" /> {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
