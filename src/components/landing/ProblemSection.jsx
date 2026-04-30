import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Colours (original light palette) ── */
const C    = "#7B74DC";
const CL   = "#F5F3FF";
const CLL  = "rgba(123,116,220,0.07)";
const RED  = "#EF4444";
const REDL = "#FEF2F2";
const GR   = "#6E6D7A";

/* ── Section 4 Problem Cards Data ── */
const CORE_PROBLEMS = [
  {
    id: "missed-calls",
    icon: "",
    stat: "$47K",
    subtitle: "lost annually",
    title: "Missed After-Hours Calls",
    desc: "Every missed call after 6PM costs you $312 in lost revenue. With 150+ missed calls yearly, that's $47,000 walking away to competitors who answer 24/7.",
    realTimeMsg: "Right now: 3 potential customers called in the last hour",
    color: "#EF4444",
    colorLight: "#FEF2F2",
    colorBorder: "#FECACA",
    metricImpact: { revenue: -31, bookings: -28, leads: -35 },
    urgencyLevel: "CRITICAL",
  },
  {
    id: "slow-replies",
    icon: "",
    stat: "2.3min",
    subtitle: "response window",
    title: "Slow Response Times",
    desc: "Industry data shows 67% of bookings go to whoever responds first. Your average 45-minute response time means losing 8 out of 10 hot leads to faster competitors.",
    realTimeMsg: "Competitor advantage: They respond in under 90 seconds",
    color: "#F59E0B",
    colorLight: "#FFFBEB",
    colorBorder: "#FDE68A",
    metricImpact: { revenue: -25, bookings: -32, leads: -28 },
    urgencyLevel: "HIGH",
  },
  {
    id: "no-followup",
    icon: "",
    stat: "94%",
    subtitle: "quotes ignored",
    title: "Zero Follow-Up System",
    desc: "Your $2,400 average booking requires 5.2 touchpoints to close. Without automated follow-up, 94% of quotes die after the first interaction — that's $180K in abandoned revenue.",
    realTimeMsg: "This month: 23 quotes sent, 2 bookings confirmed",
    color: "#8B5CF6",
    colorLight: "#F5F3FF",
    colorBorder: "#C4B5FD",
    metricImpact: { revenue: -40, bookings: -38, leads: -22 },
    urgencyLevel: "CRITICAL",
  },
  {
    id: "bad-reviews",
    icon: "",
    stat: "3.8★",
    subtitle: "Google rating",
    title: "Review Management Crisis",
    desc: "Your 3.8-star rating costs you 52% of potential bookings. Customers scroll past to 4.6+ rated competitors. Each unmanaged negative review loses you $8,400 in annual bookings.",
    realTimeMsg: "Alert: 2 new negative reviews need immediate response",
    color: "#EC4899",
    colorLight: "#FDF2F8",
    colorBorder: "#F9A8D4",
    metricImpact: { revenue: -18, bookings: -20, leads: -30 },
    urgencyLevel: "HIGH",
  },
  {
    id: "low-engagement",
    icon: "",
    stat: "71%",
    subtitle: "never return",
    title: "Customer Retention Failure",
    desc: "71% of your satisfied customers book with competitors next time because you have no retention system. Each lost repeat customer costs you $4,800 in lifetime value.",
    realTimeMsg: "This quarter: 34 past customers booked elsewhere",
    color: "#06B6D4",
    colorLight: "#ECFEFF",
    colorBorder: "#A5F3FC",
    metricImpact: { revenue: -22, bookings: -26, leads: -15 },
    urgencyLevel: "MEDIUM",
  },
  {
    id: "silent-visitors",
    icon: "",
    stat: "89%",
    subtitle: "leave silently",
    title: "Invisible Website Traffic",
    desc: "89% of your 2,400 monthly visitors leave without a trace. No chat, no capture, no follow-up. That's 2,136 potential customers vanishing into thin air every month.",
    realTimeMsg: "Today: 47 visitors browsed your services, 0 contacted you",
    color: "#10B981",
    colorLight: "#ECFDF5",
    colorBorder: "#6EE7B7",
    metricImpact: { revenue: -15, bookings: -18, leads: -42 },
    urgencyLevel: "HIGH",
  },
];

/* ── Real-time Alert Component ── */
function RealTimeAlert({ message, urgencyLevel }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), Math.random() * 2000 + 1000);
    return () => clearTimeout(timer);
  }, []);

  const urgencyColors = {
    CRITICAL: { bg: "#FEF2F2", border: "#FECACA", text: "#DC2626", pulse: "#EF4444" },
    HIGH: { bg: "#FFFBEB", border: "#FDE68A", text: "#D97706", pulse: "#F59E0B" },
    MEDIUM: { bg: "#F0F9FF", border: "#BAE6FD", text: "#0369A1", pulse: "#0EA5E9" },
  };

  const colors = urgencyColors[urgencyLevel] || urgencyColors.MEDIUM;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        padding: "8px 12px",
        marginTop: 12,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Pulsing indicator */}
      <motion.div
        style={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: colors.pulse,
        }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <p style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 10,
        color: colors.text,
        margin: 0,
        paddingLeft: 16,
        fontWeight: 600,
        lineHeight: 1.4,
      }}>
        {message}
      </p>
    </motion.div>
  );
}
/* ── Animated Counter ── */
function AnimatedCounter({ value, duration = 2000, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);
  const start = useRef(null);

  useEffect(() => {
    const target = Math.abs(value);
    start.current = null;
    cancelAnimationFrame(raf.current);
    const tick = (ts) => {
      if (!start.current) start.current = ts;
      const elapsed = ts - start.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, duration]);

  return <span>{prefix}{display}{suffix}</span>;
}

/* ── Flowing Wire SVG between cards and convergence point ── */
function WireSystem({ cardCount, containerWidth, isVisible }) {
  const svgHeight = 220;
  const gap = 12; // Gap between cards
  const totalGaps = (cardCount - 1) * gap;
  const availableWidth = containerWidth - totalGaps;
  const cardWidth = availableWidth / cardCount;
  
  // Check if mobile view (only show 3 wires on mobile)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const visibleCards = isMobile ? 3 : cardCount;

  return (
    <svg
      width={containerWidth}
      height={svgHeight}
      viewBox={`0 0 ${containerWidth} ${svgHeight}`}
      style={{ overflow: "visible", display: "block" }}
    >
      <defs>
        {CORE_PROBLEMS.slice(0, visibleCards).map((p, i) => (
          <linearGradient key={p.id} id={`wire-grad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="1" />
          </linearGradient>
        ))}
        <linearGradient id="converge-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7B0000" stopOpacity="1" />
        </linearGradient>
        <filter id="wire-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {CORE_PROBLEMS.slice(0, visibleCards).map((prob, i) => {
        // Calculate card center position accounting for gaps
        const cardCenterX = (cardWidth * i) + (gap * i) + (cardWidth / 2);
        const convergeX = containerWidth / 2;
        const controlY = svgHeight * 0.6;

        const pathD = `M ${cardCenterX} 0 C ${cardCenterX} ${controlY * 0.5}, ${convergeX} ${controlY * 0.5}, ${convergeX} ${svgHeight - 20}`;

        return (
          <g key={prob.id}>
            {/* Background glow wire */}
            {isVisible && (
              <motion.path
                d={pathD}
                fill="none"
                stroke={`url(#wire-grad-${i})`}
                strokeWidth="3"
                strokeOpacity="0.25"
                filter="url(#wire-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: i * 0.12, ease: "easeInOut" }}
              />
            )}
            {/* Main wire */}
            {isVisible && (
              <motion.path
                d={pathD}
                fill="none"
                stroke={`url(#wire-grad-${i})`}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: i * 0.12, ease: "easeInOut" }}
              />
            )}
            {/* Animated pulse dot */}
            {isVisible && (
              <motion.circle
                r="4"
                fill="#EF4444"
                filter="url(#wire-glow)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  offsetDistance: ["0%", "100%"],
                }}
                style={{ offsetPath: `path('${pathD}')` }}
                transition={{
                  duration: 2.2,
                  delay: 0.8 + i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              />
            )}
          </g>
        );
      })}

      {/* Convergence point glow */}
      {isVisible && (
        <>
          <motion.circle
            cx={containerWidth / 2}
            cy={svgHeight - 20}
            r="18"
            fill="none"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeOpacity="0.3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 2, delay: 1.8, repeat: Infinity }}
            style={{ transformOrigin: `${containerWidth / 2}px ${svgHeight - 20}px` }}
          />
          <motion.circle
            cx={containerWidth / 2}
            cy={svgHeight - 20}
            r="10"
            fill="#EF4444"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          />
          <motion.circle
            cx={containerWidth / 2}
            cy={svgHeight - 20}
            r="5"
            fill="#fff"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.7 }}
          />
        </>
      )}
    </svg>
  );
}

/* ── Metric Impact Block ── */
function MetricImpact({ isVisible }) {
  const metrics = [
    {
      label: "Monthly Revenue Loss",
      icon: "",
      value: "$23,400",
      trend: "↗ +$2,100 vs last month",
      description: "Direct revenue bleeding from these 6 problems",
      steps: [100, 82, 61, 44, 29, 18, 11],
      color: "#EF4444",
      suffix: "",
      prefix: "",
    },
    {
      label: "Missed Bookings",
      icon: "",
      value: "47",
      trend: "↗ +8 vs last month", 
      description: "Confirmed bookings lost to competitors",
      steps: [100, 79, 58, 40, 27, 16, 9],
      color: "#8B5CF6",
      suffix: "/month",
      prefix: "",
    },
    {
      label: "Lost Lead Opportunities",
      icon: "",
      value: "312",
      trend: "↗ +43 vs last month",
      description: "Potential customers who never converted",
      steps: [100, 84, 65, 48, 32, 20, 12],
      color: "#06B6D4",
      suffix: "/month",
      prefix: "",
    },
  ];

  return (
    <div 
      className="metrics-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        width: "100%",
      }}>
      {metrics.map((metric, mi) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 2.0 + mi * 0.15 }}
          style={{
            background: "#fff",
            border: "1px solid #E3E2EB",
            borderRadius: 16,
            padding: "20px 18px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top glow accent */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`,
            opacity: 0.6,
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GR }}>
              {metric.label}
            </span>
          </div>

          {/* Main metric value */}
          <div style={{ marginBottom: 8 }}>
            <motion.span
              style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontWeight: 900,
                fontSize: 28,
                letterSpacing: "-0.05em",
                color: metric.color,
                lineHeight: 1,
                display: "block",
              }}
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 2.0 + mi * 0.15 }}
            >
              {metric.value}
            </motion.span>
            <motion.div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 9,
                color: "#EF4444",
                fontWeight: 600,
                marginTop: 2,
              }}
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 2.2 + mi * 0.1 }}
            >
              {metric.trend}
            </motion.div>
          </div>

          {/* Step bars */}
          <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 52, marginBottom: 10 }}>
            {metric.steps.map((val, si) => {
              const pct = val / 100;
              const colorPct = si / (metric.steps.length - 1);
              const r = Math.round(123 + (239 - 123) * colorPct);
              const g = Math.round(116 + (68 - 116) * colorPct);
              const b = Math.round(220 + (68 - 220) * colorPct);
              const barColor = `rgb(${r},${g},${b})`;

              return (
                <motion.div
                  key={si}
                  style={{
                    flex: 1,
                    background: barColor,
                    borderRadius: "3px 3px 2px 2px",
                    opacity: 0.85,
                  }}
                  initial={{ height: 0 }}
                  animate={isVisible ? { height: `${pct * 52}px` } : { height: 0 }}
                  transition={{ duration: 0.5, delay: 2.2 + mi * 0.15 + si * 0.08, ease: "easeOut" }}
                />
              );
            })}
          </div>

          {/* Description */}
          <motion.p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 10,
              color: GR,
              margin: 0,
              lineHeight: 1.4,
            }}
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2.4 + mi * 0.1 }}
          >
            {metric.description}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Problem Card ── */
function ProblemCard({ problem, index, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "#fff",
        border: `1px solid ${problem.colorBorder}`,
        borderRadius: 16,
        padding: "20px 18px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        flex: 1,
        minHeight: 280,
      }}
    >
      {/* Urgency indicator */}
      <div style={{
        position: "absolute",
        top: 12,
        right: 12,
        background: problem.urgencyLevel === 'CRITICAL' ? '#FEF2F2' : problem.urgencyLevel === 'HIGH' ? '#FFFBEB' : '#F0F9FF',
        border: `1px solid ${problem.urgencyLevel === 'CRITICAL' ? '#FECACA' : problem.urgencyLevel === 'HIGH' ? '#FDE68A' : '#BAE6FD'}`,
        borderRadius: 6,
        padding: "2px 6px",
      }}>
        <span style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 8,
          fontWeight: 700,
          color: problem.urgencyLevel === 'CRITICAL' ? '#DC2626' : problem.urgencyLevel === 'HIGH' ? '#D97706' : '#0369A1',
          letterSpacing: "0.05em",
        }}>
          {problem.urgencyLevel}
        </span>
      </div>

      {/* Left accent bar */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, bottom: 0,
        width: 3,
        background: `linear-gradient(180deg, ${problem.color}33, ${problem.color}, ${problem.color}33)`,
        borderRadius: "3px 0 0 3px",
      }} />

      {/* Top glow */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 40,
        background: `linear-gradient(180deg, ${problem.colorLight} 0%, transparent 100%)`,
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{
          width: 38, height: 38,
          borderRadius: 10,
          background: problem.colorLight,
          border: `1px solid ${problem.colorBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}>
          {problem.icon}
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(18px,2vw,22px)",
            color: problem.color,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            display: "block",
          }}>
            {problem.stat}
          </span>
          <span style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 9,
            color: GR,
            fontWeight: 500,
          }}>
            {problem.subtitle}
          </span>
        </div>
      </div>

      <h4 style={{
        fontFamily: "'Bricolage Grotesque',sans-serif",
        fontWeight: 800,
        fontSize: "clamp(13px,1.4vw,15px)",
        color: "#141419",
        letterSpacing: "-0.03em",
        margin: "0 0 6px",
        lineHeight: 1.15,
      }}>
        {problem.title}
      </h4>

      <p style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: "clamp(10px,1.1vw,11px)",
        color: GR,
        lineHeight: 1.6,
        margin: "0 0 12px",
      }}>
        {problem.desc}
      </p>

      {/* Real-time alert */}
      <RealTimeAlert message={problem.realTimeMsg} urgencyLevel={problem.urgencyLevel} />

      {/* Bottom dot connector indicator */}
      <div style={{
        position: "absolute",
        bottom: -1,
        left: "50%",
        transform: "translateX(-50%)",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: problem.color,
        boxShadow: `0 0 6px ${problem.color}`,
      }} />
    </motion.div>
  );
}

/* ── Section 4: Problems with Wire Convergence ── */
function ProblemConvergenceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showFirstRow, setShowFirstRow] = useState(false);
  const [showSecondRow, setShowSecondRow] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [containerWidth, setContainerWidth] = useState(900);
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Staggered animation sequence
          setTimeout(() => setShowFirstRow(true), 300);
          setTimeout(() => setShowSecondRow(true), 1500);
          setTimeout(() => setShowMetrics(true), 2800);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) {
        setContainerWidth(wrapRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#FCFCFE",
        borderTop: "1px solid #E3E2EB",
        padding: "56px 0 64px",
        fontFamily: "'DM Sans',system-ui,sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(123,116,220,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123,116,220,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }} />

      <div 
        className="problem-section-container"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 36px", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 56, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(239,68,68,0.07)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 24,
            padding: "5px 16px",
            marginBottom: 16,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: RED, display: "inline-block" }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: RED }}>
              The Real Problem
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
            Your rental business is hemorrhaging money<br />
            <span style={{ color: RED }}>$23,400 every single month.</span>
          </h2>

          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "clamp(13px,1.5vw,16px)",
            color: GR,
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            These six operational gaps are costing you real money right now. Each problem compounds the others, creating a revenue death spiral that gets worse every month.
          </p>
        </motion.div>

        {/* Problem Cards Row */}
        <div ref={wrapRef} style={{ width: "100%" }}>
          <div 
            className="problem-cards-grid"
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 0,
              flexWrap: "nowrap",
              overflowX: "auto",
              paddingBottom: 4,
            }}>
            {CORE_PROBLEMS.map((problem, i) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                index={i}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Wire System */}
          <div className="wire-system-wrapper" style={{ marginTop: 0, position: "relative" }}>
            <WireSystem
              cardCount={CORE_PROBLEMS.length}
              containerWidth={containerWidth}
              isVisible={isVisible}
            />
          </div>

          {/* Convergence Label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.8 }}
            style={{ textAlign: "center", marginBottom: 28, marginTop: -8 }}
          >
            <div style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}>
              <div style={{
                background: REDL,
                border: "1px solid #FECACA",
                borderRadius: 12,
                padding: "8px 20px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
                <span style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: RED,
                  letterSpacing: "0.02em",
                }}>
                  Real financial impact on your business
                </span>
              </div>
              <div style={{
                width: 2,
                height: 16,
                background: `linear-gradient(180deg, #EF4444, transparent)`,
                borderRadius: 2,
              }} />
            </div>
          </motion.div>

          {/* Metric Impact Cards */}
          <div className="metrics-wrapper">
            <MetricImpact isVisible={isVisible} />
          </div>

          {/* Bottom CTA hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 3.2 }}
            style={{
              textAlign: "center",
              marginTop: 36,
              padding: "20px 28px",
              background: "linear-gradient(135deg, rgba(123,116,220,0.06), rgba(239,68,68,0.04))",
              border: "1px solid rgba(123,116,220,0.15)",
              borderRadius: 16,
            }}
          >
            <p style={{
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(15px,2vw,20px)",
              color: "#141419",
              letterSpacing: "-0.03em",
              margin: "0 0 6px",
            }}>
              The bleeding stops the moment you implement our system.
            </p>
            <p style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 13,
              color: GR,
              margin: 0,
            }}>
              See exactly how we plug each revenue leak — automatically.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Main Component ── */
export default function ProblemSection() {
  return (
    <>
      <ProblemConvergenceSection />
      <style>{`
        /* Mobile Responsive Styles - Clean and optimized */
        
        /* Mobile: Show only first 3 problem cards, hide badges/icons */
        @media (max-width: 768px) {
          .problem-section-container {
            padding: 0 12px !important;
          }
          
          /* 3 columns for problem cards */
          .problem-cards-grid {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
            overflow-x: visible !important;
            padding-bottom: 0 !important;
          }
          
          /* HIDE cards 4, 5, 6 on mobile */
          .problem-cards-grid > div:nth-child(4),
          .problem-cards-grid > div:nth-child(5),
          .problem-cards-grid > div:nth-child(6) {
            display: none !important;
          }
          
          .problem-cards-grid > div {
            min-height: 180px !important;
            padding: 10px 8px !important;
          }
          
          /* HIDE urgency badge (CRITICAL/HIGH/MEDIUM) */
          .problem-cards-grid > div > div:first-child {
            display: none !important;
          }
          
          /* HIDE icon and stat number section at top */
          .problem-cards-grid > div > div:nth-child(2) {
            display: none !important;
          }
          
          /* Title - smaller and readable */
          .problem-cards-grid h4 {
            font-size: 11px !important;
            margin-bottom: 4px !important;
            line-height: 1.2 !important;
            margin-top: 0 !important;
          }
          
          /* Description - shorter, smaller */
          .problem-cards-grid p {
            font-size: 8px !important;
            line-height: 1.3 !important;
            margin-bottom: 6px !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 4 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          
          /* Real-time alert - smaller */
          .problem-cards-grid > div > div:last-child {
            margin-top: 6px !important;
            padding: 6px 8px !important;
            border-radius: 6px !important;
          }
          
          .problem-cards-grid > div > div:last-child p {
            font-size: 7px !important;
            padding-left: 12px !important;
          }
          
          .problem-cards-grid > div > div:last-child > div {
            width: 4px !important;
            height: 4px !important;
            left: 6px !important;
          }
          
          /* Keep wire system visible */
          .wire-system-wrapper {
            display: block !important;
            margin-top: -10px !important;
          }
          
          .wire-system-wrapper svg {
            height: 120px !important;
          }
          
          /* 3 metrics in a row - SMALLER FONTS */
          .metrics-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
          
          .metrics-grid > div {
            padding: 10px 8px !important;
            min-height: auto !important;
          }
          
          /* Label - much smaller */
          .metrics-grid > div > div:first-child span {
            font-size: 7px !important;
            letter-spacing: 0.08em !important;
          }
          
          /* Main number - smaller */
          .metrics-grid > div > div:nth-child(2) span {
            font-size: 18px !important;
          }
          
          /* Trend text - smaller */
          .metrics-grid > div > div:nth-child(2) div {
            font-size: 6px !important;
            margin-top: 1px !important;
          }
          
          /* Hide step bars on mobile */
          .metrics-grid > div > div:nth-child(3) {
            display: none !important;
          }
          
          /* Description - smaller */
          .metrics-grid p {
            font-size: 7px !important;
            line-height: 1.3 !important;
          }
        }
        
        /* Tablet: Show all 6 cards */
        @media (min-width: 769px) and (max-width: 1024px) {
          .problem-section-container {
            padding: 0 20px !important;
          }
          
          .problem-cards-grid {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px !important;
            overflow-x: visible !important;
          }
          
          .problem-cards-grid > div {
            padding: 16px 14px !important;
          }
          
          .metrics-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px !important;
          }
        }
        
        /* Very small mobile: Even more compact */
        @media (max-width: 480px) {
          .problem-cards-grid {
            gap: 6px !important;
          }
          
          .problem-cards-grid > div {
            padding: 8px 6px !important;
            min-height: 160px !important;
          }
          
          .problem-cards-grid h4 {
            font-size: 10px !important;
          }
          
          .problem-cards-grid p {
            font-size: 7px !important;
            -webkit-line-clamp: 3 !important;
          }
          
          .metrics-grid {
            gap: 6px !important;
          }
          
          .metrics-grid > div {
            padding: 8px 6px !important;
          }
          
          .metrics-grid > div > div:nth-child(2) span {
            font-size: 16px !important;
          }
        }
      `}</style>
    </>
  );
}
