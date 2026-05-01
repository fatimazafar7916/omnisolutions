import { motion } from "framer-motion";
import { Plug, Brain, Rocket, Check, ArrowRight, Zap } from "lucide-react";

const STEPS = [
  {
    icon: Plug,
    n: "01",
    title: "Connect Your Channels",
    desc: "Phone, email, Instagram, SMS, WhatsApp — one-click integrations. No developer, no IT ticket, no migration.",
    items: [
      "Twilio, RingCentral, or your number",
    ],
    accent: "#22C55E",
    accentLight: "#F0FDF4",
  },
  {
    icon: Brain,
    n: "02",
    title: "Train Your AI",
    desc: "A guided setup session where Aiaura learns your fleet, pricing, policies, and exact brand voice. We do the heavy lifting.",
    items: [
      "Fleet inventory & pricing rules",
    ],
    accent: "#22C55E",
    accentLight: "#F0FDF4",
  },
  {
    icon: Rocket,
    n: "03",
    title: "Go Live",
    desc: "Your AI team handles every call, DM, email, and follow-up around the clock. You review the dashboard and close deals.",
    items: [
      "Real-time monitoring dashboard",
    ],
    accent: "#F59E0B",
    accentLight: "#FEF3C7",
  },
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

.hiw-wrap {
  background: linear-gradient(180deg, #FCFCFE 0%, #F5F3FF 100%);
  font-family: 'DM Sans', sans-serif;
  color: #141419;
  position: relative;
  overflow: hidden;
}

.hiw-inner {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding-left: var(--container-px);
  padding-right: var(--container-px);
  padding-top: var(--section-py);
  padding-bottom: var(--section-py);
  position: relative;
}

@media (max-width: 1024px) {
  .hiw-inner {
    padding-left: var(--container-px-tablet);
    padding-right: var(--container-px-tablet);
  }
}

@media (max-width: 768px) {
  .hiw-inner {
    padding-left: var(--container-px-mobile);
    padding-right: var(--container-px-mobile);
  }
}

.hiw-head {
  text-align: center;
  margin-bottom: 40px;
}

.hiw-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(42,157,143,0.08);
  border: 1px solid rgba(42,157,143,0.22);
  border-radius: 100px;
  padding: 4px 12px 4px 8px;
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #22C55E;
  margin-bottom: 16px;
}

.hiw-h2 {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #141419;
  margin-bottom: 12px;
}

.hiw-h2 em {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-weight: 400;
  color: #22C55E;
}

.hiw-sub {
  font-size: 14px;
  line-height: 1.6;
  color: #6E6D7A;
  max-width: 480px;
  margin: 0 auto;
}

.hiw-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.hiw-card {
  background: #fff;
  border: 1px solid #E3E2EB;
  border-radius: 12px;
  padding: 18px 16px 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.hiw-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.hiw-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.07);
  border-color: var(--accent);
}

.hiw-card:hover::before {
  opacity: 0.02;
}

.hiw-card-num {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: var(--accent);
}

.hiw-card-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.hiw-card:hover .hiw-card-icon {
  transform: scale(1.06);
}

.hiw-card-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: #141419;
  margin-bottom: 6px;
}

.hiw-card-desc {
  font-size: 12px;
  line-height: 1.55;
  color: #6E6D7A;
  margin-bottom: 12px;
  flex: 1;
}

.hiw-card-divider {
  width: 28px;
  height: 1.5px;
  border-radius: 2px;
  background: var(--accent);
  margin-bottom: 10px;
}

.hiw-card-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hiw-card-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.hiw-card-check {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.hiw-card-item-text {
  font-size: 11px;
  line-height: 1.5;
  color: #3D3C47;
  font-weight: 500;
}

.hiw-cta {
  padding: 28px 36px;
  background: var(--brand-gradient);
  border-radius: 14px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(34,197,94,0.25);
}

.hiw-cta::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
  pointer-events: none;
}

.hiw-cta-label {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-bottom: 6px;
}

.hiw-cta-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(18px, 2.2vw, 24px);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: #fff;
  margin-bottom: 4px;
}

.hiw-cta-sub {
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  line-height: 1.5;
}

.hiw-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 22px;
  background: var(--brand-gradient);
  border: none;
  border-radius: 8px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: all 0.22s ease;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(34,197,94,0.35);
  position: relative;
  z-index: 1;
}

.hiw-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(34,197,94,0.45);
}

@media (max-width: 900px) {
  .hiw-grid { grid-template-columns: 1fr; gap: 12px; }
  .hiw-card { padding: 18px 16px; }
}

@media (max-width: 768px) {
  .hiw-inner { padding: 40px 20px 48px; }
  .hiw-head { margin-bottom: 32px; }
  .hiw-h2 { font-size: clamp(24px, 7vw, 36px); margin-bottom: 12px; }
  .hiw-sub { font-size: 13px; }
  .hiw-cta { grid-template-columns: 1fr; padding: 24px 20px; gap: 16px; }
  .hiw-btn { width: 100%; justify-content: center; }
}

@media (max-width: 480px) {
  .hiw-inner { padding: 32px 16px 40px; }
  .hiw-card { padding: 16px 14px; border-radius: 10px; }
  .hiw-cta { padding: 20px 16px; border-radius: 12px; }
}
`;

export default function HowItWorks() {
  return (
    <>
      <style>{styles}</style>
      <section id="how" className="hiw-wrap">
        <div className="hiw-inner">

          <motion.div
            className="hiw-head"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hiw-eyebrow">
              <Zap size={12} />
              How It Works
            </div>

            <h2 className="hiw-h2">
              Live in <em>14 days.</em>
              <br />
              No developers. No IT.
            </h2>

            <p className="hiw-sub">
              Three steps from sign-up to a fully autonomous AI team that handles calls, DMs, and
              emails around the clock.
            </p>
          </motion.div>

          <div className="hiw-grid">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.n}
                  className="hiw-card"
                  style={{
                    "--accent": step.accent,
                    "--accent-light": step.accentLight,
                  }}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="hiw-card-num">{step.n}</div>

                  <div className="hiw-card-icon">
                    <Icon size={18} strokeWidth={1.8} style={{ color: step.accent }} />
                  </div>

                  <h3 className="hiw-card-title">{step.title}</h3>
                  <p className="hiw-card-desc">{step.desc}</p>

                  <div className="hiw-card-divider" />

                  <div className="hiw-card-items">
                    {step.items.map((item, i) => (
                      <div key={i} className="hiw-card-item">
                        <div className="hiw-card-check">
                          <Check size={10} strokeWidth={2.5} style={{ color: step.accent }} />
                        </div>
                        <span className="hiw-card-item-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="hiw-cta"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <div className="hiw-cta-label">Ready to automate?</div>
              <div className="hiw-cta-title">Go live in 14 days</div>
              <p className="hiw-cta-sub">
                No setup fees. No developer required. Cancel anytime.
              </p>
            </div>
            <button className="hiw-btn">
              Start Free Trial
              <ArrowRight size={13} strokeWidth={2.2} />
            </button>
          </motion.div>

        </div>
      </section>
    </>
  );
}
