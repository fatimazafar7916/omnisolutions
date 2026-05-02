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
    const dur      = 1600;
    const startVal = 0;
    let startTime  = null;

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

  const displayValue =
    target < 10 && !isPercentage ? count.toFixed(1) : Math.floor(count);

  return <span ref={ref}>{displayValue}</span>;
}

function StatCard({ stat, index }) {
  const [complete, setComplete] = useState(false);

  return (
    <div className="stat-item">
      {/* CSS class toggle — no Framer Motion inline style competing with CSS */}
      <div className={`stat-number${complete ? " stat-number--done" : ""}`}>
        <AnimatedCounter
          target={stat.value}
          isPercentage={stat.isPercentage}
          onComplete={setComplete}
        />
        <span className="stat-suffix">{stat.suffix}</span>
      </div>

      <div className="stat-underline">
        <motion.div
          className={`stat-underline-fill${complete ? " stat-underline-fill--done" : ""}`}
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>

      <h3 className="stat-label">{stat.label}</h3>
      <p className="stat-desc">{stat.desc}</p>
    </div>
  );
}

export default function StatsStrip() {
  return (
    <section className="stats-section">
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="stats-bg-dots"
      />

      <div className="stats-inner">
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

        {/*
          LAYOUT — matches the image:
            Mobile  → Row1: 3 equal cols | Row2: 2 equal cols (each 50%)
            Desktop → all 5 in one single row via display:contents
        */}
        <div className="stats-grid-wrapper">

          {/* ── Row 1: 3 cards ── */}
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
                {i < 2 && <div className="stat-pipe" />}
                <StatCard stat={stat} index={i} />
              </motion.div>
            ))}
          </div>

          {/* ── Row 2: 2 cards ── */}
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
                {i < 1 && <div className="stat-pipe" />}
                <StatCard stat={stat} index={i + 3} />
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .stats-section {
          background: #ffffff;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: clamp(36px, 5vw, 64px) 0;
          box-sizing: border-box;
          width: 100%;
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
          max-width: 1200px;
          box-sizing: border-box;
        }

        /* ── Header ── */
        .stats-header {
          text-align: center;
          margin-bottom: clamp(24px, 3vw, 40px);
          padding: 0 16px;
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

        /* ── Grid wrapper: column on mobile, row on desktop ── */
        .stats-grid-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* ── Each row is a flex container ── */
        .stats-row {
          display: flex;
          width: 100%;
        }

        /* Row 1: 3 equal columns — flex:1 1 0 gives equal thirds */
        .stats-row-3 .stat-cell {
          flex: 1 1 0;
          min-width: 0;
        }

        /*
          FIX — Row 2: exactly 2 equal columns = 50% each.
          Original bugs fixed here:
            ✗ flex: 0 0 33.333%  → ✓ flex: 1 1 0
            ✗ max-width: 33.333% → ✓ max-width: 50%
            ✗ justify-content: center (dead space) → ✓ flex-start
            ✗ justify-content: stretch (invalid)   → removed
        */
        .stats-row-2 {
          justify-content: flex-start;
        }
        .stats-row-2 .stat-cell {
          flex: 1 1 0;
          max-width: 50%;
          min-width: 0;
        }

        /* ── Stat cell ── */
        .stat-cell {
          position: relative;
          box-sizing: border-box;
        }

        /* ── Pipe divider ── */
        .stat-pipe {
          position: absolute;
          right: 0;
          top: 18%;
          height: 64%;
          width: 1px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            #e2e8f0 25%,
            #e2e8f0 75%,
            transparent 100%
          );
          z-index: 1;
        }

        /* ── Stat item ── */
        .stat-item {
          padding: clamp(14px, 2.5vw, 32px) clamp(6px, 2vw, 24px);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
          overflow: hidden;
        }

        /*
          FIX — stat-number: CSS-only color via class toggle.
          No Framer Motion animate={{ color }} inline style = no specificity war.
          font-size clamp floor lowered to 20px so it fits in ~33vw cells.
        */
        .stat-number {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 700;
          font-size: clamp(20px, 5vw, 54px);
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 10px;
          display: flex;
          align-items: baseline;
          gap: 1px;
          color: #0f172a;
          transition: color 0.35s ease;
        }

        .stat-number--done {
          color: #22C55E;
        }

        .stat-suffix {
          font-size: 0.6em;
          font-weight: 700;
        }

        /* ── Underline bar ── */
        .stat-underline {
          width: 32px;
          height: 2px;
          background: #f1f5f9;
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 8px;
          flex-shrink: 0;
        }

        .stat-underline-fill {
          height: 100%;
          border-radius: 2px;
          background: #cbd5e1;
          transition: background 0.4s ease;
        }

        .stat-underline-fill--done {
          background: #22C55E;
        }

        /* ── Label ── */
        .stat-label {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 600;
          font-size: clamp(9px, 1.4vw, 13px);
          color: #334155;
          margin: 0 0 4px;
          line-height: 1.3;
          letter-spacing: -0.01em;
          word-break: break-word;
          hyphens: auto;
        }

        /* ── Desc ── */
        .stat-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(8px, 1.1vw, 11px);
          color: #94a3b8;
          margin: 0;
          line-height: 1.3;
          word-break: break-word;
        }

        /* ── Desktop: collapse to single 5-col row ── */
        @media (min-width: 1025px) {
          .stats-grid-wrapper {
            flex-direction: row;
          }

          /* display:contents pulls cells out of their row
             into the parent flex row — all 5 in one line */
          .stats-row {
            display: contents;
          }

          .stats-row-3 .stat-cell,
          .stats-row-2 .stat-cell {
            flex: 1 1 0;
            max-width: none;
          }

          .stat-item {
            padding: clamp(24px, 2.5vw, 32px) clamp(16px, 2vw, 24px);
          }

          .stat-number {
            font-size: clamp(36px, 3.5vw, 54px);
            margin-bottom: 10px;
          }

          .stat-underline {
            width: 40px;
            margin-bottom: 10px;
          }

          .stat-label {
            font-size: clamp(11px, 1.4vw, 13px);
          }

          .stat-desc {
            font-size: clamp(9px, 1.1vw, 11px);
          }
        }
      `}</style>
    </section>
  );
}