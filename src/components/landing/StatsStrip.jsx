import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { 
    value: 100, 
    suffix: "%", 
    label: "Calls Answered", 
    desc: "Response Time: 2 seconds",
    isPercentage: true
  },
  { 
    value: 100, 
    suffix: "%", 
    label: "24/7 Coverage", 
    desc: "Always available",
    isPercentage: true
  },
  {
    value: 22,
    suffix: "+",
    label: "Languages",
    desc: "Talks to everyone",
    isPercentage: false
  },
  { 
    value: 100, 
    suffix: "%", 
    label: "Lead Capture Rate", 
    desc: "No leads missed",
    isPercentage: true
  },
  { 
    value: 100, 
    suffix: "%", 
    label: "Uptime Guarantee", 
    desc: "Never goes offline",
    isPercentage: true
  }
];

function AnimatedCounter({ target, suffix, duration = 1200, isPercentage }) {
  const [count, setCount] = useState(isPercentage ? 1 : 0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const animationRef = useRef(null);

  const startAnimation = () => {
    const animationDuration = isPercentage ? 1200 : 800;
    const startValue = isPercentage ? 1 : 0;
    const endValue = target;
    let current = startValue;
    const increment = (endValue - startValue) / (animationDuration / 16);
    
    setCount(startValue);
    setIsComplete(false);
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= endValue) {
        setCount(endValue);
        setIsComplete(true);
        clearInterval(timer);
        
        setTimeout(() => {
          if (ref.current) {
            startAnimation();
          }
        }, 5000);
      } else {
        setCount(Math.max(current, startValue));
      }
    }, 16);
    
    animationRef.current = timer;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setTimeout(() => {
            startAnimation();
          }, 100);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [target, isPercentage]);

  const displayValue = target < 10 && !isPercentage ? count.toFixed(1) : Math.floor(count);
  
  const getColor = () => {
    if (!isComplete) return "#141419";
    return "#22C55E";
  };

  return (
    <motion.span 
      ref={ref}
      animate={{
        color: getColor(),
        scale: isComplete ? [1, 1.05, 1] : 1
      }}
      transition={{
        color: { duration: 0.3 },
        scale: { duration: 0.4, delay: 0.1 }
      }}
    >
      {displayValue}
    </motion.span>
  );
}

export default function StatsStrip() {
  return (
    <section
      className="global-section"
      style={{
        background: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "clamp(28px, 4vw, 48px)",
        paddingBottom: "clamp(28px, 4vw, 48px)",
      }}
    >
      {/* Animated background pattern */}
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #22C55E 1px, transparent 1px)",
          opacity: 0.08,
          backgroundSize: "28px 28px",
        }}
      />
      <div style={{
        position: "absolute", top: "20%", left: "10%",
        width: "140px", height: "140px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "10%",
        width: "100px", height: "100px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div className="section-container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(12px, 2vw, 20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(18px, 3vw, 26px)",
              color: "#141419",
              margin: "0 0 8px",
              letterSpacing: "-0.02em"
            }}
          >
            Real results you can see
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(12px, 1.5vw, 14px)",
              color: "#6E6D7A",
              margin: 0,
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            Real numbers from real car rental owners using Aiaura AI
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="stats-grid-wrapper">
          {/* Row 1: 3 items */}
          <div className="stats-row stats-row-3">
            {STATS.slice(0, 3).map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="stat-card"
              >
                <StatCardContent stat={stat} />
              </motion.div>
            ))}
          </div>

          {/* Row 2: 2 items */}
          <div className="stats-row stats-row-2">
            {STATS.slice(3, 5).map((stat, i) => (
              <motion.div
                key={i + 3}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 3) * 0.08 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="stat-card"
              >
                <StatCardContent stat={stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .stats-grid-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }

        .stats-row {
          display: flex;
          gap: 10px;
          width: 100%;
        }

        .stats-row .stat-card {
          flex: 1;
          min-width: 0;
        }

        /* Center the 2-item row to match the 3-item row above */
        .stats-row-2 {
          justify-content: center;
        }

        .stats-row-2 .stat-card {
          /* Each card in row 2 = exactly 1/3 of the row width to align with row above */
          flex: 0 0 calc(33.333% - 5px);
          max-width: calc(33.333% - 5px);
        }

        .stat-card {
          text-align: center;
          background: transparent;
          border-radius: 16px;
          padding: clamp(10px, 2vw, 24px);
          border: 1px solid #22C55E;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .stat-number {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 800;
          font-size: clamp(20px, 4vw, 40px);
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 4px;
          position: relative;
          display: inline-block;
        }

        .stat-label {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 600;
          font-size: clamp(9px, 1.8vw, 14px);
          color: #141419;
          margin: 0 0 2px;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .stat-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(7px, 1.3vw, 11px);
          color: #6E6D7A;
          margin: 0;
          line-height: 1.3;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .stats-grid-wrapper {
            gap: 8px;
          }

          .stats-row {
            gap: 6px;
          }

          .stats-row-2 .stat-card {
            flex: 0 0 calc(33.333% - 4px);
            max-width: calc(33.333% - 4px);
          }

          .stat-card {
            padding: 10px 6px !important;
            border-radius: 12px !important;
          }

          .stat-number {
            font-size: 18px !important;
            margin-bottom: 3px !important;
          }

          .stat-label {
            font-size: 9px !important;
            margin-bottom: 1px !important;
          }

          .stat-desc {
            font-size: 7px !important;
          }
        }

        /* Tablet */
        @media (min-width: 769px) and (max-width: 1024px) {
          .stat-number {
            font-size: 28px !important;
          }

          .stat-label {
            font-size: 12px !important;
          }

          .stat-desc {
            font-size: 10px !important;
          }
        }

        /* Desktop — keep 5 in one row */
        @media (min-width: 1025px) {
          .stats-grid-wrapper {
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 20px;
          }

          .stats-row {
            display: contents;
          }

          .stats-row .stat-card,
          .stats-row-2 .stat-card {
            flex: 1 1 0;
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}

function StatCardContent({ stat }) {
  return (
    <>
      <div className="stat-number">
        <AnimatedCounter 
          target={stat.value} 
          suffix={stat.suffix}
          isPercentage={stat.isPercentage}
        />
        <span style={{ color: "inherit" }}>{stat.suffix}</span>
        

      </div>

      <h3 className="stat-label">{stat.label}</h3>
      <p className="stat-desc">{stat.desc}</p>
    </>
  );
}