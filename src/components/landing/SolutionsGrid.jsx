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
  text-align: center;
  margin-bottom: 80px;
}

.ag-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: #7B74DC;
  margin-bottom: 24px;
}

.ag-eyebrow::before,
.ag-eyebrow::after {
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
  margin: 0 0 24px 0;
}

.ag-headline em {
  font-style: italic;
  font-weight: 400;
  color: #7B74DC;
}

.ag-desc {
  font-size: 16px;
  color: #6E6D7A;
  line-height: 1.8;
  max-width: 500px;
  margin: 0 auto;
}

/* ── Solutions Grid ── */
.ag-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 60px;
}

.ag-card {
  background: linear-gradient(135deg, #ffffff 0%, #fefeff 100%);
  border: 1px solid rgba(227, 226, 235, 0.6);
  border-radius: 12px;
  padding: 24px 20px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 8px rgba(20, 20, 25, 0.04);
}

.ag-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #7B74DC 0%, #9B94EC 50%, #7B74DC 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.ag-card:hover::before {
  opacity: 1;
}

.ag-card:hover {
  border-color: rgba(123, 116, 220, 0.3);
  box-shadow: 
    0 4px 20px rgba(123, 116, 220, 0.12),
    0 1px 8px rgba(20, 20, 25, 0.06);
  transform: translateY(-3px);
}

.ag-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.ag-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7B74DC;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.ag-card:hover .ag-icon {
  transform: scale(1.1);
  color: #6B63CC;
}

.ag-card-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #141419;
  letter-spacing: -.01em;
  line-height: 1.4;
  margin: 0;
}

.ag-feature-line {
  font-size: 13px;
  color: #6E6D7A;
  line-height: 1.5;
  min-height: 20px;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(123, 116, 220, 0.03);
  border-radius: 8px;
  border-left: 2px solid #7B74DC;
}

.ag-feature-line::before {
  content: '';
  width: 3px;
  height: 3px;
  background: #7B74DC;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
}

/* ── Bottom CTA ── */
.ag-bottom {
  margin-top: 80px;
  padding: 48px;
  background: #141419;
  border-radius: 20px;
  text-align: center;
}

.ag-bottom-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  color: #FCFCFE;
  letter-spacing: -.025em;
  margin-bottom: 12px;
}

.ag-bottom-sub {
  font-size: 16px;
  color: rgba(252,252,254,.6);
  margin-bottom: 32px;
}

.ag-start-btn {
  padding: 16px 40px;
  background: #7B74DC;
  border: none;
  border-radius: 100px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: .03em;
}

.ag-start-btn:hover { 
  background: #6B63CC;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(123, 116, 220, 0.4);
}

@media (max-width: 768px) {
  .ag-section { 
    padding: 64px 16px 80px; 
  }
  
  .ag-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 50px;
  }
  
  .ag-card {
    padding: 20px 18px;
  }
  
  .ag-card-header {
    gap: 10px;
    margin-bottom: 14px;
  }
  
  .ag-icon {
    width: 28px;
    height: 28px;
  }
  
  .ag-card-title {
    font-size: 14px;
  }
  
  .ag-feature-line {
    font-size: 12px;
    padding: 10px 14px;
  }
  
  .ag-bottom {
    margin-top: 50px;
    padding: 28px 20px;
  }
}
`;

// ─── Animated Feature Line Component ─────────────────────────────────────────

function AnimatedFeatureLine({ features }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="ag-feature-line">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {features[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Solution Card Component ─────────────────────────────────────────────────

function SolutionCard({ product, index }) {
  const Icon = product.icon;

  return (
    <motion.div
      className="ag-card"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.06, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
    >
      <div className="ag-card-header">
        <div className="ag-icon">
          <Icon size={20} strokeWidth={1.8} />
        </div>
        <h3 className="ag-card-title">{product.name}</h3>
      </div>
      
      <AnimatedFeatureLine features={product.features} />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SolutionsGrid() {
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
            <div className="ag-eyebrow">The Full Stack</div>
            <h2 className="ag-headline">
              12 AI
              <br />
              <em>Employees.</em>
            </h2>
            <p className="ag-desc">
              Every touchpoint covered. Every lead captured. Every booking closed — around the
              clock, without a single hire.
            </p>
          </motion.div>

          {/* ── Solutions Grid ── */}
          <div className="ag-grid">
            {PRODUCTS.map((product, index) => (
              <SolutionCard 
                key={product.id} 
                product={product} 
                index={index} 
              />
            ))}
          </div>

          {/* ── Bottom CTA ── */}
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
            <button className="ag-start-btn">Start Free Trial →</button>
          </motion.div>
        </section>
      </div>
    </>
  );
}
