import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Colors ── */
const C = "#7B74DC";
const CL = "#F5F3FF";
const GR = "#6E6D7A";

/* ── Why Aiaura Data - Split Screen Design ── */
const MAIN_BENEFITS = [
  {
    id: "revenue-guarantee",
    title: "3.2x Revenue Increase",
    subtitle: "Guaranteed in 60 days",
    description: "Average 320% boost in after-hours bookings. Real data from 47 US rental companies. 100% money-back guarantee if you don't see results.",
    stat: "320%",
    statLabel: "Revenue Increase",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981, #059669)"
  },
  {
    id: "speed-deployment", 
    title: "Live in 14 Days",
    subtitle: "Not 6 months like competitors",
    description: "Pre-built for rental industry. Voice cloning, software integrations, and AI training completed in 2 weeks. Zero technical setup required.",
    stat: "14",
    statLabel: "Days to Deploy",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)"
  },
  {
    id: "industry-specific",
    title: "Built for Car Rentals Only",
    subtitle: "Not a generic chatbot",
    description: "Understands insurance, mileage policies, seasonal pricing, fleet management. Trained on 50,000+ real rental conversations.",
    stat: "50K+",
    statLabel: "Training Conversations",
    color: "#7B74DC",
    gradient: "linear-gradient(135deg, #7B74DC, #6366F1)"
  }
];

const TRUST_INDICATORS = [
  { icon: "★", label: "47 US Companies", value: "Trust Aiaura" },
  { icon: "⚡", label: "SOC 2 Certified", value: "Enterprise Security" },
  { icon: "◉", label: "100% US-Based", value: "Data & Support" },
  { icon: "●", label: "24/7 Monitoring", value: "Never Goes Down" },
  { icon: "▲", label: "Transparent Pricing", value: "No Hidden Fees" },
  { icon: "◆", label: "Human Backup", value: "Always Available" }
];

/* ── Hero Benefit Card ── */
function HeroBenefitCard({ benefit, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid #E3E2EB",
        borderRadius: 20,
        padding: "32px 28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.4s ease",
        transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: isHovered 
          ? `0 20px 40px rgba(123,116,220,0.15), 0 0 0 1px ${benefit.color}20`
          : "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "100%",
          background: benefit.gradient,
          opacity: isHovered ? 0.05 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Top accent */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 4,
        background: benefit.gradient,
        borderRadius: "20px 20px 0 0",
      }} />

      {/* Large stat display */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <motion.div
          style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(48px,6vw,72px)",
            background: benefit.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            marginBottom: 8,
          }}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {benefit.stat}
        </motion.div>
        <div style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 12,
          fontWeight: 600,
          color: benefit.color,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}>
          {benefit.statLabel}
        </div>
      </div>

      {/* Content */}
      <div style={{ textAlign: "center" }}>
        <h3 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 800,
          fontSize: "clamp(20px,2.2vw,26px)",
          color: "#141419",
          letterSpacing: "-0.03em",
          margin: "0 0 8px",
          lineHeight: 1.2,
        }}>
          {benefit.title}
        </h3>
        
        <div style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: benefit.color,
          marginBottom: 16,
        }}>
          {benefit.subtitle}
        </div>

        <p style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "clamp(13px,1.3vw,15px)",
          color: GR,
          lineHeight: 1.6,
          margin: 0,
        }}>
          {benefit.description}
        </p>
      </div>

      {/* Hover glow effect */}
      <motion.div
        style={{
          position: "absolute",
          bottom: -2, left: -2, right: -2,
          height: 2,
          background: benefit.gradient,
          borderRadius: "0 0 20px 20px",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />
    </motion.div>
  );
}

/* ── Trust Indicator ── */
function TrustIndicator({ indicator, index, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#fff",
        border: "1px solid #E3E2EB",
        borderRadius: 12,
        padding: "16px 20px",
        transition: "all 0.3s ease",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 16px rgba(123,116,220,0.1)",
      }}
    >
      <div style={{
        fontSize: 20,
        width: 32,
        textAlign: "center",
      }}>
        {indicator.icon}
      </div>
      <div>
        <div style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 11,
          fontWeight: 600,
          color: GR,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 2,
        }}>
          {indicator.label}
        </div>
        <div style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: "#141419",
          letterSpacing: "-0.02em",
        }}>
          {indicator.value}
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
        background: "linear-gradient(180deg, #FCFCFE 0%, #F8F9FF 100%)",
        borderTop: "1px solid #E3E2EB",
        padding: "80px 0 88px",
        fontFamily: "'DM Sans',system-ui,sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "-10%",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(123,116,220,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "-5%",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 36px",
        position: "relative",
      }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center",
            marginBottom: 64,
          }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(135deg, rgba(123,116,220,0.1), rgba(16,185,129,0.1))",
            border: "1px solid rgba(123,116,220,0.3)",
            borderRadius: 30,
            padding: "8px 20px",
            marginBottom: 20,
          }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7B74DC, #10B981)",
              display: "inline-block"
            }} />
            <span style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #7B74DC, #10B981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Why Choose Aiaura
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(32px,5vw,56px)",
            color: "#141419",
            letterSpacing: "-0.04em",
            margin: "0 0 16px",
            lineHeight: 1.05,
          }}>
            While others promise,<br />
            <span style={{
              background: "linear-gradient(135deg, #7B74DC, #10B981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              we deliver results.
            </span>
          </h2>

          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "clamp(15px,1.6vw,18px)",
            color: GR,
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            47 US rental companies chose Aiaura over generic AI tools. Here's why our system works when others fail.
          </p>
        </motion.div>

        {/* Main Benefits - Large Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 32,
          marginBottom: 64,
        }}>
          {MAIN_BENEFITS.map((benefit, index) => (
            <HeroBenefitCard
              key={benefit.id}
              benefit={benefit}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Trust Indicators Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{
            marginBottom: 48,
          }}
        >
          <h3 style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(20px,2.5vw,28px)",
            color: "#141419",
            letterSpacing: "-0.03em",
            textAlign: "center",
            margin: "0 0 32px",
          }}>
            Trusted by rental operators nationwide
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}>
            {TRUST_INDICATORS.map((indicator, index) => (
              <TrustIndicator
                key={indicator.label}
                indicator={indicator}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA - Enhanced */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
          style={{
            textAlign: "center",
            padding: "40px 32px",
            background: "linear-gradient(135deg, rgba(123,116,220,0.1), rgba(16,185,129,0.08))",
            border: "1px solid rgba(123,116,220,0.2)",
            borderRadius: 24,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated background */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            animation: "shimmer 3s ease-in-out infinite",
          }} />
          
          <h3 style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(22px,2.8vw,32px)",
            color: "#141419",
            letterSpacing: "-0.03em",
            margin: "0 0 12px",
            position: "relative",
          }}>
            Ready to see the Aiaura difference?
          </h3>
          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 16,
            color: GR,
            margin: "0 0 24px",
            position: "relative",
          }}>
            Book a 15-minute demo and see your exact revenue opportunity calculated live.
          </p>
          <button style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #7B74DC, #6366F1)",
            border: "none",
            borderRadius: 12,
            padding: "16px 32px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            position: "relative",
            boxShadow: "0 4px 12px rgba(123,116,220,0.3)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 20px rgba(123,116,220,0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(123,116,220,0.3)";
          }}
          >
            Book Your Revenue Demo →
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          section {
            padding: 60px 0 68px !important;
          }
          
          section > div {
            padding: 0 20px !important;
          }
          
          section > div > div:first-child {
            margin-bottom: 48px !important;
          }
          
          section > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-bottom: 48px !important;
          }
          
          section > div > div:nth-child(2) > div {
            padding: 24px 20px !important;
          }
          
          section > div > div:nth-child(3) > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          
          section > div > div:last-child {
            padding: 28px 24px !important;
          }
        }
        
        @media (max-width: 480px) {
          section > div > div:nth-child(3) > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
