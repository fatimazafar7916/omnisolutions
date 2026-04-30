import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROBLEMS = [
  {
    number: "01", stat: "73%", title: "Missed Calls",
    desc: "of after-hours calls go to voicemail. 85% of those callers never call back.",
    before: 100, after: 27,
    beforeLabel: "100 calls come in", afterLabel: "Only 27 get answered",
    drainLabel: "73 callers book with your competitor",
  },
  {
    number: "02", stat: "78%", title: "Slow DM Replies",
    desc: "The operator who replies under 2 minutes wins 78% of bookings.",
    before: 100, after: 22,
    beforeLabel: "100 DM inquiries", afterLabel: "22 leads convert",
    drainLabel: "78 leads lost to whoever replied first",
  },
  {
    number: "03", stat: "10%", title: "Zero Follow-Up",
    desc: "Conversion rate when quotes are sent without follow-up. Sequences turn 10% into 40%.",
    before: 100, after: 10,
    beforeLabel: "100 quotes sent", afterLabel: "10 bookings made",
    drainLabel: "90 deals die in silence",
  },
  {
    number: "04", stat: "$420K", title: "Silent Revenue Loss",
    desc: "Lost per location per year from unanswered calls, dropped leads, and unhandled DMs.",
    before: 420, after: 0,
    beforeLabel: "$420K potential revenue", afterLabel: "$0 recovered",
    drainLabel: "$420,000 silently walked out the door",
  },
  {
    number: "05", stat: "3.2×", title: "No Loyalty System",
    desc: "More revenue from repeat clients. Without follow-up, your best customers rent elsewhere.",
    before: 100, after: 31,
    beforeLabel: "100 satisfied renters", afterLabel: "31 come back",
    drainLabel: "69 clients rent from your competitor next time",
  },
  {
    number: "06", stat: "4.1★", title: "Unmanaged Reviews",
    desc: "Is the minimum to rank on Google Maps. One ignored bad review tanks your listing.",
    before: 100, after: 55,
    beforeLabel: "100 Google searches", afterLabel: "55 trust your listing",
    drainLabel: "45 leads go to a competitor with better reviews",
  },
  {
    number: "07", stat: "60%", title: "Manual Quoting Delays",
    desc: "Of leads don't get a quote within 1 hour. Each extra hour drops close rate by 10%.",
    before: 100, after: 40,
    beforeLabel: "100 quote requests", afterLabel: "40 still interested",
    drainLabel: "60 leads went cold waiting for your reply",
  },
  {
    number: "08", stat: "$280", title: "No Upselling",
    desc: "Average add-on revenue per rental left on the table — insurance, GPS, upgrades.",
    before: 280, after: 0,
    beforeLabel: "$280 add-on opportunity", afterLabel: "$0 captured",
    drainLabel: "$280 per rental never offered, never earned",
  },
  {
    number: "09", stat: "24/7", title: "No After-Hours Cover",
    desc: "Your business sleeps even when customers are ready to book at 11pm.",
    before: 100, after: 18,
    beforeLabel: "100 after-hours inquiries", afterLabel: "18 get a response",
    drainLabel: "82 bookings made with whoever was awake",
  },
  {
    number: "10", stat: "82%", title: "Onboarding Friction",
    desc: "Of renters abandon when paperwork is slow or confusing. Automation eliminates drop-off.",
    before: 100, after: 18,
    beforeLabel: "100 confirmed bookings", afterLabel: "18 complete smoothly",
    drainLabel: "82 renters frustrated — some never return",
  },
  {
    number: "11", stat: "22×", title: "No Reputation Guard",
    desc: "Future bookings lost for every unresolved complaint left public online.",
    before: 100, after: 55,
    beforeLabel: "100 future bookings", afterLabel: "55 remain",
    drainLabel: "45 bookings lost from one ignored complaint",
  },
  {
    number: "12", stat: "38%", title: "No Analytics Insight",
    desc: "Of revenue opportunities are invisible without data. You can't fix what you can't see.",
    before: 100, after: 62,
    beforeLabel: "100 revenue opportunities", afterLabel: "62 are even visible",
    drainLabel: "38 opportunities missed — you didn't even know",
  },
];

/* ── Colours (original light palette) ── */
const C   = "#7B74DC";
const CL  = "#F5F3FF";
const CLL = "rgba(123,116,220,0.07)";
const RED = "#EF4444";
const REDL= "#FEF2F2";
const GR  = "#6E6D7A";

/* ── Visualizations ── */
function Viz({ problem, animKey }) {
  const [p, setP] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    setP(0);
    const dur = 1800, t0 = performance.now();
    const tick = (now) => {
      const t = Math.min((now - t0) / dur, 1);
      setP(1 - Math.pow(1 - t, 3));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [animKey]);

  const vz = {
    /* 01 – phone grid */
    "01": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        {Array.from({length:10}).map((_,i)=>{
          const col=i%5, row=Math.floor(i/5);
          const x=18+col*66, y=24+row*90;
          const lost=i>=3;
          return (
            <g key={i} transform={`translate(${x},${y})`} opacity={lost&&p<i*0.07?0:1}>
              <rect width="48" height="64" rx="10" fill={lost?REDL:CL} stroke={lost?"#FCA5A5":C} strokeWidth="1.5"/>
              <rect x="6" y="6" width="36" height="42" rx="5" fill={lost?"#FEE2E2":"#EEEDf9"}/>
              <circle cx="24" cy="55" r="4" fill={lost?"#FCA5A5":C} opacity="0.45"/>
              {!lost && <>
                <rect x="10" y="11" width="28" height="4" rx="2" fill={C} opacity="0.3"/>
                <rect x="10" y="19" width="20" height="3" rx="1.5" fill={C} opacity="0.18"/>
                <rect x="10" y="25" width="24" height="3" rx="1.5" fill={C} opacity="0.12"/>
              </>}
              {lost && p>i*0.07 && <>
                <line x1="13" y1="14" x2="35" y2="34" stroke={RED} strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="35" y1="14" x2="13" y2="34" stroke={RED} strokeWidth="2.5" strokeLinecap="round"/>
              </>}
            </g>
          );
        })}
        <motion.text x="180" y="182" textAnchor="middle" fontSize="12" fill={C} fontWeight="700" opacity={p>0.65?1:0}>27 answered</motion.text>
        <motion.text x="180" y="200" textAnchor="middle" fontSize="11" fill={GR} opacity={p>0.78?1:0}>73 booked with your competitor</motion.text>
      </svg>
    ),
    /* 02 – reply race */
    "02": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        <rect x="20" y="72" width="320" height="76" rx="12" fill={CLL} stroke={C} strokeWidth="1" strokeOpacity="0.3"/>
        <line x1="20" y1="110" x2="340" y2="110" stroke={C} strokeDasharray="6,5" strokeWidth="1" opacity="0.25"/>
        <rect x="326" y="72" width="4" height="76" rx="2" fill={C} opacity="0.4"/>
        <text x="182" y="64" textAnchor="middle" fontSize="11" fill={GR}>Booking →</text>
        {/* Rival — fast */}
        <motion.g animate={{x:p*262}} initial={{x:0}} transition={{duration:1.6,ease:"easeOut"}}>
          <rect x="22" y="76" width="56" height="26" rx="7" fill="#10B981"/>
          <text x="50" y="93" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">RIVAL ⚡</text>
        </motion.g>
        {/* You — slow */}
        <motion.g animate={{x:p*86}} initial={{x:0}} transition={{duration:1.6,ease:"easeOut"}}>
          <rect x="22" y="113" width="48" height="24" rx="7" fill={C} opacity="0.55"/>
          <text x="46" y="129" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">YOU 🐢</text>
        </motion.g>
        <text x="180" y="38" textAnchor="middle" fontSize="13" fill="#141419" fontWeight="700">Reply speed wins the booking</text>
        <text x="180" y="56" textAnchor="middle" fontSize="11" fill={GR}>Under 2 minutes = 78% win rate</text>
        <motion.rect x="54" y="163" width="252" height="36" rx="8" fill={CLL} stroke={C} strokeWidth="1" opacity={p>0.65?1:0}/>
        <motion.text x="180" y="178" textAnchor="middle" fontSize="11" fill={C} fontWeight="600" opacity={p>0.65?1:0}>78 leads went to whoever replied first</motion.text>
        <motion.text x="180" y="193" textAnchor="middle" fontSize="10" fill={GR} opacity={p>0.75?1:0}>Speed isn't optional — it's the product</motion.text>
      </svg>
    ),
    /* 03 – funnel */
    "03": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        {[
          {y:10, w:300, lbl:"100 Quotes Sent"},
          {y:58, w:195, lbl:"45 Opened"},
          {y:106, w:100, lbl:"20 Replied"},
          {y:154, w:38,  lbl:"10 Booked"},
        ].map((f,i)=>(
          <g key={i}>
            <motion.rect y={f.y} height={36} rx={7}
              fill={i===3?C:CLL} stroke={C} strokeWidth={i===3?0:1} strokeOpacity={0.35}
              animate={{width:f.w*p, x:(360-f.w*p)/2}}
              initial={{width:0, x:180}}
              transition={{duration:0.55, delay:i*0.14}}
            />
            <motion.text x="180" y={f.y+23} textAnchor="middle" fontSize={11} fill={i===3?"#fff":C} fontWeight="600"
              opacity={p>0.22+i*0.14?1:0}>
              {f.lbl}
            </motion.text>
          </g>
        ))}
        <motion.rect x="44" y="200" width="272" height="18" rx="6" fill={REDL} stroke="#FCA5A5" strokeWidth="1" opacity={p>0.85?1:0}/>
        <motion.text x="180" y="213" textAnchor="middle" fontSize="10" fill={RED} fontWeight="600" opacity={p>0.85?1:0}>
          90 deals died in silence — no follow-up sent
        </motion.text>
      </svg>
    ),
    /* 04 – coin drain */
    "04": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        <rect width="360" height="220" fill="#FFFCF5" rx="12"/>
        {Array.from({length:14}).map((_,i)=>{
          const x=14+i*24, delay=i*0.05;
          return (
            <motion.g key={i} animate={{y:p>delay?p*118:0, opacity:p>delay?Math.max(0,1-p*1.15):0}} initial={{y:0,opacity:0}}>
              <circle cx={x} cy="22" r="12" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5"/>
              <text x={x} y="27" textAnchor="middle" fontSize="11" fill="#92400E" fontWeight="800">$</text>
            </motion.g>
          );
        })}
        <motion.ellipse cx="180" cy="168" rx={42*Math.min(p,1)} ry={10*Math.min(p,1)} fill="#E3E2EB" stroke={C} strokeWidth="1.5" opacity="0.55"/>
        <motion.text x="180" y="96" textAnchor="middle" fontSize="42" fill={C} fontWeight="900" opacity={p>0.18?1:0}>$420K</motion.text>
        <motion.text x="180" y="118" textAnchor="middle" fontSize="12" fill={GR} opacity={p>0.38?1:0}>per location · per year</motion.text>
        <motion.rect x="64" y="182" width="232" height="28" rx="8" fill={REDL} stroke="#FCA5A5" strokeWidth="1" opacity={p>0.72?1:0}/>
        <motion.text x="180" y="200" textAnchor="middle" fontSize="11" fill={RED} fontWeight="600" opacity={p>0.72?1:0}>Silently draining — every single day</motion.text>
      </svg>
    ),
    /* 05 – donut */
    "05": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        <circle cx="118" cy="106" r="70" fill="none" stroke="#F1F0FB" strokeWidth="24"/>
        <motion.circle cx="118" cy="106" r="70" fill="none" stroke={C} strokeWidth="24"
          strokeDasharray={`${Math.PI*140*0.31*p} ${Math.PI*140*10}`}
          strokeLinecap="butt" transform="rotate(-90 118 106)"/>
        <motion.circle cx="118" cy="106" r="70" fill="none" stroke="#FCA5A5" strokeWidth="24"
          strokeDasharray={`${Math.PI*140*0.69*p} ${Math.PI*140*10}`}
          strokeLinecap="butt" transform={`rotate(${-90+0.31*360} 118 106)`}/>
        <text x="118" y="100" textAnchor="middle" fontSize="28" fill={C} fontWeight="900">31</text>
        <text x="118" y="118" textAnchor="middle" fontSize="10" fill={GR}>return</text>
        {/* Legend */}
        <rect x="222" y="62" width="13" height="13" rx="3" fill={C}/>
        <text x="241" y="73" fontSize="12" fill="#141419" fontWeight="500">31% loyal</text>
        <rect x="222" y="84" width="13" height="13" rx="3" fill="#FCA5A5"/>
        <text x="241" y="95" fontSize="12" fill="#141419" fontWeight="500">69% leave</text>
        <rect x="214" y="115" width="132" height="48" rx="9" fill={CLL} stroke={C} strokeWidth="1"/>
        <text x="280" y="133" textAnchor="middle" fontSize="10" fill={C} fontWeight="600">Without a loyalty</text>
        <text x="280" y="148" textAnchor="middle" fontSize="10" fill={C} fontWeight="600">follow-up system</text>
        <text x="280" y="163" textAnchor="middle" fontSize="11" fill={C} fontWeight="700">3.2× revenue lost</text>
        <motion.text x="180" y="210" textAnchor="middle" fontSize="11" fill={GR} opacity={p>0.82?1:0}>
          Your best customers rent from competitors next time
        </motion.text>
      </svg>
    ),
    /* 06 – stars + bad review */
    "06": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        <text x="180" y="36" textAnchor="middle" fontSize="12" fill={GR} fontWeight="600">Your Google Maps listing</text>
        {[1,2,3,4,5].map(i=>(
          <motion.text key={i} x={40+i*56} y="94" textAnchor="middle" fontSize="46"
            fill={i<=4?"#F59E0B":"#E3E2EB"}
            animate={{opacity:p>i*0.1?1:0, y:p>i*0.1?94:76}}
            initial={{opacity:0,y:76}} transition={{delay:i*0.1}}>★</motion.text>
        ))}
        <motion.text x="180" y="116" textAnchor="middle" fontSize="13" fill={GR} fontWeight="600" opacity={p>0.52?1:0}>4.1 stars — minimum to rank</motion.text>
        <motion.rect x="36" y="130" width="288" height="44" rx="10" fill={REDL} stroke="#FCA5A5" strokeWidth="1"
          animate={{opacity:p>0.58?1:0, y:p>0.58?130:148}} initial={{opacity:0,y:148}}/>
        <motion.text x="180" y="148" textAnchor="middle" fontSize="10" fill={RED} opacity={p>0.62?1:0}>"Terrible service, car dirty" — 1★ left unanswered</motion.text>
        <motion.text x="180" y="164" textAnchor="middle" fontSize="10" fill={RED} fontWeight="600" opacity={p>0.68?1:0}>Now ranking below competitor at 4.8★</motion.text>
        <motion.rect x="70" y="185" width="220" height="26" rx="7" fill={CLL} stroke={C} strokeWidth="1" opacity={p>0.8?1:0}/>
        <motion.text x="180" y="202" textAnchor="middle" fontSize="11" fill={C} fontWeight="600" opacity={p>0.8?1:0}>45 leads chose the better-rated listing</motion.text>
      </svg>
    ),
    /* 07 – clock + cards */
    "07": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        {/* Clock */}
        <circle cx="116" cy="106" r="74" fill={CLL} stroke={C} strokeWidth="1.5" strokeOpacity="0.4"/>
        <circle cx="116" cy="106" r="68" fill="#fff" stroke={C} strokeWidth="0.5" strokeOpacity="0.2"/>
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>(
          <line key={i} x1="116" y1="42" x2="116" y2="54" stroke={C} strokeWidth="1.5" opacity="0.3"
            transform={`rotate(${i*30} 116 106)`}/>
        ))}
        <motion.line x1="116" y1="106" x2="116" y2="50" stroke={C} strokeWidth="3" strokeLinecap="round"
          animate={{rotate:p*720}} style={{transformOrigin:"116px 106px"}}/>
        <line x1="116" y1="106" x2="146" y2="106" stroke={GR} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="116" cy="106" r="5" fill={C}/>
        {/* Temp bar */}
        <text x="116" y="192" textAnchor="middle" fontSize="10" fill={GR}>Lead temperature</text>
        <rect x="46" y="198" width="140" height="8" rx="4" fill="#E3E2EB"/>
        <motion.rect x="46" y="198" height="8" rx="4"
          animate={{width:140*(1-p*0.6), fill:`hsl(${28+p*8},82%,56%)`}}
          initial={{width:140}}/>
        {/* Cards */}
        <motion.g opacity={p>0.28?1:0}>
          <rect x="218" y="54" width="122" height="54" rx="11" fill={CLL} stroke={C} strokeWidth="1"/>
          <text x="279" y="80" textAnchor="middle" fontSize="28" fill={C} fontWeight="900">40</text>
          <text x="279" y="98" textAnchor="middle" fontSize="10" fill={GR}>still warm</text>
        </motion.g>
        <motion.g opacity={p>0.55?1:0}>
          <rect x="218" y="122" width="122" height="54" rx="11" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1"/>
          <text x="279" y="148" textAnchor="middle" fontSize="28" fill="#3B82F6" fontWeight="900">60</text>
          <text x="279" y="166" textAnchor="middle" fontSize="10" fill={GR}>gone cold ❄️</text>
        </motion.g>
      </svg>
    ),
    /* 08 – money table */
    "08": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        <rect x="28" y="148" width="304" height="14" rx="5" fill="#E3E2EB"/>
        <rect x="68" y="162" width="10" height="38" rx="5" fill="#E3E2EB"/>
        <rect x="282" y="162" width="10" height="38" rx="5" fill="#E3E2EB"/>
        {Array.from({length:7}).map((_,i)=>(
          <motion.rect key={i} x={84} y={122-i*10} width={192} height={13} rx={4}
            fill={i%2===0?C:"#A78BFA"} opacity={0.55+i*0.06}
            animate={{y:p>0.28+i*0.05?122-i*10:144, opacity:p>0.28+i*0.05?0.55+i*0.06:0}}
            initial={{y:144,opacity:0}} transition={{delay:0.28+i*0.06}}/>
        ))}
        <motion.text x="180" y="114" textAnchor="middle" fontSize="36" fill={C} fontWeight="900" opacity={p>0.18?1:0}>$280</motion.text>
        <motion.text x="180" y="132" textAnchor="middle" fontSize="11" fill={GR} opacity={p>0.32?1:0}>per rental · left on the table</motion.text>
        {["🛡️ Insurance","📍 GPS","👶 Seat","⬆️ Upgrade"].map((t,i)=>(
          <motion.g key={i} animate={{opacity:p>0.45+i*0.08?0.45:0}} initial={{opacity:0}}>
            <rect x={22+i*80} y={200} width={72} height={18} rx={5} fill={CLL} stroke={C} strokeWidth={1}/>
            <text x={58+i*80} y={213} textAnchor="middle" fontSize={9} fill={C} fontWeight="500">{t}</text>
          </motion.g>
        ))}
      </svg>
    ),
    /* 09 – day/night split */
    "09": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        <rect x="0" y="0" width="180" height="220" fill="#FFFBEB" rx="12"/>
        <rect x="180" y="0" width="180" height="220" fill="#F0F4FF" rx="12"/>
        <line x1="180" y1="0" x2="180" y2="220" stroke="#E3E2EB" strokeWidth="1.5"/>
        {/* Sun */}
        <circle cx="88" cy="60" r="28" fill="#FCD34D"/>
        {[0,45,90,135,180,225,270,315].map(a=>(
          <line key={a} x1={88+Math.cos(a*Math.PI/180)*32} y1={60+Math.sin(a*Math.PI/180)*32}
            x2={88+Math.cos(a*Math.PI/180)*42} y2={60+Math.sin(a*Math.PI/180)*42}
            stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
        ))}
        {/* Moon */}
        <circle cx="278" cy="56" r="24" fill="#CBD5E1"/>
        <circle cx="290" cy="50" r="20" fill="#F0F4FF"/>
        {/* Your building — dark */}
        <rect x="214" y="116" width="64" height="74" rx="5" fill="#1E293B" stroke="#334155" strokeWidth="1"/>
        {[[222,126],[242,126],[262,126],[222,150],[242,150],[262,150]].map(([wx,wy],i)=>(
          <rect key={i} x={wx} y={wy} width="12" height="14" rx="2" fill={p>0.4?"#0F172A":"#334155"}/>
        ))}
        <text x="246" y="202" textAnchor="middle" fontSize="9" fill="#94A3B8">CLOSED</text>
        {/* Rival — lit */}
        <rect x="80" y="108" width="64" height="82" rx="5" fill="#EEF2FF" stroke={C} strokeWidth="1.5"/>
        {[[88,118],[108,118],[128,118],[88,144],[108,144],[128,144]].map(([wx,wy],i)=>(
          <rect key={i} x={wx} y={wy} width="12" height="14" rx="2" fill="#FDE68A"/>
        ))}
        <text x="112" y="202" textAnchor="middle" fontSize="9" fill={C} fontWeight="700">24/7 OPEN</text>
        {/* Customers */}
        {Array.from({length:5}).map((_,i)=>(
          <motion.circle key={i} cx={185} cy={148+i*9} r="5" fill={C}
            animate={{cx:p>0.5+i*0.06?240:185}} transition={{delay:i*0.1,duration:0.5}}/>
        ))}
        <motion.text x="180" y="216" textAnchor="middle" fontSize="11" fill={C} fontWeight="700" opacity={p>0.82?1:0}>
          82 bookings captured by the competitor
        </motion.text>
      </svg>
    ),
    /* 10 – obstacle course */
    "10": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        <text x="22" y="28" fontSize="12" fill={C} fontWeight="700">100 Confirmed Bookings</text>
        <line x1="22" y1="50" x2="338" y2="50" stroke="#E3E2EB" strokeWidth="3" strokeLinecap="round"/>
        <line x1="22" y1="50" x2="338" y2="50" stroke={C} strokeDasharray="6,5" strokeWidth="1.5" strokeOpacity="0.3"/>
        {[{x:90,e:"📄",t:"Forms"},{x:180,e:"🪪",t:"ID Check"},{x:270,e:"✍️",t:"Sign"}].map(({x,e,t},i)=>(
          <g key={i}>
            <rect x={x-30} y={28} width={60} height={60} rx="11" fill="#F9F8FF" stroke={C} strokeWidth="1.5" strokeOpacity="0.5"/>
            <text x={x} y={64} textAnchor="middle" fontSize="20">{e}</text>
            <text x={x} y={80} textAnchor="middle" fontSize="9" fill={GR}>{t}</text>
            {Array.from({length:i===0?3:i===1?3:2}).map((_,j)=>(
              <motion.circle key={j} cx={x-8+j*8} cy={50} r="5" fill={RED}
                animate={{cy:p>0.26+i*0.18+j*0.04?112:50, opacity:p>0.26+i*0.18+j*0.04?1:0}}
                initial={{cy:50,opacity:0}}/>
            ))}
          </g>
        ))}
        {Array.from({length:2}).map((_,i)=>(
          <motion.circle key={i} cx={22+i*14} cy={50} r="6" fill={C}
            animate={{cx:Math.min(22+i*14+p*306,328)}} transition={{duration:1.5}}/>
        ))}
        <motion.g opacity={p>0.7?1:0}>
          <rect x="28" y="128" width="126" height="52" rx="11" fill={REDL} stroke="#FCA5A5" strokeWidth="1"/>
          <text x="91" y="154" textAnchor="middle" fontSize="30" fill={RED} fontWeight="900">82</text>
          <text x="91" y="172" textAnchor="middle" fontSize="10" fill={RED}>drop off</text>
        </motion.g>
        <motion.g opacity={p>0.76?1:0}>
          <rect x="206" y="128" width="126" height="52" rx="11" fill={CLL} stroke={C} strokeWidth="1"/>
          <text x="269" y="154" textAnchor="middle" fontSize="30" fill={C} fontWeight="900">18</text>
          <text x="269" y="172" textAnchor="middle" fontSize="10" fill={C}>complete</text>
        </motion.g>
      </svg>
    ),
    /* 11 – ripple complaint */
    "11": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        {[1,2,3,4,5].map(i=>(
          <motion.circle key={i} cx="180" cy="102" fill="none" stroke={C} strokeWidth="1.5"
            animate={{r:20+i*30*p, opacity:p>i*0.09?Math.max(0,0.65-i*0.12):0}}
            initial={{r:20,opacity:0}}/>
        ))}
        <motion.circle cx="180" cy="102" r="28" fill={CLL} stroke={C} strokeWidth="2" opacity={p>0.09?1:0}/>
        <motion.text x="180" y="109" textAnchor="middle" fontSize="24" opacity={p>0.09?1:0}>😠</motion.text>
        <motion.text x="180" y="132" textAnchor="middle" fontSize="9" fill={C} fontWeight="700" opacity={p>0.2?1:0}>1 complaint · ignored</motion.text>
        {Array.from({length:8}).map((_,i)=>{
          const angle=(i/8)*Math.PI*2, r=120;
          const x=180+Math.cos(angle)*r, y=102+Math.sin(angle)*r;
          return (
            <motion.g key={i} animate={{opacity:p>0.4+i*0.05?1:0}} initial={{opacity:0}}>
              <circle cx={x} cy={y} r="13" fill={REDL} stroke="#FCA5A5" strokeWidth="1.5"/>
              <text x={x} y={y+5} textAnchor="middle" fontSize="12">❌</text>
            </motion.g>
          );
        })}
        <motion.text x="180" y="210" textAnchor="middle" fontSize="12" fill={C} fontWeight="700" opacity={p>0.87?1:0}>
          22× future bookings silently lost
        </motion.text>
      </svg>
    ),
    /* 12 – heatmap + fog */
    "12": (
      <svg viewBox="0 0 360 220" width="100%" height="100%">
        <rect x="20" y="14" width="320" height="172" rx="12" fill="#F9F8FF" stroke={C} strokeWidth="1" strokeOpacity="0.3"/>
        {Array.from({length:80}).map((_,i)=>{
          const row=Math.floor(i/10), col=i%10;
          const x=36+col*28, y=28+row*20;
          const visible=i<50;
          return (
            <motion.circle key={i} cx={x} cy={y} r="7"
              fill={visible?C:"#E3E2EB"}
              opacity={p>i*0.011?(visible?0.4+Math.random()*0.55:0.22):0}
              initial={{opacity:0}} transition={{delay:i*0.011}}/>
          );
        })}
        <defs>
          <linearGradient id="fog12" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F9F8FF" stopOpacity="0"/>
            <stop offset="55%" stopColor="#F9F8FF" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#F9F8FF" stopOpacity="1"/>
          </linearGradient>
        </defs>
        <motion.rect x="182" y="14" width="158" height="172" fill="url(#fog12)" opacity={p*0.9}/>
        <motion.g opacity={p>0.62?1:0}>
          <circle cx="296" cy="98" r="28" fill="none" stroke={GR} strokeWidth="2.5" strokeOpacity="0.4"/>
          <line x1="315" y1="117" x2="330" y2="132" stroke={GR} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4"/>
          <text x="296" y="105" textAnchor="middle" fontSize="20">❓</text>
        </motion.g>
        <motion.g opacity={p>0.77?1:0}>
          <rect x="30" y="196" width="134" height="22" rx="6" fill={CLL} stroke={C} strokeWidth="1"/>
          <text x="97" y="211" textAnchor="middle" fontSize="11" fill={C} fontWeight="600">62% visible</text>
        </motion.g>
        <motion.g opacity={p>0.82?1:0}>
          <rect x="196" y="196" width="148" height="22" rx="6" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1"/>
          <text x="270" y="211" textAnchor="middle" fontSize="11" fill={GR} fontWeight="600">38% in the dark 🌫️</text>
        </motion.g>
      </svg>
    ),
  };

  return (
    <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:"12px 8px"}}>
      {vz[problem.number] || vz["01"]}
    </div>
  );
}

/* ── Main ── */
export default function ProblemSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  const STEPS = PROBLEMS.length;

  useEffect(() => {
    if (!isPlaying) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => { const next=(prev+1)%STEPS; setAnimKey(k=>k+1); return next; });
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, STEPS]);

  const handleManualChange = (i) => {
    setIsPlaying(false);
    setActiveIndex(i);
    setAnimKey(k => k+1);
    clearInterval(intervalRef.current);
    setTimeout(() => setIsPlaying(true), 8000);
  };

  const active = PROBLEMS[activeIndex];
  const lostPct = Math.round((1 - active.after / active.before) * 100);

  return (
    <section id="why" style={{position:"relative",background:"#FCFCFE",borderTop:"1px solid #E3E2EB",fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <style>{`
        .prob-outer { display:flex; flex-direction:column; height:100vh; overflow:hidden; }
        .prob-header { display:flex; align-items:center; justify-content:space-between; padding:16px 36px; border-bottom:1px solid #E3E2EB; background:#fff; flex-shrink:0; flex-wrap:wrap; gap:10px; }
        .prob-grid { flex:1; display:grid; grid-template-columns:1fr 1fr; min-height:0; }
        .prob-left { border-right:1px solid #E3E2EB; background:#fff; display:flex; flex-direction:column; padding:32px 38px; overflow:hidden; }
        .prob-right { background:#FCFCFE; display:flex; flex-direction:column; padding:32px 38px; overflow:hidden; }
        @media (max-width: 820px) {
          .prob-outer { height:auto !important; overflow:visible !important; }
          .prob-grid { grid-template-columns:1fr !important; }
          .prob-left { border-right:none !important; border-bottom:1px solid #E3E2EB; padding:24px !important; }
          .prob-right { padding:24px !important; }
          .prob-header { padding:14px 20px !important; }
        }
        @media (max-width: 480px) {
          .prob-left { padding:16px !important; }
          .prob-right { padding:16px !important; }
          .ba-grid { gap:8px !important; }
        }
      `}</style>

      <div className="prob-outer">
        {/* Header */}
        <div className="prob-header">
          <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(9px,1.4vw,10px)",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C}}>
              The Problem
            </span>
            <div style={{width:1,height:16,background:"#E3E2EB"}}/>
            <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:"clamp(12px,1.8vw,14px)",color:"#141419",letterSpacing:"-0.02em"}}>
              12 ways your rental bleeds money daily
            </span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:110,height:3,background:"#E8E3DA",borderRadius:2,overflow:"hidden"}}>
              <motion.div style={{height:"100%",background:C,borderRadius:2}}
                animate={{width:`${((activeIndex+1)/STEPS)*100}%`}} transition={{duration:0.4}}/>
            </div>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,color:"#6E6D7A",minWidth:42,textAlign:"right"}}>
              {String(activeIndex+1).padStart(2,"0")} / {STEPS}
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="prob-grid">

          {/* LEFT */}
          <div className="prob-left">
            <AnimatePresence mode="wait">
              <motion.div key={active.number}
                initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-18}}
                transition={{duration:0.35,ease:[0.22,1,0.36,1]}}
                style={{display:"flex",flexDirection:"column",flex:1}}
              >
                <div style={{marginBottom:20}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C,background:"rgba(123,116,220,0.09)",padding:"4px 12px",borderRadius:20,border:"1px solid rgba(123,116,220,0.18)"}}>
                    Problem {active.number}
                  </span>
                </div>

                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,fontSize:"clamp(52px,7.5vw,90px)",color:C,letterSpacing:"-0.05em",lineHeight:0.88,marginBottom:14}}>
                  {active.stat}
                </div>

                <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"clamp(20px,2.5vw,30px)",color:"#141419",letterSpacing:"-0.04em",margin:"0 0 14px",lineHeight:1.08}}>
                  {active.title}
                </h3>

                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(13px,1.5vw,15px)",color:"#6E6D7A",lineHeight:1.68,margin:"0 0 24px",maxWidth:380}}>
                  {active.desc}
                </p>

                {/* Before / After */}
                <div className="ba-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
                  <div style={{padding:"16px 18px",borderRadius:12,background:"#F9F6F2",border:"1px solid #E8E3DA"}}>
                    <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#6E6D7A",marginBottom:7}}>Before</div>
                    <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,fontSize:"clamp(24px,3.5vw,34px)",color:"#141419",letterSpacing:"-0.05em",lineHeight:1,marginBottom:5}}>{active.before}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(9px,1.1vw,11px)",color:"#6E6D7A",lineHeight:1.4}}>{active.beforeLabel}</div>
                  </div>
                  <div style={{padding:"16px 18px",borderRadius:12,background:"rgba(123,116,220,0.05)",border:"1px solid rgba(123,116,220,0.18)"}}>
                    <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C,marginBottom:7}}>After</div>
                    <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,fontSize:"clamp(24px,3.5vw,34px)",color:C,letterSpacing:"-0.05em",lineHeight:1,marginBottom:5}}>{active.after}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(9px,1.1vw,11px)",color:C,opacity:0.7,lineHeight:1.4}}>{active.afterLabel}</div>
                  </div>
                </div>

                {/* Drain */}
                <div style={{padding:"10px 14px",borderRadius:9,background:"#FEF2F2",border:"1px solid #FECACA",display:"flex",alignItems:"flex-start",gap:8}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:RED,flexShrink:0,marginTop:5}}/>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(10px,1.2vw,12px)",color:RED,fontWeight:500,lineHeight:1.5}}>{active.drainLabel}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots nav */}
            <div style={{marginTop:22,flexShrink:0}}>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
                {PROBLEMS.map((pr,i)=>(
                  <button key={pr.number} onClick={()=>handleManualChange(i)}
                    style={{width:activeIndex===i?24:7,height:7,borderRadius:4,background:activeIndex===i?C:i<activeIndex?"rgba(123,116,220,0.45)":"#E3E2EB",border:"none",cursor:"pointer",transition:"all 0.3s",padding:0}}
                    aria-label={`Go to problem ${pr.number}`}/>
                ))}
              </div>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#6E6D7A"}}>Auto-advancing · click to navigate</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="prob-right">
            <AnimatePresence mode="wait">
              <motion.div key={active.number}
                initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.97}}
                transition={{duration:0.35,ease:[0.22,1,0.36,1]}}
                style={{display:"flex",flexDirection:"column",flex:1}}
              >
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"#6E6D7A",marginBottom:18}}>
                  Revenue impact · visualised
                </div>

                {/* Loss bar card */}
                <div style={{padding:"18px 22px",borderRadius:14,background:"#fff",border:"1px solid #E3E2EB",marginBottom:14,flexShrink:0}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:10}}>
                    <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,fontSize:"clamp(36px,5vw,52px)",color:C,letterSpacing:"-0.06em",lineHeight:1}}>{lostPct}%</span>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#6E6D7A",fontWeight:500}}>of potential revenue lost</span>
                  </div>
                  <div style={{height:10,background:"#F1F0FB",borderRadius:5,overflow:"hidden",display:"flex"}}>
                    <motion.div style={{height:"100%",background:C,borderRadius:"5px 0 0 5px"}}
                      animate={{width:`${(active.after/active.before)*100}%`}} transition={{duration:0.65,ease:"easeOut"}}/>
                    <motion.div style={{height:"100%",background:"#FECACA",flex:1}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:7}}>
                    <span style={{fontSize:10,color:C,fontWeight:600}}>{active.afterLabel}</span>
                    <span style={{fontSize:10,color:RED,fontWeight:600}}>{lostPct}% lost to competitors</span>
                  </div>
                </div>

                {/* Viz */}
                <div style={{flex:1,background:"#fff",borderRadius:14,border:"1px solid #E3E2EB",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",minHeight:220}}>
                  <Viz problem={active} animKey={animKey}/>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}