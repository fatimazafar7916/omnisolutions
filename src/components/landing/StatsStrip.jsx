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
        
        // After 5 seconds pause, restart the animation
        setTimeout(() => {
          if (ref.current) { // Check if component is still mounted
            startAnimation();
          }
        }, 5000);
      } else {
        setCount(Math.max(current, startValue)); // Ensure we don't go below start value
      }
    }, 16);
    
    animationRef.current = timer;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          // Add a small delay to ensure component is ready
          setTimeout(() => {
            startAnimation();
          }, 100);
        }
      },
      { threshold: 0.1 } // Lower threshold to trigger earlier
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
  }, [target, isPercentage]); // Add dependencies

  const displayValue = target < 10 && !isPercentage ? count.toFixed(1) : Math.floor(count);
  
  // Green highlight when animation is complete and target is reached
  const getColor = () => {
    if (!isComplete) return "#141419";
    
    // Show brand green for completed animations at target
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

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
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
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "clamp(8px, 2vw, 16px)",
            justifyItems: "center",
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              style={{ 
                textAlign: "center", 
                width: "100%",
                background: "#F8F7FB",
                borderRadius: "16px",
                padding: "clamp(16px, 2.5vw, 24px)",
                border: "1px solid #F0EFF5",
                backdropFilter: "blur(10px)",
                minHeight: "clamp(90px, 14vw, 120px)"
              }}
            >
              {/* Big animated number */}
              <div
                style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(22px, 5vw, 40px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: "clamp(3px, 1vw, 6px)",
                  position: "relative"
                }}
              >
                <AnimatedCounter 
                  target={stat.value} 
                  suffix={stat.suffix}
                  isPercentage={stat.isPercentage}
                />
                <span style={{ color: "inherit" }}>{stat.suffix}</span>
                
                {stat.isPercentage && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.3 }}
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "#22C55E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <div style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#FFFFFF"
                    }} />
                  </motion.div>
                )}
              </div>

              {/* Label */}
              <h3
                style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(11px, 2vw, 14px)",
                  color: "#141419",
                  margin: "0 0 clamp(2px, 1vw, 4px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2
                }}
              >
                {stat.label}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(9px, 1.5vw, 11px)",
                  color: "#6E6D7A",
                  margin: 0,
                  lineHeight: 1.3
                }}
              >
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile-specific CSS */}
      <style>{`
        /* Mobile: 3 cards in first row, 2 cards in second row */
        @media (max-width: 768px) {
          .stats-grid {
            display: grid !important;
            grid-template-columns: repeat(6, 1fr) !important;
            gap: 24px 10px !important;
            max-width: 100% !important;
          }
          
          /* First 3 cards: each spans 2 columns (2+2+2 = 6) - FIRST ROW */
          .stats-grid > div:nth-child(1) {
            grid-column: 1 / 3 !important;
          }
          
          .stats-grid > div:nth-child(2) {
            grid-column: 3 / 5 !important;
          }
          
          .stats-grid > div:nth-child(3) {
            grid-column: 5 / 7 !important;
          }
          
          /* Last 2 cards: each spans 3 columns (3+3 = 6) - SECOND ROW */
          .stats-grid > div:nth-child(4) {
            grid-column: 1 / 4 !important;
          }
          
          .stats-grid > div:nth-child(5) {
            grid-column: 4 / 7 !important;
          }
          
          /* Remove card styling on mobile - no background, no border */
          .stats-grid > div {
            background: transparent !important;
            border: none !important;
            padding: 12px 6px !important;
            min-height: auto !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
          }
          
          /* Smaller number size for better fit */
          .stats-grid > div > div:first-child {
            font-size: 32px !important;
            margin-bottom: 6px !important;
            font-weight: 800 !important;
          }
          
          /* Smaller label */
          .stats-grid > div h3 {
            font-size: 11px !important;
            margin-bottom: 3px !important;
            line-height: 1.2 !important;
            font-weight: 700 !important;
          }
          
          /* Smaller description */
          .stats-grid > div p {
            font-size: 9px !important;
            line-height: 1.3 !important;
            opacity: 0.8 !important;
          }
          
          /* Smaller success indicator dot */
          .stats-grid > div > div:first-child > div {
            width: 10px !important;
            height: 10px !important;
            top: -3px !important;
            right: -3px !important;
          }
          
          .stats-grid > div > div:first-child > div > div {
            width: 5px !important;
            height: 5px !important;
          }
        }
        
        /* Tablet: 3 columns */
        @media (min-width: 769px) and (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }
          
          .stats-grid > div:nth-child(1),
          .stats-grid > div:nth-child(2),
          .stats-grid > div:nth-child(3),
          .stats-grid > div:nth-child(4),
          .stats-grid > div:nth-child(5) {
            grid-column: span 1 !important;
          }
        }
        
        /* Desktop: 5 columns */
        @media (min-width: 1025px) {
          .stats-grid {
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 20px !important;
          }
          
          .stats-grid > div:nth-child(1),
          .stats-grid > div:nth-child(2),
          .stats-grid > div:nth-child(3),
          .stats-grid > div:nth-child(4),
          .stats-grid > div:nth-child(5) {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
