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
    id: 1, name: "AI Phone Assistant", category: "Phone AI", icon: Mic,
    color: "#22C55E",
    features: ["Answers calls 24/7","Talks in many languages","Speaks like a real person","Handles 100 calls at once","Answers within 3 seconds","Sends important calls to your team"],
    stat: "100", statSuffix: " calls", statLabel: "at once",
  },
  {
    id: 2, name: "AI Message Assistant", category: "Chat AI", icon: MessageSquare,
    color: "#22C55E",
    features: ["Replies to messages in 8 seconds","Works on Instagram & WhatsApp","Sends prices automatically","Shows when you are free","Follows up until they book","Talks to every customer personally"],
    stat: "8", statSuffix: "s", statLabel: "reply time",
  },
  {
    id: 3, name: "AI Sales Assistant", category: "Selling AI", icon: DollarSign,
    color: "#22C55E",
    features: ["Follows up on quotes for you","Reminds people to finish booking","Keeps talking to cold leads","Sends personal messages","Sees who is interested","Gets 4x more bookings"],
    stat: "4x", statSuffix: "", statLabel: "more bookings",
  },
  {
    id: 4, name: "AI Customer Checker", category: "Selling AI", icon: DollarSign,
    color: "#22C55E",
    features: ["Checks customers instantly","Scores leads automatically","Sends hot leads to you","Talks to old leads","Finds $420K extra money yearly","Works 24/7 with no breaks"],
    stat: "$420K", statSuffix: "", statLabel: "found yearly",
  },
  {
    id: 5, name: "AI Review Helper", category: "Review AI", icon: Star,
    color: "#22C55E",
    features: ["Watches Google & Yelp reviews","Replies to reviews instantly","Tells you about bad feedback","Asks happy customers for reviews","Keeps your rating high","Stops people from leaving"],
    stat: "4.1★", statSuffix: "", statLabel: "rating kept",
  },
  {
    id: 6, name: "AI Universal Inbox", category: "Chat AI", icon: MessageSquare,
    color: "#22C55E",
    features: ["Handles all your chats in one place","One box for calls, DMs, emails, SMS","Never misses a lead again","Covers every way people talk to you","Easy to use AI inbox","No more missed messages"],
    stat: "100%", statSuffix: "", statLabel: "always covered",
  },
  {
    id: 7, name: "AI Booking Helper", category: "Selling AI", icon: DollarSign,
    color: "#22C55E",
    features: ["Makes quotes in real-time","Checks which cars are free","Changes price for busy times","Gives customers their own price","Sends quotes in under 1 minute","12x faster than a person"],
    stat: "12x", statSuffix: "", statLabel: "faster quotes",
  },
  {
    id: 8, name: "AI Upgrade Assistant", category: "Money AI", icon: TrendingUp,
    color: "#22C55E",
    features: ["Offers insurance upgrades","Suggests GPS and extras","Asks if they need child seats","Offers personal drivers","Sends a text before pickup","Makes $280 more per rental"],
    stat: "$280", statSuffix: "", statLabel: "more per rental",
  },
  {
    id: 9, name: "AI Customer Loyalty Helper", category: "Customer AI", icon: Heart,
    color: "#22C55E",
    features: ["Remembers old customers","Sends birthday deals","Shows special seasonal sales","Asks old customers to come back","Makes customers stay with you","Gets 3.2x more repeat bookings"],
    stat: "3.2x", statSuffix: "", statLabel: "repeat bookings",
  },
  {
    id: 10, name: "AI Help Desk", category: "Work AI", icon: Shield,
    color: "#22C55E",
    features: ["Sends rental papers","Gets digital signatures","Checks customer IDs","Checks insurance papers","Makes signing up easy","Stops 82% of people from leaving"],
    stat: "82%", statSuffix: "", statLabel: "less drop-off",
  },
  {
    id: 11, name: "AI Website Helper", category: "Work AI", icon: RefreshCw,
    color: "#22C55E",
    features: ["Talks to visitors instantly","Answers questions 24/7","Gets contact info for you","Books rentals for you","Works while you sleep","Gets 82% more leads at night"],
    stat: "82%", statSuffix: "", statLabel: "night leads found",
  },
  {
    id: 112, name: "AI Business Helper", category: "Report AI", icon: BarChart2,
    color: "#22C55E",
    features: ["Sees where customers come from","Checks booking rates","Sees how much money you make","Shows how the AI is doing","Updates everything instantly","Finds 38% more hidden money"],
    stat: "38%", statSuffix: "", statLabel: "extra money found",
  },
];

const CATEGORIES = ["All","Phone AI","Message AI","Selling AI","Review AI","Money AI","Customer AI","Work AI","Report AI"];

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

/* ── Footer ── */
.sg-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
  gap: 20px;
}

.sg-footer-trust {
  display: flex;
  gap: 24px;
}

.sg-trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748B;
}

.sg-footer-btn {
  background: var(--brand-gradient);
  color: #fff;
  border: none;
  border-radius: 100px;
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(34,197,94,0.2);
}

.sg-footer-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(34,197,94,0.3);
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .sg-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
}

@media (max-width: 768px) {
  .sg-head { text-align: center; margin-bottom: 40px; }
  .sg-h2 { font-size: clamp(28px, 8vw, 40px); }
  .sg-grid { gap: 32px; margin-bottom: 56px; }
  
  .sg-footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
  }
  
  .sg-footer-trust {
    flex-direction: column;
    gap: 12px;
  }
  
  .sg-footer-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .sg-grid { grid-template-columns: 1fr; gap: 28px; }
  .sg-module { gap: 14px; }
  .sg-mod-icon { width: 40px; height: 40px; border-radius: 12px; }
  .sg-mod-name { font-size: 15px; }
  .sg-mod-feature { font-size: 12px; }
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
            12 AI Helpers for your business
          </div>
          <h2 className="sg-h2">
            Everything you need<br />
            <span>to grow your business.</span>
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

        <div className="sg-footer">
          <div className="sg-footer-trust">
            <div className="sg-trust-item">
              <CheckCircle2 size={14} color="#22C55E" /> Ready in 14 Days
            </div>
            <div className="sg-trust-item">
              <CheckCircle2 size={14} color="#22C55E" /> No Setup Fees
            </div>
          </div>
          
          <button className="sg-footer-btn">
            Start Free Trial <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
