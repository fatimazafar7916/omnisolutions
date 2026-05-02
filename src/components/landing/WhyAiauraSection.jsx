import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Colors ── */
const C = "#22C55E";
const GR = "#6E6D7A";

/* ── Hero Split Content ── */
const HERO_CONTENT = {
  left: {
    badge: "Why Aiaura Wins",
    title: "Others promise help,",
    titleAccent: "we give you real results",
    subtitle: "15+ US car rental owners chose Aiaura over simple AI tools. Here is the proof.",
    stats: [
      { number: "285%", label: "More Money Made", sublabel: "Average in 90 days" },
      { number: "14", label: "Days to Start", sublabel: "Ready in 2 weeks" },
      { number: "15+", label: "US Owners", sublabel: "Already trust us" }
    ]
  },
  right: {
    reasons: [
      {
        number: "01",
        title: "Built only for car rentals",
        description: "This is not a simple chat tool. Our AI knows how to talk to rental customers about insurance, mileage, and prices.",
        highlight: "AI that knows rentals"
      },
      {
        number: "02", 
        title: "Results or your money back",
        description: "Our customers see a 285% jump in money made within 90 days. We give you your money back if you don't see results.",
        highlight: "No-Risk Promise"
      },
      {
        number: "03",
        title: "Ready in 14 days or less",
        description: "Connects to your tools instantly with no technical work for you. While others take months, we start in just 14 days.",
        highlight: "Very fast setup"
      }
    ]
  }
};

const TRUST_PROOF = [
  "15+ US car rental owners trust Aiaura",
  "Safe and secure for your business", 
  "100% US-based support team", 
  "Works all the time, day and night",
  "Clear prices with no hidden costs",
  "Real people always here to help"
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
        textAlign: "center",
        position: "relative",
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(16px, 2.5vw, 22px)",
          background: "var(--brand-gradient)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
          marginBottom: 2,
          lineHeight: 1.1,
        }}>
          {stat.number.includes('%') ? `${count}%` : count}{stat.number.includes('+') ? '+' : ''}
        </div>
        <div style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "clamp(10px, 1.5vw, 11px)",
          fontWeight: 600,
          color: "#111827",
          marginBottom: 1,
          whiteSpace: "nowrap",
        }}>
          {stat.label}
        </div>
        <div style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "clamp(9px, 1.2vw, 10px)",
          color: GR,
          whiteSpace: "nowrap",
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
        borderRadius: 14,
        padding: "18px 16px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateX(-4px)" : "translateX(0)",
        boxShadow: isHovered 
          ? "0 8px 24px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Animated side accent */}
      <motion.div
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: isHovered ? 4 : 2,
          background: "var(--brand-gradient)",
          borderRadius: "0 2px 2px 0",
          transition: "width 0.3s ease",
          opacity: 0.6,
        }}
      />

      {/* Number badge */}
      <div style={{
        position: "absolute",
        top: 16,
        right: 16,
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: `${C}10`,
        border: `1px solid ${C}20`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: 11,
          fontWeight: 700,
          color: C,
        }}>
          {reason.number}
        </span>
      </div>

      <div style={{ paddingRight: 44 }}>
        <h3 style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(14px,1.5vw,16px)",
          color: "#111827",
          letterSpacing: "-0.01em",
          margin: "0 0 8px",
          lineHeight: 1.3,
        }}>
          {reason.title}
        </h3>

        <p style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "clamp(12px,1.1vw,13px)",
          color: "#6B7280",
          lineHeight: 1.55,
          margin: "0 0 12px",
        }}>
          {reason.description}
        </p>

        {/* Highlight badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: `${C}08`,
          border: `1px solid ${C}20`,
          borderRadius: 8,
          padding: "4px 10px",
        }}>
          <div style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: C,
          }} />
          <span style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
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
        gap: 10,
        padding: "6px 0",
      }}
    >
      <div style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "var(--brand-gradient)",
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 14,
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
        padding: "64px 0 72px",
        fontFamily: "'DM Sans',system-ui,sans-serif",
        position: "relative",
        overflow: "hidden",
        scrollMarginTop: "80px",
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
        background: `radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)`,
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

      <div className="section-container">
        {/* Hero Split Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
          marginBottom: 48,
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
              borderRadius: 20,
              padding: "6px 16px",
              marginBottom: 24,
            }}>
              <span style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: C,
              }}>
                {HERO_CONTENT.left.badge}
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px,4vw,48px)",
              color: "#111827",
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
              lineHeight: 1.15,
            }}>
              {HERO_CONTENT.left.title}<br />
              <span style={{
                background: "var(--brand-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {HERO_CONTENT.left.titleAccent}
              </span>
            </h1>

            <p style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(14px,1.3vw,16px)",
              color: "#6B7280",
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}>
              {HERO_CONTENT.left.subtitle}
            </p>

            {/* Stats Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
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
            gap: 12,
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
          gridTemplateColumns: "1fr 360px",
          gap: 40,
          alignItems: "start",
        }}>
          {/* Trust Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <h3 style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(20px,2.5vw,28px)",
              color: "#111827",
              margin: "0 0 20px",
              letterSpacing: "-0.01em",
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
              borderRadius: 16,
              padding: "28px 24px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Animated background pattern */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              background: `linear-gradient(135deg, rgba(34,197,94,0.20), transparent)`,
              opacity: 0.1,
            }} />
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 700,
                fontSize: 20,
                margin: "0 0 10px",
                color: "#fff",
                letterSpacing: "-0.01em",
              }}>
                Ready to see the proof?
              </h3>
              
              <p style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.8)",
                margin: "0 0 24px",
                lineHeight: 1.5,
              }}>
                Book a 15-minute demo and see your exact revenue opportunity calculated live.
              </p>
              
              <button style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                background: "var(--brand-gradient)",
                border: "none",
                borderRadius: 10,
                padding: "14px 28px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: "100%",
                boxShadow: "0 4px 16px rgba(34,197,94,0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 24px rgba(34,197,94,0.4)";
                e.target.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 16px rgba(34,197,94,0.3)";
                e.target.style.filter = "brightness(1)";
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
          /* Standardized to global container */
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
            /* Standardized */
          }
          
          section > div {
            /* Standardized */
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
            /* Standardized */
          }
          
          section > div {
            /* Standardized */
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
          
          /* Stats grid mobile - 3 columns in one line */
          section > div > div:first-child > div:first-child > div:last-child {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: clamp(8px, 2vw, 12px) !important;
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
          
          /* Stats mobile - keep in one line, don't stack */
          section > div > div:first-child > div:first-child > div:last-child {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: clamp(6px, 1.5vw, 10px) !important;
            max-width: 100% !important;
            margin: 0 !important;
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
          
          /* Stats - even more compact, stay in one line */
          section > div > div:first-child > div:first-child > div:last-child > div {
            padding: 0 !important;
          }
          
          section > div > div:first-child > div:first-child > div:last-child > div > div:last-child > div:first-child {
            font-size: clamp(14px, 4vw, 18px) !important;
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