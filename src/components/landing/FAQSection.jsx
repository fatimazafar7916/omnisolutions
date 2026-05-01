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
          gap: 48,
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
              color: "#7B74DC",
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
              fontSize: "clamp(24px, 3vw, 40px)",
              letterSpacing: "-0.02em",
              color: "#141419",
              lineHeight: 1.15,
              margin: "0 0 16px",
            }}
          >
            Common questions,{" "}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#2A9D8F",
              }}
            >
              straight answers.
            </span>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "#6E6D7A",
              lineHeight: 1.6,
              maxWidth: 300,
            }}
          >
            Still have questions? Book a 20-minute call with our team — no sales pressure, just
            answers.
          </p>

          <a
            href="#cta"
            style={{
              display: "inline-flex",
              marginTop: 16,
              padding: "10px 20px",
              borderRadius: 100,
              background: "#F5F3FF",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: "#4D4699",
              textDecoration: "none",
            }}
          >
            Talk to Us →
          </a>
        </motion.div>

        {/* Right — accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {FAQS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                borderRadius: 12,
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
                  gap: 16,
                  padding: "14px 18px",
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
                    fontSize: "clamp(13px, 1.3vw, 15px)",
                    color: "#141419",
                    lineHeight: 1.4,
                  }}
                >
                  {f.q}
                </span>

                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: open === i ? "#7B74DC" : "#F5F3FF",
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
                    <Plus size={11} color="#7B74DC" />
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
                        padding: "0 18px 14px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "clamp(12px, 1.2vw, 14px)",
                        color: "#6E6D7A",
                        lineHeight: 1.6,
                        margin: 0,
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
