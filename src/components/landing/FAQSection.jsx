import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "How long does it take to go live?",
    a: "Most operators are fully live within 14 days. The guided onboarding takes about 30 minutes of your time — our team handles configuration, training, and testing.",
  },
  {
    q: "Do I need a developer or IT team?",
    a: "Zero technical expertise required. Aiaura is built for rental operators, not engineers. If you can use email and Instagram, you can set up Aiaura.",
  },
  {
    q: "What if the AI can't answer something?",
    a: "The AI escalates gracefully to your team via SMS or email — with full context included. The customer gets a seamless experience and your team gets the full conversation.",
  },
  {
    q: "Does it work for exotic and luxury vehicles?",
    a: "Yes — this is where Aiaura truly shines. The AI handles white-glove communication style, insurance pre-qualification for six-figure vehicles, and VIP client follow-up protocols.",
  },
  {
    q: "Which communication channels does it cover?",
    a: "Phone calls, SMS, email, Instagram DMs, WhatsApp, Facebook Messenger, Google Business Chat, and your website chat widget — all in one platform.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Month-to-month subscription, cancel anytime. We also offer a 14-day money-back guarantee so you can try Aiaura risk-free.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="global-section" style={{ background: "#FFFFFF" }}>
      <div
        className="faq-wrap section-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(24px, 5vw, 48px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#22C55E",
              display: "block",
              marginBottom: 12,
            }}
          >
            FAQ
          </span>

          <h2
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(20px, 4vw, 40px)",
              letterSpacing: "-0.02em",
              color: "#141419",
              lineHeight: 1.15,
              margin: "0 0 12px",
            }}
          >
            Common questions,{" "}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#22C55E",
              }}
            >
              straight answers.
            </span>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(13px, 2vw, 14px)",
              color: "#6E6D7A",
              lineHeight: 1.6,
              maxWidth: "100%",
            }}
          >
            Still have questions? Book a 20-minute call with our team — no sales pressure, just
            answers.
          </p>

          <a
            href="#cta"
            style={{
              display: "inline-flex",
              marginTop: "clamp(12px, 2vw, 16px)",
              padding: "clamp(8px, 1.5vw, 10px) clamp(16px, 3vw, 20px)",
              borderRadius: 100,
              background: "#F0FDF4",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(12px, 2vw, 13px)",
              color: "#22C55E",
              textDecoration: "none",
            }}
          >
            Talk to Us →
          </a>
        </motion.div>

        {/* Right — accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4px, 1vw, 6px)" }}>
          {FAQS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                borderRadius: "clamp(8px, 1.5vw, 12px)",
                overflow: "hidden",
                border: "1px solid #EDE8DE",
                background: open === i ? "#FAFAF8" : "#fff",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "clamp(8px, 2vw, 16px)",
                  padding: "clamp(12px, 2vw, 14px) clamp(14px, 2.5vw, 18px)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(13px, 2vw, 15px)",
                    color: "#141419",
                    lineHeight: 1.4,
                    wordBreak: "break-word",
                  }}
                >
                  {f.q}
                </span>

                <span
                  style={{
                    width: "clamp(20px, 3vw, 24px)",
                    height: "clamp(20px, 3vw, 24px)",
                    borderRadius: "50%",
                    background: open === i ? "#22C55E" : "#F0FDF4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  {open === i ? (
                    <Minus size={11} color="#fff" />
                  ) : (
                    <Plus size={11} color="#22C55E" />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26 }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      style={{
                        padding: "0 clamp(14px, 2.5vw, 18px) clamp(12px, 2vw, 14px)",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "clamp(12px, 1.8vw, 14px)",
                        color: "#6E6D7A",
                        lineHeight: 1.6,
                        margin: 0,
                        wordBreak: "break-word",
                      }}
                    >
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .faq-wrap {
            grid-template-columns: 1fr 1.6fr !important;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
