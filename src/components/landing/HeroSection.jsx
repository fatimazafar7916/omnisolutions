import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import AgentOrbit from "./AgentOrbit";

const TRUST = ["No long-term contract", "Live in 14 days", "14-day refund", "Bank-level security"];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        background: "#FCFCFE",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: 68,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Hero Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "url('https://media.istockphoto.com/id/157422424/photo/black-sports-car.jpg?s=612x612&w=0&k=20&c=9LDNU8iYGr8-FSxcgyhcjtUlZJku0GbCH2UnVgx0ySg=')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.35,
        }}
      />

      {/* Gradient overlay for better text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "linear-gradient(135deg, rgba(252,252,254,0.75) 0%, rgba(245,243,255,0.65) 50%, rgba(252,252,254,0.8) 100%)",
        }}
      />

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-8%",
          width: "55vw",
          height: "55vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, #F5F3FF 0%, rgba(245,243,255,0) 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          padding: "60px 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
          }}
          className="hero-grid"
        >
          {/* Left */}
          <div style={{ maxWidth: 680 }}>
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 100,
                border: "1px solid rgba(123,116,220,0.25)",
                background: "rgba(123,116,220,0.06)",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#2A9D8F",
                  boxShadow: "0 0 0 3px rgba(42,157,143,0.25)",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#4D4699",
                }}
              >
                AI employees built for US car rental operators
              </span>
            </motion.div>

            {/* H1 — split editorial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: "-0.04em",
                  margin: "0 0 6px",
                  color: "#141419",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(42px, 6.5vw, 88px)",
                  }}
                >
                  Your rental business
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(42px, 6.5vw, 88px)",
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#7B74DC",
                  }}
                >
                  never misses
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(42px, 6.5vw, 88px)",
                  }}
                >
                  a call <span style={{ color: "#141419" }}>again.</span>
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.8vw, 18px)",
                color: "#6E6D7A",
                lineHeight: 1.65,
                maxWidth: 520,
                margin: "22px 0 32px",
              }}
            >
              Aiaura gives US car rental operators AI employees that answer every call, reply to
              every DM, and close every booking — 24/7, in any language, in your brand voice.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 36,
              }}
            >
              <a
                href="#cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: 100,
                  background: "#7B74DC",
                  color: "#FCFCFE",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(123,116,220,0.28)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                Book a Free Strategy Call <ArrowUpRight size={16} />
              </a>

              <a
                href="#solutions"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: 100,
                  background: "transparent",
                  color: "#7B74DC",
                  border: "1.5px solid rgba(123,116,220,0.22)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(123,116,220,0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                See All 12 Products
              </a>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.44 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {TRUST.map((t) => (
                <span
                  key={t}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 12px",
                    borderRadius: 100,
                    background: "#F5F3FF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#6E6D7A",
                  }}
                >
                  <CheckCircle size={11} color="#2A9D8F" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — rotating agent orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="hero-right"
          >
            <AgentOrbit />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        /* Desktop: Full size orbit */
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr 580px !important;
            align-items: center;
          }
          .hero-right {
            display: flex !important;
          }
        }
        
        /* Mobile: Hide orbit */
        @media (max-width: 899px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
