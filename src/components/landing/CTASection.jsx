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
            borderRadius: 32,
            background: "#7B74DC",
            padding: "clamp(48px, 7vw, 96px) clamp(32px, 6vw, 80px)",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {/* Decoration */}
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 320,
              height: 320,
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
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(200,165,90,0.07)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.3)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: 28,
                letterSpacing: "0.06em",
              }}
            >
              Start Recovering Revenue Today
            </span>

            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 5vw, 66px)",
                letterSpacing: "-0.04em",
                color: "#fff",
                lineHeight: 1.0,
                margin: "0 0 6px",
              }}
            >
              Stop losing rentals
            </h2>

            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(32px, 5vw, 66px)",
                color: "#FFFFFF",
                lineHeight: 1.0,
                margin: "0 0 28px",
              }}
            >
              to whoever picks up first.
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(15px, 1.8vw, 18px)",
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.65,
                maxWidth: 560,
                margin: "0 auto 40px",
              }}
            >
              Join US car rental operators who never miss a call, a DM, or a booking — ever again.
              Set up in 14 days. No long-term contract.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "center",
                marginBottom: 36,
              }}
            >
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 32px",
                  borderRadius: 100,
                  background: "#fff",
                  color: "#7B74DC",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
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
                Book a Free Call <ArrowUpRight size={16} />
              </a>

              <a
                href="#solutions"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 32px",
                  borderRadius: 100,
                  background: "transparent",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
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
                gap: "8px 24px",
                justifyContent: "center",
              }}
            >
              {TRUST.map((t) => (
                <span
                  key={t}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  <CheckCircle size={13} color="#2A9D8F" /> {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
