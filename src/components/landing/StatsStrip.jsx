import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: 100, suffix: "%", label: "Calls Answered",    desc: "Response Time: 2 seconds", isPercentage: true  },
  { value: 100, suffix: "%", label: "24/7 Coverage",     desc: "Always available",          isPercentage: true  },
  { value: 22,  suffix: "+", label: "Languages",         desc: "Talks to everyone",         isPercentage: false },
  { value: 100, suffix: "%", label: "Lead Capture Rate", desc: "No leads missed",           isPercentage: true  },
  { value: 100, suffix: "%", label: "Uptime Guarantee",  desc: "Never goes offline",        isPercentage: true  },
];

function AnimatedCounter({ target, isPercentage, onComplete }) {
  const [count, setCount]           = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref          = useRef(null);
  const animationRef = useRef(null);

  const startAnimation = () => {
    const dur       = 1600;
    const startVal  = 0;
    let startTime   = null;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / dur, 1);
      const eased    = easeOut(progress);
      const current  = startVal + (target - startVal) * eased;

      setCount(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
        onComplete(true);
        setTimeout(() => {
          if (ref.current) {
            onComplete(false);
            setCount(0);
            setTimeout(startAnimation, 50);
          }
        }, 12000);
      }
    };

    animationRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setTimeout(startAnimation, 100);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [target, isPercentage]);

  const displayValue = target < 10 && !isPercentage
    ? count.toFixed(1)
    : Math.floor(count);

  return <span ref={ref}>{displayValue}</span>;
}

function StatCard({ stat, index, isLast }) {
  const [complete, setComplete] = useState(false);
  const numColor = complete ? "#22C55E" : "#0f172a";

  return (
    <div className="stat-item">
      {/* Number + suffix — both flip green together */}
      <motion.div
        className="stat-number"
        animate={{ color: numColor }}
        transition={{ duration: 0.35 }}
      >
        <AnimatedCounter
          target={stat.value}
          isPercentage={stat.isPercentage}
          onComplete={setComplete}
        />
        <motion.span
          className="stat-suffix"
          animate={{ color: numColor }}
          transition={{ duration: 0.35 }}
        >
          {stat.suffix}
        </motion.span>
      </motion.div>

      {/* Underline bar */}
      <div className="stat-underline">
        <motion.div
          className="stat-underline-fill"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
          style={{ background: complete ? "#22C55E" : "#cbd5e1" }}
        />
      </div>

      {/* Label + desc */}
      <h3 className="stat-label">{stat.label}</h3>
      <p className="stat-desc">{stat.desc}</p>

      {/* Pipe divider */}
      {!isLast && <div className="stat-pipe" />}
    </div>
  );
}

export default function StatsStrip() {
  return (
    <section className="global-section stats-section">
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="stats-bg-dots"
      />

      <div className="section-container stats-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="stats-header"
        >
          <h2 className="stats-heading">Real results you can see</h2>
          <p className="stats-subheading">
            Real numbers from real car rental owners using Aiaura AI
          </p>
        </motion.div>

        {/* Grid */}
        <div className="stats-grid-wrapper">
          {/* Row 1: 3 cards */}
          <div className="stats-row stats-row-3">
            {STATS.slice(0, 3).map((stat, i) => (
              <motion.div
                key={i}
                className="stat-cell"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
              >
                <StatCard stat={stat} index={i} isLast={i === 2} />
              </motion.div>
            ))}
          </div>

          {/* Row 2: 2 cards */}
          <div className="stats-row stats-row-2">
            {STATS.slice(3, 5).map((stat, i) => (
              <motion.div
                key={i + 3}
                className="stat-cell"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 3) * 0.09 }}
              >
                <StatCard stat={stat} index={i + 3} isLast={i === 1} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .stats-section {
          background: #ffffff;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: clamp(36px, 5vw, 64px);
          padding-bottom: clamp(36px, 5vw, 64px);
        }

        .stats-bg-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #22C55E 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.04;
          pointer-events: none;
        }

        .stats-inner {
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .stats-header {
          text-align: center;
          margin-bottom: clamp(24px, 3vw, 40px);
        }

        .stats-heading {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 700;
          font-size: clamp(20px, 3vw, 28px);
          color: #0f172a;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }

        .stats-subheading {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(12px, 1.4vw, 14px);
          color: #94a3b8;
          margin: 0;
        }

        /* ── Grid ── */
        .stats-grid-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
        }

        .stats-row {
          display: flex;
          width: 100%;
        }

        .stats-row-3 .stat-cell {
          flex: 1 1 0;
          min-width: 0;
        }

        .stats-row-2 {
          justify-content: center;
        }
        .stats-row-2 .stat-cell {
          flex: 0 0 33.333%;
          max-width: 33.333%;
        }

        /* ── Stat cell ── */
        .stat-cell {
          position: relative;
        }

        .stat-item {
          position: relative;
          padding: clamp(18px, 2.5vw, 32px) clamp(12px, 2vw, 24px);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Pipe: vertical separator on right edge */
        .stat-pipe {
          position: absolute;
          right: 0;
          top: 18%;
          height: 64%;
          width: 1px;
          background: linear-gradient(to bottom,
            transparent 0%,
            #e2e8f0 25%,
            #e2e8f0 75%,
            transparent 100%
          );
        }

        /* ── Number ── */
        .stat-number {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 700;
          font-size: clamp(34px, 5vw, 54px);
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 10px;
          display: flex;
          align-items: baseline;
          gap: 1px;
        }

        .stat-suffix {
          font-size: 0.6em;
          font-weight: 700;
        }

        /* ── Underline bar ── */
        .stat-underline {
          width: 40px;
          height: 2px;
          background: #f1f5f9;
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .stat-underline-fill {
          height: 100%;
          border-radius: 2px;
          transition: background 0.4s ease;
        }

        /* ── Label & desc ── */
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: clamp(11px, 1.4vw, 13px);
          color: #334155;
          margin: 0 0 4px;
          line-height: 1.3;
        }

        .stat-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(9px, 1.1vw, 11px);
          color: #94a3b8;
          margin: 0;
          line-height: 1.3;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .stats-row-2 {
            justify-content: stretch;
          }
          .stats-row-2 .stat-cell {
            flex: 1 1 0;
            max-width: none;
          }

          .stat-item {
            padding: 14px 6px;
          }

          .stat-number {
            font-size: 24px !important;
            margin-bottom: 7px !important;
          }

          .stat-underline {
            width: 28px;
            margin-bottom: 7px;
          }

          .stat-label {
            font-size: 10px !important;
          }

          .stat-desc {
            font-size: 8px !important;
          }

          .stat-pipe {
            top: 12%;
            height: 76%;
          }
        }

        /* ── Desktop: single row ── */
        @media (min-width: 1025px) {
          .stats-grid-wrapper {
            flex-direction: row;
            flex-wrap: nowrap;
          }
          .stats-row {
            display: contents;
          }
          .stats-row-2 .stat-cell,
          .stats-row-3 .stat-cell {
            flex: 1 1 0;
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}