import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MessageSquare, DollarSign, RefreshCw,
  Star, TrendingUp, BarChart2, Heart, ArrowRight,
  Zap, CheckCircle2, ChevronRight,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1, name: "AI Receptionist", category: "Voice AI", icon: Mic,
    color: "#7B74DC", colorLight: "#F5F3FF", colorBorder: "#C4B5FD",
    features: ["Attends calls 24/7","Supports multiple languages","Speaks the user's language","Handles 100 calls at once","Answers within 3 seconds","Transfers important calls to team members"],
    stat: "100", statSuffix: " calls", statLabel: "simultaneously",
  },
  {
    id: 2, name: "AI Email + Text Marketing", category: "Messaging AI", icon: MessageSquare,
    color: "#0891B2", colorLight: "#ECFEFF", colorBorder: "#A5F3FC",
    features: ["Responds to DMs in 8 seconds","Works on Instagram & WhatsApp","Sends pricing automatically","Shares availability instantly","Follows up until conversion","Personalizes every message"],
    stat: "8", statSuffix: "s", statLabel: "response time",
  },
  {
    id: 3, name: "AI Follow-up Assistant", category: "Sales AI", icon: DollarSign,
    color: "#059669", colorLight: "#ECFDF5", colorBorder: "#6EE7B7",
    features: ["Follows up on quotes automatically","Recovers abandoned bookings","Nurtures cold leads persistently","Sends personalized messages","Tracks engagement levels","Converts 4x more leads"],
    stat: "4x", statSuffix: "", statLabel: "more conversions",
  },
  {
    id: 4, name: "AI Lead Qualifier", category: "Sales AI", icon: DollarSign,
    color: "#D97706", colorLight: "#FFFBEB", colorBorder: "#FDE68A",
    features: ["Qualifies leads instantly","Scores prospects automatically","Routes hot leads to sales","Nurtures cold leads","Recovers $420K revenue yearly","Works 24/7 without breaks"],
    stat: "$420K", statSuffix: "", statLabel: "recovered yearly",
  },
  {
    id: 5, name: "AI Review Manager", category: "Reputation AI", icon: Star,
    color: "#DB2777", colorLight: "#FDF2F8", colorBorder: "#F9A8D4",
    features: ["Monitors Google & Yelp reviews","Responds to reviews instantly","Escalates negative feedback","Requests reviews from happy clients","Maintains 4.1+ star rating","Prevents 22x booking loss"],
    stat: "4.1★", statSuffix: "", statLabel: "rating maintained",
  },
  {
    id: 6, name: "AI Omnichannel Responder", category: "Messaging AI", icon: MessageSquare,
    color: "#7C3AED", colorLight: "#F5F3FF", colorBorder: "#C4B5FD",
    features: ["Manages all communication channels","Unifies calls, DMs, emails, SMS","Never misses a lead","Provides 100% channel coverage","Works from one AI inbox","Eliminates channel blindspots"],
    stat: "100%", statSuffix: "", statLabel: "channel coverage",
  },
  {
    id: 7, name: "AI Quote & Booking Assistant", category: "Sales AI", icon: DollarSign,
    color: "#0D9488", colorLight: "#F0FDFA", colorBorder: "#99F6E4",
    features: ["Generates quotes in real-time","Considers fleet availability","Adjusts for seasonal demand","Personalizes customer pricing","Sends quotes in under 1 minute","12x faster than manual process"],
    stat: "12x", statSuffix: "", statLabel: "faster quoting",
  },
  {
    id: 8, name: "AI Upsell Assistant", category: "Revenue AI", icon: TrendingUp,
    color: "#EA580C", colorLight: "#FFF7ED", colorBorder: "#FED7AA",
    features: ["Offers insurance upgrades","Suggests GPS add-ons","Recommends child seats","Proposes chauffeur services","Sends SMS before pickup","Captures $280 avg per rental"],
    stat: "$280", statSuffix: "", statLabel: "avg per rental",
  },
  {
    id: 9, name: "AI VIP & Relationship Manager", category: "Retention AI", icon: Heart,
    color: "#DC2626", colorLight: "#FEF2F2", colorBorder: "#FECACA",
    features: ["Tracks past rental history","Sends birthday offers","Creates seasonal promotions","Runs 'we miss you' campaigns","Builds customer loyalty","Drives 3.2x repeat bookings"],
    stat: "3.2x", statSuffix: "", statLabel: "repeat bookings",
  },
  {
    id: 10, name: "AI Customer Support 24/7", category: "Operations AI", icon: RefreshCw,
    color: "#0891B2", colorLight: "#ECFEFF", colorBorder: "#A5F3FC",
    features: ["Sends rental agreements","Collects digital signatures","Verifies customer IDs","Confirms insurance coverage","Eliminates onboarding friction","Reduces drop-off by 82%"],
    stat: "82%", statSuffix: "", statLabel: "less drop-off",
  },
  {
    id: 11, name: "AI Website Chatbot", category: "Operations AI", icon: RefreshCw,
    color: "#7B74DC", colorLight: "#F5F3FF", colorBorder: "#C4B5FD",
    features: ["Engages website visitors instantly","Answers questions 24/7","Collects contact information","Books rentals automatically","Works while you sleep","Captures 82% after-hours inquiries"],
    stat: "82%", statSuffix: "", statLabel: "after-hours captured",
  },
  {
    id: 12, name: "AI Business Manager", category: "Analytics AI", icon: BarChart2,
    color: "#059669", colorLight: "#ECFDF5", colorBorder: "#6EE7B7",
    features: ["Tracks all lead sources","Monitors conversion rates","Analyzes revenue per channel","Reports AI performance","Updates data in real-time","Reveals 38% hidden revenue"],
    stat: "38%", statSuffix: "", statLabel: "hidden revenue found",
  },
];

const CATEGORIES = ["All","Voice AI","Messaging AI","Sales AI","Reputation AI","Revenue AI","Retention AI","Operations AI","Analytics AI"];

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.sg-wrap { background: #FCFCFE; font-family: 'DM Sans', system-ui, sans-serif; color: #141419; position: relative; overflow: hidden; }

/* subtle dot grid */
.sg-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(123,116,220,0.12) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
}

.sg-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 40px 120px;
  position: relative;
  z-index: 1;
}

/* ── Header ── */
.sg-head { text-align: center; margin-bottom: 56px; }

.sg-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(123,116,220,0.08);
  border: 1px solid rgba(123,116,220,0.22);
  border-radius: 100px;
  padding: 5px 16px 5px 10px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #7B74DC;
  margin-bottom: 28px;
}

.sg-eyebrow-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #7B74DC;
  animation: sg-breathe 3s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}

@keyframes sg-breathe {
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(0.75); }
}

.sg-h2 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(44px, 6vw, 80px);
  font-weight: 900;
  line-height: 0.97;
  letter-spacing: -0.04em;
  color: #141419;
  margin-bottom: 20px;
}

.sg-h2 em {
  font-style: italic;
  font-weight: 800;
  color: #7B74DC;
}

.sg-sub {
  font-size: 17px;
  line-height: 1.65;
  color: #6E6D7A;
  max-width: 500px;
  margin: 0 auto 32px;
}

.sg-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.sg-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  border: 1px solid #E3E2EB;
  border-radius: 100px;
  padding: 6px 14px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: #6E6D7A;
  letter-spacing: 0.06em;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.sg-badge svg { color: #7B74DC; flex-shrink: 0; }

/* ── Filter tabs ── */
.sg-filters {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 52px;
  flex-wrap: wrap;
}

.sg-ftab {
  background: #fff;
  border: 1px solid #E3E2EB;
  border-radius: 100px;
  padding: 7px 18px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6E6D7A;
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.sg-ftab:hover { border-color: #7B74DC; color: #7B74DC; background: rgba(123,116,220,0.04); }
.sg-ftab.on { background: #7B74DC; border-color: #7B74DC; color: #fff; box-shadow: 0 4px 14px rgba(123,116,220,0.3); }

/* ── Grid ── */
.sg-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 72px;
}

/* ── Card ── */
.sg-card {
  background: #fff;
  border: 1px solid #E3E2EB;
  border-radius: 20px;
  padding: 24px 20px 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: default;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.sg-card:hover {
  transform: translateY(-3px);
  border-color: var(--c);
  box-shadow: 0 12px 40px -8px var(--cg);
}

/* top accent line */
.sg-card-line {
  position: absolute;
  top: 0; left: 16%; right: 16%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--c), transparent);
  border-radius: 0 0 4px 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.sg-card:hover .sg-card-line { opacity: 1; }



/* icon */
.sg-card-icon {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: transform 0.25s ease;
}
.sg-card:hover .sg-card-icon { transform: scale(1.1); }

/* category */
.sg-card-cat {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 6px;
  font-weight: 500;
}

/* name */
.sg-card-name {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: #141419;
  margin-bottom: 16px;
}

/* stat box */
.sg-card-stat {
  display: flex;
  align-items: baseline;
  gap: 5px;
  padding: 10px 12px;
  border-radius: 10px;
  margin-bottom: 16px;
  border: 1px solid var(--cb);
  transition: background 0.25s ease;
}
.sg-card:hover .sg-card-stat { background: var(--cl) !important; }

.sg-card-stat-num {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
}

.sg-card-stat-lbl {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  color: #6E6D7A;
  letter-spacing: 0.06em;
  line-height: 1.4;
}

/* ── Ticker row ── */
.sg-ticker-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #FAFAFA;
  border: 1px solid #EEECF8;
  border-radius: 10px;
  min-height: 40px;
  overflow: hidden;
  flex: 1;
}

.sg-ticker-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sg-ticker-text {
  font-size: 12px;
  color: #3D3C47;
  line-height: 1.35;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* progress bar under ticker */
.sg-ticker-bar-wrap {
  height: 2px;
  background: #EEECF8;
  border-radius: 2px;
  margin-top: 6px;
  overflow: hidden;
}

.sg-ticker-bar-fill {
  height: 100%;
  width: 100%;
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left center;
  animation: sg-bar-fill var(--tick-ms, 2600ms) linear forwards;
}

@keyframes sg-bar-fill {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* wide card */
.sg-card-wide { grid-column: span 2; }

/* ── CTA block ── */
.sg-cta {
  background: #141419;
  border-radius: 20px;
  padding: 52px 56px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 40px;
  position: relative;
  overflow: hidden;
}

.sg-cta::before {
  content: '';
  position: absolute;
  top: -120px; right: -120px;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(123,116,220,0.2) 0%, transparent 65%);
  pointer-events: none;
}

.sg-cta::after {
  content: '12';
  position: absolute;
  right: 56px; bottom: -24px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 180px;
  font-weight: 900;
  letter-spacing: -0.06em;
  color: rgba(255,255,255,0.04);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.sg-cta-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #7B74DC;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.sg-cta-tag::before { content:''; display:block; width:18px; height:1px; background:#7B74DC; }

.sg-cta-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(28px, 3.5vw, 46px);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: #fff;
}

.sg-cta-title span { color: #7B74DC; }

.sg-cta-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.sg-cta-note {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: rgba(255,255,255,0.38);
  text-align: right;
  line-height: 1.7;
}

.sg-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: #7B74DC;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  padding: 14px 26px;
  cursor: pointer;
  transition: all 0.22s ease;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(123,116,220,0.35);
}

.sg-btn:hover {
  background: #6B63CC;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(123,116,220,0.45);
}

/* ── Responsive ── */

/* Tablet landscape */
@media (max-width: 1100px) {
  .sg-grid { grid-template-columns: repeat(3, 1fr); }
  .sg-card-wide { grid-column: span 2; }
}

/* Tablet portrait */
@media (max-width: 768px) {
  .sg-inner { padding: 64px 20px 88px; }

  /* header */
  .sg-head { margin-bottom: 40px; }
  .sg-eyebrow { font-size: 9px; padding: 5px 14px 5px 9px; margin-bottom: 20px; }
  .sg-h2 { font-size: clamp(36px, 9vw, 56px); margin-bottom: 14px; }
  .sg-sub { font-size: 15px; margin-bottom: 24px; }
  .sg-badges { gap: 7px; }
  .sg-badge { font-size: 9px; padding: 5px 11px; }

  /* filters — horizontal scroll on mobile */
  .sg-filters {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 4px;
    margin-bottom: 36px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .sg-filters::-webkit-scrollbar { display: none; }
  .sg-ftab { flex-shrink: 0; padding: 7px 16px; font-size: 9px; }

  /* grid */
  .sg-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 48px; }
  .sg-card-wide { grid-column: span 2; }

  /* card internals */
  .sg-card { padding: 18px 16px 16px; border-radius: 16px; }
  .sg-card-idx { top: 14px; right: 14px; font-size: 9px; }
  .sg-card-icon { width: 36px; height: 36px; border-radius: 9px; }
  .sg-card-cat { font-size: 8px; }
  .sg-card-name { font-size: 13px; }
  .sg-card-stat { padding: 8px 10px; margin-bottom: 10px; }
  .sg-card-stat-num { font-size: 20px; }
  .sg-card-stat-lbl { font-size: 8px; }
  .sg-ticker-row { padding: 8px 10px; min-height: 36px; }
  .sg-ticker-text { font-size: 11px; }

  /* CTA */
  .sg-cta { grid-template-columns: 1fr; padding: 32px 24px; gap: 20px; border-radius: 16px; }
  .sg-cta::before { width: 260px; height: 260px; top: -80px; right: -80px; }
  .sg-cta::after { display: none; }
  .sg-cta-tag { font-size: 9px; margin-bottom: 10px; }
  .sg-cta-title { font-size: clamp(24px, 6vw, 34px); }
  .sg-cta-right { align-items: flex-start; }
  .sg-cta-note { text-align: left; font-size: 10px; }
  .sg-btn { font-size: 13px; padding: 13px 22px; border-radius: 10px; }
}

/* Mobile */
@media (max-width: 480px) {
  .sg-inner { padding: 52px 16px 72px; }

  /* header */
  .sg-h2 { font-size: clamp(32px, 10vw, 44px); }
  .sg-sub { font-size: 14px; }
  .sg-badges { gap: 6px; }

  /* single column grid */
  .sg-grid { grid-template-columns: 1fr; gap: 8px; margin-bottom: 36px; }
  .sg-card-wide { grid-column: span 1; }

  /* card — full width, comfortable touch target */
  .sg-card { padding: 16px 14px 14px; border-radius: 14px; }
  .sg-card-name { font-size: 14px; }
  .sg-card-stat-num { font-size: 22px; }
  .sg-ticker-text { font-size: 12px; }
  .sg-ticker-row { min-height: 38px; }

  /* CTA */
  .sg-cta { padding: 28px 20px; gap: 18px; border-radius: 14px; }
  .sg-cta-title { font-size: clamp(22px, 7vw, 30px); }
  .sg-btn { width: 100%; justify-content: center; }
}
`;

// ─── Feature Ticker ───────────────────────────────────────────────────────────

const TICK_DURATION = 2600; // ms per feature

function FeatureTicker({ features, color }) {
  const [idx, setIdx] = useState(0);

  // Reset index when the feature list changes (filter switch)
  useEffect(() => { setIdx(0); }, [features]);

  // Advance index on each tick
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % features.length),
      TICK_DURATION
    );
    return () => clearInterval(t);
  }, [features.length]);

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* animated text line */}
      <div className="sg-ticker-row">
        <span className="sg-ticker-dot" style={{ background: color }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            className="sg-ticker-text"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {features[idx]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* progress bar — pure CSS linear fill, restarted via key */}
      <div className="sg-ticker-bar-wrap">
        <div
          key={`${idx}-${color}`}
          className="sg-ticker-bar-fill"
          style={{
            background: color,
            "--tick-ms": `${TICK_DURATION}ms`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProductCard({ product, index, wide }) {
  const Icon = product.icon;

  return (
    <motion.div
      className={`sg-card${wide ? " sg-card-wide" : ""}`}
      style={{
        "--c":  product.color,
        "--cg": `${product.color}40`,
        "--cl": product.colorLight,
        "--cb": product.colorBorder,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="sg-card-line" />

      {/* icon + category + name row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
        <div className="sg-card-icon">
          <Icon size={22} strokeWidth={1.9} style={{ color: product.color }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="sg-card-cat" style={{ color: product.color, marginBottom: 4 }}>{product.category}</div>
          <div className="sg-card-name" style={{ marginBottom: 0 }}>{product.name}</div>
        </div>
      </div>

      {/* stat box */}
      <div className="sg-card-stat" style={{ background: "#FAFAFA", marginBottom: 12 }}>
        <span className="sg-card-stat-num" style={{ color: product.color }}>
          {product.stat}{product.statSuffix}
        </span>
        <span className="sg-card-stat-lbl">{product.statLabel}</span>
      </div>

      {/* animated feature ticker */}
      <FeatureTicker features={product.features} color={product.color} />
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SolutionsGrid() {
  const [active, setActive] = useState("All");

  const list = active === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === active);

  return (
    <>
      <style>{styles}</style>
      <div className="sg-wrap">
        <div className="sg-inner">

          {/* Header */}
          <motion.div
            className="sg-head"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sg-eyebrow">
              <span className="sg-eyebrow-dot" />
              The Complete AI Stack
            </div>

            <h2 className="sg-h2">
              12 AI&nbsp;<em>Employees.</em>
            </h2>

            <p className="sg-sub">
              Every touchpoint covered. Every lead captured. Every booking
              closed — around the clock, without a single hire.
            </p>

            <div className="sg-badges">
              <span className="sg-badge"><Zap size={10} /> Always on · 24/7</span>
              <span className="sg-badge"><CheckCircle2 size={10} /> 12 tools · one subscription</span>
              <span className="sg-badge"><ChevronRight size={10} /> No per-tool pricing</span>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="sg-filters"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`sg-ftab${active === cat ? " on" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="sg-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {list.map((product, index) => {
                const wide = active === "All" && (index === 4 || index === 9);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    wide={wide}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            className="sg-cta"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <div className="sg-cta-tag">Ready to automate?</div>
              <div className="sg-cta-title">
                All 12 tools.<br />
                <span>One price.</span>
              </div>
            </div>

            <div className="sg-cta-right">
              <p className="sg-cta-note">
                No per-tool pricing.<br />
                No hidden fees. Cancel anytime.
              </p>
              <button className="sg-btn">
                Start Free Trial
                <ArrowRight size={14} strokeWidth={2.2} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
