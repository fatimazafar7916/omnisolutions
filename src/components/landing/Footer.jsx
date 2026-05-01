import React from "react";

const COLS = {
  Products: ["AI Receptionist", "AI Email + Text", "AI Omnichannel", "All 12 Products"],
  Company: ["Why Aiaura", "Integrations", "Book a Call", "Blog"],
  Legal: ["Privacy Policy", "Terms of Service", "Security"],
};

export default function Footer() {
  return (
    <footer style={{ 
      background: "#141419", 
      borderTop: "1px solid rgba(255,255,255,0.04)",
      margin: 0,
      marginBottom: 0,
      padding: 0,
      paddingBottom: 0,
      position: "relative",
      bottom: 0,
    }}>
      <div className="section-container" style={{ paddingTop: "64px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 40,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div style={{ gridColumn: "1 / -1" }} className="footer-brand">
            <div
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: 26,
                letterSpacing: "-0.03em",
                marginBottom: 12,
              }}
            >
              <span style={{ color: "#fff" }}>AIAUR</span>
              <span style={{ color: "#22C55E" }}>A</span>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.6,
                maxWidth: 260,
                margin: 0,
              }}
            >
              12 AI employees built exclusively for US car rental operators. Available 24/7, in any
              language.
            </p>
          </div>

          {Object.entries(COLS).map(([heading, links]) => (
            <div key={heading}>
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  marginBottom: 16,
                }}
              >
                {heading}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        color: "rgba(255,255,255,0.42)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            paddingBottom: 24, // Add some bottom padding here instead
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
            margin: 0,
            marginBottom: 0,
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.22)",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Aiaura Inc. Built for US car rental operators.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.22)",
              margin: 0,
            }}
          >
            Made with precision in the USA.
          </p>
        </div>
      </div>

      <style>{`
        /* Ensure no extra spacing on mobile */
        footer {
          margin: 0 !important;
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
        
        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
          .footer-brand {
            grid-column: 1 / 2 !important;
          }
        }
        
        @media (max-width: 639px) {
          footer > div {
            padding: 48px 20px 0px !important; /* No bottom padding */
          }
          
          .footer-grid {
            gap: 32px !important;
            margin-bottom: 32px !important;
          }
          
          .footer-brand {
            margin-bottom: 16px !important;
          }
          
          footer > div > div:last-child {
            padding-top: 20px !important;
            padding-bottom: 20px !important; /* Bottom padding only on copyright section */
            flex-direction: column !important;
            gap: 8px !important;
            text-align: center !important;
            margin-bottom: 0 !important;
          }
        }
        
        @media (max-width: 480px) {
          footer > div {
            padding: 40px 16px 0px !important; /* No bottom padding */
          }
          
          .footer-grid {
            gap: 24px !important;
            margin-bottom: 24px !important;
          }
          
          footer > div > div:last-child {
            padding-bottom: 16px !important; /* Minimal bottom padding */
          }
        }
      `}</style>
    </footer>
  );
}
