import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageSquare,
  Mail,
  Star,
  TrendingUp,
  Users,
  RefreshCw,
  Shield,
  Calendar,
  Zap,
  ClipboardList,
  Heart,
  Gift,
  CheckCircle,
} from "lucide-react";

const AGENTS = [
  {
    id: "follow-up",
    name: "Follow-Up Agent",
    icon: RefreshCw,
    stat: "94%",
    statLabel: "Lead Recovery",
    badge: "Auto-Follow",
    color: "#22C55E",
    points: [
      { icon: Mail, label: "Email sent", sub: "Lead #247 · 2m ago" },
      { icon: MessageSquare, label: "SMS follow-up", sub: "3 leads today" },
      { icon: Phone, label: "Call scheduled", sub: "Tomorrow 10am" },
      { icon: TrendingUp, label: "$1,800 recovered", sub: "This week" },
      { icon: RefreshCw, label: "Sequence active", sub: "Day 2 of 5" },
      { icon: Users, label: "12 leads in queue", sub: "Processing now" },
    ],
  },
  {
    id: "vip-relationship",
    name: "VIP Relationship",
    icon: Heart,
    stat: "4.9★",
    statLabel: "Client Rating",
    badge: "White Glove",
    color: "#C2607A",
    points: [
      { icon: Star, label: "VIP check-in sent", sub: "Mr. Johnson · Now" },
      { icon: Heart, label: "Birthday surprise", sub: "Loyalty reward sent" },
      { icon: MessageSquare, label: "Personal DM", sub: "Instagram · 1m ago" },
      { icon: Gift, label: "Upgrade offered", sub: "3 VIP clients" },
      { icon: Phone, label: "Concierge call", sub: "Requested · Ready" },
      { icon: Shield, label: "Priority handled", sub: "Zero wait time" },
    ],
  },
  {
    id: "review-manager",
    name: "Review Manager",
    icon: Star,
    stat: "4.8★",
    statLabel: "Avg. Rating",
    badge: "Auto-Reply",
    color: "#E8A838",
    points: [
      { icon: Star, label: "5★ Review replied", sub: "Google · 2s ago" },
      { icon: MessageSquare, label: "Negative resolved", sub: "Yelp · 5m ago" },
      { icon: TrendingUp, label: "+23 reviews", sub: "This month" },
      { icon: RefreshCw, label: "Review requested", sub: "Post-rental auto" },
      { icon: Shield, label: "Brand protected", sub: "24/7 monitoring" },
      { icon: Mail, label: "Thank you sent", sub: "14 happy clients" },
    ],
  },
  {
    id: "booking-closer",
    name: "Booking Closer",
    icon: Calendar,
    stat: "87%",
    statLabel: "Close Rate",
    badge: "AI Sales",
    color: "#4A90D9",
    points: [
      { icon: Phone, label: "Quote sent", sub: "Auto-generated" },
      { icon: Calendar, label: "Booking confirmed", sub: "3 rentals today" },
      { icon: TrendingUp, label: "$6,400 closed", sub: "Last 24 hours" },
      { icon: MessageSquare, label: "Objection handled", sub: "Price concern · Won" },
      { icon: Zap, label: "Instant response", sub: "0.8s avg reply" },
      { icon: Users, label: "8 leads active", sub: "Pipeline now" },
    ],
  },
  {
    id: "call-answering",
    name: "Call Answering",
    icon: Phone,
    stat: "100%",
    statLabel: "Calls Answered",
    badge: "24/7 Active",
    color: "#22C55E",
    points: [
      { icon: Phone, label: "Call answered", sub: "0.8s response" },
      { icon: MessageSquare, label: "Voicemail avoided", sub: "47 calls today" },
      { icon: Users, label: "Any language", sub: "12 languages" },
      { icon: ClipboardList, label: "Notes logged", sub: "CRM auto-update" },
      { icon: Calendar, label: "Booking taken", sub: "Live on call" },
      { icon: Shield, label: "Brand voice kept", sub: "Your script" },
    ],
  },
  {
    id: "dm-responder",
    name: "DM Responder",
    icon: MessageSquare,
    stat: "< 1s",
    statLabel: "Reply Time",
    badge: "Omnichannel",
    color: "#9B59B6",
    points: [
      { icon: MessageSquare, label: "Instagram DM", sub: "Replied · Now" },
      { icon: MessageSquare, label: "Facebook replied", sub: "3 inquiries" },
      { icon: Mail, label: "WhatsApp answered", sub: "Auto · Instant" },
      { icon: TrendingUp, label: "42 DMs handled", sub: "Today" },
      { icon: Calendar, label: "Booking from DM", sub: "Converted · Now" },
      { icon: Zap, label: "No lead missed", sub: "100% coverage" },
    ],
  },
  {
    id: "revenue-recovery",
    name: "Revenue Recovery",
    icon: TrendingUp,
    stat: "$4.2k",
    statLabel: "Recovered Today",
    badge: "ROI Engine",
    color: "#2ECC71",
    points: [
      { icon: TrendingUp, label: "$4,200 recovered", sub: "Today · 3 leads" },
      { icon: RefreshCw, label: "Abandoned rescued", sub: "6 carts saved" },
      { icon: Mail, label: "Upsell sent", sub: "Insurance add-on" },
      { icon: Calendar, label: "Extension offered", sub: "2 clients extended" },
      { icon: Users, label: "Win-back active", sub: "Past clients" },
      { icon: Zap, label: "Avg +$380/deal", sub: "Upsell impact" },
    ],
  },
  {
    id: "onboarding",
    name: "Onboarding Agent",
    icon: ClipboardList,
    stat: "100%",
    statLabel: "Auto-Onboard",
    badge: "Seamless",
    color: "#E67E22",
    points: [
      { icon: ClipboardList, label: "Agreement sent", sub: "Auto · Sign now" },
      { icon: Shield, label: "ID verified", sub: "Instant check" },
      { icon: Mail, label: "Welcome email", sub: "Personalized" },
      { icon: Calendar, label: "Pickup confirmed", sub: "Time & location" },
      { icon: Phone, label: "Briefing call", sub: "2-min AI walkthrough" },
      { icon: CheckCircle, label: "Ready to go", sub: "Zero manual steps" },
    ],
  },
  {
    id: "loyalty",
    name: "Loyalty Builder",
    icon: Users,
    stat: "3.2x",
    statLabel: "Repeat Rate",
    badge: "Retention",
    color: "#1ABC9C",
    points: [
      { icon: Heart, label: "Loyalty reward", sub: "5th rental bonus" },
      { icon: Star, label: "Points earned", sub: "Auto-credited" },
      { icon: Mail, label: "Return offer sent", sub: "30-day reminder" },
      { icon: TrendingUp, label: "+38% retention", sub: "vs. industry avg" },
      { icon: Users, label: "Referral triggered", sub: "2 new clients" },
      { icon: Zap, label: "LTV increased", sub: "$1,200 avg" },
    ],
  },
  {
    id: "reputation",
    name: "Reputation Guard",
    icon: Shield,
    stat: "0",
    statLabel: "Crises Unhandled",
    badge: "Always On",
    color: "#E74C3C",
    points: [
      { icon: Shield, label: "Complaint caught", sub: "Before escalation" },
      { icon: Star, label: "Crisis resolved", sub: "< 4 min avg" },
      { icon: MessageSquare, label: "Apology drafted", sub: "Brand-tone match" },
      { icon: TrendingUp, label: "Score maintained", sub: "4.8★ protected" },
      { icon: Phone, label: "Manager alerted", sub: "Priority flag" },
      { icon: RefreshCw, label: "Sentiment tracked", sub: "Real-time scan" },
    ],
  },
  {
    id: "quote-engine",
    name: "Quote Engine",
    icon: Zap,
    stat: "< 2s",
    statLabel: "Quote Time",
    badge: "Instant",
    color: "#F39C12",
    points: [
      { icon: Zap, label: "Quote generated", sub: "0 manual effort" },
      { icon: Mail, label: "PDF sent", sub: "Branded · Instant" },
      { icon: TrendingUp, label: "Dynamic pricing", sub: "Season-aware" },
      { icon: Calendar, label: "Availability synced", sub: "Real-time fleet" },
      { icon: Phone, label: "Quote explained", sub: "AI voice call" },
      { icon: Users, label: "18 quotes today", sub: "All auto-done" },
    ],
  },
  {
    id: "analytics",
    name: "Analytics Agent",
    icon: TrendingUp,
    stat: "Live",
    statLabel: "Real-time Insights",
    badge: "Smart Data",
    color: "#5B4CE0",
    points: [
      { icon: TrendingUp, label: "Revenue report", sub: "Daily auto-brief" },
      { icon: Users, label: "Lead source tracked", sub: "8 channels" },
      { icon: Star, label: "Top performer ID", sub: "Agent ranking" },
      { icon: ClipboardList, label: "Trend detected", sub: "Weekend demand ↑" },
      { icon: Zap, label: "Alert triggered", sub: "Low fleet warning" },
      { icon: Shield, label: "KPI dashboard", sub: "Always updated" },
    ],
  },
];

// Positions for 5 surrounding cards inside 560×560 container, center = 280,280
// Cards arranged in pentagon pattern
const CARD_POSITIONS = [
  { top: 16, left: "50%", transform: "translateX(-50%)" }, // 12 o'clock (top)
  { top: 110, right: 20 }, // 2 o'clock (top-right)
  { bottom: 80, right: 40 }, // 4 o'clock (bottom-right)
  { bottom: 80, left: 40 }, // 8 o'clock (bottom-left)
  { top: 110, left: 20 }, // 10 o'clock (top-left)
];

export default function AgentOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % AGENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const agent = AGENTS[activeIndex];
  const AgentIcon = agent.icon;

  return (
    <div style={{ position: "relative", width: 560, height: 560, flexShrink: 0 }}>
      {/* Outer dashed decorative ring */}
      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          border: "1px dashed rgba(34,197,94,0.20)",
          top: 105,
          left: 105,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Inner glow ring */}
      <div
        style={{
          position: "absolute",
          width: 270,
          height: 270,
          borderRadius: "50%",
          border: "1.5px solid rgba(34,197,94,0.07)",
          background: "radial-gradient(circle, rgba(245,243,255,0.6) 0%, rgba(245,243,255,0) 70%)",
          top: 145,
          left: 145,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Center Circle */}
      <div
        style={{
          width: 224,
          height: 224,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 24px 64px rgba(34,197,94,0.12), 0 4px 16px rgba(34,197,94,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 168,
          left: 168,
          zIndex: 5,
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.9 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "0 12px",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: `${agent.color}1A`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <AgentIcon size={20} color={agent.color} />
            </div>

            <span
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: 36,
                color: "#22C55E",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {agent.stat}
            </span>

            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "#6E6D7A",
                textAlign: "center",
                lineHeight: 1.3,
                maxWidth: 110,
              }}
            >
              {agent.statLabel}
            </span>

            <span
              style={{
                marginTop: 6,
                padding: "3px 11px",
                borderRadius: 100,
                background: `${agent.color}1A`,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: agent.color,
                letterSpacing: "0.02em",
              }}
            >
              {agent.badge}
            </span>

            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 9.5,
                color: "#9BB0A4",
                marginTop: 1,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              {agent.name}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 6 surrounding point cards */}
      {CARD_POSITIONS.map((pos, i) => {
        const point = agent.points[i];
        if (!point) return null;
        const PointIcon = point.icon;

        // Each card gets a gentle float offset so they don't all move in sync
        const floatY = ["-6px", "-4px", "-7px", "-5px", "-6px", "-4px"][i];
        const floatDuration = [3.8, 4.4, 3.5, 4.1, 3.9, 4.6][i];

        return (
          <AnimatePresence key={`${agent.id}-${i}`} mode="wait">
            <motion.div
              key={`${agent.id}-pt-${i}`}
              initial={{ opacity: 0, scale: 0.65, y: 12 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{ opacity: 0, scale: 0.65, y: -8 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                ...pos,
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "10px 13px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                boxShadow: `0 8px 28px rgba(34,197,94,0.10), 0 2px 8px rgba(34,197,94,0.06)`,
                zIndex: 6,
                minWidth: 158,
                maxWidth: 192,
              }}
            >
              {/* Colored left accent bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "20%",
                  bottom: "20%",
                  width: 3,
                  borderRadius: "0 3px 3px 0",
                  background: agent.color,
                  opacity: 0.7,
                }}
              />

              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background: `${agent.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <PointIcon size={15} color={agent.color} strokeWidth={1.8} />
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 11.5,
                    color: "#141419",
                    lineHeight: 1.2,
                  }}
                >
                  {point.label}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    color: "#6E6D7A",
                    marginTop: 2,
                    fontWeight: 500,
                  }}
                >
                  {point.sub}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        );
      })}

      {/* Progress dots */}
      <div
        style={{
          position: "absolute",
          bottom: -8,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 5,
          zIndex: 7,
        }}
      >
        {AGENTS.map((a, i) => (
          <button
            key={a.id}
            onClick={() => setActiveIndex(i)}
            style={{
              width: activeIndex === i ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: activeIndex === i ? agent.color : "rgba(34,197,94,0.15)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
