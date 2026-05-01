import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MessageSquare, DollarSign, RefreshCw,
  Star, TrendingUp, BarChart2, Heart, ArrowRight,
  Zap, CheckCircle2, ChevronRight, Activity, Shield, Sparkles
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1, name: "AI Receptionist", category: "Voice AI", icon: Mic,
    color: "#22C55E",
    features: ["Attend calls 24/7","Supports multiple languages","Speaks the user's language","Handles 100 calls at once","Answers within 3 seconds","Transfers important calls to a team member"],
    stat: "100", statSuffix: " calls", statLabel: "simultaneously",
  },
  {
    id: 2, name: "AI Email + Text Marketing", category: "Messaging AI", icon: MessageSquare,
    color: "#22C55E",
    features: ["Responds to DMs in 8 seconds","Works on Instagram & WhatsApp","Sends pricing automatically","Shares availability instantly","Follows up until conversion","Personalizes every message"],
    stat: "8", statSuffix: "s", statLabel: "response time",
  },
  {
    id: 3, name: "AI Follow-up Assistant", category: "Sales AI", icon: DollarSign,
    color: "#22C55E",
    features: ["Follows up on quotes automatically","Recovers abandoned bookings","Nurtures cold leads persistently","Sends personalized messages","Tracks engagement levels","Converts 4x more leads"],
    stat: "4x", statSuffix: "", statLabel: "more conversions",
  },
  {
    id: 4, name: "AI Lead Qualifier", category: "Sales AI", icon: DollarSign,
    color: "#22C55E",
    features: ["Qualifies leads instantly","Scores prospects automatically","Routes hot leads to sales","Nurtures cold leads","Recovers $420K revenue yearly","Works 24/7 without breaks"],
    stat: "$420K", statSuffix: "", statLabel: "recovered yearly",
  },
  {
    id: 5, name: "AI Review Manager", category: "Reputation AI", icon: Star,
    color: "#22C55E",
    features: ["Monitors Google & Yelp reviews","Responds to reviews instantly","Escalates negative feedback","Requests reviews from happy clients","Maintains 4.1+ star rating","Prevents 22x booking loss"],
    stat: "4.1★", statSuffix: "", statLabel: "rating maintained",
  },
  {
    id: 6, name: "AI Omnichannel Responder", category: "Messaging AI", icon: MessageSquare,
    color: "#22C55E",
    features: ["Manages all communication channels","Unifies calls, DMs, emails, SMS","Never misses a lead","Provides 100% channel coverage","Works from one AI inbox","Eliminates channel blindspots"],
    stat: "100%", statSuffix: "", statLabel: "channel coverage",
  },
  {
    id: 7, name: "AI Quote & Booking Assistant", category: "Sales AI", icon: DollarSign,
    color: "#22C55E",
    features: ["Generates quotes in real-time","Considers fleet availability","Adjusts for seasonal demand","Personalizes customer pricing","Sends quotes in under 1 minute","12x faster than manual process"],
    stat: "12x", statSuffix: "", statLabel: "faster quoting",
  },
  {
    id: 8, name: "AI Upsell Assistant", category: "Revenue AI", icon: TrendingUp,
    color: "#22C55E",
    features: ["Offers insurance upgrades","Suggests GPS add-ons","Recommends child seats","Proposes chauffeur services","Sends SMS before pickup","Captures $280 avg per rental"],
    stat: "$280", statSuffix: "", statLabel: "avg per rental",
  },
  {
    id: 9, name: "AI VIP & Relationship Manager", category: "Retention AI", icon: Heart,
    color: "#22C55E",
    features: ["Tracks past rental history","Sends birthday offers","Creates seasonal promotions","Runs 'we miss you' campaigns","Builds customer loyalty","Drives 3.2x repeat bookings"],
    stat: "3.2x", statSuffix: "", statLabel: "repeat bookings",
  },
  {
    id: 10, name: "AI Customer Support 24/7", category: "Operations AI", icon: Shield,
    color: "#22C55E",
    features: ["Sends rental agreements","Collects digital signatures","Verifies customer IDs","Confirms insurance coverage","Eliminates onboarding friction","Reduces drop-off by 82%"],
    stat: "82%", statSuffix: "", statLabel: "less drop-off",
  },
  {
    id: 11, name: "AI Website Chatbot", category: "Operations AI", icon: RefreshCw,
    color: "#22C55E",
    features: ["Engages website visitors instantly","Answers questions 24/7","Collects contact information","Books rentals automatically","Works while you sleep","Captures 82% after-hours inquiries"],
    stat: "82%", statSuffix: "", statLabel: "after-hours captured",
  },
  {
    id: 12, name: "AI Business Manager", category: "Analytics AI", icon: BarChart2,
    color: "#22C55E",
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
.sg-head { text-align: left; margin-bottom: 64px; }

.sg-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #F0FDF4;
  border: 1px solid #DCFCE7;
  border-radius: 100px;
  padding: 6px 16px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #166534;
  margin-bottom: 20px;
}

.sg-h2 {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: #141419;
}

.sg-h2 span {
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ── Grid ── */
.sg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 48px;
  margin-bottom: 80px;
}

/* ── Minimalist Module ── */
.sg-module {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  position: relative;
}

.sg-mod-icon {
  width: 48px;
  height: 48px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22C55E;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.sg-module:hover .sg-mod-icon {
  background: #22C55E;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.2);
}

.sg-mod-content {
  flex: 1;
  min-width: 0;
}

.sg-mod-name {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #141419;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

/* ── The Animated Line ── */
.sg-mod-ticker-wrap {
  position: relative;
  width: 100%;
}

.sg-mod-line {
  height: 2px;
  background: #f1f5f9;
  width: 100%;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

.sg-mod-line-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #22C55E;
  width: 100%;
  transform-origin: left center;
}

.sg-mod-feature {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #64748B;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .sg-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
}

@media (max-width: 640px) {
  .sg-grid { grid-template-columns: 1fr; gap: 32px; }
  .sg-head { text-align: center; }
  .sg-module { gap: 16px; }
}
`;

const TICK_MS = 3000;

function ModuleTicker({ features }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % features.length);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [features]);

  return (
    <div className="sg-mod-ticker-wrap">
      <div className="sg-mod-line">
        <motion.div
          key={idx}
          className="sg-mod-line-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: TICK_MS / 1000, ease: "linear" }}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="sg-mod-feature"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.4 }}
        >
          {features[idx]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ProductModule({ product, index }) {
  const Icon = product.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="sg-module"
    >
      <div className="sg-mod-icon">
        <Icon size={20} strokeWidth={2.2} />
      </div>
      <div className="sg-mod-content">
        <h3 className="sg-mod-name">{product.name}</h3>
        <ModuleTicker features={product.features} />
      </div>
    </motion.div>
  );
}

export default function SolutionsGrid() {
  return (
    <section id="solutions" className="sg-wrap">
      <style>{styles}</style>
      
      <div className="sg-inner">
        <div className="sg-head">
          <div className="sg-eyebrow">
            <Sparkles size={12} style={{ marginRight: 6 }} /> 
            12 Specialized AI Solutions
          </div>
          <h2 className="sg-h2">
            The Complete AI<br />
            <span>Rental Infrastructure.</span>
          </h2>
        </div>

        <div className="sg-grid">
          {PRODUCTS.map((product, index) => (
            <ProductModule 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>

        {/* Subtle Bottom Footer */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingTop: 40,
          borderTop: '1px solid #f1f5f9',
          flexWrap: 'wrap',
          gap: 20
        }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748B' }}>
              <CheckCircle2 size={14} color="#22C55E" /> Live in 14 Days
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748B' }}>
              <CheckCircle2 size={14} color="#22C55E" /> No Setup Fees
            </div>
          </div>
          <button style={{
            background: 'var(--brand-gradient)',
            color: '#fff',
            border: 'none',
            borderRadius: 100,
            padding: '12px 28px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 20px rgba(34,197,94,0.2)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Start Free Trial <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
