import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Mic, MessageSquare, DollarSign, RefreshCw,
  Star, TrendingUp, BarChart2, Heart, ArrowRight,
  Zap, CheckCircle2, ChevronRight, Activity, Shield, Sparkles
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1, name: "AI Receptionist", category: "Voice AI", icon: Mic,
    color: "#22C55E", colorLight: "#F0FDF4", colorBorder: "#BBF7D0",
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
    color: "#10B981", colorLight: "#ECFDF5", colorBorder: "#6EE7B7",
    features: ["Follows up on quotes automatically","Recovers abandoned bookings","Nurtures cold leads persistently","Sends personalized messages","Tracks engagement levels","Converts 4x more leads"],
    stat: "4x", statSuffix: "", statLabel: "more conversions",
  },
  {
    id: 4, name: "AI Lead Qualifier", category: "Sales AI", icon: DollarSign,
    color: "#F59E0B", colorLight: "#FFFBEB", colorBorder: "#FDE68A",
    features: ["Qualifies leads instantly","Scores prospects automatically","Routes hot leads to sales","Nurtures cold leads","Recovers $420K revenue yearly","Works 24/7 without breaks"],
    stat: "$420K", statSuffix: "", statLabel: "recovered yearly",
  },
  {
    id: 5, name: "AI Review Manager", category: "Reputation AI", icon: Star,
    color: "#EC4899", colorLight: "#FDF2F8", colorBorder: "#F9A8D4",
    features: ["Monitors Google & Yelp reviews","Responds to reviews instantly","Escalates negative feedback","Requests reviews from happy clients","Maintains 4.1+ star rating","Prevents 22x booking loss"],
    stat: "4.1★", statSuffix: "", statLabel: "rating maintained",
  },
  {
    id: 6, name: "AI Omnichannel Responder", category: "Messaging AI", icon: MessageSquare,
    color: "#8B5CF6", colorLight: "#F5F3FF", colorBorder: "#C4B5FD",
    features: ["Manages all communication channels","Unifies calls, DMs, emails, SMS","Never misses a lead","Provides 100% channel coverage","Works from one AI inbox","Eliminates channel blindspots"],
    stat: "100%", statSuffix: "", statLabel: "channel coverage",
  },
  {
    id: 7, name: "AI Quote & Booking Assistant", category: "Sales AI", icon: DollarSign,
    color: "#14B8A6", colorLight: "#F0FDFA", colorBorder: "#99F6E4",
    features: ["Generates quotes in real-time","Considers fleet availability","Adjusts for seasonal demand","Personalizes customer pricing","Sends quotes in under 1 minute","12x faster than manual process"],
    stat: "12x", statSuffix: "", statLabel: "faster quoting",
  },
  {
    id: 8, name: "AI Upsell Assistant", category: "Revenue AI", icon: TrendingUp,
    color: "#F97316", colorLight: "#FFF7ED", colorBorder: "#FED7AA",
    features: ["Offers insurance upgrades","Suggests GPS add-ons","Recommends child seats","Proposes chauffeur services","Sends SMS before pickup","Captures $280 avg per rental"],
    stat: "$280", statSuffix: "", statLabel: "avg per rental",
  },
  {
    id: 9, name: "AI VIP & Relationship Manager", category: "Retention AI", icon: Heart,
    color: "#EF4444", colorLight: "#FEF2F2", colorBorder: "#FECACA",
    features: ["Tracks past rental history","Sends birthday offers","Creates seasonal promotions","Runs 'we miss you' campaigns","Builds customer loyalty","Drives 3.2x repeat bookings"],
    stat: "3.2x", statSuffix: "", statLabel: "repeat bookings",
  },
  {
    id: 10, name: "AI Customer Support 24/7", category: "Operations AI", icon: Shield,
    color: "#0EA5E9", colorLight: "#F0F9FF", colorBorder: "#BAE6FD",
    features: ["Sends rental agreements","Collects digital signatures","Verifies customer IDs","Confirms insurance coverage","Eliminates onboarding friction","Reduces drop-off by 82%"],
    stat: "82%", statSuffix: "", statLabel: "less drop-off",
  },
  {
    id: 11, name: "AI Website Chatbot", category: "Operations AI", icon: RefreshCw,
    color: "#22C55E", colorLight: "#F0FDF4", colorBorder: "#BBF7D0",
    features: ["Engages website visitors instantly","Answers questions 24/7","Collects contact information","Books rentals automatically","Works while you sleep","Captures 82% after-hours inquiries"],
    stat: "82%", statSuffix: "", statLabel: "after-hours captured",
  },
  {
    id: 12, name: "AI Business Manager", category: "Analytics AI", icon: BarChart2,
    color: "#10B981", colorLight: "#F0FDF4", colorBorder: "#BBF7D0",
    features: ["Tracks all lead sources","Monitors conversion rates","Analyzes revenue per channel","Reports AI performance","Updates data in real-time","Reveals 38% hidden revenue"],
    stat: "38%", statSuffix: "", statLabel: "hidden revenue found",
  },
];

const CATEGORIES = ["All","Voice AI","Messaging AI","Sales AI","Reputation AI","Revenue AI","Retention AI","Operations AI","Analytics AI"];

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.sg-wrap { 
  background: #fff; 
  font-family: 'DM Sans', system-ui, sans-serif; 
  color: #141419; 
  position: relative; 
  overflow: hidden;
  padding-top: var(--section-py);
  padding-bottom: var(--section-py);
}

.sg-bg-glow {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 80vh;
  background: radial-gradient(circle at center, rgba(34,197,94,0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.sg-inner {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding-left: var(--container-px);
  padding-right: var(--container-px);
  position: relative;
  z-index: 1;
}

/* ── Header ── */
.sg-head { text-align: center; margin-bottom: 64px; }

.sg-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #F0FDF4;
  border: 1px solid #DCFCE7;
  border-radius: 100px;
  padding: 6px 16px 6px 10px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #166534;
  margin-bottom: 24px;
}

.sg-eyebrow-icon {
  width: 18px; height: 18px;
  background: #22C55E;
  color: #fff;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}

.sg-h2 {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: #141419;
  margin-bottom: 20px;
}

.sg-h2 span {
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sg-sub {
  font-size: 17px;
  line-height: 1.6;
  color: #6E6D7A;
  max-width: 580px;
  margin: 0 auto 32px;
}

/* ── Filter tabs ── */
.sg-filters-container {
  position: relative;
  margin-bottom: 56px;
  display: flex;
  justify-content: center;
}

.sg-filters {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #F8F7FB;
  padding: 4px;
  border-radius: 100px;
  border: 1px solid #F0EFF5;
}

.sg-ftab {
  background: transparent;
  border: none;
  border-radius: 100px;
  padding: 10px 22px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #6E6D7A;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  z-index: 1;
}

.sg-ftab:hover { color: #141419; }
.sg-ftab.on { color: #fff; }

.sg-ftab-bg {
  position: absolute;
  inset: 0;
  background: #22C55E;
  border-radius: 100px;
  box-shadow: 0 4px 12px rgba(34,197,94,0.3);
  z-index: -1;
}

/* ── Grid ── */
.sg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 80px;
}

/* ── Card ── */
.sg-card-outer {
  position: relative;
  height: 100%;
}

.sg-card {
  background: #fff;
  border: 1px solid #F0EFF5;
  border-radius: 24px;
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
}

.sg-card:hover {
  border-color: var(--c);
  transform: translateY(-8px);
  box-shadow: 0 32px 64px -16px var(--cg);
}

.sg-card-glow {
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  background: linear-gradient(135deg, var(--c), transparent 40%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}
.sg-card:hover .sg-card-glow { opacity: 0.1; }

.sg-card-icon-wrap {
  width: 52px; height: 52px;
  border-radius: 16px;
  background: var(--cl);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px;
  color: var(--c);
  transition: all 0.4s ease;
}
.sg-card:hover .sg-card-icon-wrap {
  background: var(--c);
  color: #fff;
  transform: rotate(5deg) scale(1.1);
  box-shadow: 0 8px 16px var(--cg);
}

.sg-card-cat {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94A3B8;
  margin-bottom: 8px;
}

.sg-card-name {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #141419;
  line-height: 1.2;
  margin-bottom: 16px;
}

.sg-card-stat-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 16px;
  margin-bottom: 24px;
}

.sg-card-stat-num {
  font-size: 24px;
  font-weight: 800;
  color: var(--c);
  letter-spacing: -0.02em;
}

.sg-card-stat-label {
  font-size: 11px;
  font-weight: 500;
  color: #64748B;
  line-height: 1.3;
}

.sg-features-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.sg-feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #475569;
  font-weight: 500;
}

.sg-feature-check {
  width: 16px; height: 16px;
  border-radius: 50%;
  background: var(--cl);
  color: var(--c);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.sg-card-cta {
  margin-top: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--c);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}
.sg-card:hover .sg-card-cta {
  opacity: 1;
  transform: translateX(0);
}

/* ── CTA Banner ── */
.sg-banner {
  background: #111827;
  border-radius: 32px;
  padding: 64px;
  position: relative;
  overflow: hidden;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

.sg-banner-mesh {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(at 0% 0%, rgba(34,197,94,0.15) 0, transparent 50%), 
    radial-gradient(at 100% 100%, rgba(163,230,53,0.1) 0, transparent 50%);
  pointer-events: none;
}

.sg-banner-content { position: relative; z-index: 1; max-width: 540px; }

.sg-banner-h2 {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 24px;
}

.sg-banner-h2 span { color: #22C55E; }

.sg-banner-p {
  font-size: 18px;
  color: #9CA3AF;
  line-height: 1.6;
}

.sg-banner-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.sg-banner-btn {
  background: var(--brand-gradient);
  color: #fff;
  border: none;
  border-radius: 100px;
  padding: 18px 40px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(34,197,94,0.3);
}

.sg-banner-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(34,197,94,0.4);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .sg-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .sg-banner { padding: 48px; flex-direction: column; text-align: center; }
  .sg-banner-actions { align-items: center; }
  .sg-banner-content { max-width: 100%; }
}

@media (max-width: 640px) {
  .sg-grid { grid-template-columns: 1fr; }
  .sg-ftab { padding: 8px 16px; font-size: 12px; }
  .sg-banner { padding: 40px 24px; }
  .sg-card { padding: 24px; }
}
`;

function ProductCard({ product, index }) {
  const Icon = product.icon;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="sg-card-outer"
      style={{
        "--c": product.color,
        "--cg": `${product.color}20`,
        "--cl": product.colorLight,
      }}
    >
      <div className="sg-card">
        <div className="sg-card-glow" />
        
        <div className="sg-card-icon-wrap">
          <Icon size={24} strokeWidth={2.2} />
        </div>
        
        <div className="sg-card-cat">{product.category}</div>
        <h3 className="sg-card-name">{product.name}</h3>
        
        <div className="sg-card-stat-row">
          <span className="sg-card-stat-num">{product.stat}{product.statSuffix}</span>
          <span className="sg-card-stat-label">{product.statLabel}</span>
        </div>
        
        <div className="sg-features-list">
          {product.features.slice(0, 4).map((f, i) => (
            <div key={i} className="sg-feature-item">
              <div className="sg-feature-check">
                <CheckCircle2 size={12} strokeWidth={3} />
              </div>
              {f}
            </div>
          ))}
        </div>
        
        <div className="sg-card-cta">
          Explore Feature <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

export default function SolutionsGrid() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === active);

  return (
    <section id="solutions" className="sg-wrap">
      <style>{styles}</style>
      <div className="sg-bg-glow" />
      
      <div className="sg-inner">
        <motion.div 
          className="sg-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="sg-eyebrow">
            <div className="sg-eyebrow-icon"><Sparkles size={10} /></div>
            The 24/7 Autopilot Stack
          </div>
          
          <h2 className="sg-h2">
            12 AI Employees.<br />
            <span>One Unified Team.</span>
          </h2>
          
          <p className="sg-sub">
            The only complete AI infrastructure built specifically for car rental operators. 
            Replace manual tasks with autonomous agents that never sleep.
          </p>
        </motion.div>

        <div className="sg-filters-container">
          <div className="sg-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`sg-ftab ${active === cat ? "on" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
                {active === cat && (
                  <motion.div 
                    layoutId="activeTab"
                    className="sg-ftab-bg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="sg-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="sg-banner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="sg-banner-mesh" />
          <div className="sg-banner-content">
            <div className="sg-eyebrow" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}>
              <Zap size={10} fill="#fff" /> Limited Implementation Slots
            </div>
            <h2 className="sg-banner-h2">
              Get all 12 agents for<br />
              <span>the price of one hire.</span>
            </h2>
            <p className="sg-banner-p">
              Stop stitching together dozens of tools. Aiaura provides a complete, 
              pre-trained AI workforce that's live in 14 days.
            </p>
          </div>
          
          <div className="sg-banner-actions">
            <button className="sg-banner-btn">
              Start Free Trial <ArrowRight size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 500 }}>
              <Shield size={14} /> 14-day money-back guarantee
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
