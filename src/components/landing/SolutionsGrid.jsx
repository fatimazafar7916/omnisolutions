import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MessageSquare, DollarSign, RefreshCw,
  Star, TrendingUp, BarChart2, Heart, ArrowRight,
  Shield, Sparkles, Activity, ChevronDown
} from "lucide-react";

// ─── ALL text = pure #000000 ──────────────────────────────────────────────────
const T = {
  bg:        "#FAFAF7",
  surface:   "#FFFFFF",
  border:    "rgba(0,0,0,0.1)",
  borderMid: "rgba(0,0,0,0.07)",
  dot:       "#22C55E",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id:1,  name:"Phone Assistant",   icon:Mic,          accent:"#16A34A", accentBg:"#F0FDF4", num:"01", stat:"100",   unit:"calls/min",       tagline:"Never miss a call again.",             features:["Answers calls 24/7","Speaks like a real person","Handles 100 calls at once","Routes urgent calls instantly"] },
  { id:2,  name:"Message Assistant", icon:MessageSquare,accent:"#0284C7", accentBg:"#EFF8FF", num:"02", stat:"8s",    unit:"reply time",       tagline:"Instant replies on every channel.",    features:["Works on Instagram & WhatsApp","Sends prices automatically","Follows up until they book"] },
  { id:3,  name:"Sales Assistant",   icon:DollarSign,   accent:"#DC2626", accentBg:"#FFF1F1", num:"03", stat:"4×",    unit:"more bookings",    tagline:"Turn cold leads into clients.",        features:["Follows up on every quote","Keeps nurturing cold leads","Sees who's most interested"] },
  { id:4,  name:"Customer Checker",  icon:Activity,     accent:"#B45309", accentBg:"#FFFBEB", num:"04", stat:"$420K", unit:"found yearly",     tagline:"Revenue hiding in plain sight.",       features:["Scores leads automatically","Sends hot leads to you","Works 24/7, no breaks"] },
  { id:5,  name:"Review Helper",     icon:Star,         accent:"#9333EA", accentBg:"#FAF5FF", num:"05", stat:"4.9★",  unit:"avg. rating",      tagline:"Your reputation on autopilot.",        features:["Watches Google & Yelp","Replies to reviews instantly","Asks happy customers for reviews"] },
  { id:6,  name:"Universal Inbox",   icon:MessageSquare,accent:"#0F766E", accentBg:"#F0FDFA", num:"06", stat:"∞",     unit:"channels unified", tagline:"One place for every conversation.",    features:["Calls, DMs, emails, SMS unified","Never miss a lead again","AI-sorted by priority"] },
  { id:7,  name:"Booking Helper",    icon:RefreshCw,    accent:"#16A34A", accentBg:"#F0FDF4", num:"07", stat:"12×",   unit:"faster quotes",    tagline:"Quote it before they leave.",          features:["Real-time availability checks","Dynamic pricing engine","Quote in under 1 minute"] },
  { id:8,  name:"Upgrade Assistant", icon:TrendingUp,   accent:"#B45309", accentBg:"#FFFBEB", num:"08", stat:"$280",  unit:"more/rental",      tagline:"Upsell every time, automatically.",    features:["Insurance & GPS upgrades","Pre-pickup text campaigns","Personalised offers per customer"] },
  { id:9,  name:"Loyalty Helper",    icon:Heart,        accent:"#DB2777", accentBg:"#FDF2F8", num:"09", stat:"3.2×",  unit:"repeat bookings",  tagline:"Keep customers for life.",             features:["Birthday deals & seasonal offers","Re-engagement sequences","Remembers every customer"] },
  { id:10, name:"AI Help Desk",      icon:Shield,       accent:"#0284C7", accentBg:"#EFF8FF", num:"10", stat:"82%",   unit:"less drop-off",    tagline:"Onboarding so smooth it converts.",    features:["Digital signatures & ID checks","Sends rental papers automatically","82% less abandonment"] },
  { id:11, name:"Website Helper",    icon:Sparkles,     accent:"#0F766E", accentBg:"#F0FDFA", num:"11", stat:"82%",   unit:"more night leads", tagline:"Your site sells while you sleep.",     features:["Talks to visitors instantly","Books rentals for you 24/7","Captures contact info always"] },
  { id:12, name:"Business Helper",   icon:BarChart2,    accent:"#7C3AED", accentBg:"#F5F3FF", num:"12", stat:"38%",   unit:"extra revenue",    tagline:"See the money you're leaving behind.", features:["Live booking & revenue data","AI performance dashboard","Finds hidden revenue instantly"] },
];

const STATS = [
  { val:"100+",  label:"Calls handled simultaneously" },
  { val:"$420K", label:"Avg. revenue found per year"  },
  { val:"82%",   label:"Reduction in lead drop-off"   },
  { val:"12×",   label:"Faster than a human agent"    },
  { val:"3.2×",  label:"Increase in repeat bookings"  },
  { val:"38%",   label:"Hidden revenue uncovered"     },
];

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function MarqueeStrip({ reverse }) {
  const words = ["Phone AI","Sales AI","Chat AI","Review AI","Loyalty AI","Booking AI","Upsell AI","Analytics AI","Inbox AI","Website AI"];
  const all = [...words,...words,...words,...words];
  return (
    <div style={{ overflow:"hidden", padding:"4px 0" }}>
      <motion.div
        animate={{ x: reverse ? ["0%","33%"] : ["0%","-33%"] }}
        transition={{ duration:32, repeat:Infinity, ease:"linear" }}
        style={{ display:"flex", whiteSpace:"nowrap" }}
      >
        {all.map((w,i) => (
          <span key={i} style={{
            fontFamily:"'Bebas Neue',Impact,sans-serif",
            fontSize:11, letterSpacing:"0.2em",
            color: i%2===0 ? "rgba(0,0,0,0.09)" : "rgba(0,0,0,0.04)",
            padding:"0 24px", textTransform:"uppercase",
          }}>{w} ✦</span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Desktop Accordion Rail ───────────────────────────────────────────────────
function DesktopRail({ products, selected, onSelect }) {
  return (
    <div style={{
      display:"flex", width:"100%", height:340,
      borderTop:`1px solid ${T.border}`,
      borderBottom:`1px solid ${T.border}`,
      background:T.surface,
      overflow:"hidden",
    }}>
      {products.map((p) => {
        const Icon = p.icon;
        const isOpen = selected?.id === p.id;
        return (
          <motion.div
            key={p.id}
            onClick={() => onSelect(isOpen ? null : p)}
            animate={{ flex: isOpen ? "0 0 280px" : "0 0 64px" }}
            transition={{ duration:0.52, ease:[0.16,1,0.3,1] }}
            style={{
              position:"relative", cursor:"pointer",
              borderRight:`1px solid ${T.borderMid}`,
              overflow:"hidden",
              background: isOpen ? p.accentBg : T.surface,
              transition:"background 0.35s ease",
              display:"flex", flexDirection:"column",
              padding: isOpen ? "26px 22px 22px" : "20px 0",
              alignItems: isOpen ? "flex-start" : "center",
            }}
          >
            {/* Accent bar */}
            <motion.div
              animate={{ scaleX: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration:0.35, delay: isOpen ? 0.1 : 0 }}
              style={{
                position:"absolute", top:0, left:0,
                width:"100%", height:3,
                background:`linear-gradient(90deg, ${p.accent}, transparent)`,
                transformOrigin:"left",
              }}
            />

            {/* CLOSED */}
            {!isOpen && (
              <div style={{
                display:"flex", flexDirection:"column",
                alignItems:"center", gap:12,
                height:"100%", justifyContent:"center",
              }}>
                {/* num */}
                <span style={{
                  fontFamily:"'DM Mono',monospace",
                  fontSize:9, color:"#000000",
                  letterSpacing:"0.1em", fontWeight:500,
                }}>{p.num}</span>

                {/* icon */}
                <Icon size={16} strokeWidth={2} color="#000000" />

                {/* vertical name */}
                <span style={{
                  writingMode:"vertical-rl", textOrientation:"mixed",
                  fontFamily:"'Plus Jakarta Sans',sans-serif",
                  fontSize:10, fontWeight:700,
                  color:"#000000",
                  letterSpacing:"0.07em", textTransform:"uppercase", lineHeight:1,
                }}>{p.name}</span>

                {/* stat */}
                <span style={{
                  fontFamily:"'Bebas Neue',Impact,sans-serif",
                  fontSize:14, color:"#000000", letterSpacing:"0.02em",
                }}>{p.stat}</span>
              </div>
            )}

            {/* OPEN */}
            {isOpen && (
              <motion.div
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                transition={{ duration:0.28, delay:0.14 }}
                style={{ display:"flex", flexDirection:"column", height:"100%", justifyContent:"space-between", width:"100%" }}
              >
                {/* top */}
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                    <div style={{
                      width:30, height:30, borderRadius:8,
                      background:`${p.accent}20`,
                      border:`1px solid ${p.accent}40`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      <Icon size={13} strokeWidth={2.2} color={p.accent} />
                    </div>
                    <span style={{
                      fontFamily:"'DM Mono',monospace",
                      fontSize:9, color:"#000000",
                      letterSpacing:"0.12em", fontWeight:600,
                    }}>{p.num}</span>
                  </div>

                  <h3 style={{
                    fontFamily:"'Plus Jakarta Sans',sans-serif",
                    fontSize:16, fontWeight:800,
                    color:"#000000", lineHeight:1.15,
                    letterSpacing:"-0.02em", marginBottom:5,
                  }}>{p.name}</h3>

                  <p style={{
                    fontSize:12, color:"#000000",
                    lineHeight:1.55, marginBottom:12,
                    fontFamily:"'DM Sans',sans-serif", fontWeight:500,
                  }}>{p.tagline}</p>

                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {p.features.map((f,fi) => (
                      <div key={fi} style={{ display:"flex", alignItems:"flex-start", gap:7 }}>
                        <div style={{ width:3, height:3, borderRadius:"50%", background:p.accent, flexShrink:0, marginTop:5 }} />
                        <span style={{ fontSize:11, color:"#000000", fontFamily:"'DM Sans',sans-serif", fontWeight:500, lineHeight:1.4 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* bottom stat */}
                <div>
                  <div style={{
                    fontFamily:"'Bebas Neue',Impact,sans-serif",
                    fontSize:46, color:p.accent,
                    lineHeight:1, letterSpacing:"-0.02em",
                  }}>{p.stat}</div>
                  <div style={{
                    fontFamily:"'DM Mono',monospace",
                    fontSize:9, color:"#000000",
                    letterSpacing:"0.12em", textTransform:"uppercase", marginTop:2,
                    fontWeight:500,
                  }}>{p.unit}</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Mobile Vertical List ─────────────────────────────────────────────────────
function MobileList({ products, selected, onSelect }) {
  return (
    <div style={{ borderTop:`1px solid ${T.border}`, background:T.surface }}>
      {products.map((p, i) => {
        const Icon = p.icon;
        const isOpen = selected?.id === p.id;
        return (
          <motion.div
            key={p.id}
            initial={{ opacity:0, y:8 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.025, duration:0.35 }}
            style={{ borderBottom:`1px solid ${T.border}` }}
          >
            {/* Row */}
            <button
              onClick={() => onSelect(isOpen ? null : p)}
              style={{
                all:"unset", display:"flex", alignItems:"center",
                width:"100%", padding:"15px 18px",
                background: isOpen ? p.accentBg : T.surface,
                cursor:"pointer",
                transition:"background 0.25s ease",
                position:"relative", gap:12,
              }}
            >
              {isOpen && (
                <motion.div layoutId={`lbar-${p.id}`} style={{
                  position:"absolute", left:0, top:0,
                  width:3, height:"100%",
                  background:p.accent,
                }} />
              )}

              {/* Icon */}
              <div style={{
                width:38, height:38, borderRadius:10, flexShrink:0,
                background: isOpen ? `${p.accent}18` : "rgba(0,0,0,0.05)",
                border:`1px solid ${isOpen ? p.accent+"40" : "rgba(0,0,0,0.1)"}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all 0.25s ease",
              }}>
                <Icon size={15} strokeWidth={2.2} color={isOpen ? p.accent : "#000000"} />
              </div>

              {/* Name + tagline */}
              <div style={{ flex:1, textAlign:"left" }}>
                <div style={{
                  fontFamily:"'Plus Jakarta Sans',sans-serif",
                  fontSize:14, fontWeight:800,
                  color:"#000000", letterSpacing:"-0.01em", lineHeight:1.2,
                }}>{p.name}</div>
                <div style={{
                  fontFamily:"'DM Sans',sans-serif",
                  fontSize:11, color:"#000000", fontWeight:500,
                  marginTop:1,
                }}>{p.tagline}</div>
              </div>

              {/* Stat */}
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{
                  fontFamily:"'Bebas Neue',Impact,sans-serif",
                  fontSize:22, color: isOpen ? p.accent : "#000000",
                  lineHeight:1, letterSpacing:"-0.01em",
                  transition:"color 0.25s ease",
                }}>{p.stat}</div>
                <div style={{
                  fontFamily:"'DM Mono',monospace",
                  fontSize:8, color:"#000000",
                  letterSpacing:"0.08em", textTransform:"uppercase", marginTop:1,
                }}>{p.unit}</div>
              </div>

              {/* Chevron */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration:0.3 }}
                style={{ flexShrink:0, marginLeft:2 }}
              >
                <ChevronDown size={16} strokeWidth={2.5} color="#000000" />
              </motion.div>
            </button>

            {/* Expand */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height:0, opacity:0 }}
                  animate={{ height:"auto", opacity:1 }}
                  exit={{ height:0, opacity:0 }}
                  transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
                  style={{ overflow:"hidden" }}
                >
                  <div style={{
                    padding:"4px 18px 18px 68px",
                    background:p.accentBg,
                  }}>
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {p.features.map((f,fi) => (
                        <div key={fi} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
                          <div style={{
                            width:4, height:4, borderRadius:"50%",
                            background:p.accent, flexShrink:0, marginTop:5,
                          }} />
                          <span style={{
                            fontSize:12, color:"#000000",
                            fontFamily:"'DM Sans',sans-serif", fontWeight:500, lineHeight:1.5,
                          }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Stats Strip ──────────────────────────────────────────────────────────────
function StatsStrip({ isMobile }) {
  return (
    <div style={{
      display:"grid",
      gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(6,1fr)",
      background:T.surface,
      borderTop:`1px solid ${T.border}`,
      borderBottom:`1px solid ${T.border}`,
    }}>
      {STATS.map((s,i) => (
        <motion.div
          key={i}
          initial={{ opacity:0, y:8 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ delay:i*0.06, duration:0.4 }}
          style={{
            padding: isMobile ? "18px 16px" : "26px 32px",
            borderRight: isMobile
              ? (i%2===0 ? `1px solid ${T.border}` : "none")
              : (i<5 ? `1px solid ${T.border}` : "none"),
            borderBottom: isMobile && i<4 ? `1px solid ${T.border}` : "none",
          }}
        >
          <div style={{
            fontFamily:"'Bebas Neue',Impact,sans-serif",
            fontSize: isMobile ? 32 : 38,
            color:"#000000",
            letterSpacing:"-0.02em", lineHeight:1, marginBottom:4,
          }}>{s.val}</div>
          <div style={{
            fontSize:11, color:"#000000",
            lineHeight:1.4, fontWeight:500,
            fontFamily:"'DM Sans',sans-serif",
          }}>{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SolutionsSection() {
  const [selected, setSelected] = useState(null);
  const isMobile = useIsMobile();

  return (
    <section style={{
      background:T.bg, minHeight:"100vh",
      position:"relative", overflow:"hidden",
      fontFamily:"'DM Sans',sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{display:none;}
      `}</style>

      {/* Dot grid bg */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)",
        backgroundSize:"28px 28px",
      }} />

      {/* ── HEADER ── */}
      <div style={{
        maxWidth:1440, margin:"0 auto",
        padding: isMobile ? "44px 20px 0" : "68px 56px 0",
        position:"relative", zIndex:2,
      }}>
        <div style={{
          display:"flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          justifyContent:"space-between",
          gap: isMobile ? 24 : 40,
          marginBottom: isMobile ? 28 : 44,
        }}>

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.6 }}
              style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}
            >
              <motion.div
                animate={{ opacity:[1,0.25,1] }}
                transition={{ duration:2, repeat:Infinity }}
                style={{ width:6, height:6, borderRadius:"50%", background:T.dot }}
              />
              <span style={{
                fontFamily:"'DM Mono',monospace",
                fontSize: isMobile ? 9 : 10,
                letterSpacing:"0.15em", textTransform:"uppercase",
                color:"#000000", fontWeight:500,
              }}>AI Operating System — 12 Modules</span>
            </motion.div>

            <motion.h2
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.8, delay:0.1, ease:[0.16,1,0.3,1] }}
              style={{
                fontFamily:"'Bebas Neue',Impact,sans-serif",
                fontSize: isMobile ? "clamp(52px,14vw,72px)" : "clamp(56px,8vw,116px)",
                lineHeight:0.9, letterSpacing:"-0.01em",
                color:"#000000",
              }}
            >
              12 TOOLS.
              <br />
              <span style={{
                WebkitTextStroke: isMobile ? "1px rgba(0,0,0,0.25)" : "1.5px rgba(0,0,0,0.25)",
                WebkitTextFillColor:"transparent",
              }}>ONE SYSTEM.</span>
            </motion.h2>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:0.4, duration:0.7 }}
            style={{ maxWidth: isMobile ? "100%" : 300, paddingBottom:6 }}
          >
            <p style={{
              fontSize:13, color:"#000000", fontWeight:500,
              lineHeight:1.7, marginBottom:22,
              fontFamily:"'DM Sans',sans-serif",
            }}>
              {isMobile
                ? "Tap any module to explore its stats and features."
                : "Click any module to explore its stats, features, and impact. Each tool works standalone or as part of the full stack."}
            </p>
            <motion.button
              whileHover={{ scale:1.03, boxShadow:"0 8px 28px rgba(0,0,0,0.2)" }}
              whileTap={{ scale:0.97 }}
              style={{
                all:"unset", display:"inline-flex", alignItems:"center", gap:10,
                background:"#000000", color:"#FFFFFF",
                padding: isMobile ? "13px 24px" : "13px 28px",
                borderRadius:4,
                fontFamily:"'Plus Jakarta Sans',sans-serif",
                fontSize:13, fontWeight:800,
                letterSpacing:"-0.01em", cursor:"pointer",
                width: isMobile ? "100%" : "auto",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              Start Free Trial
              <motion.span
                animate={{ x:[0,4,0] }}
                transition={{ repeat:Infinity, duration:1.6, ease:"easeInOut" }}
              >
                <ArrowRight size={14} strokeWidth={2.5} />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div style={{ position:"relative", zIndex:2 }}>
        <MarqueeStrip reverse={false} />
        <MarqueeStrip reverse={true} />
      </div>

      {/* ── RAIL / LIST ── */}
      <motion.div
        initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.45, duration:0.7 }}
        style={{ position:"relative", zIndex:2 }}
      >
        {isMobile
          ? <MobileList products={PRODUCTS} selected={selected} onSelect={setSelected} />
          : <DesktopRail products={PRODUCTS} selected={selected} onSelect={setSelected} />
        }
      </motion.div>

      {/* ── STATS ── */}
      <StatsStrip isMobile={isMobile} />

      {/* ── FOOTER ── */}
      <div style={{
        maxWidth:1440, margin:"0 auto",
        padding: isMobile ? "24px 20px 44px" : "28px 56px 52px",
        display:"flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent:"space-between",
        gap: isMobile ? 14 : 20,
        position:"relative", zIndex:2,
      }}>
        <div style={{
          fontFamily:"'Bebas Neue',Impact,sans-serif",
          fontSize: isMobile ? 13 : "clamp(13px,1.6vw,18px)",
          color:"rgba(0,0,0,0.2)", letterSpacing:"0.1em",
        }}>
          READY TO AUTOMATE YOUR ENTIRE BUSINESS?
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap: isMobile ? 14 : 20 }}>
          {["14-day setup","No setup fees","Cancel anytime"].map(t => (
            <div key={t} style={{
              display:"flex", alignItems:"center", gap:6,
              fontSize: isMobile ? 9 : 10,
              color:"#000000", fontWeight:500,
              fontFamily:"'DM Mono',monospace",
              letterSpacing:"0.08em", textTransform:"uppercase",
            }}>
              <div style={{ width:3, height:3, borderRadius:"50%", background:T.dot }} />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}