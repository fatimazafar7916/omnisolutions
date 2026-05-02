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
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const animationRef = useRef(null);

  const startAnimation = () => {
    const dur = 1600;
    const startVal = 0;
    let startTime = null;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / dur, 1);
      const eased = easeOut(progress);
      const current = startVal + (target - startVal) * eased;
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

  const displayValue = target < 10 && !isPercentage ? count.toFixed(1) : Math.floor(count);

  return <span ref={ref}>{displayValue}</span>;
}

function StatCard({ stat, index }) {
  const [complete, setComplete] = useState(false);

  return (
    <div className="stat-item">
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
    <section className="stats-section" style={{ padding: '20px 0', margin: 0 }}>
      <div className="stats-inner">
        <div className="stats-header">
          <h2 className="stats-heading">Real results you can see</h2>
          <p className="stats-subheading">Real numbers from real car rental owners using Aiaura AI</p>
        </div>

        <div className="stats-grid">
          {/* Row 1: 3 cards */}
          <div className="stats-row">
            {STATS.slice(0, 3).map((stat, i) => (
              <div key={i} className="stat-cell">
                {i < 2 && <div className="stat-divider" />}
                <StatCard stat={stat} index={i} />
              </div>
            ))}
          </div>

          {/* Row 2: 2 cards - hidden on mobile */}
          <div className="stats-row stats-row-2">
            {STATS.slice(3, 5).map((stat, i) => (
              <div key={i + 3} className="stat-cell">
                {i < 1 && <div className="stat-divider" />}
                <StatCard stat={stat} index={i + 3} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .stats-section {
          background: #ffffff !important;
          width: 100% !important;
          box-sizing: border-box !important;
          position: relative !important;
        }

        .stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .stats-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .stats-heading {
          font-family: 'Georgia', serif;
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }

        .stats-subheading {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #94a3b8;
          margin: 0;
        }

        .stats-grid {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 0;
        }

        .stats-row {
          display: flex;
          width: 100%;
          gap: 0;
          margin: 0;
        }

        .stats-row .stat-cell {
          flex: 1 1 33.333%;
          width: 33.333%;
          max-width: 33.333%;
          min-width: 0;
          position: relative;
          box-sizing: border-box;
        }

        .stats-row-2 .stat-cell {
          flex: 1 1 50%;
          width: 50%;
          max-width: 50%;
        }

        .stat-divider {
          position: absolute;
          right: 0;
          top: 15%;
          height: 70%;
          width: 1px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            #e2e8f0 20%,
            #e2e8f0 80%,
            transparent 100%
          );
          z-index: 1;
        }

        .stat-item {
          padding: 16px 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 140px;
          box-sizing: border-box;
        }

        .stat-number {
          font-family: 'Georgia', serif;
          font-size: clamp(16px, 2.5vw, 22px);
          font-weight: 700;
          color: #0f172a;
          line-height: 1;
          margin-bottom: 8px;
          display: flex;
          align-items: baseline;
          gap: 2px;
          transition: color 0.35s ease;
        }

        .stat-number--done {
          color: #22C55E;
        }

        .stat-suffix {
          font-size: 0.6em;
          font-weight: 700;
        }

        .stat-underline {
          width: 32px;
          height: 3px;
          background: #f1f5f9;
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .stat-underline-fill {
          height: 100%;
          background: #cbd5e1;
          border-radius: 2px;
          transition: background 0.4s ease;
        }

        .stat-underline-fill--done {
          background: #22C55E;
        }

        .stat-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(10px, 1.5vw, 11px);
          font-weight: 600;
          color: #334155;
          margin: 0 0 4px;
          line-height: 1.3;
        }

        .stat-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(9px, 1.2vw, 10px);
          color: #94a3b8;
          margin: 0;
          line-height: 1.3;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .stats-heading {
            font-size: 24px;
          }
          .stats-subheading {
            font-size: 13px;
          }
          .stat-item {
            padding: 14px 10px;
            min-height: 130px;
          }
          /* Hide row 2 on mobile */
          .stats-row-2 {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .stats-header {
            margin-bottom: 16px;
          }
          .stats-heading {
            font-size: 22px;
            margin: 0 0 6px;
          }
          .stats-subheading {
            font-size: 12px;
          }
          .stat-underline {
            width: 28px;
            height: 2px;
            margin-bottom: 6px;
          }
          .stat-item {
            padding: 12px 8px;
            min-height: 120px;
          }
          /* Hide row 2 on mobile */
          .stats-row-2 {
            display: none !important;
          }
        }

        /* Desktop: single row */
        @media (min-width: 1025px) {
          .stats-grid {
            flex-direction: row;
          }
          .stats-row {
            display: contents;
          }
          .stats-row .stat-cell,
          .stats-row-2 .stat-cell {
            flex: 1 1 20%;
            width: auto;
            max-width: none;
          }
          .stat-item {
            padding: 20px 16px;
            min-height: 160px;
          }
          .stat-underline {
            width: 36px;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </section>
  );
}
