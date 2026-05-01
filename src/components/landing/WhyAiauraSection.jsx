import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Colors ── */
const C = "#7B74DC";
const GR = "#6E6D7A";

/* ── Hero Split Content ── */
const HERO_CONTENT = {
  left: {
    badge: "Why Aiaura Wins",
    title: "While competitors sell promises,",
    titleAccent: "we deliver guaranteed results",
    subtitle: "15+ US rental companies chose Aiaura over generic AI tools. Here's the proof.",
    stats: [
      { number: "285%", label: "Revenue Increase", sublabel: "Average in 90 days" },
      { number: "14", label: "Days to Deploy", sublabel: "Not 6+ months" },
      { number: "15+", label: "US Companies", sublabel: "Already trust us" }
    ]
  },
  right: {
    reasons: [
      {
        number: "01",
        title: "Built for Car Rentals Only",
        description: "Not a generic chatbot. Trained on 25,000+ real rental conversations. Understands insurance, mileage policies, seasonal pricing.",
        highlight: "Industry-Specific AI"
      },
      {
        number: "02", 
        title: "Guaranteed Results or Refund",
        description: "285% average revenue increase within 90 days. Real data from 15+ companies. 100% money-back guarantee if you don't see results.",
        highlight: "Risk-Free Promise"
      },
      {
        number: "03",
        title: "Live in 14 Days Maximum",
        description: "Pre-built integrations, instant voice cloning, zero technical setup. While competitors take months, we deploy in 14 days.",
        highlight: "Lightning Fast Setup"
      }
    ]
  }
};

const TRUST_PROOF = [
  "15+ US rental companies trust Aiaura",
  "SOC 2 certified enterprise security", 
  "100% US-based data and support team", 
  "24/7 monitoring with 99.9% uptime",
  "Transparent pricing, no hidden fees",
  "Human backup always available"
];

/* ── Animated Stats Card ── */
function StatCard({ stat, index, isVisible }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      const target = parseInt(stat.number);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, stat.number]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: 20,
        padding: "24px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background glow */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: `linear-gradient(135deg, ${C}10, transparent)`,
        opacity: 0.5,
      }} />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 900,
          fontSize: "clamp(28px,4vw,36px)",
          background: `linear-gradient(135deg, ${C}, #6366F1)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
          marginBottom: 4,
        }}>
          {stat.number.includes('%') ? `${count}%` : count}{stat.number.includes('+') ? '+' : ''}
        </div>
        <div style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: "#111827",
          marginBottom: 2,
        }}>
          {stat.label}
        </div>
        <div style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 11,
          color: GR,
        }}>
          {stat.sublabel}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Reason Card with Advanced Animation ── */
function ReasonCard({ reason, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.8, delay: 0.8 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 24,
        padding: "32px 28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: isHovered ? "translateX(-8px) scale(1.02)" : "translateX(0) scale(1)",
        boxShadow: isHovered 
          ? "0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(123,116,220,0.2)"
          : "0 8px 25px rgba(0,0,0,0.08)",
      }}
    >
      {/* Animated side accent */}
      <motion.div
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: isHovered ? 4 : 2,
          background: `linear-gradient(180deg, ${C}, #6366F1)`,
          borderRadius: "0 2px 2px 0",
          transition: "width 0.3s ease",
          opacity: 0.6,
        }}
      />

      {/* Number badge */}
      <div style={{
        position: "absolute",
        top: 24,
        right: 24,
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${C}15, ${C}05)`,
        border: `2px solid ${C}20`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
      }}>
        <span style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: 16,
          fontWeight: 800,
          color: C,
        }}>
          {reason.number}
        </span>
      </div>

      <div style={{ paddingRight: 60 }}>
        <h3 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 800,
          fontSize: "clamp(20px,2.2vw,26px)",
          color: "#111827",
          letterSpacing: "-0.025em",
          margin: "0 0 16px",
          lineHeight: 1.2,
        }}>
          {reason.title}
        </h3>

        <p style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "clamp(15px,1.5vw,17px)",
          color: "#6B7280",
          lineHeight: 1.6,
          margin: "0 0 20px",
        }}>
          {reason.description}
        </p>

        {/* Highlight badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: `linear-gradient(135deg, ${C}08, ${C}03)`,
          border: `1px solid ${C}20`,
          borderRadius: 12,
          padding: "10px 16px",
        }}>
          <div style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C,
          }} />
          <span style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: C,
          }}>
            {reason.highlight}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Trust Point ── */
function TrustPoint({ text, index, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: 2.0 + index * 0.1 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 0",
      }}
    >
      <div style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${C}, #6366F1)`,
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

/* ── Main Component ── */
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #FAFBFC 0%, #F3F4F6 100%)",
        padding: "100px 0 120px",
        fontFamily: "'DM Sans',system-ui,sans-serif",
        position: "relative",
        overflow: "hidden",
        scrollMarginTop: "80px", // Account for fixed navbar
      }}
    >
      {/* Animated background elements */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "-20%",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${C}08 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "20%",
        right: "-15%",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 40px",
        position: "relative",
      }}>
        {/* Hero Split Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          marginBottom: 80,
        }}>
          {/* Left: Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              display: "inline-block",
              background: `linear-gradient(135deg, ${C}15, ${C}08)`,
              border: `1px solid ${C}30`,
              borderRadius: 25,
              padding: "8px 20px",
              marginBottom: 32,
            }}>
              <span style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: C,
              }}>
                {HERO_CONTENT.left.badge}
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px,5.5vw,64px)",
              color: "#111827",
              letterSpacing: "-0.04em",
              margin: "0 0 16px",
              lineHeight: 1.05,
            }}>
              {HERO_CONTENT.left.title}<br />
              <span style={{
                background: `linear-gradient(135deg, ${C}, #6366F1)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {HERO_CONTENT.left.titleAccent}
              </span>
            </h1>

            <p style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(18px,2vw,22px)",
              color: "#6B7280",
              lineHeight: 1.6,
              margin: "0 0 40px",
            }}>
              {HERO_CONTENT.left.subtitle}
            </p>

            {/* Stats Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}>
              {HERO_CONTENT.left.stats.map((stat, index) => (
                <StatCard
                  key={index}
                  stat={stat}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Reasons */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}>
            {HERO_CONTENT.right.reasons.map((reason, index) => (
              <ReasonCard
                key={reason.number}
                reason={reason}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section: Trust + CTA */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: 60,
          alignItems: "start",
        }}>
          {/* Trust Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <h3 style={{
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px,3vw,32px)",
              color: "#111827",
              margin: "0 0 24px",
            }}>
              Trusted by 15+ rental operators nationwide
            </h3>
            
            <div>
              {TRUST_PROOF.map((point, index) => (
                <TrustPoint
                  key={index}
                  text={point}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </motion.div>

          {/* Enhanced CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.2 }}
            style={{
              background: "linear-gradient(135deg, #111827, #1F2937)",
              borderRadius: 24,
              padding: "40px 32px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Animated background pattern */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              background: `linear-gradient(135deg, ${C}20, transparent)`,
              opacity: 0.1,
            }} />
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontWeight: 800,
                fontSize: 24,
                margin: "0 0 12px",
                color: "#fff",
              }}>
                Ready to see the proof?
              </h3>
              
              <p style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.8)",
                margin: "0 0 28px",
                lineHeight: 1.5,
              }}>
                Book a 15-minute demo and see your exact revenue opportunity calculated live.
              </p>
              
              <button style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#111827",
                background: "linear-gradient(135deg, #fff, #F9FAFB)",
                border: "none",
                borderRadius: 12,
                padding: "16px 32px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: "100%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
              >
                Book Your Revenue Demo →
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* Mobile Responsive - 100% Optimized */
        
        /* Large Desktop */
        @media (min-width: 1400px) {
          section > div {
            max-width: 1500px !important;
          }
        }
        
        /* Desktop to Tablet */
        @media (max-width: 1200px) {
          section > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
          
          section > div > div:first-child > div:first-child {
            text-align: center !important;
          }
          
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        
        /* Tablet */
        @media (max-width: 1024px) {
          section {
            padding: 70px 0 80px !important;
          }
          
          section > div {
            padding: 0 32px !important;
          }
          
          section > div > div:first-child {
            gap: 40px !important;
            margin-bottom: 60px !important;
          }
          
          section > div > div:first-child > div:first-child h1 {
            font-size: clamp(32px,6vw,48px) !important;
          }
          
          section > div > div:first-child > div:first-child p {
            font-size: clamp(16px,2.5vw,20px) !important;
          }
        }
        
        /* Mobile Large */
        @media (max-width: 768px) {
          section {
            padding: 60px 0 70px !important;
          }
          
          section > div {
            padding: 0 20px !important;
          }
          
          section > div > div:first-child {
            gap: 32px !important;
            margin-bottom: 50px !important;
          }
          
          /* Hero content mobile */
          section > div > div:first-child > div:first-child > div:first-child {
            padding: 6px 16px !important;
            margin-bottom: 24px !important;
          }
          
          section > div > div:first-child > div:first-child h1 {
            font-size: clamp(28px,8vw,40px) !important;
            margin-bottom: 12px !important;
          }
          
          section > div > div:first-child > div:first-child p {
            font-size: clamp(15px,4vw,18px) !important;
            margin-bottom: 32px !important;
          }
          
          /* Stats grid mobile - 3 columns but smaller */
          section > div > div:first-child > div:first-child > div:last-child {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
          
          /* Reason cards mobile */
          section > div > div:first-child > div:last-child {
            gap: 16px !important;
          }
          
          section > div > div:first-child > div:last-child > div {
            padding: 24px 20px !important;
            border-radius: 16px !important;
            border: 1px solid #E5E7EB !important;
          }
          
          /* Make side accent more subtle on mobile */
          section > div > div:first-child > div:last-child > div > div:first-child {
            width: 2px !important;
            opacity: 0.4 !important;
          }
          
          section > div > div:first-child > div:last-child > div > div:first-child {
            top: 16px !important;
            right: 16px !important;
            width: 32px !important;
            height: 32px !important;
          }
          
          section > div > div:first-child > div:last-child > div > div:first-child span {
            font-size: 14px !important;
          }
          
          section > div > div:first-child > div:last-child > div > div:last-child {
            padding-right: 40px !important;
          }
          
          section > div > div:first-child > div:last-child > div h3 {
            font-size: clamp(16px,4vw,20px) !important;
            margin-bottom: 12px !important;
          }
          
          section > div > div:first-child > div:last-child > div p {
            font-size: clamp(13px,3.5vw,15px) !important;
            margin-bottom: 16px !important;
          }
          
          /* Bottom section mobile */
          section > div > div:last-child {
            gap: 32px !important;
          }
          
          section > div > div:last-child > div:first-child h3 {
            font-size: clamp(20px,5vw,26px) !important;
            margin-bottom: 20px !important;
          }
          
          section > div > div:last-child > div:last-child {
            padding: 32px 24px !important;
          }
        }
        
        /* Mobile Medium */
        @media (max-width: 640px) {
          section {
            padding: 50px 0 60px !important;
          }
          
          section > div {
            padding: 0 16px !important;
          }
          
          /* Stats mobile - stack vertically on very small screens */
          section > div > div:first-child > div:first-child > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            max-width: 280px !important;
            margin: 0 auto !important;
          }
          
          /* Reason cards - more compact with subtle borders */
          section > div > div:first-child > div:last-child > div {
            padding: 20px 16px !important;
            border: 1px solid #E5E7EB !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
          }
          
          /* Make side accent even more subtle */
          section > div > div:first-child > div:last-child > div > div:first-child {
            width: 1px !important;
            opacity: 0.3 !important;
          }
          
          section > div > div:first-child > div:last-child > div > div:last-child {
            padding-right: 36px !important;
          }
          
          section > div > div:first-child > div:last-child > div h3 {
            font-size: 16px !important;
          }
          
          section > div > div:first-child > div:last-child > div p {
            font-size: 13px !important;
          }
        }
        
        /* Mobile Small */
        @media (max-width: 480px) {
          section {
            padding: 40px 0 50px !important;
          }
          
          section > div {
            padding: 0 12px !important;
          }
          
          section > div > div:first-child > div:first-child h1 {
            font-size: clamp(24px,9vw,32px) !important;
            line-height: 1.1 !important;
          }
          
          section > div > div:first-child > div:first-child p {
            font-size: 14px !important;
            line-height: 1.5 !important;
          }
          
          /* Stats - even more compact */
          section > div > div:first-child > div:first-child > div:last-child > div {
            padding: 16px 12px !important;
          }
          
          section > div > div:first-child > div:first-child > div:last-child > div > div:last-child > div:first-child {
            font-size: clamp(20px,6vw,24px) !important;
          }
          
          /* Reason cards - ultra compact */
          section > div > div:first-child > div:last-child > div {
            padding: 16px 12px !important;
          }
          
          section > div > div:first-child > div:last-child > div > div:first-child {
            width: 28px !important;
            height: 28px !important;
            top: 12px !important;
            right: 12px !important;
          }
          
          section > div > div:first-child > div:last-child > div > div:first-child span {
            font-size: 12px !important;
          }
          
          section > div > div:first-child > div:last-child > div > div:last-child {
            padding-right: 32px !important;
          }
          
          section > div > div:first-child > div:last-child > div h3 {
            font-size: 14px !important;
            margin-bottom: 8px !important;
          }
          
          section > div > div:first-child > div:last-child > div p {
            font-size: 12px !important;
            margin-bottom: 12px !important;
          }
          
          section > div > div:first-child > div:last-child > div > div:last-child > div:last-child {
            padding: 8px 12px !important;
          }
          
          section > div > div:first-child > div:last-child > div > div:last-child > div:last-child span {
            font-size: 12px !important;
          }
          
          /* Trust section mobile */
          section > div > div:last-child > div:first-child h3 {
            font-size: 18px !important;
          }
          
          section > div > div:last-child > div:first-child > div > div {
            padding: 6px 0 !important;
          }
          
          section > div > div:last-child > div:first-child > div > div span {
            font-size: 13px !important;
          }
          
          /* CTA mobile */
          section > div > div:last-child > div:last-child {
            padding: 24px 16px !important;
          }
          
          section > div > div:last-child > div:last-child h3 {
            font-size: 18px !important;
          }
          
          section > div > div:last-child > div:last-child p {
            font-size: 14px !important;
            margin-bottom: 20px !important;
          }
          
          section > div > div:last-child > div:last-child button {
            font-size: 14px !important;
            padding: 14px 24px !important;
          }
        }
        
        /* Mobile Extra Small */
        @media (max-width: 360px) {
          section > div > div:first-child > div:first-child h1 {
            font-size: 22px !important;
          }
          
          section > div > div:first-child > div:first-child p {
            font-size: 13px !important;
          }
          
          section > div > div:first-child > div:last-child > div h3 {
            font-size: 13px !important;
          }
          
          section > div > div:first-child > div:last-child > div p {
            font-size: 11px !important;
          }
        }
        
        /* Landscape Mobile */
        @media (max-height: 500px) and (orientation: landscape) {
          section {
            padding: 30px 0 40px !important;
          }
          
          section > div > div:first-child {
            margin-bottom: 30px !important;
          }
          
          section > div > div:first-child > div:first-child h1 {
            margin-bottom: 8px !important;
          }
          
          section > div > div:first-child > div:first-child p {
            margin-bottom: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}