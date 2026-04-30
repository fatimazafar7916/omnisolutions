import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MessageSquare,
  DollarSign,
  RefreshCw,
  Star,
  TrendingUp,
  BarChart2,
  Heart,
  Sparkles,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: "AI Receptionist",
    category: "Voice AI",
    icon: Mic,
    features: [
      "Attends calls 24/7",
      "Supports multiple languages",
      "Speaks the user's language",
      "Handles 100 calls at once",
      "Answers within 3 seconds",
      "Transfers important calls to team members"
    ]
  },
  {
    id: 2,
    name: "AI Email + Text Marketing",
    category: "Messaging AI",
    icon: MessageSquare,
    features: [
      "Responds to DMs in 8 seconds",
      "Works on Instagram & WhatsApp",
      "Sends pricing automatically",
      "Shares availability instantly",
      "Follows up until conversion",
      "Personalizes every message"
    ]
  },
  {
    id: 3,
    name: "AI Follow-up Assistant",
    category: "Sales AI",
    icon: DollarSign,
    features: [
      "Follows up on quotes automatically",
      "Recovers abandoned bookings",
      "Nurtures cold leads persistently",
      "Sends personalized messages",
      "Tracks engagement levels",
      "Converts 4x more leads"
    ]
  },
  {
    id: 4,
    name: "AI Lead Qualifier",
    category: "Sales AI",
    icon: DollarSign,
    features: [
      "Qualifies leads instantly",
      "Scores prospects automatically",
      "Routes hot leads to sales",
      "Nurtures cold leads",
      "Recovers $420K revenue yearly",
      "Works 24/7 without breaks"
    ]
  },
  {
    id: 5,
    name: "AI Review Manager",
    category: "Reputation AI",
    icon: Star,
    features: [
      "Monitors Google & Yelp reviews",
      "Responds to reviews instantly",
      "Escalates negative feedback",
      "Requests reviews from happy clients",
      "Maintains 4.1+ star rating",
      "Prevents 22x booking loss"
    ]
  },
  {
    id: 6,
    name: "AI Omnichannel Responder",
    category: "Messaging AI",
    icon: MessageSquare,
    features: [
      "Manages all communication channels",
      "Unifies calls, DMs, emails, SMS",
      "Never misses a lead",
      "Provides 100% channel coverage",
      "Works from one AI inbox",
      "Eliminates channel blindspots"
    ]
  },
  {
    id: 7,
    name: "AI Quote & Booking Assistant",
    category: "Sales AI",
    icon: DollarSign,
    features: [
      "Generates quotes in real-time",
      "Considers fleet availability",
      "Adjusts for seasonal demand",
      "Personalizes customer pricing",
      "Sends quotes in under 1 minute",
      "12x faster than manual process"
    ]
  },
  {
    id: 8,
    name: "AI Upsell Assistant",
    category: "Revenue AI",
    icon: TrendingUp,
    features: [
      "Offers insurance upgrades",
      "Suggests GPS add-ons",
      "Recommends child seats",
      "Proposes chauffeur services",
      "Sends SMS before pickup",
      "Captures $280 avg per rental"
    ]
  },
  {
    id: 9,
    name: "AI VIP & Relationship Manager",
    category: "Retention AI",
    icon: Heart,
    features: [
      "Tracks past rental history",
      "Sends birthday offers",
      "Creates seasonal promotions",
      "Runs 'we miss you' campaigns",
      "Builds customer loyalty",
      "Drives 3.2x repeat bookings"
    ]
  },
  {
    id: 10,
    name: "AI Customer Support 24/7",
    category: "Operations AI",
    icon: RefreshCw,
    features: [
      "Sends rental agreements",
      "Collects digital signatures",
      "Verifies customer IDs",
      "Confirms insurance coverage",
      "Eliminates onboarding friction",
      "Reduces drop-off by 82%"
    ]
  },
  {
    id: 11,
    name: "AI Website Chatbot",
    category: "Operations AI",
    icon: RefreshCw,
    features: [
      "Engages website visitors instantly",
      "Answers questions 24/7",
      "Collects contact information",
      "Books rentals automatically",
      "Works while you sleep",
      "Captures 82% after-hours inquiries"
    ]
  },
  {
    id: 12,
    name: "AI Business Manager",
    category: "Analytics AI",
    icon: BarChart2,
    features: [
      "Tracks all lead sources",
      "Monitors conversion rates",
      "Analyzes revenue per channel",
      "Reports AI performance",
      "Updates data in real-time",
      "Reveals 38% hidden revenue"
    ]
  }
];

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink: #0a0a0a;
  --ink-2: #1a1a1a;
  --ink-3: #2a2a2a;
  --paper: #ffffff;
  --paper-2: #fafafa;
  --paper-3: #f5f5f5;
  --accent: #7B74DC;
  --accent-dim: #6B63CC;
  --accent-light: #9B94EC;
  --rule: rgba(10,10,10,0.12);
  --rule-heavy: rgba(10,10,10,0.35);
  --sans: 'Syne', sans-serif;
  --mono: 'DM Mono', monospace;
  --serif: 'Instrument Serif', serif;
}

.sg-root {
  background: var(--paper);
  font-family: var(--sans);
  color: var(--ink);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* grain overlay */
.sg-root::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 999;
  opacity: 0.6;
}

/* ── Section ── */
.sg-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 100px 48px 140px;
  position: relative;
}

/* ── Header ── */
.sg-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 80px;
  align-items: end;
  padding-bottom: 64px;
  border-bottom: 2px solid var(--rule-heavy);
  margin-bottom: 0;
}

.sg-header-left {}

.sg-kicker {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-3);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
}

.sg-kicker-line {
  display: block;
  width: 32px;
  height: 1px;
  background: var(--ink);
}

.sg-headline {
  font-family: var(--sans);
  font-size: clamp(52px, 7vw, 88px);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: var(--ink);
}

.sg-headline em {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  color: var(--ink-3);
  display: block;
}

.sg-header-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;
  padding-bottom: 4px;
}

.sg-desc {
  font-size: 17px;
  line-height: 1.65;
  color: var(--ink-3);
  max-width: 380px;
}

.sg-count-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--ink);
  color: var(--accent);
  padding: 10px 20px;
  border-radius: 100px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  width: fit-content;
}

.sg-count-pill-num {
  font-size: 22px;
  font-weight: 500;
  line-height: 1;
}

/* ── List ── */
.sg-list {
  list-style: none;
}

.sg-row {
  display: grid;
  grid-template-columns: 56px 320px 1fr auto;
  align-items: center;
  gap: 0 24px;
  padding: 22px 0;
  border-bottom: 1px solid var(--rule);
  cursor: default;
  position: relative;
  transition: background 0.2s ease;
}

.sg-row::before {
  content: '';
  position: absolute;
  left: -48px;
  right: -48px;
  top: 0;
  bottom: 0;
  background: var(--ink);
  opacity: 0;
  transition: opacity 0.25s ease;
  z-index: 0;
  pointer-events: none;
}

.sg-row:hover::before {
  opacity: 1;
}

.sg-row:hover .sg-row-num,
.sg-row:hover .sg-row-name,
.sg-row:hover .sg-row-cat {
  color: var(--paper);
}

.sg-row:hover .sg-row-feature-text {
  color: var(--accent);
}

.sg-row:hover .sg-row-dot {
  background: var(--accent);
}

.sg-row:hover .sg-icon-box {
  background: var(--accent);
  color: var(--ink);
  border-color: var(--accent);
}

/* z-index so content sits above the ::before */
.sg-row > * { position: relative; z-index: 1; }

.sg-row-left {
  display: flex;
  align-items: center;
  gap: 16px;
  grid-column: 1 / 3;
  overflow: hidden;
}

.sg-row-num {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 300;
  color: rgba(10,10,10,0.3);
  width: 28px;
  text-align: right;
  flex-shrink: 0;
  transition: color 0.25s ease;
  letter-spacing: 0.04em;
}

.sg-icon-box {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--rule-heavy);
  border-radius: 8px;
  color: var(--ink);
  flex-shrink: 0;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}

.sg-row-name {
  font-size: clamp(15px, 1.5vw, 19px);
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1.2;
  transition: color 0.25s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sg-row-middle {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  min-width: 0;
  grid-column: 3 / 4;
}

.sg-row-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(10,10,10,0.3);
  flex-shrink: 0;
  transition: background 0.25s ease;
}

.sg-row-feature-text {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--ink-3);
  white-space: nowrap;
  overflow: hidden;
  transition: color 0.25s ease;
}

.sg-row-right {
  display: flex;
  align-items: center;
  gap: 0;
  justify-content: flex-end;
}

.sg-row-cat {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(10,10,10,0.4);
  white-space: nowrap;
  transition: color 0.25s ease;
  border: 1px solid var(--rule);
  padding: 4px 10px;
  border-radius: 4px;
}

/* ── Bottom CTA ── */
.sg-cta {
  margin-top: 96px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 40px;
  padding: 48px 56px;
  background: var(--ink);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.sg-cta::before {
  content: 'ALL 12';
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--sans);
  font-size: 140px;
  font-weight: 800;
  color: rgba(255,255,255,0.04);
  letter-spacing: -0.06em;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.sg-cta-label {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 12px;
}

.sg-cta-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.sg-cta-title span {
  color: var(--accent);
}

.sg-cta-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.sg-cta-sub {
  font-family: var(--mono);
  font-size: 12px;
  color: rgba(255,255,255,0.45);
  text-align: right;
  line-height: 1.6;
}

.sg-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--accent);
  color: var(--ink);
  border: none;
  border-radius: 4px;
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  padding: 14px 28px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
  white-space: nowrap;
}

.sg-btn:hover {
  background: var(--accent-dim);
  transform: translateY(-1px);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .sg-section { padding: 64px 24px 100px; }

  .sg-header {
    grid-template-columns: 1fr;
    gap: 32px;
    padding-bottom: 48px;
  }

  .sg-header-right { max-width: 100%; }

  .sg-row {
    grid-template-columns: 40px 1fr auto;
    gap: 6px 12px;
    padding: 18px 0;
  }

  .sg-row-left {
    grid-column: 1 / 3;
    grid-row: 1;
    gap: 12px;
  }

  .sg-row-middle {
    grid-column: 1 / 3;
    grid-row: 2;
    padding-left: 52px;
  }

  .sg-row-right {
    grid-column: 3 / 4;
    grid-row: 1;
    align-items: flex-start;
    padding-top: 4px;
  }

  .sg-row::before {
    left: -24px;
    right: -24px;
  }

  .sg-cta {
    grid-template-columns: 1fr;
    padding: 36px 32px;
    gap: 24px;
  }

  .sg-cta-right {
    align-items: flex-start;
  }

  .sg-cta-sub { text-align: left; }
}

@media (max-width: 540px) {
  .sg-row-name { font-size: 15px; white-space: normal; }
  .sg-row-cat { display: none; }
}
`;

// ─── Animated Feature Text ────────────────────────────────────────────────────

function FeatureTicker({ features }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % features.length), 2800);
    return () => clearInterval(t);
  }, [features.length]);

  return (
    <div className="sg-row-middle">
      <span className="sg-row-dot" />
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          className="sg-row-feature-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          {features[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Row Component ────────────────────────────────────────────────────────────

function ProductRow({ product, index }) {
  const Icon = product.icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.li
      className="sg-row"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Left: number + icon + name */}
      <div className="sg-row-left">
        <span className="sg-row-num">{num}</span>
        <div className="sg-icon-box">
          <Icon size={16} strokeWidth={2} />
        </div>
        <span className="sg-row-name">{product.name}</span>
      </div>

      {/* Middle: animated feature */}
      <FeatureTicker features={product.features} />

      {/* Right: category badge */}
      <div className="sg-row-right">
        <span className="sg-row-cat">{product.category}</span>
      </div>
    </motion.li>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SolutionsGrid() {
  return (
    <>
      <style>{styles}</style>
      <div className="sg-root">
        <section id="solutions" className="sg-section">

          {/* ── Header ── */}
          <motion.div
            className="sg-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="sg-header-left">
              <div className="sg-kicker">
                <span className="sg-kicker-line" />
                The Complete AI Stack
              </div>
              <h2 className="sg-headline">
                12 AI
                <em>Employees.</em>
              </h2>
            </div>

            <div className="sg-header-right">
              <p className="sg-desc">
                Every touchpoint covered. Every lead captured. Every booking
                closed — around the clock, without a single hire.
              </p>
              <div className="sg-count-pill">
                <span className="sg-count-pill-num">12</span>
                tools · one subscription
              </div>
            </div>
          </motion.div>

          {/* ── Product List ── */}
          <ul className="sg-list">
            {PRODUCTS.map((product, index) => (
              <ProductRow key={product.id} product={product} index={index} />
            ))}
          </ul>

          {/* ── CTA ── */}
          <motion.div
            className="sg-cta"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div>
              <div className="sg-cta-label">Ready to automate?</div>
              <div className="sg-cta-title">
                All 12 tools.<br />
                <span>One price.</span>
              </div>
            </div>
            <div className="sg-cta-right">
              <p className="sg-cta-sub">
                No per-tool pricing.<br />
                No hidden fees. Cancel anytime.
              </p>
              <button className="sg-btn">
                Start Free Trial
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 10.5L9.5 7 5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>

        </section>
      </div>
    </>
  );
}