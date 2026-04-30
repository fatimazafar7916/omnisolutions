import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle, Phone, MessageCircle, Star, Send, Heart, Users } from "lucide-react";
import AgentOrbit from "./AgentOrbit";

const TRUST = ["No long-term contract", "Live in 14 days", "14-day refund", "Bank-level security", "24/7 US support", "Works with existing systems"];

// AI Activity Animation Data
const AI_ACTIVITIES = [
  {
    id: 1,
    icon: Phone,
    title: "Incoming Call",
    subtitle: "Answering in 0.8s",
    color: "#2A9D8F",
    bgColor: "rgba(42, 157, 143, 0.1)",
    detail: "Premium Rental Inquiry"
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Instagram DM",
    subtitle: "Reply sent instantly",
    color: "#E1306C",
    bgColor: "rgba(225, 48, 108, 0.1)",
    detail: "Booking confirmation"
  },
  {
    id: 3,
    icon: Star,
    title: "Google Review",
    subtitle: "5-star response posted",
    color: "#FFA500",
    bgColor: "rgba(255, 165, 0, 0.1)",
    detail: "Thank you message"
  },
  {
    id: 4,
    icon: Send,
    title: "Follow-up Sent",
    subtitle: "Booking reminder",
    color: "#7B74DC",
    bgColor: "rgba(123, 116, 220, 0.1)",
    detail: "Pickup details shared"
  },
  {
    id: 5,
    icon: Heart,
    title: "VIP Client",
    subtitle: "Birthday wish sent",
    color: "#FF6B6B",
    bgColor: "rgba(255, 107, 107, 0.1)",
    detail: "Personal touch added"
  }
];

// Compact Animated Stats Strip Component
const AnimatedStatsStrip = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [animatedValues, setAnimatedValues] = useState({
    callsAnswered: 1,
    coverage: 1,
    languages: 1,
    leadsLost: 1
  });

  const stats = [
    {
      id: 'calls',
      label: 'Calls Answered',
      value: 100,
      suffix: '%',
      color: '#2A9D8F',
      subtext: 'Response Time: 2 seconds'
    },
    {
      id: 'coverage',
      label: '24/7 Coverage',
      value: 100,
      suffix: '%',
      color: '#7B74DC',
      subtext: 'Always available'
    },
    {
      id: 'languages',
      label: 'Languages',
      value: 22,
      suffix: '+',
      color: '#FF6B6B',
      subtext: 'Global communication'
    },
    {
      id: 'leads',
      label: 'Leads Missed',
      value: 0,
      suffix: '%',
      color: '#2A9D8F',
      subtext: 'Zero missed opportunities'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentStatData = stats[currentStat];
    const duration = 1200;
    const steps = 50;
    const increment = currentStatData.value / steps;
    let step = 0;

    const animateValue = () => {
      if (step <= steps) {
        const currentValue = Math.min(increment * step, currentStatData.value);
        setAnimatedValues(prev => ({
          ...prev,
          [currentStatData.id === 'calls' ? 'callsAnswered' : 
           currentStatData.id === 'coverage' ? 'coverage' :
           currentStatData.id === 'languages' ? 'languages' : 'leadsLost']: currentValue
        }));
        step++;
        setTimeout(animateValue, duration / steps);
      }
    };

    // Reset and start animation
    setAnimatedValues(prev => ({
      ...prev,
      [currentStatData.id === 'calls' ? 'callsAnswered' : 
       currentStatData.id === 'coverage' ? 'coverage' :
       currentStatData.id === 'languages' ? 'languages' : 'leadsLost']: 1
    }));
    
    setTimeout(animateValue, 100);
  }, [currentStat]);

  const currentStatData = stats[currentStat];
  const currentValue = currentStatData.id === 'calls' ? animatedValues.callsAnswered :
                      currentStatData.id === 'coverage' ? animatedValues.coverage :
                      currentStatData.id === 'languages' ? animatedValues.languages :
                      animatedValues.leadsLost;

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      {/* Compact Stats Display */}
      <motion.div
        key={currentStat}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              `linear-gradient(135deg, ${currentStatData.color}15 0%, rgba(255,255,255,0.1) 100%)`,
              `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, ${currentStatData.color}15 100%)`,
              `linear-gradient(135deg, ${currentStatData.color}15 0%, rgba(255,255,255,0.1) 100%)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            opacity: 0.6
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Animated Number */}
          <motion.div
            style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              color: currentValue >= currentStatData.value ? '#2A9D8F' : currentStatData.color,
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}
          >
            {Math.round(currentValue)}{currentStatData.suffix}
          </motion.div>

          {/* Label */}
          <h4 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(14px, 3vw, 16px)',
            color: '#141419',
            margin: '0 0 4px',
            letterSpacing: '-0.01em'
          }}>
            {currentStatData.label}
          </h4>

          {/* Subtext */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(11px, 2.5vw, 12px)',
            color: '#6E6D7A',
            margin: 0,
            fontWeight: 500
          }}>
            {currentStatData.subtext}
          </p>

          {/* Success Indicator */}
          {currentValue >= currentStatData.value && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#2A9D8F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckCircle size={12} color="white" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats Progress Indicators */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '12px'
      }}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            animate={{
              scale: currentStat === index ? 1.2 : 1,
              opacity: currentStat === index ? 1 : 0.4,
              backgroundColor: currentStat === index ? stat.color : '#E5E7EB'
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};
// Minimal AI Activity Component - Clean Card Design
const AIActivityDisplay = () => {
  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % AI_ACTIVITIES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const activity = AI_ACTIVITIES[currentActivity];
  const IconComponent = activity.icon;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '420px',
      height: '380px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Main Activity Card - Minimal Design */}
      <motion.div
        key={currentActivity}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4,
          ease: "easeOut"
        }}
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '32px 24px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          textAlign: 'center',
          width: '280px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Background Accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${activity.color} 0%, ${activity.color}80 100%)`,
            borderRadius: '20px 20px 0 0'
          }}
        />
        
        {/* Icon - Minimal Style */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: `${activity.color}10`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            border: `1px solid ${activity.color}20`
          }}
        >
          <IconComponent size={24} color={activity.color} />
        </motion.div>

        {/* Content */}
        <div>
          <h3 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: '18px',
            color: '#1F2937',
            margin: '0 0 8px',
            letterSpacing: '-0.01em'
          }}>
            {activity.title}
          </h3>
          
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            color: activity.color,
            fontWeight: 500,
            margin: '0 0 12px'
          }}>
            {activity.subtitle}
          </p>
          
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            color: '#6B7280',
            margin: 0,
            lineHeight: 1.4
          }}>
            {activity.detail}
          </p>
        </div>
      </motion.div>

      {/* Minimal Activity Indicators - Floating */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '8px 16px',
        borderRadius: '20px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.04)'
      }}>
        {AI_ACTIVITIES.map((activityItem, index) => {
          const IconComp = activityItem.icon;
          return (
            <motion.div
              key={activityItem.id}
              animate={{
                scale: currentActivity === index ? 1.1 : 1,
                opacity: currentActivity === index ? 1 : 0.4
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: currentActivity === index 
                  ? `${activityItem.color}15` 
                  : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: currentActivity === index 
                  ? `1px solid ${activityItem.color}30` 
                  : '1px solid transparent'
              }}
            >
              <IconComp 
                size={16} 
                color={currentActivity === index ? activityItem.color : '#9CA3AF'} 
              />
            </motion.div>
          );
        })}
      </div>

      {/* "All AI agents working together" - Minimal Badge */}
      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '11px',
          color: '#7B74DC',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          background: 'rgba(123, 116, 220, 0.08)',
          padding: '6px 12px',
          borderRadius: '16px',
          border: '1px solid rgba(123, 116, 220, 0.15)',
          whiteSpace: 'nowrap'
        }}
      >
        <Users size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
        All AI agents working together
      </motion.div>

      {/* Subtle Corner Decorations */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${AI_ACTIVITIES[currentActivity]?.color}08 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '60px',
        left: '40px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${AI_ACTIVITIES[(currentActivity + 2) % AI_ACTIVITIES.length]?.color}06 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        background: "#FCFCFE",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: 68,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Enhanced gradient overlay - No background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: `
            linear-gradient(135deg, 
              rgba(252,252,254,0.95) 0%, 
              rgba(245,243,255,0.85) 30%, 
              rgba(252,252,254,0.95) 60%,
              rgba(245,243,255,0.95) 100%
            )
          `,
        }}
      />

      {/* Enhanced decorative elements with responsive sizing */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "clamp(300px, 55vw, 800px)",
          height: "clamp(300px, 55vw, 800px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,243,255,0.6) 0%, rgba(245,243,255,0) 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      
      {/* Additional decorative circle for depth */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-15%",
          width: "clamp(200px, 40vw, 600px)",
          height: "clamp(200px, 40vw, 600px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,116,220,0.1) 0%, rgba(123,116,220,0) 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 24px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(32px, 6vw, 48px)",
            maxWidth: "1400px",
            margin: "0 auto"
          }}
          className="hero-grid"
        >
          {/* Left Content - Enhanced Responsive */}
          <div style={{ 
            maxWidth: "680px",
            margin: "0 auto",
          }}>
            {/* Live badge - Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                borderRadius: 100,
                border: "1px solid rgba(42,157,143,0.25)",
                background: "rgba(42,157,143,0.08)",
                marginBottom: 28,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Animated background */}
              <motion.div
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(42,157,143,0.1) 50%, transparent 100%)',
                  width: '200%'
                }}
              />
              
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(42,157,143,0.4)",
                    "0 0 0 8px rgba(42,157,143,0)",
                    "0 0 0 0 rgba(42,157,143,0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#2A9D8F",
                  position: 'relative',
                  zIndex: 2
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#2A9D8F",
                  position: 'relative',
                  zIndex: 2
                }}
              >
                24/7 AI Live — Answering Calls Now
              </span>
            </motion.div>

            {/* H1 — Updated headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: "-0.04em",
                  margin: "0 0 6px",
                  color: "#141419",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(38px, 6.2vw, 82px)",
                  }}
                >
                  AI employees
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(38px, 6.2vw, 82px)",
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#7B74DC",
                  }}
                >
                  specifically built
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(38px, 6.2vw, 82px)",
                  }}
                >
                  for car rental USA operators.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.8vw, 18px)",
                color: "#6E6D7A",
                lineHeight: 1.65,
                maxWidth: "540px",
                margin: "22px 0 16px",
              }}
            >
              Aiaura answers every call, every DM, every email — 24/7, in any language, in your brand voice.
              <br />
              <strong style={{ color: "#141419" }}>You only handle deals that are ready to close.</strong>
            </motion.p>

            {/* All AI Agents Working Together Line - Enhanced Mobile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                margin: "16px 0 32px",
                padding: "12px 16px",
                borderRadius: 12,
                background: "rgba(123,116,220,0.05)",
                border: "1px solid rgba(123,116,220,0.1)",
                maxWidth: "fit-content"
              }}
            >
              <Users size={18} color="#7B74DC" />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#7B74DC",
                }}
              >
                All AI agents working together seamlessly
              </span>
            </motion.div>

            {/* CTAs - Enhanced Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 36,
              }}
            >
              <a
                href="#cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "16px 32px",
                  borderRadius: 100,
                  background: "linear-gradient(135deg, #7B74DC 0%, #9B8CE8 100%)",
                  color: "#FCFCFE",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 32px rgba(123,116,220,0.25)",
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 16px 48px rgba(123,116,220,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(123,116,220,0.25)";
                }}
              >
                Book a Call →
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <ArrowUpRight size={16} />
                </motion.div>
              </a>

              <a
                href="#solutions"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "16px 32px",
                  borderRadius: 100,
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(10px)",
                  color: "#7B74DC",
                  border: "1.5px solid rgba(123,116,220,0.2)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(123,116,220,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.8)";
                  e.currentTarget.style.transform = "";
                }}
              >
                See All Products
              </a>
            </motion.div>

            {/* Trust pills - Enhanced Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.44 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {TRUST.map((t) => (
                <span
                  key={t}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 12px",
                    borderRadius: 100,
                    background: "#F5F3FF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#6E6D7A",
                  }}
                >
                  <CheckCircle size={11} color="#2A9D8F" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — AI Activity Display Only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="hero-right"
          >
            <AIActivityDisplay />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        /* Ultra-responsive breakpoints for perfect display */
        
        /* Large Desktop: Full premium experience */
        @media (min-width: 1200px) {
          .hero-grid {
            grid-template-columns: 1fr 650px !important;
            align-items: center;
            gap: 60px !important;
          }
          .hero-right {
            display: flex !important;
          }
        }
        
        /* Desktop: Standard premium experience */
        @media (min-width: 900px) and (max-width: 1199px) {
          .hero-grid {
            grid-template-columns: 1fr 500px !important;
            align-items: center;
            gap: 40px !important;
          }
          .hero-right {
            display: flex !important;
          }
        }
        
        /* Tablet Landscape: Stacked layout */
        @media (min-width: 768px) and (max-width: 899px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center !important;
          }
          .hero-right {
            display: flex !important;
            transform: scale(0.8);
            margin: -20px auto;
            justify-content: center !important;
          }
        }
        
        /* Tablet Portrait: Compact stacked layout */
        @media (min-width: 600px) and (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            text-align: center !important;
          }
          .hero-right {
            display: flex !important;
            transform: scale(0.7);
            margin: -30px auto;
            justify-content: center !important;
          }
        }
        
        /* Large Mobile: Simplified experience */
        @media (min-width: 480px) and (max-width: 599px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            text-align: center !important;
          }
          .hero-right {
            display: flex !important;
            transform: scale(0.6);
            margin: -40px auto -20px;
            justify-content: center !important;
          }
        }
        
        /* Small Mobile: Mobile-optimized experience */
        @media (max-width: 479px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            text-align: center !important;
          }
          .hero-right {
            display: none !important;
          }
        }
        
        /* Premium glassmorphism effects with fallbacks */
        @supports (backdrop-filter: blur(10px)) {
          .glass-effect {
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
          }
        }
        
        @supports not (backdrop-filter: blur(10px)) {
          .glass-effect {
            background: rgba(255, 255, 255, 0.95) !important;
          }
        }
        
        /* Enhanced mobile typography scaling */
        @media (max-width: 767px) {
          .hero-grid {
            text-align: center !important;
          }
          
          .hero-grid h1 span {
            font-size: clamp(32px, 8vw, 42px) !important;
            line-height: 1.1 !important;
          }
          
          .hero-grid p {
            font-size: clamp(14px, 4vw, 16px) !important;
            line-height: 1.6 !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          
          .hero-grid > div:first-child {
            text-align: center !important;
          }
          
          .hero-grid > div:first-child > div {
            justify-content: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
        
        @media (max-width: 479px) {
          .hero-grid > div:first-child > div:nth-child(4) {
            flex-direction: column !important;
            align-items: center !important;
          }
          
          .hero-grid > div:first-child > div:nth-child(4) > a {
            width: 100% !important;
            max-width: 280px !important;
          }
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                     opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                     box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Performance optimizations */
        .hero-right {
          will-change: transform;
          transform-style: preserve-3d;
        }
        
        /* High DPI display optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .hero-right {
            transform: translateZ(0);
            backface-visibility: hidden;
          }
        }
        
        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .glass-effect {
            background: rgba(20, 20, 25, 0.95) !important;
            border-color: rgba(255, 255, 255, 0.1) !important;
          }
        }
        
        /* Print styles */
        @media print {
          .hero-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
