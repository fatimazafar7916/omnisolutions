import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RED = "#EF4444";
const REDL = "#FEF2F2";
const GR = "#6E6D7A";

// Each problem has 3 rotating live messages shown while the card is focused
const CORE_PROBLEMS = [
  {
    id: "missed-dms",
    stat: "$31K",
    subtitle: "lost to unanswered DMs/mo",
    title: "DMs pile up while you sleep",
    desc: "Exotic renters DM at 11PM on Friday. If you don't reply in 10 minutes they book someone else. You wake up to 40 messages and zero bookings.",
    liveMessages: [
      "Right now: 4 DMs unanswered on your Instagram",
      "Last night: 11PM inquiry for Lamborghini — no reply",
      "This week: 23 DMs went cold before you responded",
    ],
    color: "#EF4444", colorLight: "#FEF2F2", colorBorder: "#FECACA", urgencyLevel: "CRITICAL",
  },
  {
    id: "slow-replies",
    stat: "42 min",
    subtitle: "your avg reply time",
    title: "First reply wins the booking",
    desc: "78% of luxury renters book with whoever responds first. Your competitor across town uses AI — they reply in 4 seconds. You reply in 42 minutes. You lose.",
    liveMessages: [
      "Right now: A competitor replied to your lead in 6 sec",
      "Today: You lost 3 leads to faster operators",
      "This hour: 2 people DM'd you and already booked elsewhere",
    ],
    color: "#F59E0B", colorLight: "#FFFBEB", colorBorder: "#FDE68A", urgencyLevel: "CRITICAL",
  },
  {
    id: "no-followup",
    stat: "91%",
    subtitle: "quotes never followed up",
    title: "You send quotes, never follow up",
    desc: "Exotic car clients need 2–3 touchpoints to close. You send a quote and hope. 91% of your quotes die in silence — that's $180K/yr in lost deals.",
    liveMessages: [
      "This month: 27 quotes sent, 2 followed up, 0 closed",
      "Right now: Quote from 3 days ago still sitting unread",
      "Last week: $8,400 deal fell through — no follow-up sent",
    ],
    color: "#22C55E", colorLight: "#F0FDF4", colorBorder: "#BBF7D0", urgencyLevel: "CRITICAL",
  },
  {
    id: "instagram-comments",
    stat: "1,200+",
    subtitle: "comments ignored monthly",
    title: "Comments = leads you're ignoring",
    desc: "Every 'How much?' on your Instagram reel is a warm lead. Most operators ignore them or reply 6 hours later. That comment turns cold in 12 minutes.",
    liveMessages: [
      "Right now: 'How much is this??' — posted 8 min ago, no reply",
      "Today: 14 comment leads went unanswered on your posts",
      "This week: Reel got 43K views, you booked 1 car from it",
    ],
    color: "#E1306C", colorLight: "#FDF2F8", colorBorder: "#F9A8D4", urgencyLevel: "HIGH",
  },
  {
    id: "no-shows",
    stat: "1 in 3",
    subtitle: "bookings are no-shows",
    title: "No reminders = empty bays",
    desc: "Without automated confirmations and reminder sequences, 34% of your bookings ghost you on pickup day. Empty bay. Full-day lost revenue. No excuse.",
    liveMessages: [
      "Yesterday: Ferrari booked, client never showed, $1,800 gone",
      "This month: 8 no-shows, $14,400 in empty calendar slots",
      "Today: 3 pickups scheduled, 0 reminders sent",
    ],
    color: "#EF4444", colorLight: "#FEF2F2", colorBorder: "#FECACA", urgencyLevel: "CRITICAL",
  },
  {
    id: "bad-reviews",
    stat: "3.8★",
    subtitle: "kills 50% of new bookings",
    title: "Bad reviews driving clients away",
    desc: "Luxury renters check reviews before everything. Below 4.5 stars, half your potential customers choose a competitor. Two bad reviews can cost you $40K/yr.",
    liveMessages: [
      "Right now: New 2-star review — no response from you yet",
      "This week: 3 people read your bad reviews and bounced",
      "Today: Competitor at 4.9★ just took a $3,200 booking you lost",
    ],
    color: "#EC4899", colorLight: "#FDF2F8", colorBorder: "#F9A8D4", urgencyLevel: "HIGH",
  },
  {
    id: "manual-work",
    stat: "22hrs",
    subtitle: "wasted on admin weekly",
    title: "You're the AI, the agent, the admin",
    desc: "Copying DMs into spreadsheets, sending invoices manually, typing the same pricing answer 40 times a day. 22 hours of your week are pure waste.",
    liveMessages: [
      "This week: You typed 'deposit is $5,000' 38 times manually",
      "Today: 3 hours spent copy-pasting booking details",
      "Right now: Admin backlog = 2 hours to clear before bed",
    ],
    color: "#8B5CF6", colorLight: "#F5F3FF", colorBorder: "#DDD6FE", urgencyLevel: "HIGH",
  },
  {
    id: "seasonal-gaps",
    stat: "$28K",
    subtitle: "lost in off-peak months",
    title: "Fleet sits idle in slow season",
    desc: "In off-peak months your fleet sits in the lot. No proactive outreach, no re-engagement campaigns, no discount nudges. Dead revenue every January and September.",
    liveMessages: [
      "Right now: 4 cars unbooked this entire week",
      "This month: 18 past clients didn't hear from you once",
      "Last Jan: Fleet was 23% utilized. Could've been 60%+",
    ],
    color: "#06B6D4", colorLight: "#ECFEFF", colorBorder: "#A5F3FC", urgencyLevel: "MEDIUM",
  },
  {
    id: "upsell",
    stat: "$9,800",
    subtitle: "upsell revenue lost monthly",
    title: "Clients want upgrades — you don't ask",
    desc: "Airport delivery, chauffeur add-ons, extended insurance, multi-day discounts — every booking has $200–$800 in upsell potential you're leaving on the table.",
    liveMessages: [
      "Today: 9 bookings completed, 0 upsells offered",
      "Last week: $4,200 in delivery fees left on the table",
      "Right now: Urus booking confirmed — no upgrade offered",
    ],
    color: "#F59E0B", colorLight: "#FFFBEB", colorBorder: "#FDE68A", urgencyLevel: "MEDIUM",
  },
  {
    id: "whatsapp-sms",
    stat: "64%",
    subtitle: "prefer SMS/WhatsApp",
    title: "Clients text. You check email.",
    desc: "64% of exotic renters prefer WhatsApp or SMS. If you only monitor Instagram DMs and email, you're invisible to the majority of your most valuable inbound leads.",
    liveMessages: [
      "Right now: WhatsApp message from Miami — 47 min no reply",
      "Today: 6 SMS inquiries, 2 seen, 0 replied to",
      "This week: $12K booking came via WhatsApp you almost missed",
    ],
    color: "#10B981", colorLight: "#ECFDF5", colorBorder: "#6EE7B7", urgencyLevel: "HIGH",
  },
  {
    id: "repeat-clients",
    stat: "71%",
    subtitle: "one-time customers",
    title: "Happy clients book competitors next",
    desc: "71% of renters who loved their experience book a competitor next time — because you never reached out. A simple follow-up sequence would turn them into loyal repeats.",
    liveMessages: [
      "This month: 19 past VIP clients booked elsewhere",
      "Right now: Client from 60 days ago — zero contact since",
      "This quarter: $47K in repeat revenue walked out the door",
    ],
    color: "#6366F1", colorLight: "#EEF2FF", colorBorder: "#C7D2FE", urgencyLevel: "HIGH",
  },
  {
    id: "competitors",
    stat: "5x",
    subtitle: "faster competitor growth",
    title: "AI operators are eating your market",
    desc: "Operators using AI automation close 5x more leads, respond instantly 24/7, and run leaner. Every week you wait, they lock in more of your market. The gap grows daily.",
    liveMessages: [
      "This year: 3 Miami operators launched AI — all growing 40%+",
      "Right now: Your top competitor just closed a DM in 3 seconds",
      "This month: AI operators captured 12% more market share",
    ],
    color: "#EF4444", colorLight: "#FEF2F2", colorBorder: "#FECACA", urgencyLevel: "CRITICAL",
  },
];

const METRICS = [
  { label: "Unanswered DM Revenue Loss", value: "$31K", period: "per month", trend: "23 cold leads this week alone", color: "#EF4444", lossPct: 0.78, monthlyLoss: "$31,000" },
  { label: "Leads Lost to Slow Response", value: "78%", period: "book with 1st responder", trend: "Your avg reply time: 42 min", color: "#F59E0B", lossPct: 0.78, monthlyLoss: "$18,200" },
  { label: "Quotes That Never Close", value: "91%", period: "never followed up", trend: "Only 2 of 27 quotes followed up", color: "#22C55E", lossPct: 0.91, monthlyLoss: "$15,000" },
  { label: "Instagram Comment Leads Lost", value: "1,200+", period: "ignored monthly", trend: "14 comment leads ignored today", color: "#E1306C", lossPct: 0.82, monthlyLoss: "$9,600" },
  { label: "No-Show Revenue Drain", value: "$14.4K", period: "per month", trend: "8 no-shows, 0 reminders sent", color: "#EF4444", lossPct: 0.34, monthlyLoss: "$14,400" },
  { label: "Review Rating Penalty", value: "−50%", period: "bookings below 4.5★", trend: "New 2★ review unanswered", color: "#EC4899", lossPct: 0.50, monthlyLoss: "$22,000" },
  { label: "Admin Time Wasted", value: "22hrs", period: "every week", trend: "1,144 hrs/year automatable", color: "#8B5CF6", lossPct: 0.55, monthlyLoss: "$4,400" },
  { label: "Off-Peak Fleet Idle Loss", value: "$28K", period: "per slow month", trend: "Fleet at 23% utilization last Jan", color: "#06B6D4", lossPct: 0.77, monthlyLoss: "$28,000" },
  { label: "Missed Upsell Revenue", value: "$9,800", period: "per month", trend: "0 upsells offered today", color: "#F59E0B", lossPct: 0.68, monthlyLoss: "$9,800" },
  { label: "SMS/WhatsApp Leads Missed", value: "64%", period: "prefer these channels", trend: "6 SMS inquiries unseen today", color: "#10B981", lossPct: 0.64, monthlyLoss: "$12,000" },
  { label: "Repeat Clients Walking Away", value: "$47K", period: "per quarter", trend: "19 VIP clients booked rivals", color: "#6366F1", lossPct: 0.71, monthlyLoss: "$15,700" },
  { label: "AI Competitor Growth Gap", value: "5x", period: "faster competitor growth", trend: "3 rivals grew 40%+ with AI", color: "#EF4444", lossPct: 0.85, monthlyLoss: "∞" },
];

// Rotating live message component — always cycles every 2s
function RotatingLiveMessage({ messages, color, colorLight, colorBorder, small }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % messages.length);
    }, 2000);
    return () => clearInterval(t);
  }, [messages.length]);

  return (
    <div style={{ background: colorLight, border: `1px solid ${colorBorder}`, borderRadius: 8, padding: small ? "5px 8px" : "7px 10px", display: "flex", alignItems: "center", gap: 6, overflow: "hidden", flexShrink: 0 }}>
      <motion.div style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
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

function ProblemCard({ problem, isFocused, small }) {
  const pad = small ? "10px 12px" : "16px 18px";
  return (
    <div style={{
      width: "100%", height: "100%", background: "#fff", borderRadius: 16,
      border: `1.5px solid ${isFocused ? problem.color : problem.colorBorder}`,
      boxShadow: isFocused ? `0 8px 28px ${problem.color}22` : "0 1px 6px rgba(0,0,0,0.05)",
      overflow: "hidden", display: "flex", flexDirection: "column", position: "relative",
    }}>
      {/* Top accent bar */}
      <div style={{ height: 3, background: problem.color, flexShrink: 0, opacity: 0.85 }} />

      <div style={{ padding: pad, display: "flex", flexDirection: "column", flex: 1, gap: small ? 6 : 8 }}>
        {/* Stat + subtitle row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: small ? 22 : 30, color: problem.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{problem.stat}</span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: small ? 9 : 10.5, color: GR, fontWeight: 500, lineHeight: 1.2 }}>{problem.subtitle}</span>
        </div>

        {/* Title */}
        <h4 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: small ? 11 : 13.5, color: "#141419", margin: 0, lineHeight: 1.3 }}>{problem.title}</h4>

        {/* Desc — limited to 3 lines */}
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: small ? 10 : 11.5, color: GR,
          lineHeight: 1.5, margin: 0,
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{problem.desc}</p>

        {/* Live message */}
        <RotatingLiveMessage
          messages={problem.liveMessages}
          color={problem.color}
          colorLight={problem.colorLight}
          colorBorder={problem.colorBorder}
          small={small}
        />
      </div>
    </div>
  );
}

function LossCard({ metric, isFocus, isVisible }) {
  const radius = 26;
  const circ = 2 * Math.PI * radius;
  const pct = metric.lossPct ?? 0.7;
  const dashOffset = circ - circ * pct;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(145deg, #FAFAFA, #F5F5F5)",
      borderRadius: 16,
      border: `1.5px solid ${isFocus ? metric.color + "60" : "#E5E5E5"}`,
      boxShadow: isFocus ? `0 0 40px ${metric.color}28, 0 4px 20px rgba(0,0,0,0.08)` : "0 2px 12px rgba(0,0,0,0.06)",
      overflow: "hidden", display: "flex", flexDirection: "column", position: "relative",
    }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: "50%", background: metric.color, opacity: 0.07, filter: "blur(36px)", pointerEvents: "none" }} />
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent 0%, ${metric.color} 50%, transparent 100%)`, flexShrink: 0 }} />

      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7280" }}>{metric.label}</span>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 30, color: metric.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{metric.value}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#6B7280", marginTop: 3, lineHeight: 1.3 }}>{metric.period}</div>
          </div>

          <svg width={64} height={64} style={{ flexShrink: 0 }}>
            <circle cx={32} cy={32} r={radius} fill="none" stroke="#E5E5E5" strokeWidth={4.5} />
            <motion.circle
              cx={32} cy={32} r={radius}
              fill="none" stroke={metric.color} strokeWidth={4.5} strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={isVisible ? { strokeDashoffset: dashOffset } : { strokeDashoffset: circ }}
              transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
              transform="rotate(-90 32 32)"
            />
            <text x={32} y={36} textAnchor="middle" style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 800, fill: metric.color }}>
              {Math.round(pct * 100)}%
            </text>
          </svg>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8.5, color: "#6B7280", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Monthly loss</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10.5, color: "#EF4444", fontWeight: 800 }}>{metric.monthlyLoss}</span>
          </div>
          <div style={{ height: 5, background: "#E5E5E5", borderRadius: 6, overflow: "hidden" }}>
            <motion.div
              style={{ height: "100%", borderRadius: 6, background: `linear-gradient(90deg, ${metric.color}55, ${metric.color})` }}
              initial={{ width: "0%" }}
              animate={isVisible ? { width: `${pct * 100}%` } : { width: "0%" }}
              transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "4px 8px" }}>
          <motion.div style={{ width: 5, height: 5, borderRadius: "50%", background: "#EF4444", flexShrink: 0 }} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9.5, fontWeight: 600, color: "#DC2626", lineHeight: 1.3 }}>{metric.trend}</span>
        </div>
      </div>
    </div>
  );
}

function ThreeCarousel({ items, renderCard, cardH, interval = 6000 }) {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 640 : false);
  const total = items.length;

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActive(a => (a + 1) % total);
    }, interval);
    return () => clearInterval(t);
  }, [total, interval]);

  const visibleCount = isMobile ? 2 : 3;
  const blurValues  = { 0: "none", 1: "blur(0.6px)", 2: "blur(0.6px)" };
  const opacityValues = { 0: 1, 1: 0.75, 2: 0.65 };
  const scaleValues  = { 0: 1, 1: 0.97, 2: 0.97 };
  const cardWidth = isMobile ? "calc(50% - 8px)" : "calc(33.33% - 11px)";

  const cards = Array.from({ length: visibleCount }, (_, offset) => ({
    index: (active + offset) % total,
    offset,
  }));

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ position: "relative", width: "100%", height: cardH, overflow: "hidden" }}>
        <motion.div
          key={active}
          initial={{ x: `calc(${cardWidth} + 16px)` }}
          animate={{ x: "0px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "flex", gap: 16, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          {cards.map(({ index, offset }) => (
            <div
              key={`${active}-${offset}`}
              style={{
                flex: `0 0 ${cardWidth}`,
                height: "100%",
                filter: blurValues[offset] || "none",
                opacity: opacityValues[offset] ?? 0.65,
                transform: `scale(${scaleValues[offset] ?? 0.97})`,
                transition: "opacity 0.6s ease-out, filter 0.6s ease-out, transform 0.6s ease-out",
                transformOrigin: "top center",
              }}
            >
              {renderCard(items[index], offset === 0)}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{ width: i === active ? 22 : 7, height: 7, borderRadius: 4, background: i === active ? (item.color || "#7B74DC") : "#E3E2EB", border: "none", cursor: "pointer", transition: "all 0.5s ease-out", padding: 0 }}
          />
        ))}
      </div>
    </div>
  );
}

function ProblemCarousel({ isVisible, isMobile }) {
  return (
    <ThreeCarousel
      items={CORE_PROBLEMS}
      renderCard={(p, focused) => <ProblemCard problem={p} isFocused={focused} small={isMobile} />}
      cardH={isMobile ? 210 : 270}
      interval={6000}
    />
  );
}

function MetricsCarousel({ isVisible, isMobile }) {
  return (
    <ThreeCarousel
      items={METRICS}
      renderCard={(m, focused) => <LossCard metric={m} isFocus={focused} isVisible={isVisible} />}
      cardH={isMobile ? 230 : 250}
      interval={5000}
    />
  );
}

export default function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="problem" ref={sectionRef} style={{ background: "#FCFCFE", borderTop: "1px solid #E3E2EB", padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(239,68,68,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.03) 1px, transparent 1px)`, backgroundSize: "48px 48px", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: isMobile ? 420 : 960, margin: "0 auto", padding: "0 20px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: "easeOut" }} style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 20, padding: "4px 14px", marginBottom: 14 }}>
            <motion.span style={{ width: 5, height: 5, borderRadius: "50%", background: RED, display: "inline-block" }} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: RED }}>The Real Problem</span>
          </div>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(22px,4vw,40px)", color: "#141419", letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.15 }}>
            You are losing real money<br /><span style={{ color: RED }}>$23,400 every single month.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(13px,1.5vw,15px)", color: GR, maxWidth: 440, margin: "0 auto", lineHeight: 1.6 }}>
            These 12 problems are bleeding your exotic rental business dry — every missed message lets profit walk to competitors.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}>
          <ProblemCarousel isVisible={isVisible} isMobile={isMobile} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }} style={{ textAlign: "center", margin: "36px 0 20px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FAFAFA", border: "1px solid #EF444430", borderRadius: 12, padding: "8px 20px" }}>
            <motion.div style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444" }} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#EF4444", letterSpacing: "0.06em", textTransform: "uppercase" }}>Real financial bleeding — per month</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}>
          <MetricsCarousel isVisible={isVisible} isMobile={isMobile} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }} style={{ textAlign: "center", marginTop: 32, padding: "16px 24px", background: "linear-gradient(135deg, rgba(123,116,220,0.06), rgba(239,68,68,0.04))", border: "1px solid rgba(123,116,220,0.15)", borderRadius: 14 }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(13px,1.6vw,16px)", color: "#141419", letterSpacing: "-0.01em", margin: "0 0 4px" }}>Stop losing money the moment you start using our system.</p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: GR, margin: 0 }}>See how we fix every single one of these — automatically.</p>
        </motion.div>
      </div>
    </section>
  );
}