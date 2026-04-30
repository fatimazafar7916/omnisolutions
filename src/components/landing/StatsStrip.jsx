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
      style={{
        padding: "clamp(20px, 4vw, 32px) clamp(16px, 3vw, 20px)",
        background: "#000000",
        position: "relative",
        overflow: "hidden",
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

      <div style={{ width: "100%", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(16px, 3vw, 24px)"
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
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "clamp(12px, 3vw, 24px)",
            justifyItems: "center",
          }}
          className="stats-grid"
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
        /* Mobile: Stack in 2 columns */
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
        }
        
        /* Small Mobile: Single column */
        @media (max-width: 360px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        
        /* Tablet: 3 columns */
        @media (min-width: 481px) and (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
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
