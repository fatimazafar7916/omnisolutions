import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: 100, suffix: "%", label: "Calls Answered", desc: "Every call captured, zero missed" },
  { value: 2, suffix: "s", label: "Response Time", desc: "Faster than any competitor" },
  { value: 24, suffix: "/7", label: "Available", desc: "Never sleep, never miss a lead" },
  {
    value: 22,
    suffix: "+",
    label: "Languages Covered",
    desc: "Serve every customer, any language",
  },
  { value: 0, suffix: "", label: "Missed Leads", desc: "All leads captured and converted" },
];

function AnimatedCounter({ target, suffix, duration = 500 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Start counting animation - ONLY ONCE
          let start = 0;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
              // STOP - no restart
            } else {
              setCount(start);
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  const displayValue = target < 10 ? count.toFixed(1) : Math.floor(count);
  return <span ref={ref}>{displayValue}</span>;
}

export default function StatsStrip() {
  return (
    <section
      style={{
        padding: "clamp(40px, 8vw, 64px) clamp(20px, 4vw, 32px)",
        background: "linear-gradient(90deg, #7B74DC 0%, #4D4699 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div style={{ width: "100%", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "clamp(24px, 5vw, 40px)",
            justifyItems: "center",
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ textAlign: "center", width: "100%" }}
            >
              {/* Big number */}
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 8vw, 52px)",
                  color: "#FFFFFF",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <span>{stat.suffix}</span>
              </div>

              {/* Label */}
              <h3
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  color: "#FFFFFF",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {stat.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
