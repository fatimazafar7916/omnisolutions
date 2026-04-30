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

const CATEGORY_COLORS = {
  "Voice AI": { accent: "#7B74DC", bg: "#F5F3FF", text: "#4D4699" },
  "Messaging AI": { accent: "#7B74DC", bg: "#F5F3FF", text: "#4D4699" },
  "Sales AI": { accent: "#7B74DC", bg: "#F5F3FF", text: "#4D4699" },
  "Operations AI": { accent: "#7B74DC", bg: "#F5F3FF", text: "#4D4699" },
  "Reputation AI": { accent: "#7B74DC", bg: "#F5F3FF", text: "#4D4699" },
  "Revenue AI": { accent: "#7B74DC", bg: "#F5F3FF", text: "#4D4699" },
  "Analytics AI": { accent: "#7B74DC", bg: "#F5F3FF", text: "#4D4699" },
  "Retention AI": { accent: "#7B74DC", bg: "#F5F3FF", text: "#4D4699" },
};

const CATEGORY_ICONS = {
  "Voice AI": Mic,
  "Messaging AI": MessageSquare,
  "Sales AI": DollarSign,
  "Operations AI": RefreshCw,
  "Reputation AI": Star,
  "Revenue AI": TrendingUp,
  "Analytics AI": BarChart2,
  "Retention AI": Heart,
};

const PRODUCTS = [
  {
    id: 1,
    name: "AI Receptionist",
    tagline: "24/7 Voice + SMS Booking Agent",
    status: "LIVE",
    category: "Voice AI",
    desc: "Answers every call instantly — qualifies leads, books rentals, sends confirmations. Works 24/7 in your brand voice, any language.",
    impact: "Captures 73% of after-hours bookings you'd otherwise lose.",
    stat: "73%",
    statLabel: "calls answered 24/7",
    cta: "See Demo",
  },
  {
    id: 2,
    name: "AI Email + Text Marketing",
    tagline: "Instagram + WhatsApp Auto-Responder",
    status: "LIVE",
    category: "Messaging AI",
    desc: "Replies to DMs in under 8 seconds with pricing, availability, and booking links. Follows up until they convert.",
    impact: "Converts 78% more DM leads than manual replies.",
    stat: "78%",
    statLabel: "faster DM response",
    cta: "See Demo",
  },
  {
    id: 3,
    name: "AI Follow-up Assistant",
    tagline: "Smart Lead Nurture Sequences",
    status: "LIVE",
    category: "Sales AI",
    desc: "Automatically follows up on quotes, abandoned carts, and cold leads with personalized messages until they book.",
    impact: "Turns 10% quote-to-close rate into 40%.",
    stat: "4×",
    statLabel: "close rate boost",
    cta: "See Demo",
  },
  {
    id: 4,
    name: "AI Lead Qualifier",
    tagline: "Instant Lead Scoring & Routing",
    status: "LIVE",
    category: "Sales AI",
    desc: "Qualifies every inquiry instantly, scores leads, routes hot prospects to sales, nurtures cold leads automatically.",
    impact: "Recovers $420K in silent revenue loss per location per year.",
    stat: "$420K",
    statLabel: "revenue recovered",
    cta: "See Demo",
  },
  {
    id: 5,
    name: "AI Review Manager",
    tagline: "Reputation + Review Guard",
    status: "LIVE",
    category: "Reputation AI",
    desc: "Monitors reviews across Google, Yelp, and social. Responds instantly, escalates issues, requests reviews from happy clients.",
    impact: "Maintains 4.1★+ rating and prevents 22× booking loss per complaint.",
    stat: "22×",
    statLabel: "booking loss prevented",
    cta: "See Demo",
  },
  {
    id: 6,
    name: "AI Omnichannel Responder",
    tagline: "Unified Inbox for All Channels",
    status: "SOON",
    category: "Messaging AI",
    desc: "Manages calls, DMs, emails, SMS, and web chat from one AI-powered inbox. Never miss a lead from any channel.",
    impact: "Eliminates channel blindspots and captures every inquiry.",
    stat: "100%",
    statLabel: "channel coverage",
    cta: "Join Waitlist",
  },
  {
    id: 7,
    name: "AI Quote & Booking Assistant",
    tagline: "Instant Dynamic Pricing Engine",
    status: "LIVE",
    category: "Sales AI",
    desc: "Generates personalized quotes in real-time based on fleet, season, demand, and customer profile. Sends quotes in under 1 minute.",
    impact: "Sends quotes 12× faster and eliminates 60% quote delays.",
    stat: "12×",
    statLabel: "faster than manual",
    cta: "See Demo",
  },
  {
    id: 8,
    name: "AI Upsell",
    tagline: "Add-On Revenue Maximizer",
    status: "LIVE",
    category: "Revenue AI",
    desc: "Offers insurance, GPS, child seats, chauffeur upgrades at booking and via SMS before pickup. Never leaves money on the table.",
    impact: "Captures $280 avg add-on revenue per rental.",
    stat: "$280",
    statLabel: "avg add-on per rental",
    cta: "See Demo",
  },
  {
    id: 9,
    name: "AI VIP & Relationship Mgr",
    tagline: "Repeat Client Re-Engagement Engine",
    status: "SOON",
    category: "Retention AI",
    desc: "Tracks past renters, sends birthday offers, seasonal promotions, and 'we miss you' campaigns. Turns one-time renters into loyal clients.",
    impact: "Drives 3.2× more repeat bookings.",
    stat: "3.2×",
    statLabel: "more repeat bookings",
    cta: "Join Waitlist",
  },
  {
    id: 10,
    name: "AI Customer Support 24/7",
    tagline: "Paperwork + ID Verification Bot",
    status: "LIVE",
    category: "Operations AI",
    desc: "Sends rental agreements, collects signatures, verifies IDs, confirms insurance — all automated. Eliminates onboarding friction.",
    impact: "Reduces onboarding drop-off by 82%.",
    stat: "82%",
    statLabel: "drop-off reduction",
    cta: "See Demo",
  },
  {
    id: 11,
    name: "AI Website Chatbot",
    tagline: "24/7 Website Lead Capture",
    status: "SOON",
    category: "Operations AI",
    desc: "Engages every website visitor instantly, answers questions, collects contact info, books rentals — even when you're asleep.",
    impact: "Captures 82% of after-hours website inquiries.",
    stat: "82%",
    statLabel: "after-hours capture",
    cta: "Join Waitlist",
  },
  {
    id: 12,
    name: "AI Business Manager",
    tagline: "Revenue + Lead Analytics Dashboard",
    status: "LIVE",
    category: "Analytics AI",
    desc: "Tracks every lead source, conversion rate, revenue per channel, and AI performance in real-time. Makes invisible revenue visible.",
    impact: "Reveals 38% of hidden revenue opportunities.",
    stat: "38%",
    statLabel: "hidden revenue found",
    cta: "See Demo",
  },
];

const ALL_CATS = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.ag-root {
  background: #FCFCFE;
  font-family: 'DM Sans', sans-serif;
  color: #141419;
  min-height: 100vh;
}

.ag-section {
  padding: 100px 24px 120px;
  width: 100%;
  margin: 0;
}

/* ── Header ── */
.ag-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: end;
  padding-bottom: 56px;
  border-bottom: 1.5px solid #141419;
  margin-bottom: 0;
}

.ag-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: #7B74DC;
  margin-bottom: 24px;
}

.ag-eyebrow::before {
  content: '';
  display: block;
  width: 28px;
  height: 1px;
  background: #7B74DC;
  flex-shrink: 0;
}

.ag-headline {
  font-family: 'Playfair Display', serif;
  font-size: clamp(56px, 7.5vw, 104px);
  font-weight: 900;
  color: #141419;
  line-height: .90;
  letter-spacing: -.05em;
  margin: 0;
}

.ag-headline em {
  font-style: italic;
  font-weight: 400;
  color: #7B74DC;
}

.ag-header-right {
  padding-bottom: 6px;
}

.ag-desc {
  font-size: 15px;
  color: #6E6D7A;
  line-height: 1.8;
  max-width: 340px;
  margin-bottom: 36px;
}

.ag-counts {
  display: flex;
  gap: 40px;
}

.ag-count-num {
  font-family: 'Playfair Display', serif;
  font-size: 40px;
  font-weight: 700;
  color: #141419;
  line-height: 1;
  letter-spacing: -.04em;
}

.ag-count-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #6E6D7A;
  margin-top: 6px;
}

/* ── Filter strip ── */
.ag-filters {
  display: flex;
  gap: 0;
  border-bottom: 1px solid #E3E2EB;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0 24px;
}

.ag-filters::-webkit-scrollbar { display: none; }

.ag-filter-btn {
  appearance: none;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 18px 16px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(9px, 1.5vw, 11px);
  font-weight: 500;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #6E6D7A;
  cursor: pointer;
  white-space: nowrap;
  transition: color .2s, border-color .2s;
  margin-bottom: -1px;
  flex-shrink: 0;
}

.ag-filter-btn:hover { color: #141419; }

.ag-filter-btn.active {
  color: #141419;
  border-bottom-color: #141419;
}

@media (min-width: 768px) {
  .ag-filters {
    padding: 0 64px;
  }
  .ag-filter-btn {
    padding: 18px 22px 16px;
  }
}

/* ── Product rows ── */
.ag-list {
  margin-top: 0;
}

.ag-row {
  position: relative;
  display: grid;
  grid-template-columns: 56px minmax(0,1.1fr) minmax(0,1.6fr) 140px 90px;
  gap: 0 36px;
  align-items: center;
  padding: 32px 0;
  border-bottom: 1px solid #E3E2EB;
  cursor: pointer;
  transition: background .2s;
}

.ag-row::before {
  content: '';
  position: absolute;
  inset: 0 -64px;
  background: transparent;
  transition: background .25s;
  pointer-events: none;
  z-index: 0;
}

.ag-row:hover::before { background: rgba(123,116,220,.035); }

.ag-row > * { position: relative; z-index: 1; }

.ag-num {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  font-weight: 400;
  color: #6E6D7A;
  letter-spacing: .04em;
  line-height: 1;
  user-select: none;
}

.ag-name {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 700;
  color: #141419;
  letter-spacing: -.025em;
  line-height: 1.1;
  margin-bottom: 5px;
}

.ag-tagline {
  font-size: 12px;
  color: #6E6D7A;
  font-weight: 400;
  line-height: 1.45;
}

.ag-row-desc {
  font-size: 12.5px;
  color: #6E6D7A;
  line-height: 1.7;
}

.ag-stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -.03em;
  line-height: 1;
}

.ag-stat-label {
  font-size: 10px;
  color: #6E6D7A;
  letter-spacing: .08em;
  text-transform: uppercase;
  margin-top: 5px;
  line-height: 1.3;
}

.ag-status {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 7px;
}

.ag-dot {
  width: 6px; 
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.ag-dot-live { background: #7B74DC; }
.ag-dot-soon { background: #6E6D7A; }

.ag-status-text {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.ag-status-live { color: #7B74DC; }
.ag-status-soon { color: #6E6D7A; }

/* ── Expanded panel ── */
.ag-expand {
  grid-column: 1 / -1;
  overflow: hidden;
}

.ag-expand-inner {
  display: grid;
  grid-template-columns: 56px minmax(0,1fr) auto;
  gap: 0 36px;
  align-items: start;
  padding: 24px 0 8px;
  border-top: 1px solid #E3E2EB;
  margin-top: 16px;
}

.ag-expand-body { 
  font-size: 14px; 
  color: #6E6D7A; 
  line-height: 1.8; 
}

.ag-impact-block {
  border-left: 2px solid;
  border-radius: 0;
  padding-left: 18px;
  min-width: 220px;
  max-width: 280px;
}

.ag-impact-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.ag-impact-text {
  font-size: 14px;
  font-weight: 500;
  color: #141419;
  line-height: 1.55;
  margin-bottom: 20px;
}

.ag-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 24px;
  border-radius: 100px;
  border: 1.5px solid;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .06em;
  cursor: pointer;
  transition: background .2s, color .2s;
}

/* ── Category badge ── */
.ag-cat-pill {
  display: inline-block;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
  padding: 4px 11px;
  border-radius: 100px;
  margin-bottom: 12px;
}

/* ── Bottom bar ── */
.ag-bottom {
  margin-top: 72px;
  padding: 44px 52px;
  background: #141419;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.ag-bottom-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(20px, 2.2vw, 26px);
  font-weight: 700;
  color: #FCFCFE;
  letter-spacing: -.025em;
  margin-bottom: 6px;
}

.ag-bottom-sub {
  font-size: 13px;
  color: rgba(252,252,254,.4);
}

.ag-start-btn {
  padding: 15px 38px;
  background: #7B74DC;
  border: none;
  border-radius: 100px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity .2s, transform .15s;
  letter-spacing: .03em;
}

.ag-start-btn:hover { 
  opacity: .88; 
  transform: scale(1.03); 
}

@media (max-width: 900px) {
  .ag-section { padding: 64px 12px 80px; }
  .ag-header { grid-template-columns: 1fr; gap: 32px; }
  .ag-row {
    grid-template-columns: 40px minmax(0,1fr) 90px 72px;
  }
  .ag-row-desc { display: none; }
}

@media (max-width: 600px) {
  .ag-row { grid-template-columns: 36px minmax(0,1fr) 72px; }
  .ag-stat-num { font-size: 22px; }
  .ag-status { display: none; }
  .ag-expand-inner { grid-template-columns: 1fr; gap: 20px; }
  .ag-bottom { padding: 32px 28px; }
}
`;

// ─── Product Row ─────────────────────────────────────────────────────────────

function ProductRow({ product, index, isExpanded, onToggle }) {
  const colors = CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS["Voice AI"];
  const Icon = CATEGORY_ICONS[product.category] ?? Sparkles;
  const isLive = product.status === "LIVE";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="ag-row"
        onClick={onToggle}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
      >
        {/* Index number */}
        <div className="ag-num">{String(index + 1).padStart(2, "0")}</div>

        {/* Name + tagline */}
        <div>
          <div className="ag-name">{product.name}</div>
          <div className="ag-tagline">{product.tagline}</div>
        </div>

        {/* Short desc (hidden on mobile) */}
        <div className="ag-row-desc" aria-hidden="true">
          {product.desc.length > 100 ? product.desc.slice(0, 100) + "…" : product.desc}
        </div>

        {/* Stat */}
        <div>
          <div className="ag-stat-num" style={{ color: colors.accent }}>
            {product.stat}
          </div>
          <div className="ag-stat-label">{product.statLabel}</div>
        </div>

        {/* Status */}
        <div className="ag-status">
          <span className={`ag-dot ag-dot-${isLive ? "live" : "soon"}`} />
          <span className={`ag-status-text ag-status-${isLive ? "live" : "soon"}`}>
            {isLive ? "Live" : "Soon"}
          </span>
        </div>

        {/* Expanded panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="ag-expand"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="ag-expand-inner">
                {/* Spacer aligns with index column */}
                <div />

                {/* Full description */}
                <div>
                  <span
                    className="ag-cat-pill"
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    <Icon
                      size={9}
                      style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }}
                    />
                    {product.category}
                  </span>
                  <p className="ag-expand-body">{product.desc}</p>
                </div>

                {/* Impact + CTA */}
                <div>
                  <div className="ag-impact-block" style={{ borderLeftColor: colors.accent }}>
                    <div className="ag-impact-label" style={{ color: colors.accent }}>
                      Impact
                    </div>
                    <div className="ag-impact-text">{product.impact}</div>
                  </div>
                  <button
                    className="ag-cta"
                    style={{ borderColor: colors.accent, color: colors.text }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.accent;
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = colors.text;
                    }}
                  >
                    {product.cta} &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SolutionsGrid() {
  const [activeFilter, setActiveFilter] = useState("Voice AI");
  const [expanded, setExpanded] = useState(null);

  // Auto-rotate through categories every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFilter((current) => {
        const currentIndex = ALL_CATS.indexOf(current);
        const nextIndex = (currentIndex + 1) % ALL_CATS.length;
        const nextCategory = ALL_CATS[nextIndex];

        // Expand first product in the new category
        const firstProduct = PRODUCTS.find((p) =>
          nextCategory === "All" ? true : p.category === nextCategory,
        );
        if (firstProduct) {
          setExpanded(firstProduct.id);
        }

        return nextCategory;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filtered =
    activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <>
      <style>{styles}</style>
      <div className="ag-root">
        <section id="solutions" className="ag-section">
          {/* ── Header ── */}
          <motion.div
            className="ag-header"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <div className="ag-eyebrow">The Full Stack</div>
              <h2 className="ag-headline">
                12 AI
                <br />
                <em>Employees.</em>
              </h2>
            </div>
            <div className="ag-header-right">
              <p className="ag-desc">
                Every touchpoint covered. Every lead captured. Every booking closed — around the
                clock, without a single hire.
              </p>
              <div className="ag-counts">
                {[
                  ["9", "Live Now"],
                  ["3", "Coming Soon"],
                  ["12", "Total Tools"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="ag-count-num">{n}</div>
                    <div className="ag-count-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Filter strip ── */}
          <motion.div
            className="ag-filters"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {ALL_CATS.map((cat) => (
              <button
                key={cat}
                className={`ag-filter-btn${activeFilter === cat ? " active" : ""}`}
                onClick={() => {
                  setActiveFilter(cat);
                  setExpanded(null);
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* ── Product list ── */}
          <div className="ag-list">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filtered.map((product, i) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    index={i}
                    isExpanded={expanded === product.id}
                    onToggle={() => setExpanded(expanded === product.id ? null : product.id)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Bottom bar ── */}
          <motion.div
            className="ag-bottom"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <div>
              <div className="ag-bottom-title">All 12 tools. One subscription.</div>
              <div className="ag-bottom-sub">
                No per-tool pricing. No hidden fees. Cancel anytime.
              </div>
            </div>
            <button className="ag-start-btn">Start Free Trial &rarr;</button>
          </motion.div>
        </section>
      </div>
    </>
  );
}
