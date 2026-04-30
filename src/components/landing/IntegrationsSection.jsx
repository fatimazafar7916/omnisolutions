import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const INTEGRATIONS = [
  {
    cat: "CRM",
    color: "#E8F5F0",
    accent: "#1A7A52",
    tools: [
      { name: "HubSpot", logo: "https://www.logo.wine/a/logo/HubSpot/HubSpot-Logo.wine.svg" },
      {
        name: "Salesforce",
        logo: "https://www.salesforce.com/news/wp-content/uploads/sites/3/2021/05/Salesforce-logo.jpg",
      },
      {
        name: "Pipedrive",
        logo: "https://mms.businesswire.com/media/20220908005626/en/1565605/5/1600x900_twitter_logo_green.jpg?download=1",
      },
      {
        name: "Zoho CRM",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWqAg52rdZf96fjDhWeZ6vwLAdeT7-3rweNg&s",
      },
      {
        name: "Folk",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq7VgUITlP786xOfLkoGrad4OvN9qOAjUH_Q&s",
      },
      {
        name: "Microsoft Dynamics 365",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Microsoft_Dynamics_365_Logo_%282021%E2%80%93present%29.svg/1280px-Microsoft_Dynamics_365_Logo_%282021%E2%80%93present%29.svg.png",
      },
      {
        name: "Freshsales",
        logo: "https://profitbooks.net/wp-content/uploads/2020/02/freshsales-logo-scaled.jpg",
      },
      {
        name: "Close",
        logo: "https://logowik.com/content/uploads/images/close-crm9765.logowik.com.webp",
      },
      {
        name: "Insightly",
        logo: "https://images.seeklogo.com/logo-png/34/2/insightly-logo-png_seeklogo-342042.png",
      },
      {
        name: "Keap",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU_kJurx2zDHaL38ONQiJ6gApp7ohBv4OY4g&s",
      },
      {
        name: "Copper",
        logo: "https://i.pcmag.com/imagery/reviews/00gw565QB4xyeonpaol4h7r-11.fit_lim.size_1200x630.v1569474967.jpg",
      },
      {
        name: "Nimble",
        logo: "https://markcubancompanies.com/wp-content/uploads/2020/06/nimble-logo.png",
      },
    ],
  },
  {
    cat: "Phone",
    color: "#EEF3FF",
    accent: "#2B52C8",
    tools: [
      {
        name: "Twilio",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSktqw6gcfyXzVxtTMMmVuTLPGWuJ4yJ9hd8A&s",
      },
      {
        name: "RingCentral",
        logo: "https://vectorseek.com/wp-content/uploads/2023/09/RingCentral-Logo-Vector.svg-.png",
      },
      {
        name: "Google Voice",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM3Rn-a8s2qp8M0wObWQTHc71-uyXY7-nPGQ&s",
      },
      { name: "GHL", logo: "https://ghlreview.com/wp-content/uploads/2021/07/ghl-logo.png" },
    ],
  },
  {
    cat: "Booking",
    color: "#FFF4EC",
    accent: "#C05621",
    tools: [
      {
        name: "HQ Rental",
        logo: "https://www.caribonix.com/wp-content/uploads/hq-rental-logo.jpeg",
      },
      {
        name: "Bluebird",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqGGr4NZ1hnvljwE3GTLIvHThd7K4ymSSJKw&s",
      },
      {
        name: "Rent Centric",
        logo: "https://cdn.techjockey.com/web/assets/images/techjockey/products/19075_Rentcentriclogo.png",
      },
      {
        name: "Navotar",
        logo: "https://www3.technologyevaluation.com/getattachment/8dc5b3a0-e255-430d-aa95-1038a8823cee/navotar-logo.png?lang=en-US&width=512&height=512&ext=.png&source=tw2",
      },
      {
        name: "Calendly",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy9BkE3FLGWl2kKagUlze5dEU1BESJJA57TQ&s",
      },
      {
        name: "Acuity Scheduling",
        logo: "https://images.squarespace-cdn.com/content/v1/4f6792f624ac778428aca39d/1556041588038-SX4UNOUXQMAU62POI07J/acuity_blogimage_1.png",
      },
      {
        name: "Rezdy",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZWm7IUD7rDlBWwblYcdOdWUXraMo2mGMJg&s",
      },
      {
        name: "Checkfront",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbzn4tshzwpl_KxYe2uPwyoIAwh-stsRB-gg&s",
      },
    ],
  },
  {
    cat: "Payment",
    color: "#F0F9FF",
    accent: "#0369A1",
    tools: [
      {
        name: "Stripe",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweb2GWth9lgKL3SQa6t7vsd6BBNgXvVP0fQ&s",
      },
      { name: "Square", logo: "https://cdn-icons-png.flaticon.com/512/39/39003.png" },
      {
        name: "PayPal",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-ns1YY_la2zpWjImynS670i2Tktv9zPw4rQ&s",
      },
      {
        name: "Braintree",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAfxWmI4pBTVZwR3BetJ9OK_roAOFcbY8nDw&s",
      },
      {
        name: "Adyen",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Adyen_Corporate_Logo.svg/960px-Adyen_Corporate_Logo.svg.png",
      },
      {
        name: "Klarna",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNLfBbRhs32jLBauRMQEyXd4d92ZEY5_MmCg&s",
      },
      {
        name: "Wise",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNxryUT7PHyfz1P8DsLCyGskdTq8stp-TTnA&s",
      },
      {
        name: "Payoneer",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0GhEuNx2f3KrXLLL62PhxbXcDlQZyYsWVg&s",
      },
    ],
  },
  {
    cat: "Calendar",
    color: "#FDF4FF",
    accent: "#7C3AED",
    tools: [
      {
        name: "Google Calendar",
        logo: "https://png.pngtree.com/png-clipart/20230916/original/pngtree-google-calendar-calendar-platform-icon-vector-png-image_12256724.png",
      },
      {
        name: "Microsoft Outlook",
        logo: "https://e7.pngegg.com/pngimages/45/966/png-clipart-logo-microsoft-outlook-outlook-on-the-web-microsoft-corporation-microsoft-access-office-365-logo-blue-text.png",
      },
      {
        name: "Apple Calendar",
        logo: "https://e7.pngegg.com/pngimages/213/698/png-clipart-july-17-calendar-icon-area-text-brand-trademark-calendar-text-trademark.png",
      },
      {
        name: "Zoho Calendar",
        logo: "https://www.zohowebstatic.com/sites/zweb/images/ogimage/calendar-logo.png",
      },
      {
        name: "Fantastical",
        logo: "https://isenacode.com/wp-content/uploads/2020/02/fantastical.jpg",
      },
    ],
  },
  {
    cat: "Comms",
    color: "#FFF8F0",
    accent: "#B45309",
    tools: [
      {
        name: "Instagram",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
      },
      {
        name: "WhatsApp",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoCBicT8UV0JC5EYe3Scy1Um_5RWsSxDKY_w&s",
      },
      {
        name: "Messenger",
        logo: "https://png.pngtree.com/element_our/md/20180518/md_5aff608b8cae5.png",
      },
      {
        name: "Telegram",
        logo: "https://img.freepik.com/premium-psd/social-media-telegram-logo-icon-isolated-transparent-background_996812-36981.jpg",
      },
      {
        name: "Slack",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtlCS2KPHlrxO3_Cmc-XoQIoq-MY2zCI7NbQ&s",
      },
      {
        name: "WeChat",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQms8JECosaO9QpP4jmqlERdvL7ajdpitGrvg&s",
      },
      { name: "Viber", logo: "https://www.logo.wine/a/logo/Viber/Viber-Icon-Purple-Logo.wine.svg" },
    ],
  },
];

const ALL_TOOLS = INTEGRATIONS.flatMap((r) => r.tools);
const MARQUEE = [...ALL_TOOLS, ...ALL_TOOLS, ...ALL_TOOLS];

/* ─────────────────────────────────────────────
   TOOL PILL
───────────────────────────────────────────── */
function ToolPill({ tool, accent }) {
  const [imgOk, setImgOk] = useState(true);
  const abbr = tool.name.slice(0, 2).toUpperCase();

  return (
    <motion.span
      whileHover={{ 
        y: -3, 
        scale: 1.05,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(10px, 2vw, 16px) clamp(8px, 1.5vw, 12px)",
        cursor: "default",
        userSelect: "none",
        background: "#FFFFFF",
        borderRadius: 8,
        border: "1px solid rgba(0,0,0,0.04)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        transition: "all 0.2s ease",
        flexShrink: 0,
      }}
      title={tool.name}
    >
      {tool.logo && imgOk ? (
        <img
          src={tool.logo}
          alt={tool.name}
          onError={() => setImgOk(false)}
          style={{
            maxWidth: "clamp(48px, 10vw, 64px)",
            maxHeight: "clamp(28px, 6vw, 40px)",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            flexShrink: 0,
            filter: "grayscale(0.2) opacity(0.85)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.filter = "grayscale(0) opacity(1)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.filter = "grayscale(0.2) opacity(0.85)";
            e.target.style.transform = "scale(1)";
          }}
        />
      ) : (
        <span
          style={{
            width: "clamp(48px, 10vw, 64px)",
            height: "clamp(28px, 6vw, 40px)",
            borderRadius: 6,
            background: `linear-gradient(135deg, ${accent}15, ${accent}08)`,
            color: accent,
            fontSize: "clamp(10px, 1.5vw, 12px)",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            letterSpacing: "0.02em",
            border: `1px solid ${accent}20`,
          }}
        >
          {abbr}
        </span>
      )}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY ROW
───────────────────────────────────────────── */
function CategoryRow({ row, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        alignItems: "center",
        gap: 0,
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.06)",
        background: "#FAFAF8",
      }}
      className="int-row"
    >
      {/* Left label */}
      <div
        style={{
          padding: "22px 20px",
          background: row.color,
          borderRight: `1px solid ${row.accent}18`,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          alignSelf: "stretch",
          justifyContent: "center",
        }}
        className="int-row-label"
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: row.accent,
            display: "block",
            boxShadow: `0 0 0 3px ${row.accent}22`,
          }}
        />
        <span
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: row.accent,
            display: "block",
          }}
        >
          {row.cat}
        </span>
      </div>

      {/* Right pills */}
      <div
        style={{
          padding: "clamp(12px, 3vw, 20px)",
          overflow: "hidden",
          position: "relative",
        }}
        className="int-pills-container"
      >
        {/* Left fade mask */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 40,
            background: "linear-gradient(to right, #FAFAF8, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* Right fade mask */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 40,
            background: "linear-gradient(to left, #FAFAF8, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        
        <motion.div
          style={{
            display: "flex",
            gap: "clamp(6px, 2vw, 8px)",
            alignItems: "center",
            width: "max-content",
          }}
          animate={{
            x: index % 2 === 0 ? [0, -200, 0] : [0, 200, 0], // Alternate directions
          }}
          transition={{
            duration: 20 + index * 3, // Different speeds for each row
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Triple tools for seamless loop */}
          {[...row.tools, ...row.tools, ...row.tools].map((tool, toolIndex) => (
            <ToolPill key={`${tool.name}-${toolIndex}`} tool={tool} accent={row.accent} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE ITEM
───────────────────────────────────────────── */
function MarqueeItem({ tool }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "0 28px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        color: "#888",
        whiteSpace: "nowrap",
        borderRight: "1px solid #E8E4DC",
      }}
    >
      {tool.logo && imgOk ? (
        <img
          src={tool.logo}
          alt={tool.name}
          onError={() => setImgOk(false)}
          style={{ 
            width: 16, 
            height: 16, 
            borderRadius: 2, 
            objectFit: "contain", 
            opacity: 0.6,
            filter: "grayscale(0.3)",
          }}
        />
      ) : (
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 2,
            background: "linear-gradient(135deg, #E4E0D8, #D1CCC4)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 8,
            fontWeight: 600,
            color: "#888",
          }}
        >
          {tool.name.slice(0, 1)}
        </span>
      )}
      {tool.name}
    </span>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function IntegrationsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  /* Inject Google Fonts once */
  useEffect(() => {
    // Fonts are already loaded globally in __root.tsx
    // No need to inject again
  }, []);

  return (
    <section
      id="integrations"
      style={{
        background: "#F1F0F5",
        padding: "clamp(60px, 10vw, 100px) 0 clamp(50px, 8vw, 80px)",
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

      {/* Large decorative number */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: -20,
          top: 40,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(140px, 18vw, 260px)",
          color: "rgba(0,0,0,0.028)",
          lineHeight: 1,
          userSelect: "none",
          letterSpacing: "-0.04em",
          pointerEvents: "none",
        }}
      >
        50+
      </span>

      <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 32px", position: "relative" }}>
        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(20px, 4vw, 32px)",
            alignItems: "start",
            marginBottom: "clamp(40px, 6vw, 64px)",
          }}
          className="int-header-grid"
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
            </span>

            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4.5vw, 64px)",
                letterSpacing: "-0.04em",
                color: "#141419",
                lineHeight: 1.1,
                margin: 0,
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 340, paddingBottom: 4 }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "#5A6E61",
                lineHeight: 1.75,
                margin: "0 0 20px",
              }}
            >
              No rip-and-replace. No migration headaches. We connect directly into the tools you
              already pay for.
            </p>
            <a
              href="#cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#2A9D8F",
                textDecoration: "none",
                borderBottom: "1px solid rgba(42,157,143,0.3)",
                paddingBottom: 2,
                transition: "border-color 0.2s",
              }}
            >
              Don't see yours? We build custom integrations
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                  stroke="#2A9D8F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* ── Rows ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 56 }}>
          {INTEGRATIONS.map((row, i) => (
            <CategoryRow key={row.cat} row={row} index={i} />
          ))}
        </div>
      </div>

      {/* ── Marquee ── */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid rgba(0,0,0,0.07)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          background: "#FFFFFF",
          padding: "13px 0",
          position: "relative",
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
            background: "linear-gradient(to right, #FFFFFF, transparent)",
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
            background: "linear-gradient(to left, #FFFFFF, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "int-marquee 32s linear infinite",
          }}
        >
          {MARQUEE.map((tool, i) => (
            <MarqueeItem key={i} tool={tool} />
          ))}
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "48px 32px 0", position: "relative" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "50+", label: "Native integrations" },
            { num: "6", label: "Tool categories" },
            { num: "1-day", label: "Average setup time" },
            { num: "∞", label: "Custom on request" },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && (
                <div
                  style={{
                    width: 1,
                    height: 36,
                    background: "rgba(0,0,0,0.1)",
                  }}
                />
              )}
              <div>
                <div
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    color: "#141419",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#8A9E91",
                    marginTop: 4,
                    letterSpacing: "0.03em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            </React.Fragment>
          ))}

          <div style={{ marginLeft: "auto" }}>
            <motion.a
              href="#cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                borderRadius: 100,
                background: "#141419",
                color: "#F1F0F5",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              See all integrations
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                }}
              >
                →
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes int-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        
        /* Mobile optimizations */
        @media (max-width: 767px) {
          .int-header-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-bottom: 40px !important;
          }
          
          .int-row {
            grid-template-columns: 1fr !important;
          }
          
          .int-row-label {
            border-right: none !important;
            border-bottom: 1px solid rgba(0,0,0,0.06) !important;
            padding: 16px !important;
          }
          
          .int-pills-container {
            overflow: hidden !important;
          }
          
          .int-pills-container > div {
            justify-content: flex-start !important;
          }
        }
        
        @media (min-width: 768px) {
          .int-header-grid {
            grid-template-columns: 1fr auto !important;
            align-items: end !important;
          }
        }
      `}</style>
    </section>
  );
}
