import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const ALL_TOOLS = [
  { name: "HubSpot", logo: "https://www.logo.wine/a/logo/HubSpot/HubSpot-Logo.wine.svg" },
  { name: "Salesforce", logo: "https://www.salesforce.com/news/wp-content/uploads/sites/3/2021/05/Salesforce-logo.jpg" },
  { name: "Pipedrive", logo: "https://mms.businesswire.com/media/20220908005626/en/1565605/5/1600x900_twitter_logo_green.jpg?download=1" },
  { name: "Zoho CRM", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWqAg52rdZf96fjDhWeZ6vwLAdeT7-3rweNg&s" },
  { name: "GHL", logo: "https://ghlreview.com/wp-content/uploads/2021/07/ghl-logo.png" },
  { name: "Calendly", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy9BkE3FLGWl2kKagUlze5dEU1BESJJA57TQ&s" },
  { name: "Stripe", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweb2GWth9lgKL3SQa6t7vsd6BBNgXvVP0fQ&s" },
  { name: "Square", logo: "https://cdn-icons-png.flaticon.com/512/39/39003.png" },
  { name: "PayPal", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-ns1YY_la2zpWjImynS670i2Tktv9zPw4rQ&s" },
  { name: "Instagram", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" },
  { name: "WhatsApp", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoCBicT8UV0JC5EYe3Scy1Um_5RWsSxDKY_w&s" },
  { name: "Messenger", logo: "https://png.pngtree.com/element_our/md/20180518/md_5aff608b8cae5.png" },
];

const MARQUEE = [...ALL_TOOLS, ...ALL_TOOLS, ...ALL_TOOLS];

/* ─────────────────────────────────────────────
   LOGO ITEM
───────────────────────────────────────────── */
function LogoItem({ tool }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 24px",
        background: "#FFFFFF",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        cursor: "default",
        flexShrink: 0,
        minWidth: 120,
      }}
      title={tool.name}
    >
      {tool.logo && imgOk ? (
        <img
          src={tool.logo}
          alt={tool.name}
          onError={() => setImgOk(false)}
          style={{
            maxWidth: 80,
            maxHeight: 48,
            width: "auto",
            height: "auto",
            objectFit: "contain",
            filter: "grayscale(0.3) opacity(0.8)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.filter = "grayscale(0) opacity(1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.filter = "grayscale(0.3) opacity(0.8)";
          }}
        />
      ) : (
        <span
          style={{
            width: 80,
            height: 48,
            borderRadius: 8,
            background: "linear-gradient(135deg, #E4E0D8, #D1CCC4)",
            color: "#888",
            fontSize: 14,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            letterSpacing: "0.02em",
          }}
        >
          {tool.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function IntegrationsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="integrations"
      style={{
        background: "#F1F0F5",
        padding: "clamp(48px, 8vw, 72px) 0 clamp(40px, 6vw, 64px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grain texture overlay */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.025,
          pointerEvents: "none",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 32px", position: "relative" }}>
        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "clamp(40px, 6vw, 64px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#2A9D8F",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 20,
                  height: 1,
                  background: "#2A9D8F",
                }}
              />
              Integrations
              <span
                style={{
                  display: "inline-block",
                  width: 20,
                  height: 1,
                  background: "#2A9D8F",
                }}
              />
            </span>

            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4.5vw, 64px)",
                letterSpacing: "-0.04em",
                color: "#141419",
                lineHeight: 1.1,
                margin: "0 0 20px",
              }}
            >
              Plugs into your{" "}
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#2A9D8F",
                }}
              >
                existing stack.
              </span>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "#5A6E61",
                lineHeight: 1.75,
                margin: "0 auto",
                maxWidth: 540,
              }}
            >
              No rip-and-replace. No migration headaches. We connect directly into the tools you
              already pay for.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Scrolling Logos ── */}
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          padding: "20px 0",
        }}
      >
        {/* Fade masks */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: "linear-gradient(to right, #F1F0F5, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: "linear-gradient(to left, #F1F0F5, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: 20,
            width: "max-content",
            animation: "int-scroll 40s linear infinite",
          }}
        >
          {MARQUEE.map((tool, i) => (
            <LogoItem key={i} tool={tool} />
          ))}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes int-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
