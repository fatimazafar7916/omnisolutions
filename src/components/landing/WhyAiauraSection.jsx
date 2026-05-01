import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Colors ── */
const C = "#7B74DC";
const CL = "#F5F3FF";
const GR = "#6E6D7A";

/* ── Why Aiaura Data - Clean Split Layout ── */
const MAIN_REASONS = [
  {
    id: "industry-built",
    title: "Built Exclusively for Car Rentals",
    description: "Not a generic chatbot. Every AI employee understands rental terminology, insurance requirements, mileage policies, and seasonal pricing strategies.",
    highlight: "50,000+ rental conversations trained",
    color: "#7B74DC"
  },
  {
    id: "fast-deployment", 
    title: "Live in 14 Days, Not Months",
    description: "While competitors take 6+ months to configure, we deploy your complete AI workforce in 2 weeks with pre-built integrations and zero technical setup.",
    highlight: "14-day guaranteed deployment",
    color: "#F59E0B"
  },
  {
    id: "proven-results",
    title: "Guaranteed 3.2x Revenue Increase",
    description: "Our operators see an average 320% increase in after-hours bookings within 60 days. Real data from 47 US rental companies with money-back guarantee.",
    highlight: "320% average revenue boost",
    color: "#10B981"
  }
];

const TRUST_POINTS = [
  "47 US rental companies trust Aiaura",
  "SOC 2 certified enterprise security", 
  "100% US-based data and support team",
  "24/7 system monitoring and uptime",
  "Transparent pricing with no hidden fees",
  "Human backup always available"
];

/* ── Clean Reason Card ── */
function ReasonCard({ reason, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 20,
        padding: "32px 28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered 
          ? "0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(123,116,220,0.1)"
          : "0 4px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Subtle top accent */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 2,
        background: reason.color,
        opacity: isHovered ? 1 : 0.3,
        transition: "opacity 0.4s ease",
      }} />

      {/* Content */}
      <div>
        <h3 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 700,
          fontSize: "clamp(18px,2vw,24px)",
          color: "#111827",
          letterSpacing: "-0.025em",
          margin: "0 0 16px",
          lineHeight: 1.3,
        }}>
          {reason.title}
        </h3>

        <p style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "clamp(14px,1.4vw,16px)",
          color: "#6B7280",
          lineHeight: 1.6,
          margin: "0 0 20px",
        }}>
          {reason.description}
        </p>

        {/* Highlight badge */}
        <div style={{
          display: "inline-block",
          background: `${reason.color}10`,
          border: `1px solid ${reason.color}30`,
          borderRadius: 8,
          padding: "8px 16px",
        }}>
          <span style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: reason.color,
          }}>
            {reason.highlight}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Trust List Item ── */
function TrustItem({ text, index, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 0",
      }}
    >
      <div style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: C,
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 15,
        color: "#374151",
        lineHeight: 1.5,
      }}>
        {text}
      </span>
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
        background: "#FAFBFC",
        padding: "80px 0 88px",
        fontFamily: "'DM Sans',system-ui,sans-serif",
        position: "relative",
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 40px",
        position: "relative",
      }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center",
            marginBottom: 72,
            maxWidth: 800,
            margin: "0 auto 72px",
          }}
        >
          <div style={{
            display: "inline-block",
            background: CL,
            border: `1px solid ${C}20`,
            borderRadius: 20,
            padding: "6px 18px",
            marginBottom: 24,
          }}>
            <span style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: C,
            }}>
              Why Choose Aiaura
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px,5vw,52px)",
            color: "#111827",
            letterSpacing: "-0.03em",
            margin: "0 0 20px",
            lineHeight: 1.1,
          }}>
            While others promise,<br />
            <span style={{ color: C }}>we deliver results</span>
          </h2>

          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "clamp(16px,1.8vw,20px)",
            color: "#6B7280",
            lineHeight: 1.6,
            margin: 0,
          }}>
            47 US rental companies chose Aiaura over generic AI tools.<br />
            Here's why our system works when others fail.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: 64,
          alignItems: "start",
        }}>
          {/* Left: Main Reasons */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}>
            {MAIN_REASONS.map((reason, index) => (
              <ReasonCard
                key={reason.id}
                reason={reason}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Right: Trust & CTA */}
          <div style={{
            position: "sticky",
            top: 40,
          }}>
            {/* Trust Points */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              style={{
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "28px 24px",
                marginBottom: 24,
              }}
            >
              <h3 style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#111827",
                margin: "0 0 20px",
              }}>
                Trusted nationwide
              </h3>
              
              <div>
                {TRUST_POINTS.map((point, index) => (
                  <TrustItem
                    key={index}
                    text={point}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              style={{
                background: "linear-gradient(135deg, #7B74DC, #6366F1)",
                borderRadius: 16,
                padding: "32px 28px",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <h3 style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontWeight: 700,
                fontSize: 20,
                margin: "0 0 12px",
                color: "#fff",
              }}>
                See the difference
              </h3>
              
              <p style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                opacity: 0.9,
                margin: "0 0 24px",
                lineHeight: 1.5,
              }}>
                Book a 15-minute demo and see your exact revenue opportunity calculated live.
              </p>
              
              <button style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: C,
                background: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "14px 28px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
              >
                Book Your Demo →
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        /* Mobile Responsive */
        @media (max-width: 1024px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          section > div > div:last-child > div:last-child {
            position: static !important;
          }
        }
        
        @media (max-width: 768px) {
          section {
            padding: 60px 0 68px !important;
          }
          
          section > div {
            padding: 0 24px !important;
          }
          
          section > div > div:first-child {
            margin-bottom: 48px !important;
          }
          
          section > div > div:last-child {
            gap: 32px !important;
          }
          
          section > div > div:last-child > div:first-child > div {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}