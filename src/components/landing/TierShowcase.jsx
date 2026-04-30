import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";

const TIERS = [
  {
    id: 1,
    name: "Hyper-Exotic Fleet",
    tagline: "Bugatti, Pagani, Koenigsegg",
    desc: "Ultra-luxury operators with $500K+ vehicles. White-glove concierge, multilingual support, VIP onboarding.",
    features: [
      "Dedicated AI concierge",
      "Multilingual voice AI",
      "VIP client profiles",
      "Custom brand voice training",
      "Priority support",
    ],
    highlight: "For fleets where every interaction must be flawless.",
    color: "#D4AF37",
  },
  {
    id: 2,
    name: "Exotic + Luxury Fleet",
    tagline: "Lamborghini, Ferrari, Rolls-Royce",
    desc: "High-end operators with $150K–$500K inventory. Premium lead handling, upsell automation, reputation guard.",
    features: [
      "24/7 voice + SMS AI",
      "Dynamic pricing engine",
      "Upsell automation",
      "Review management",
      "Lead nurture sequences",
    ],
    highlight: "For operators who can't afford to lose a single high-value lead.",
    color: "#7B74DC",
  },
  {
    id: 3,
    name: "Premium + Performance",
    tagline: "Porsche, BMW M, Mercedes AMG",
    desc: "Performance-focused operators with $60K–$150K vehicles. Fast quotes, DM automation, onboarding bots.",
    features: [
      "Instant quote generation",
      "Instagram + WhatsApp AI",
      "Paperwork automation",
      "Follow-up sequences",
      "Analytics dashboard",
    ],
    highlight: "For operators scaling fast and need automation now.",
    color: "#4D4699",
  },
  {
    id: 4,
    name: "Standard + SUV Fleet",
    tagline: "Cadillac, Range Rover, Tesla",
    desc: "Mid-tier operators with $30K–$60K inventory. Core AI stack for calls, DMs, quotes, and follow-ups.",
    features: [
      "Voice + SMS booking AI",
      "DM auto-responder",
      "Quote + follow-up automation",
      "Onboarding bot",
      "Basic analytics",
    ],
    highlight: "For operators ready to stop losing after-hours bookings.",
    color: "#6E6D7A",
  },
  {
    id: 5,
    name: "Multi-Location Fleet",
    tagline: "Any tier, 3+ locations",
    desc: "Operators managing multiple locations. Centralized AI coordination, fleet sync, cross-location analytics.",
    features: [
      "Multi-location dashboard",
      "Fleet availability sync",
      "Centralized lead routing",
      "Cross-location analytics",
      "Unified brand voice",
    ],
    highlight: "For operators scaling across cities.",
    color: "#6E6D7A",
  },
];

export default function TierShowcase() {
  const [activeTier, setActiveTier] = useState(2); // Default to Exotic tier

  return (
    <section
      id="tiers"
      style={{
        padding: "80px 32px",
        background: "#FCFCFE",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "linear-gradient(#7B74DC 1px, transparent 1px), linear-gradient(90deg, #7B74DC 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div style={{ width: "100%", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#7B74DC",
              display: "inline-block",
              padding: "8px 18px",
              background: "rgba(123,116,220,0.1)",
              borderRadius: 20,
              marginBottom: 20,
            }}
          >
            Built for Your Fleet
          </span>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px,4vw,56px)",
              letterSpacing: "-0.04em",
              color: "#141419",
              lineHeight: 1.1,
              margin: "0 0 16px",
            }}
          >
            From exotic to enterprise.
          </h2>
          <h2
            style={{
              fontFamily: "'Instrument Serif',serif",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(32px,4vw,56px)",
              color: "#7B74DC",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            One system scales with you.
          </h2>
        </motion.div>

        {/* Tier selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
          {TIERS.map((tier, i) => (
            <motion.button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 28px",
                background:
                  activeTier === tier.id ? "rgba(123,116,220,0.12)" : "#F5F3FF",
                border:
                  activeTier === tier.id ? "2px solid #7B74DC" : "1px solid #E3E2EB",
                borderRadius: 14,
                cursor: "pointer",
                transition: "all 0.25s",
                textAlign: "left",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (activeTier !== tier.id)
                  e.currentTarget.style.background = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                if (activeTier !== tier.id)
                  e.currentTarget.style.background = "#F5F3FF";
              }}
            >
              {/* Active indicator */}
              {activeTier === tier.id && (
                <motion.div
                  layoutId="activeTier"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "20%",
                    bottom: "20%",
                    width: 4,
                    background: "#7B74DC",
                    borderRadius: "0 2px 2px 0",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque',sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                    color: activeTier === tier.id ? "#7B74DC" : "#141419",
                    letterSpacing: "-0.02em",
                    margin: "0 0 4px",
                    transition: "color 0.25s",
                  }}
                >
                  {tier.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 13,
                    color:
                      activeTier === tier.id ? "rgba(123,116,220,0.7)" : "#6E6D7A",
                    margin: 0,
                    transition: "color 0.25s",
                  }}
                >
                  {tier.tagline}
                </p>
              </div>

              <motion.div
                animate={{
                  rotate: activeTier === tier.id ? 90 : 0,
                  scale: activeTier === tier.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight
                  size={24}
                  color={activeTier === tier.id ? "#7B74DC" : "#6E6D7A"}
                />
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Active tier detail */}
        <AnimatePresence mode="wait">
          {TIERS.filter((t) => t.id === activeTier).map((tier) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E3E2EB",
                borderRadius: 20,
                padding: 40,
              }}
            >
              <div style={{ marginBottom: 32 }}>
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque',sans-serif",
                    fontWeight: 700,
                    fontSize: 28,
                    color: "#141419",
                    letterSpacing: "-0.03em",
                    margin: "0 0 12px",
                  }}
                >
                  {tier.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 16,
                    color: "#6E6D7A",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {tier.desc}
                </p>
              </div>

              {/* Features list */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 16,
                  marginBottom: 32,
                }}
              >
                {tier.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "rgba(123,116,220,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Check size={14} color="#7B74DC" strokeWidth={3} />
                    </div>
                    <span
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 14,
                        color: "#141419",
                        fontWeight: 500,
                      }}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Highlight box */}
              <div
                style={{
                  padding: "20px 24px",
                  background: "rgba(123,116,220,0.08)",
                  border: "1px solid rgba(123,116,220,0.2)",
                  borderRadius: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#7B74DC",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Why this tier?
                </span>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14,
                    color: "#6E6D7A",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {tier.highlight}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
