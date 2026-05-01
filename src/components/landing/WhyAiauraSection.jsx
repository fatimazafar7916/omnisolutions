import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Colors ── */
const C = "#7B74DC";
const CL = "#F5F3FF";
const GR = "#6E6D7A";

/* ── Why Aiaura Reasons ── */
const WHY_REASONS = [
  {
    id: "built-for-rentals",
    number: "01",
    title: "Built Exclusively for Car Rentals",
    description: "Not a generic chatbot. Every AI employee understands rental terminology, insurance requirements, mileage policies, and seasonal pricing. Trained on 50,000+ real rental conversations.",
    icon: "🚗",
    color: "#7B74DC",
    stats: { label: "Industry-Specific Training", value: "50K+ conversations" }
  },
  {
    id: "instant-deployment",
    number: "02",
    title: "Live in 14 Days, Not 6 Months",
    description: "While competitors take months to configure, we deploy your entire AI workforce in 2 weeks. Pre-built integrations with major rental software, instant voice cloning, zero technical setup required.",
    icon: "⚡",
    color: "#F59E0B",
    stats: { label: "Average Setup Time", value: "14 days" }
  },
  {
    id: "proven-results",
    number: "03",
    title: "Proven 3.2x Revenue Increase",
    description: "Our operators see an average 320% increase in after-hours bookings within 60 days. Real data from 47 US rental companies, not marketing promises. Your results are guaranteed or we refund 100%.",
    icon: "📈",
    color: "#10B981",
    stats: { label: "Average Revenue Lift", value: "3.2x" }
  },
  {
    id: "human-backup",
    number: "04",
    title: "AI + Human Safety Net",
    description: "Complex situations automatically escalate to your team. AI handles 94% of routine work, humans step in for edge cases. You're never locked out of conversations, always in control.",
    icon: "🤝",
    color: "#8B5CF6",
    stats: { label: "Automated Resolution", value: "94%" }
  },
  {
    id: "transparent-pricing",
    number: "05",
    title: "Transparent, Predictable Pricing",
    description: "No hidden fees, no per-message charges, no surprise bills. One flat monthly rate covers unlimited calls, messages, and emails. Cancel anytime, no long-term contracts required.",
    icon: "💰",
    color: "#06B6D4",
    stats: { label: "Pricing Model", value: "Flat monthly rate" }
  },
  {
    id: "us-based",
    number: "06",
    title: "US-Based Support & Compliance",
    description: "Your data never leaves US servers. GDPR compliant, SOC 2 certified, full insurance industry compliance. Real support team in your timezone, not offshore call centers.",
    icon: "🇺🇸",
    color: "#EC4899",
    stats: { label: "Data Location", value: "100% US-based" }
  }
];

/* ── Reason Card Component ── */
function ReasonCard({ reason, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid #E3E2EB",
        borderRadius: 16,
        padding: "24px 20px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? "0 12px 24px rgba(123,116,220,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 3,
        background: `linear-gradient(90deg, transparent, ${reason.color}, transparent)`,
        opacity: isHovered ? 1 : 0.5,
        transition: "opacity 0.3s ease",
      }} />

      {/* Number badge */}
      <div style={{
        position: "absolute",
        top: 16,
        right: 16,
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: `${reason.color}15`,
        border: `1px solid ${reason.color}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: 12,
          fontWeight: 800,
          color: reason.color,
        }}>
          {reason.number}
        </span>
      </div>

      {/* Icon */}
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: `${reason.color}10`,
        border: `1px solid ${reason.color}20`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        marginBottom: 16,
      }}>
        {reason.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Bricolage Grotesque',sans-serif",
        fontWeight: 800,
        fontSize: "clamp(16px,1.8vw,20px)",
        color: "#141419",
        letterSpacing: "-0.03em",
        margin: "0 0 10px",
        lineHeight: 1.2,
        paddingRight: 40,
      }}>
        {reason.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: "clamp(12px,1.2vw,14px)",
        color: GR,
        lineHeight: 1.6,
        margin: "0 0 16px",
      }}>
        {reason.description}
      </p>

      {/* Stats badge */}
      <div style={{
        background: `${reason.color}08`,
        border: `1px solid ${reason.color}20`,
        borderRadius: 8,
        padding: "8px 12px",
        display: "inline-block",
      }}>
        <div style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 9,
          fontWeight: 600,
          color: GR,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 2,
        }}>
          {reason.stats.label}
        </div>
        <div style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: 16,
          fontWeight: 800,
          color: reason.color,
          letterSpacing: "-0.02em",
        }}>
          {reason.stats.value}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Why Aiaura Section ── */
export default function WhyAiauraSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#FCFCFE",
        borderTop: "1px solid #E3E2EB",
        padding: "64px 0 72px",
        fontFamily: "'DM Sans',system-ui,sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(123,116,220,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 36px",
        position: "relative",
      }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: CL,
            border: `1px solid ${C}30`,
            borderRadius: 24,
            padding: "5px 16px",
            marginBottom: 16,
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: C,
              display: "inline-block"
            }} />
            <span style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C
            }}>
              Why Choose Aiaura
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(28px,4vw,48px)",
            color: "#141419",
            letterSpacing: "-0.04em",
            margin: "0 0 14px",
            lineHeight: 1.05,
          }}>
            Not just another AI tool.<br />
            <span style={{ color: C }}>Your complete rental workforce.</span>
          </h2>

          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "clamp(13px,1.5vw,16px)",
            color: GR,
            maxWidth: 580,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            While others sell generic chatbots, we deliver a proven system built exclusively for US car rental operators. Here's why 47 companies chose us over the competition.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
          marginBottom: 48,
        }}>
          {WHY_REASONS.map((reason, index) => (
            <ReasonCard
              key={reason.id}
              reason={reason}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            textAlign: "center",
            padding: "32px 28px",
            background: "linear-gradient(135deg, rgba(123,116,220,0.08), rgba(123,116,220,0.03))",
            border: `1px solid ${C}20`,
            borderRadius: 16,
          }}
        >
          <h3 style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(18px,2.2vw,24px)",
            color: "#141419",
            letterSpacing: "-0.03em",
            margin: "0 0 8px",
          }}>
            Ready to see why operators choose Aiaura?
          </h3>
          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
            color: GR,
            margin: "0 0 20px",
          }}>
            Book a 15-minute demo and see your exact revenue opportunity.
          </p>
          <button style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            background: C,
            border: "none",
            borderRadius: 8,
            padding: "12px 28px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => e.target.style.background = "#6B63CC"}
          onMouseLeave={(e) => e.target.style.background = C}
          >
            Book Your Demo →
          </button>
        </motion.div>
      </div>

      <style>{`
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          section {
            padding: 48px 0 56px !important;
          }
          
          section > div {
            padding: 0 20px !important;
          }
          
          section > div > div:first-child {
            margin-bottom: 40px !important;
          }
          
          section > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          
          section > div > div:nth-child(2) > div {
            padding: 20px 16px !important;
          }
          
          section > div > div:last-child {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
