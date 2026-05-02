import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RED = "#EF4444";
const GR = "#6E6D7A";
const GREEN = "#22C55E";

const CORE_PROBLEMS = [
  {
    id: "missed-dms",
    stat: "$31K",
    subtitle: "lost to unanswered DMs/mo",
    title: "Messages pile up while you sleep",
    desc: "Customers message you at 11PM Friday. If you don't reply in 10 minutes, they book with someone else. You wake up to 40 messages and zero bookings.",
    impactLine: "Someone else picked up the call — and you lost the booking.",
    liveMessages: [
      "Right now: 4 DMs unanswered on your Instagram",
      "Last night: 11PM inquiry for Lamborghini — no reply",
      "This week: 23 DMs went cold before you responded",
    ],
    color: "#EF4444", colorLight: "#FEF2F2", colorBorder: "#FECACA",
  },
  {
    id: "slow-replies",
    stat: "42 min",
    subtitle: "your avg reply time",
    title: "First to reply wins the booking",
    desc: "Most customers book with whoever replies first. Your competitor uses AI and replies in 4 seconds. You reply in 42 minutes. You lose the booking.",
    impactLine: "While you're typing, your competitor already closed the deal.",
    liveMessages: [
      "Right now: A competitor replied to your lead in 6 sec",
      "Today: You lost 3 leads to faster operators",
      "This hour: 2 people messaged you and booked elsewhere",
    ],
    color: "#F59E0B", colorLight: "#FFFBEB", colorBorder: "#FDE68A",
  },
  {
    id: "no-followup",
    stat: "91%",
    subtitle: "quotes never followed up",
    title: "You send quotes and hope",
    desc: "Car rental customers need 2-3 reminders to book. You send a quote and wait. 91% of your quotes die in silence — that's $180K per year in lost deals.",
    impactLine: "Your quote is sitting in their inbox — forgotten and ignored.",
    liveMessages: [
      "This month: 27 quotes sent, 2 followed up, 0 closed",
      "Right now: Quote from 3 days ago still sitting unread",
      "Last week: $8,400 deal fell through — no follow-up sent",
    ],
    color: "#22C55E", colorLight: "#F0FDF4", colorBorder: "#BBF7D0",
  },
  {
    id: "instagram-comments",
    stat: "1,200+",
    subtitle: "comments ignored monthly",
    title: "Comments are leads you ignore",
    desc: "Every 'How much?' on your Instagram post is a hot lead. Most operators ignore them or reply 6 hours later. That lead goes cold in 12 minutes.",
    impactLine: "They asked 'How much?' — you never answered, they booked elsewhere.",
    liveMessages: [
      "Right now: 'How much is this??' — posted 8 min ago, no reply",
      "Today: 14 comment leads went unanswered on your posts",
      "This week: Post got 43K views, you booked 1 car from it",
    ],
    color: "#E1306C", colorLight: "#FDF2F8", colorBorder: "#F9A8D4",
  },
  {
    id: "no-shows",
    stat: "1 in 3",
    subtitle: "bookings are no-shows",
    title: "No reminders means empty spots",
    desc: "Without auto reminders, 34% of your bookings don't show up on pickup day. Empty parking spot. Full day of lost money. No excuse.",
    impactLine: "They forgot. Your Ferrari sat empty. $1,800 gone.",
    liveMessages: [
      "Yesterday: Ferrari booked, client never showed, $1,800 gone",
      "This month: 8 no-shows, $14,400 in empty calendar slots",
      "Today: 3 pickups scheduled, 0 reminders sent",
    ],
    color: "#EF4444", colorLight: "#FEF2F2", colorBorder: "#FECACA",
  },
  {
    id: "bad-reviews",
    stat: "3.8★",
    subtitle: "kills 50% of new bookings",
    title: "Bad reviews scare customers away",
    desc: "Customers check reviews before booking. Below 4.5 stars, half your potential customers pick a competitor. Two bad reviews can cost you $40K per year.",
    impactLine: "One angry review — and half your customers walk away.",
    liveMessages: [
      "Right now: New 2-star review — no response from you yet",
      "This week: 3 people read your bad reviews and left",
      "Today: Competitor at 4.9★ just took a $3,200 booking you lost",
    ],
    color: "#EC4899", colorLight: "#FDF2F8", colorBorder: "#F9A8D4",
  },
  {
    id: "manual-work",
    stat: "22hrs",
    subtitle: "wasted on admin weekly",
    title: "You do everything manually",
    desc: "Copying messages into spreadsheets, sending invoices by hand, typing the same price answer 40 times a day. 22 hours of your week is wasted work.",
    impactLine: "You typed the same answer 40 times today — your life is copy-paste.",
    liveMessages: [
      "This week: You typed 'deposit is $5,000' 38 times manually",
      "Today: 3 hours spent copy-pasting booking details",
      "Right now: Admin backlog = 2 hours to clear before bed",
    ],
    color: "#8B5CF6", colorLight: "#F5F3FF", colorBorder: "#DDD6FE",
  },
  {
    id: "seasonal-gaps",
    stat: "$28K",
    subtitle: "lost in off-peak months",
    title: "Cars sit empty in slow months",
    desc: "In slow months your cars sit in the lot. No outreach to past customers, no special deals, no reminders. Dead money every January.",
    impactLine: "Your fleet is parked. Your money is bleeding. Nobody knows you exist.",
    liveMessages: [
      "Right now: 4 cars unbooked this entire week",
      "This month: 18 past clients didn't hear from you once",
      "Last Jan: Fleet was 23% booked. Could've been 60%+",
    ],
    color: "#06B6D4", colorLight: "#ECFEFF", colorBorder: "#A5F3FC",
  },
  {
    id: "upsell",
    stat: "$9,800",
    subtitle: "upsell revenue lost monthly",
    title: "Customers want extras — you don't ask",
    desc: "Airport delivery, driver service, extra insurance, multi-day deals — every booking has $200-$800 in extra money you're leaving on the table.",
    impactLine: "They wanted delivery. You never asked. $400 left on the table.",
    liveMessages: [
      "Today: 9 bookings completed, 0 extras offered",
      "Last week: $4,200 in delivery fees left on the table",
      "Right now: Urus booking confirmed — no upgrade offered",
    ],
    color: "#F59E0B", colorLight: "#FFFBEB", colorBorder: "#FDE68A",
  },
  {
    id: "whatsapp-sms",
    stat: "64%",
    subtitle: "prefer SMS/WhatsApp",
    title: "Customers text. You check email.",
    desc: "64% of customers prefer WhatsApp or text. If you only check Instagram and email, you're missing most of your best leads.",
    impactLine: "They texted you. You checked email. They booked someone else.",
    liveMessages: [
      "Right now: WhatsApp message from Miami — 47 min no reply",
      "Today: 6 text messages, 2 seen, 0 replied to",
      "This week: $12K booking came via WhatsApp you almost missed",
    ],
    color: "#10B981", colorLight: "#ECFDF5", colorBorder: "#6EE7B7",
  },
  {
    id: "repeat-clients",
    stat: "71%",
    subtitle: "one-time customers",
    title: "Happy customers book others next time",
    desc: "71% of customers who loved you book a competitor next time — because you never reached out. A simple follow-up turns them into repeat customers.",
    impactLine: "They loved you. You ghosted them. They moved on.",
    liveMessages: [
      "This month: 19 past VIP clients booked elsewhere",
      "Right now: Client from 60 days ago — zero contact since",
      "This quarter: $47K in repeat money walked out the door",
    ],
    color: "#6366F1", colorLight: "#EEF2FF", colorBorder: "#C7D2FE",
  },
  {
    id: "competitors",
    stat: "5x",
    subtitle: "faster competitor growth",
    title: "AI operators are taking your customers",
    desc: "Operators using AI close 5x more leads, reply instantly 24/7, and work smarter. Every week you wait, they take more of your customers.",
    impactLine: "Your competitor replied in 3 seconds. You're still sleeping.",
    liveMessages: [
      "This year: 3 Miami operators launched AI — all growing 40%+",
      "Right now: Your top competitor just closed a message in 3 seconds",
      "This month: AI operators took 12% more market share",
    ],
    color: "#EF4444", colorLight: "#FEF2F2", colorBorder: "#FECACA",
  },
];

const IMPACT_GROUPS = [
  { impact: "$64.4K", phrase: "bleeding monthly — DMs, slow replies & dead quotes" },
  { impact: "$46K",   phrase: "lost to ignored comments, no-shows & bad reviews" },
  { impact: "$42.2K", phrase: "wasted on admin, idle fleet & missed upsells" },
  { impact: "$27.7K", phrase: "gone via wrong channels, lost repeats & AI rivals" },
];

/* ─── Optimized styles injected once ─── */
const WIRE_STYLE = `
@keyframes wireDraw {
  from { stroke-dashoffset: 400; opacity: 0; }
  to   { stroke-dashoffset: 0;   opacity: 0.7; }
}
@keyframes dotPop {
  0%   { transform: scale(0); opacity: 0; }
  60%  { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes nodeIn {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.wire-path { animation: wireDraw 0.7s ease-out forwards; }
.wire-dot  { animation: dotPop 0.3s cubic-bezier(.34,1.56,.64,1) forwards; }
.node-core { animation: nodeIn 0.4s cubic-bezier(.34,1.56,.64,1) 0.4s forwards; transform-box: fill-box; transform-origin: center; opacity: 0; }
.node-ring1 { animation: nodeIn 0.5s ease-out 0.45s forwards; transform-box: fill-box; transform-origin: center; opacity: 0; }
.node-text  { animation: fadeUp 0.35s ease-out forwards; opacity: 0; }
`;

function StyleOnce() {
  const injected = useRef(false);
  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const el = document.createElement("style");
    el.textContent = WIRE_STYLE;
    document.head.appendChild(el);
  }, []);
  return null;
}

/* ─── Rotating live message ─── */
function RotatingLiveMessage({ messages, color, colorLight, colorBorder, small }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % messages.length), 2000);
    return () => clearInterval(t);
  }, [messages.length]);

  return (
    <div style={{
      background: colorLight, border: `1px solid ${colorBorder}`, borderRadius: 8,
      padding: small ? "5px 8px" : "7px 10px",
      display: "flex", alignItems: "center", gap: 6, overflow: "hidden", flexShrink: 0,
    }}>
      <motion.div
        style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.4 }}
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: small ? 9.5 : 11, fontWeight: 700, color, lineHeight: 1.3 }}
        >
          {messages[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ─── Problem card (original, untouched) ─── */
function ProblemCard({ problem, isFocused, small }) {
  const pad = small ? "10px 12px" : "13px 15px";
  return (
    <div style={{
      width: "100%", height: "100%", background: "#fff", borderRadius: 16,
      border: `1.5px solid ${isFocused ? problem.color : problem.colorBorder}`,
      boxShadow: isFocused ? `0 8px 28px ${problem.color}22` : "0 1px 6px rgba(0,0,0,0.05)",
      overflow: "hidden", display: "flex", flexDirection: "column",
    }}>
      <div style={{ height: 3, background: problem.color, flexShrink: 0, opacity: 0.85 }} />
      <div style={{ padding: pad, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Top spacer for breathing room */}
        <div style={{ height: small ? 4 : 6 }} />
        
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap", marginBottom: small ? 4 : 5 }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: small ? 22 : 28, color: problem.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{problem.stat}</span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: small ? 9 : 10, color: GR, fontWeight: 500, lineHeight: 1.2 }}>{problem.subtitle}</span>
        </div>
        <h4 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: small ? 11 : 13, color: "#141419", margin: 0, lineHeight: 1.25, marginBottom: small ? 2 : 3 }}>{problem.title}</h4>
        
        {/* Middle spacer to push description down */}
        <div style={{ flex: 1 }} />
        
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: small ? 9.5 : 11.5, color: GR,
          lineHeight: small ? 1.35 : 1.45, margin: 0, marginBottom: small ? 6 : 8,
          display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{problem.desc}</p>
        
        <div>
          <RotatingLiveMessage
            messages={problem.liveMessages}
            color={problem.color}
            colorLight={problem.colorLight}
            colorBorder={problem.colorBorder}
            small={small}
          />
        </div>
      </div>
    </div>
  );
}

/*
  ─── Optimized WireConvergence ───
  Green circle with red text inside, fully mobile responsive.
*/
function WireConvergence({ groupIndex, colors, isMobile, animKey }) {
  const { impact, phrase } = IMPACT_GROUPS[groupIndex % IMPACT_GROUPS.length];

  const W = 680;
  const visibleCount = isMobile ? 2 : 3;
  const gap = 16;
  const totalGaps = (visibleCount - 1) * gap;
  const cardW = (W - totalGaps) / visibleCount;
  const originXs = Array.from({ length: visibleCount }, (_, i) => i * (cardW + gap) + cardW / 2);

  const nodeX = W / 2;
  const wireLen = isMobile ? 180 : 200;
  const nodeY = wireLen + 6;
  const nodeR = isMobile ? 80 : 96;
  const svgH = nodeY + nodeR + (isMobile ? 66 : 80);

  // Optimized bezier curve - wires end exactly at the entry dot with better visibility
  const wirePath = (ox) =>
    `M${ox} 0 C${ox} ${wireLen * 0.4}, ${nodeX} ${wireLen * 0.6}, ${nodeX} ${nodeY - nodeR}`;

  // Optimized text content - shorter and punchier
  const optimizePhrase = (text) => {
    const optimizations = {
      "bleeding monthly — DMs, slow replies & dead quotes": "DMs, replies & quotes",
      "lost to ignored comments, no-shows & bad reviews": "comments, no-shows & reviews",
      "wasted on admin, idle fleet & missed upsells": "admin, idle fleet & upsells",
      "gone via wrong channels, lost repeats & AI rivals": "channels, repeats & AI rivals"
    };
    return optimizations[text] || text;
  };

  const optimizedPhrase = optimizePhrase(phrase);

  // Smart text wrapping for responsive display
  const wrapText = (text, maxChars) => {
    if (text.length <= maxChars) return [text];
    
    // Try to split at natural break points
    const parts = text.split(/([,&])/);
    const lines = [];
    let currentLine = '';
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const testLine = currentLine + part;
      
      if (testLine.trim().length <= maxChars || part.match(/[,&]/)) {
        currentLine = testLine;
      } else {
        if (currentLine.trim()) lines.push(currentLine.trim());
        currentLine = part;
      }
    }
    if (currentLine.trim()) lines.push(currentLine.trim());
    
    return lines.length > 0 ? lines : [text];
  };

  const phraseLines = wrapText(optimizedPhrase, isMobile ? 24 : 32);

  return (
    <svg
      key={animKey}
      width="100%"
      viewBox={`0 0 ${W} ${svgH}`}
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      {/* Wires */}
      {originXs.map((ox, i) => (
        <path
          key={i}
          className="wire-path"
          d={wirePath(ox)}
          fill="none"
          stroke={colors[i] || GREEN}
          strokeWidth={2.5}
          strokeDasharray="400"
          strokeLinecap="round"
          style={{ animationDelay: `${i * 0.08}s` }}
        />
      ))}

      {/* Origin dots */}
      {originXs.map((ox, i) => (
        <circle
          key={`d${i}`}
          className="wire-dot"
          cx={ox} cy={0} r={5}
          fill={colors[i] || GREEN}
          style={{ animationDelay: `${i * 0.08}s`, transformOrigin: `${ox}px 0px` }}
        />
      ))}

      {/* Only 2 rings - outer ring */}
      <circle
        className="node-ring1"
        cx={nodeX} cy={nodeY} r={nodeR + 12}
        fill="none" stroke={GREEN} strokeWidth="0.7"
        opacity="0"
      />
      
      {/* Core circle - green */}
      <circle
        className="node-core"
        cx={nodeX} cy={nodeY} r={nodeR}
        fill="white" stroke={GREEN} strokeWidth="1.5"
        opacity="0"
      />

      {/* Entry dot - larger and more visible */}
      <circle
        className="wire-dot"
        cx={nodeX} cy={nodeY - nodeR} r={6}
        fill={GREEN}
        style={{ animationDelay: "0.45s", transformOrigin: `${nodeX}px ${(nodeY - nodeR)}px` }}
      />

      {/* Label - RED */}
      <text
        className="node-text"
        x={nodeX} y={nodeY - (isMobile ? 28 : 34)}
        textAnchor="middle"
        style={{
          fontFamily: "'DM Sans',sans-serif", fontWeight: 700,
          fontSize: isMobile ? 8.5 : 10, fill: RED, letterSpacing: "0.12em",
          animationDelay: "0.6s",
        }}
      >MONTHLY BLEED</text>

      {/* Impact amount - RED */}
      <text
        className="node-text"
        x={nodeX} y={nodeY + (isMobile ? 16 : 20)}
        textAnchor="middle"
        style={{
          fontFamily: "'Inter',sans-serif", fontWeight: 900,
          fontSize: isMobile ? 34 : 42, fill: RED, letterSpacing: "-0.04em",
          animationDelay: "0.65s",
        }}
      >{impact}</text>

      {/* Description phrase - RED, responsive wrapping */}
      <text
        className="node-text"
        x={nodeX}
        y={nodeY + (isMobile ? 34 : 42)}
        textAnchor="middle"
        style={{
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
          fontSize: isMobile ? 8.5 : 10, fill: RED,
          animationDelay: "0.75s",
        }}
      >
        {phraseLines.map((line, i) => (
          <tspan key={i} x={nodeX} dy={i === 0 ? 0 : "1.25em"}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  );
}

/* ─── Rotating Problem Display Under Circle ─── */
function RotatingProblemDisplay({ visibleItems, items, isMobile }) {
  return (
    <div style={{
      marginTop: isMobile ? 8 : 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: isMobile ? 24 : 28,
      padding: '0 20px',
    }}>
      <AnimatePresence mode="wait">
        {visibleItems.map(({ index, slot }) => {
          const problem = items[index];
          if (slot !== 0) return null; // Only show the focused card's problem
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: isMobile ? 11 : 13,
                color: RED,
                textAlign: 'center',
                letterSpacing: '-0.01em',
                fontStyle: 'italic',
                maxWidth: isMobile ? 320 : 500,
              }}
            >
              {problem.impactLine}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/* ─── Carousel with wires below ─── */
function SharedCarousel({ items, renderCard, cardH, groupIndex, setGroupIndex, isMobile, onNext, onPrev }) {
  const total = items.length;
  const visibleCount = isMobile ? 2 : 3;
  const totalGroups = Math.ceil(total / visibleCount);
  const cardWidth = isMobile ? "calc(50% - 8px)" : "calc(33.33% - 11px)";
  const dragStartX = useRef(null);
  const groupStart = groupIndex * visibleCount;

  const visibleItems = Array.from({ length: visibleCount }, (_, i) => ({
    index: (groupStart + i) % total,
    slot: i,
  }));

  const visibleColors = visibleItems.map(({ index }) => items[index]?.color || RED);

  const handleDragStart = (e) => {
    dragStartX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  };
  const handleDragEnd = (e) => {
    if (dragStartX.current === null) return;
    const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;
    if (Math.abs(diff) > 30) { diff > 0 ? onNext() : onPrev(); }
    dragStartX.current = null;
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* Card row */}
      <div
        style={{ width: "100%", height: cardH, overflow: "hidden", cursor: "grab", userSelect: "none" }}
        onMouseDown={handleDragStart} onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart} onTouchEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={groupStart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ display: "flex", gap: 16, width: "100%", height: "100%" }}
          >
            {visibleItems.map(({ index, slot }) => (
              <motion.div
                key={slot}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: slot * 0.08, ease: "easeOut" }}
                style={{ flex: `0 0 ${cardWidth}`, height: "100%" }}
              >
                {renderCard(items[index], slot === 0)}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Wires + node — seamless below cards, keyed to force CSS re-animation */}
      <div style={{ width: "100%", marginTop: 0 }}>
        <WireConvergence
          groupIndex={groupIndex}
          colors={visibleColors}
          isMobile={isMobile}
          animKey={groupIndex}
        />
      </div>

      {/* Rotating Problem Display Under Circle */}
      <RotatingProblemDisplay 
        visibleItems={visibleItems}
        items={items}
        isMobile={isMobile}
      />

      {/* Nav dots */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center", marginTop: 12 }}>
        {!isMobile && (
          <button
            onClick={onPrev}
            style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #E3E2EB", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: GR, flexShrink: 0 }}
          >‹</button>
        )}
        {!isMobile && (
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            {Array.from({ length: totalGroups }, (_, gi) => (
              <button
                key={gi}
                onClick={() => setGroupIndex(gi)}
                style={{
                  width: gi === groupIndex ? 22 : 7, height: 7, borderRadius: 4,
                  background: gi === groupIndex ? (items[gi * visibleCount]?.color || "#7B74DC") : "#E3E2EB",
                  border: "none", cursor: "pointer", transition: "all 0.4s ease-out", padding: 0,
                }}
              />
            ))}
          </div>
        )}
        {!isMobile && (
          <button
            onClick={onNext}
            style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #E3E2EB", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: GR, flexShrink: 0 }}
          >›</button>
        )}
      </div>
    </div>
  );
}

/* ─── Controller ─── */
function SyncedCarousels({ isMobile }) {
  const visibleCount = isMobile ? 2 : 3;
  const totalGroups = Math.ceil(CORE_PROBLEMS.length / visibleCount);
  const [groupIndex, setGroupIndex] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setGroupIndex(g => (g + 1) % totalGroups);
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [totalGroups]);

  const goNext = () => { setGroupIndex(g => (g + 1) % totalGroups); resetTimer(); };
  const goPrev = () => { setGroupIndex(g => (g - 1 + totalGroups) % totalGroups); resetTimer(); };

  return (
    <SharedCarousel
      items={CORE_PROBLEMS}
      renderCard={(p, focused) => <ProblemCard problem={p} isFocused={focused} small={isMobile} />}
      cardH={isMobile ? 200 : 230}
      groupIndex={groupIndex}
      setGroupIndex={(gi) => { setGroupIndex(gi); resetTimer(); }}
      isMobile={isMobile}
      onNext={goNext}
      onPrev={goPrev}
    />
  );
}

/* ─── Root export ─── */
export default function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const sectionRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      style={{
        background: "#FCFCFE", borderTop: "1px solid #E3E2EB",
        padding: "80px 0 60px", position: "relative", overflow: "hidden",
      }}
    >
      <StyleOnce />

      {/* grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(239,68,68,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: isMobile ? 420 : 960, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 20, padding: "4px 14px", marginBottom: 14,
          }}>
            <motion.span
              style={{ width: 5, height: 5, borderRadius: "50%", background: RED, display: "inline-block" }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: RED }}>
              The Real Problem
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 700,
            fontSize: "clamp(22px,4vw,40px)", color: "#141419",
            letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.15,
          }}>
            You are losing real money<br />
            <span style={{ color: RED }}>$23,400 every single month.</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(13px,1.5vw,15px)",
            color: GR, maxWidth: 440, margin: "0 auto", lineHeight: 1.6,
          }}>
            These 12 problems are bleeding your exotic rental business dry — every missed message lets profit walk to competitors.
          </p>
        </motion.div>

        {/* Cards + wires */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <SyncedCarousels isMobile={isMobile} />
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          style={{
            textAlign: "center", marginTop: 32, padding: "16px 24px",
            background: "linear-gradient(135deg, rgba(123,116,220,0.06), rgba(239,68,68,0.04))",
            border: "1px solid rgba(123,116,220,0.15)", borderRadius: 14,
          }}
        >
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(13px,1.6vw,16px)", color: "#141419", letterSpacing: "-0.01em", margin: "0 0 4px" }}>
            Stop losing money the moment you start using our system.
          </p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: GR, margin: 0 }}>
            See how we fix every single one of these — automatically.
          </p>
        </motion.div>

      </div>
    </section>
  );
}