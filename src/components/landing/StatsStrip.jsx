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
    desc: "Global communication",
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
    if (!isComplete) return "#FFFFFF";
    
    // Show green for completed animations
    if (isPercentage && target === 100) return "#10B981"; // Green for 100%
    
    return "#FFFFFF";
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
        background: "#000000",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated background pattern */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: "radial-gradient(circle, #10B981 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Subtle glow effects */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
          pointerEvents: "none"
        }}
      />
      
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123, 116, 220, 0.1) 0%, transparent 70%)",
          pointerEvents: "none"
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(16px, 3vw, 24px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 5vw, 36px)",
              color: "#FFFFFF",
              margin: "0 0 12px",
              letterSpacing: "-0.02em"
            }}
          >
            Performance That Speaks for Itself
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(14px, 3vw, 18px)",
              color: "#9CA3AF",
              margin: 0,
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            Real metrics from real car rental operators using Aiaura AI
          </p>
        </motion.div>

        {/* Stats Grid - Mobile Responsive */}
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "clamp(12px, 3vw, 24px)",
            justifyItems: "center",
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              style={{ 
                textAlign: "center", 
                width: "100%",
                background: "rgba(255, 255, 255, 0.02)",
                borderRadius: "clamp(12px, 3vw, 16px)",
                padding: "clamp(12px, 3vw, 20px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                minHeight: "clamp(120px, 20vw, 160px)"
              }}
            >
              {/* Big animated number - Mobile Responsive */}
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 8vw, 64px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "clamp(4px, 2vw, 8px)",
                  position: "relative"
                }}
              >
                <AnimatedCounter 
                  target={stat.value} 
                  suffix={stat.suffix}
                  isPercentage={stat.isPercentage}
                />
                <span style={{ color: "#FFFFFF" }}>{stat.suffix}</span>
                
                {/* Success indicator for completed percentages */}
                {stat.isPercentage && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.3 }}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "#10B981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#FFFFFF"
                    }} />
                  </motion.div>
                )}
              </div>

              {/* Label - Mobile Responsive */}
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(12px, 3.5vw, 20px)",
                  color: "#FFFFFF",
                  margin: "0 0 clamp(4px, 1.5vw, 8px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2
                }}
              >
                {stat.label}
              </h3>

              {/* Description - Mobile Responsive */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(10px, 2.5vw, 14px)",
                  color: "#9CA3AF",
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
        /* Mobile: 3 cards in first row, 2 wider cards in second row */
        @media (max-width: 480px) {
          .stats-grid {
            display: grid !important;
            grid-template-columns: repeat(6, 1fr) !important;
            gap: 8px !important;
          }
          
          /* First 3 cards: each spans 2 columns (2+2+2 = 6, fills row) */
          .stats-grid > div:nth-child(1),
          .stats-grid > div:nth-child(2),
          .stats-grid > div:nth-child(3) {
            grid-column: span 2;
          }
          
          /* Last 2 cards: each spans 3 columns (3+3 = 6, fills row, wider cards) */
          .stats-grid > div:nth-child(4),
          .stats-grid > div:nth-child(5) {
            grid-column: span 3;
          }
          
          /* Compact sizing for mobile */
          .stats-grid > div {
            padding: 12px 8px !important;
            min-height: 110px !important;
            border-radius: 12px !important;
          }
          
          /* Smaller number size */
          .stats-grid > div > div:first-child {
            font-size: 28px !important;
            margin-bottom: 4px !important;
          }
          
          /* Smaller label */
          .stats-grid > div h3 {
            font-size: 10px !important;
            margin-bottom: 3px !important;
            line-height: 1.2 !important;
          }
          
          /* Smaller description */
          .stats-grid > div p {
            font-size: 8px !important;
            line-height: 1.3 !important;
          }
          
          /* Smaller success indicator dot */
          .stats-grid > div > div:first-child > div {
            width: 12px !important;
            height: 12px !important;
            top: -6px !important;
            right: -6px !important;
          }
          
          .stats-grid > div > div:first-child > div > div {
            width: 6px !important;
            height: 6px !important;
          }
        }
        
        /* Small Mobile: Single column fallback */
        @media (max-width: 360px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          
          .stats-grid > div:nth-child(1),
          .stats-grid > div:nth-child(2),
          .stats-grid > div:nth-child(3),
          .stats-grid > div:nth-child(4),
          .stats-grid > div:nth-child(5) {
            grid-column: span 1 !important;
          }
        }
        
        /* Tablet: 3 columns */
        @media (min-width: 481px) and (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 14px !important;
          }
        }
        
        /* Desktop: 5 columns */
        @media (min-width: 769px) {
          .stats-grid {
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
