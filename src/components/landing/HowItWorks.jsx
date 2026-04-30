import React from "react";
import { motion } from "framer-motion";
import { Plug, Brain, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: Plug,
    n: "01",
    title: "Connect Your Channels",
    time: "~5 min",
    desc: "Phone, email, Instagram, SMS, WhatsApp — one-click integrations. No developer, no IT ticket, no migration.",
    items: [
      "Twilio, RingCentral, or your number",
      "Gmail, Outlook, or custom domain",
      "Instagram, WhatsApp, Facebook",
    ],
    accent: "#2A9D8F",
    bg: "rgba(42,157,143,0.06)",
  },
  {
    icon: Brain,
    n: "02",
    title: "Train Your AI",
    time: "~25 min",
    desc: "A guided setup session where Aiaura learns your fleet, pricing, policies, and exact brand voice. We do the heavy lifting.",
    items: [
      "Fleet inventory & pricing rules",
      "Brand tone & language preferences",
      "Escalation rules & handoff logic",
    ],
    accent: "#4D4699",
    bg: "rgba(26,92,67,0.06)",
  },
  {
    icon: Rocket,
    n: "03",
    title: "Go Live",
    time: "14 days",
    desc: "Your AI team handles every call, DM, email, and follow-up around the clock. You review the dashboard and close deals.",
    items: [
      "Real-time monitoring dashboard",
      "Human escalation when needed",
      "Weekly AI performance report",
    ],
    accent: "#2A9D8F",
    bg: "rgba(42,157,143,0.06)",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function HowItWorks() {
  return (
    <section
      id="how"
      style={{
        background: "#F5F3FF",
        padding: "120px 24px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative background number */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 40,
          right: -40,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(180px, 22vw, 340px)",
          color: "rgba(42,157,143,0.05)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        3
      </div>

      <div style={{ width: "100%", position: "relative" }}>
        {/* ── Header Row ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 40,
            marginBottom: 80,
            flexWrap: "wrap",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{ maxWidth: 580 }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#2A9D8F",
                display: "block",
                marginBottom: 18,
              }}
            >
              How It Works
            </span>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px, 5vw, 64px)",
                letterSpacing: "-0.04em",
                color: "#141419",
                lineHeight: 1.0,
                margin: 0,
              }}
            >
              Live in{" "}
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#2A9D8F",
                }}
              >
                14 days.
              </span>
              <br />
              No developers.
              <br />
              No IT.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "#5A6E62",
              lineHeight: 1.7,
              maxWidth: 320,
              margin: 0,
              paddingBottom: 4,
            }}
          >
            Three steps from sign-up to a fully autonomous AI team that handles calls, DMs, and
            emails around the clock.
          </motion.p>
        </div>

        {/* ── Step Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            position: "relative",
          }}
          className="steps-grid"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                variants={cardVariants}
                style={{
                  position: "relative",
                  padding: "48px 40px 48px",
                  borderLeft: i > 0 ? "1px solid rgba(123,116,220,0.10)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                }}
                className="step-card"
              >
                {/* Large step number — background layer */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 24,
                    right: 28,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 900,
                    fontSize: 96,
                    color: "rgba(42,157,143,0.08)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {step.n}
                </div>

                {/* Icon circle */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#fff",
                    border: "1.5px solid rgba(42,157,143,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 32,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} color="#2A9D8F" strokeWidth={1.75} />
                </div>

                {/* Time badge */}
                <span
                  style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    padding: "3px 10px",
                    borderRadius: 100,
                    background: "rgba(42,157,143,0.12)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#4D4699",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  {step.time}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(20px, 2vw, 26px)",
                    color: "#141419",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.15,
                    margin: "0 0 16px",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    color: "#6E6D7A",
                    lineHeight: 1.7,
                    margin: "0 0 28px",
                    flex: 1,
                  }}
                >
                  {step.desc}
                </p>

                {/* Divider */}
                <div
                  style={{
                    width: 40,
                    height: 1.5,
                    background: "rgba(42,157,143,0.30)",
                    marginBottom: 20,
                    borderRadius: 2,
                  }}
                />

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {step.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "rgba(42,157,143,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: "#2A9D8F",
                            display: "block",
                          }}
                        />
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13,
                          color: "#2C3D34",
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom connector arrow (not on last) */}
                {i < 2 && (
                  <div
                    aria-hidden="true"
                    className="step-arrow"
                    style={{
                      position: "absolute",
                      right: -18,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "#F5F3FF",
                      border: "1px solid rgba(42,157,143,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                      flexShrink: 0,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
                        stroke="#2A9D8F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: 64,
            padding: "36px 48px",
            background: "#7B74DC",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(18px, 2vw, 24px)",
                color: "#fff",
                margin: "0 0 4px",
                letterSpacing: "-0.02em",
              }}
            >
              Ready to go live in 14 days?
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.55)",
                margin: 0,
              }}
            >
              No setup fees. No developer required. Cancel anytime.
            </p>
          </div>
          <button
            style={{
              padding: "14px 32px",
              background: "#2A9D8F",
              border: "none",
              borderRadius: 100,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#fff",
              cursor: "pointer",
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#34896A";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2A9D8F";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Start Free Trial →
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
          .step-card {
            border-left: none !important;
            border-top: 1px solid rgba(123,116,220,0.10) !important;
            padding: 40px 24px !important;
          }
          .step-card:first-child {
            border-top: none !important;
          }
          .step-arrow {
            display: none !important;
          }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .step-card {
            padding: 40px 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
