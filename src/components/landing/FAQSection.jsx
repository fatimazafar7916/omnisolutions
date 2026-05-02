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
          gap: "clamp(20px, 4vw, 48px)",
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
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, fontSize: 10,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#22C55E", display: "block", marginBottom: 10,
          }}>
            FAQ
          </span>

          <h2 style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 700, fontSize: "clamp(18px, 4vw, 40px)",
            letterSpacing: "-0.02em", color: "#141419",
            lineHeight: 1.15, margin: "0 0 10px",
          }}>
            Common questions,{" "}
            <span style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400, fontStyle: "italic", color: "#22C55E",
            }}>
              straight answers.
            </span>
          </h2>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(12px, 2vw, 14px)",
            color: "#6E6D7A", lineHeight: 1.6, maxWidth: "100%", margin: 0,
          }}>
            Still have questions? Book a 20-minute call — no sales pressure, just answers.
          </p>

          <a href="#cta" style={{
            display: "inline-flex", marginTop: "clamp(10px, 2vw, 16px)",
            padding: "8px 18px", borderRadius: 100,
            background: "#F0FDF4",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, fontSize: "clamp(11px, 2vw, 13px)",
            color: "#22C55E", textDecoration: "none",
          }}>
            Talk to Us →
          </a>
        </motion.div>

        {/* Right — accordion, no borders, divider lines only */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {FAQS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              style={{
                borderBottom: i < FAQS.length - 1 ? "1px solid #F0EFF5" : "none",
                width: "100%",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(13px, 2vw, 15px)",
                  color: open === i ? "#22C55E" : "#141419",
                  lineHeight: 1.4,
                  transition: "color 0.2s",
                  flex: 1,
                }}>
                  {f.q}
                </span>

                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: open === i ? "#22C55E" : "#F0FDF4",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "background 0.2s",
                }}>
                  {open === i
                    ? <Minus size={10} color="#fff" />
                    : <Plus size={10} color="#22C55E" />
                  }
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24 }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{
                      paddingBottom: 12,
                      paddingRight: 34,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "clamp(12px, 1.8vw, 14px)",
                      color: "#6E6D7A", lineHeight: 1.6,
                      margin: 0,
                    }}>
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