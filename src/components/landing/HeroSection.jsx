import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle, Phone, MessageCircle, Star, Send, Heart, Users } from "lucide-react";
import AgentOrbit from "./AgentOrbit";

const TRUST = ["No long-term contract", "Live in 14 days", "14-day refund", "Bank-level security", "24/7 US support", "Works with existing systems"];

// AI Activity Animation Data with Graphics
const AI_ACTIVITIES = [
  {
    id: 1,
    type: "call",
    title: "Incoming Call",
    subtitle: "Answering in 0.8s",
    color: "#2A9D8F",
    bgColor: "rgba(42, 157, 143, 0.1)",
    detail: "Premium Rental Inquiry",
    data: {
      caller: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      location: "Miami, FL",
      duration: "0:08",
      status: "Connected"
    }
  },
  {
    id: 2,
    type: "instagram",
    title: "Instagram DM",
    subtitle: "Reply sent instantly",
    color: "#E1306C",
    bgColor: "rgba(225, 48, 108, 0.1)",
    detail: "Booking confirmation",
    data: {
      username: "@carlos_miami",
      message: "How much for the Urus this weekend?",
      reply: "Hi Carlos! The Urus is $450/day for weekends. Available Sat-Sun. Book now?",
      time: "2s",
      status: "Replied"
    }
  },
  {
    id: 3,
    type: "review",
    title: "Google Review",
    subtitle: "5-star response posted",
    color: "#FFA500",
    bgColor: "rgba(255, 165, 0, 0.1)",
    detail: "Thank you message",
    data: {
      reviewer: "Mike Rodriguez",
      rating: 5,
      review: "Amazing service! The Lamborghini was perfect for my anniversary.",
      response: "Thank you Mike! We're thrilled you had an amazing anniversary. Looking forward to serving you again!",
      time: "11s",
      status: "Responded"
    }
  },
  {
    id: 4,
    type: "followup",
    title: "Follow-up Sent",
    subtitle: "Booking reminder",
    color: "#7B74DC",
    bgColor: "rgba(123, 116, 220, 0.1)",
    detail: "Pickup details shared",
    data: {
      client: "Jessica L.",
      subject: "Your McLaren 720S pickup tomorrow",
      message: "Hi Jessica! Your McLaren is ready for pickup at 9 AM. Location: 1234 Ocean Dr. Need anything else?",
      time: "5s",
      status: "Sent"
    }
  },
  {
    id: 5,
    type: "vip",
    title: "VIP Client",
    subtitle: "Birthday wish sent",
    color: "#FF6B6B",
    bgColor: "rgba(255, 107, 107, 0.1)",
    detail: "Personal touch added",
    data: {
      client: "David Chen",
      occasion: "Birthday",
      message: "Happy Birthday David! 🎉 As our VIP client, enjoy 20% off your next exotic rental. Make it special!",
      gift: "20% VIP Discount",
      time: "1s",
      status: "Delivered"
    }
  }
];

// Compact Animated Stats Strip Component
const AnimatedStatsStrip = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [animatedValues, setAnimatedValues] = useState({
    callsAnswered: 1,
    coverage: 1,
    languages: 1,
    leadsLost: 1
  });

  const stats = [
    {
      id: 'calls',
      label: 'Calls Answered',
      value: 100,
      suffix: '%',
      color: '#2A9D8F',
      subtext: 'Response Time: 2 seconds'
    },
    {
      id: 'coverage',
      label: '24/7 Coverage',
      value: 100,
      suffix: '%',
      color: '#7B74DC',
      subtext: 'Always available'
    },
    {
      id: 'languages',
      label: 'Languages',
      value: 22,
      suffix: '+',
      color: '#FF6B6B',
      subtext: 'Global communication'
    },
    {
      id: 'leads',
      label: 'Leads Missed',
      value: 0,
      suffix: '%',
      color: '#2A9D8F',
      subtext: 'Zero missed opportunities'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentStatData = stats[currentStat];
    const duration = 1200;
    const steps = 50;
    const increment = currentStatData.value / steps;
    let step = 0;

    const animateValue = () => {
      if (step <= steps) {
        const currentValue = Math.min(increment * step, currentStatData.value);
        setAnimatedValues(prev => ({
          ...prev,
          [currentStatData.id === 'calls' ? 'callsAnswered' : 
           currentStatData.id === 'coverage' ? 'coverage' :
           currentStatData.id === 'languages' ? 'languages' : 'leadsLost']: currentValue
        }));
        step++;
        setTimeout(animateValue, duration / steps);
      }
    };

    // Reset and start animation
    setAnimatedValues(prev => ({
      ...prev,
      [currentStatData.id === 'calls' ? 'callsAnswered' : 
       currentStatData.id === 'coverage' ? 'coverage' :
       currentStatData.id === 'languages' ? 'languages' : 'leadsLost']: 1
    }));
    
    setTimeout(animateValue, 100);
  }, [currentStat]);

  const currentStatData = stats[currentStat];
  const currentValue = currentStatData.id === 'calls' ? animatedValues.callsAnswered :
                      currentStatData.id === 'coverage' ? animatedValues.coverage :
                      currentStatData.id === 'languages' ? animatedValues.languages :
                      animatedValues.leadsLost;

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      {/* Compact Stats Display */}
      <motion.div
        key={currentStat}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '14px',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              `linear-gradient(135deg, ${currentStatData.color}15 0%, rgba(255,255,255,0.1) 100%)`,
              `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, ${currentStatData.color}15 100%)`,
              `linear-gradient(135deg, ${currentStatData.color}15 0%, rgba(255,255,255,0.1) 100%)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            opacity: 0.6
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Animated Number */}
          <motion.div
            style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              color: currentValue >= currentStatData.value ? '#2A9D8F' : currentStatData.color,
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}
          >
            {Math.round(currentValue)}{currentStatData.suffix}
          </motion.div>

          {/* Label */}
          <h4 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(14px, 3vw, 16px)',
            color: '#141419',
            margin: '0 0 4px',
            letterSpacing: '-0.01em'
          }}>
            {currentStatData.label}
          </h4>

          {/* Subtext */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(11px, 2.5vw, 12px)',
            color: '#6E6D7A',
            margin: 0,
            fontWeight: 500
          }}>
            {currentStatData.subtext}
          </p>

          {/* Success Indicator */}
          {currentValue >= currentStatData.value && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#2A9D8F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckCircle size={12} color="white" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats Progress Indicators */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '12px'
      }}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            animate={{
              scale: currentStat === index ? 1.2 : 1,
              opacity: currentStat === index ? 1 : 0.4,
              backgroundColor: currentStat === index ? stat.color : '#E5E7EB'
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};
// Animated Graphics Components for Each Activity Type

// Call Interface Graphics
const CallInterface = ({ data, isActive }) => (
  <div style={{
    background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
    borderRadius: '20px',
    padding: '20px',
    color: '#065F46',
    position: 'relative',
    overflow: 'hidden',
    height: '280px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.1)'
  }}>
    {/* Animated background waves */}
    <motion.div
      animate={isActive ? {
        scale: [1, 1.05, 1],
        opacity: [0.1, 0.15, 0.1]
      } : {}}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 30% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 60%)',
        borderRadius: '24px'
      }}
    />
    
    {/* Call header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', position: 'relative', zIndex: 2 }}>
      <motion.div
        animate={isActive ? { rotate: 360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}
      >
        <Phone size={22} strokeWidth={2} color="#10B981" />
      </motion.div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.01em', color: '#065F46' }}>Incoming Call</div>
        <div style={{ fontSize: '13px', opacity: 0.7, fontWeight: '500', color: '#047857' }}>Answering automatically...</div>
      </div>
    </div>

    {/* Caller info */}
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.8)', 
      backdropFilter: 'blur(10px)',
      borderRadius: '14px', 
      padding: '14px', 
      marginBottom: '12px',
      border: '1px solid rgba(16, 185, 129, 0.15)',
      position: 'relative',
      zIndex: 2,
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px', letterSpacing: '-0.02em', color: '#064E3B' }}>{data.caller}</div>
      <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px', fontWeight: '500', color: '#065F46' }}>{data.phone}</div>
      <div style={{ fontSize: '12px', opacity: 0.7, fontWeight: '500', color: '#047857', marginBottom: '8px' }}>{data.location}</div>
      <div style={{ fontSize: '11px', opacity: 0.6, fontWeight: '500', color: '#047857', marginTop: 'auto' }}>Premium rental inquiry - High priority customer seeking luxury vehicle for weekend event</div>
    </div>

    {/* Call status */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <motion.div
          animate={isActive ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#34D399',
            boxShadow: '0 0 12px rgba(52, 211, 153, 0.8)'
          }}
        />
        <span style={{ fontSize: '13px', fontWeight: '600' }}>{data.status}</span>
      </div>
      <div style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.01em' }}>{data.duration}</div>
    </div>

    {/* Response time indicator */}
    <motion.div
      initial={{ width: '0%' }}
      animate={isActive ? { width: '100%' } : { width: '0%' }}
      transition={{ duration: 3, ease: "easeInOut" }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #34D399 0%, #10B981 100%)',
        borderRadius: '0 0 24px 24px',
        boxShadow: '0 -2px 8px rgba(52, 211, 153, 0.4)'
      }}
    />
  </div>
);

// Instagram DM Interface Graphics
const InstagramInterface = ({ data, isActive }) => (
  <div style={{
    background: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
    borderRadius: '20px',
    padding: '20px',
    color: '#831843',
    position: 'relative',
    overflow: 'hidden',
    height: '280px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 32px rgba(228, 64, 95, 0.08)',
    border: '1px solid rgba(228, 64, 95, 0.1)'
  }}>
    {/* Instagram header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
      <motion.div
        animate={isActive ? { rotate: [0, 360] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(228, 64, 95, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(228, 64, 95, 0.2)'
        }}
      >
        <MessageCircle size={22} strokeWidth={2} color="#E4405F" />
      </motion.div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.01em', color: '#831843' }}>Instagram DM</div>
        <div style={{ fontSize: '13px', opacity: 0.7, fontWeight: '500', color: '#BE185D' }}>Auto-replying...</div>
      </div>
    </div>

    {/* Message thread */}
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.8)', 
      backdropFilter: 'blur(10px)',
      borderRadius: '16px', 
      padding: '18px', 
      marginBottom: '16px',
      border: '1px solid rgba(228, 64, 95, 0.15)',
      position: 'relative',
      zIndex: 2,
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px', letterSpacing: '-0.01em', color: '#831843' }}>{data.username}</div>
      
      {/* Incoming message */}
      <div style={{ 
        background: 'rgba(228, 64, 95, 0.1)', 
        borderRadius: '12px 12px 12px 4px', 
        padding: '10px 12px', 
        marginBottom: '10px',
        fontSize: '12px',
        lineHeight: '1.4',
        fontWeight: '500',
        border: '1px solid rgba(228, 64, 95, 0.2)'
      }}>
        {data.message}
      </div>
      
      {/* AI Reply */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        style={{ 
          background: 'rgba(228, 64, 95, 0.15)', 
          borderRadius: '12px 12px 4px 12px', 
          padding: '10px 12px',
          fontSize: '12px',
          marginLeft: '20px',
          lineHeight: '1.4',
          fontWeight: '500',
          border: '1px solid rgba(228, 64, 95, 0.25)',
          boxShadow: '0 2px 8px rgba(228, 64, 95, 0.1)',
          flex: 1
        }}
      >
        {data.reply}
      </motion.div>
    </div>

    {/* Status */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <motion.div
          animate={isActive ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#34D399',
            boxShadow: '0 0 12px rgba(52, 211, 153, 0.8)'
          }}
        />
        <span style={{ fontSize: '13px', fontWeight: '600' }}>{data.status}</span>
      </div>
      <div style={{ fontSize: '15px', fontWeight: '700' }}>{data.time}</div>
    </div>
  </div>
);

// Google Review Interface Graphics
const ReviewInterface = ({ data, isActive }) => (
  <div style={{
    background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    borderRadius: '20px',
    padding: '20px',
    color: '#92400E',
    position: 'relative',
    overflow: 'hidden',
    height: '280px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 32px rgba(251, 191, 36, 0.08)',
    border: '1px solid rgba(251, 191, 36, 0.1)'
  }}>
    {/* Google header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
      <motion.div
        animate={isActive ? { rotate: [0, 360] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(251, 191, 36, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(251, 191, 36, 0.2)'
        }}
      >
        <Star size={22} strokeWidth={2} color="#FBBF24" />
      </motion.div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.01em', color: '#92400E' }}>Google Review</div>
        <div style={{ fontSize: '13px', opacity: 0.7, fontWeight: '500', color: '#B45309' }}>Responding...</div>
      </div>
    </div>

    {/* Review content */}
    <div style={{ 
      background: 'rgba(255,255,255,0.15)', 
      backdropFilter: 'blur(10px)',
      borderRadius: '16px', 
      padding: '20px', 
      marginBottom: '20px',
      border: '1px solid rgba(255,255,255,0.2)',
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.01em' }}>{data.reviewer}</div>
        <div style={{ display: 'flex', gap: '3px' }}>
          {[...Array(data.rating)].map((_, i) => (
            <motion.div
              key={i}
              animate={isActive ? { scale: [1, 1.15, 1] } : {}}
              transition={{ delay: i * 0.2, duration: 1, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            >
              <Star size={14} fill="currentColor" strokeWidth={0} />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div style={{ fontSize: '13px', marginBottom: '16px', opacity: 0.95, lineHeight: '1.5', fontWeight: '500' }}>
        {data.review}
      </div>
      
      {/* AI Response */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        style={{ 
          background: 'rgba(255,255,255,0.25)', 
          borderRadius: '12px', 
          padding: '12px 16px',
          fontSize: '12px',
          borderLeft: '4px solid rgba(255,255,255,0.6)',
          lineHeight: '1.5',
          fontWeight: '500'
        }}
      >
        <strong style={{ display: 'block', marginBottom: '4px' }}>Our Response:</strong> {data.response}
      </motion.div>
    </div>

    {/* Status */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <motion.div
          animate={isActive ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#34D399',
            boxShadow: '0 0 12px rgba(52, 211, 153, 0.8)'
          }}
        />
        <span style={{ fontSize: '13px', fontWeight: '600' }}>{data.status}</span>
      </div>
      <div style={{ fontSize: '15px', fontWeight: '700' }}>{data.time}</div>
    </div>
  </div>
);

// Follow-up Email Interface Graphics
const FollowupInterface = ({ data, isActive }) => (
  <div style={{
    background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
    borderRadius: '20px',
    padding: '20px',
    color: '#5B21B6',
    position: 'relative',
    overflow: 'hidden',
    height: '280px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.08)',
    border: '1px solid rgba(139, 92, 246, 0.1)'
  }}>
    {/* Email header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
      <motion.div
        animate={isActive ? { rotate: [0, 360] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(139, 92, 246, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}
      >
        <Send size={22} strokeWidth={2} color="#8B5CF6" />
      </motion.div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.01em', color: '#5B21B6' }}>Follow-up Email</div>
        <div style={{ fontSize: '13px', opacity: 0.7, fontWeight: '500', color: '#7C3AED' }}>Sending...</div>
      </div>
    </div>

    {/* Email content */}
    <div style={{ 
      background: 'rgba(255,255,255,0.15)', 
      backdropFilter: 'blur(10px)',
      borderRadius: '16px', 
      padding: '20px', 
      marginBottom: '20px',
      border: '1px solid rgba(255,255,255,0.2)',
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{ fontSize: '13px', opacity: 0.85, marginBottom: '6px', fontWeight: '500' }}>To: {data.client}</div>
      <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', letterSpacing: '-0.01em' }}>{data.subject}</div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        style={{ 
          fontSize: '12px', 
          lineHeight: 1.6,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '12px',
          padding: '16px',
          fontWeight: '500',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        {data.message}
      </motion.div>
    </div>

    {/* Status */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <motion.div
          animate={isActive ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#34D399',
            boxShadow: '0 0 12px rgba(52, 211, 153, 0.8)'
          }}
        />
        <span style={{ fontSize: '13px', fontWeight: '600' }}>{data.status}</span>
      </div>
      <div style={{ fontSize: '15px', fontWeight: '700' }}>{data.time}</div>
    </div>

    {/* Sending animation */}
    <motion.div
      animate={isActive ? { x: ['-100%', '100%'] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '40%',
        height: '4px',
        background: 'rgba(255,255,255,0.7)',
        borderRadius: '0 0 24px 24px',
        boxShadow: '0 0 12px rgba(255,255,255,0.5)'
      }}
    />
  </div>
);

// VIP Client Interface Graphics
const VIPInterface = ({ data, isActive }) => (
  <div style={{
    background: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
    borderRadius: '20px',
    padding: '20px',
    color: '#BE185D',
    position: 'relative',
    overflow: 'hidden',
    height: '280px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 32px rgba(236, 72, 153, 0.08)',
    border: '1px solid rgba(236, 72, 153, 0.1)'
  }}>
    {/* Floating hearts animation */}
    {isActive && [...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -120],
          opacity: [0, 0.8, 0],
          scale: [0.4, 1, 0.4],
          x: [0, (i % 2 === 0 ? 15 : -15)]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: i * 0.8,
          ease: "easeOut"
        }}
        style={{
          position: 'absolute',
          right: `${15 + i * 18}px`,
          top: '60%',
          fontSize: '18px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }}
      >
        ❤️
      </motion.div>
    ))}

    {/* VIP header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
      <motion.div
        animate={isActive ? { rotate: [0, 360], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(236, 72, 153, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(236, 72, 153, 0.2)'
        }}
      >
        <Heart size={22} strokeWidth={2} fill="#EC4899" color="#EC4899" />
      </motion.div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.01em', color: '#BE185D' }}>VIP Client Care</div>
        <div style={{ fontSize: '13px', opacity: 0.7, fontWeight: '500', color: '#DB2777' }}>Sending personal message...</div>
      </div>
    </div>

    {/* VIP content */}
    <div style={{ 
      background: 'rgba(255,255,255,0.15)', 
      backdropFilter: 'blur(10px)',
      borderRadius: '16px', 
      padding: '20px', 
      marginBottom: '20px',
      border: '1px solid rgba(255,255,255,0.2)',
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.01em' }}>{data.client}</div>
        <div style={{ 
          background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)', 
          padding: '4px 12px', 
          borderRadius: '16px', 
          fontSize: '11px',
          fontWeight: '700',
          boxShadow: '0 2px 8px rgba(252, 211, 77, 0.4)',
          letterSpacing: '0.02em'
        }}>
          ⭐ VIP
        </div>
      </div>
      
      <div style={{ fontSize: '13px', marginBottom: '6px', opacity: 0.85, fontWeight: '500' }}>
        Occasion: <strong>{data.occasion}</strong>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        style={{ 
          fontSize: '12px', 
          lineHeight: 1.6,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '12px',
          fontWeight: '500',
          border: '1px solid rgba(255,255,255,0.3)'
        }}
      >
        {data.message}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.9 }}
        style={{ 
          background: 'linear-gradient(135deg, rgba(252, 211, 77, 0.3) 0%, rgba(245, 158, 11, 0.3) 100%)', 
          borderRadius: '10px', 
          padding: '10px 14px',
          fontSize: '12px',
          fontWeight: '700',
          textAlign: 'center',
          border: '1px solid rgba(252, 211, 77, 0.4)',
          boxShadow: '0 4px 12px rgba(252, 211, 77, 0.2)'
        }}
      >
        🎁 {data.gift}
      </motion.div>
    </div>

    {/* Status */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <motion.div
          animate={isActive ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#34D399',
            boxShadow: '0 0 12px rgba(52, 211, 153, 0.8)'
          }}
        />
        <span style={{ fontSize: '13px', fontWeight: '600' }}>{data.status}</span>
      </div>
      <div style={{ fontSize: '15px', fontWeight: '700' }}>{data.time}</div>
    </div>
  </div>
);
// Enhanced AI Activity Display with Animated Graphics
const AIActivityDisplay = () => {
  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % AI_ACTIVITIES.length);
    }, 4000); // Increased from 3000 to 4000 for more time to appreciate each interface

    return () => clearInterval(interval);
  }, []);

  const activity = AI_ACTIVITIES[currentActivity];

  // Render the appropriate interface based on activity type
  const renderActivityInterface = () => {
    const isActive = true; // Always active for the current activity
    
    switch (activity.type) {
      case 'call':
        return <CallInterface data={activity.data} isActive={isActive} />;
      case 'instagram':
        return <InstagramInterface data={activity.data} isActive={isActive} />;
      case 'review':
        return <ReviewInterface data={activity.data} isActive={isActive} />;
      case 'followup':
        return <FollowupInterface data={activity.data} isActive={isActive} />;
      case 'vip':
        return <VIPInterface data={activity.data} isActive={isActive} />;
      default:
        return <CallInterface data={activity.data} isActive={isActive} />;
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '420px',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: '12px'
    }}>
      {/* Main Activity Interface - Animated Graphics */}
      <motion.div
        key={currentActivity}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ 
          duration: 0.8,
          ease: "easeInOut"
        }}
        style={{
          width: '340px',
          position: 'relative',
          marginBottom: '16px'
        }}
      >
        {renderActivityInterface()}
      </motion.div>

      {/* Activity Indicators - Separate Tab Section */}
      <div style={{
        display: 'flex',
        gap: '12px',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        padding: '10px 20px',
        borderRadius: '28px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        marginTop: 'auto',
        marginBottom: '12px'
      }}>
        {AI_ACTIVITIES.map((activityItem, index) => {
          const getIcon = (type) => {
            switch (type) {
              case 'call': return Phone;
              case 'instagram': return MessageCircle;
              case 'review': return Star;
              case 'followup': return Send;
              case 'vip': return Heart;
              default: return Phone;
            }
          };
          
          const IconComp = getIcon(activityItem.type);
          
          return (
            <motion.div
              key={activityItem.id}
              animate={{
                scale: currentActivity === index ? 1.15 : 1,
                opacity: currentActivity === index ? 1 : 0.6,
                rotate: currentActivity === index ? [0, 360] : 0
              }}
              transition={{ 
                duration: currentActivity === index ? 12 : 0.5,
                repeat: currentActivity === index ? Infinity : 0,
                ease: currentActivity === index ? "linear" : "easeInOut"
              }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '14px',
                background: currentActivity === index 
                  ? `${activityItem.color}20` 
                  : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: currentActivity === index 
                  ? `2px solid ${activityItem.color}` 
                  : '2px solid transparent',
                cursor: 'pointer',
                boxShadow: currentActivity === index 
                  ? `0 4px 16px ${activityItem.color}30`
                  : 'none'
              }}
            >
              <IconComp 
                size={20} 
                color={currentActivity === index ? activityItem.color : '#9CA3AF'}
                strokeWidth={2.5}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Rotating Background Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '60px',
          right: '20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${AI_ACTIVITIES[currentActivity]?.color}10 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
      
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          bottom: '120px',
          left: '10px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${AI_ACTIVITIES[(currentActivity + 2) % AI_ACTIVITIES.length]?.color}08 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
    </div>
  );
};

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
      {/* Enhanced gradient overlay - No background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: `
            linear-gradient(135deg, 
              rgba(252,252,254,0.95) 0%, 
              rgba(245,243,255,0.85) 30%, 
              rgba(252,252,254,0.95) 60%,
              rgba(245,243,255,0.95) 100%
            )
          `,
        }}
      />

      {/* Enhanced decorative elements with responsive sizing */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "clamp(300px, 55vw, 800px)",
          height: "clamp(300px, 55vw, 800px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,243,255,0.6) 0%, rgba(245,243,255,0) 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      
      {/* Additional decorative circle for depth */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-15%",
          width: "clamp(200px, 40vw, 600px)",
          height: "clamp(200px, 40vw, 600px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,116,220,0.1) 0%, rgba(123,116,220,0) 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          padding: "clamp(20px, 4vw, 40px) clamp(12px, 3vw, 20px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(20px, 4vw, 32px)",
            maxWidth: "1400px",
            margin: "0 auto"
          }}
          className="hero-grid"
        >
          {/* Left Content - Enhanced Responsive */}
          <div style={{ 
            maxWidth: "680px",
            margin: "0 auto",
          }}>
            {/* Live badge - Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 100,
                border: "1px solid rgba(42,157,143,0.25)",
                background: "rgba(42,157,143,0.08)",
                marginBottom: 16,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Animated background */}
              <motion.div
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(42,157,143,0.1) 50%, transparent 100%)',
                  width: '200%'
                }}
              />
              
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(42,157,143,0.4)",
                    "0 0 0 8px rgba(42,157,143,0)",
                    "0 0 0 0 rgba(42,157,143,0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#2A9D8F",
                  position: 'relative',
                  zIndex: 2
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#2A9D8F",
                  position: 'relative',
                  zIndex: 2
                }}
              >
                24/7 AI Live — Answering Calls Now
              </span>
            </motion.div>

            {/* H1 — Updated headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600,
                  lineHeight: 1.0,
                  letterSpacing: "-0.04em",
                  margin: "0 0 6px",
                  color: "#141419",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(38px, 6.2vw, 82px)",
                  }}
                >
                  AI employees
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(38px, 6.2vw, 82px)",
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#7B74DC",
                  }}
                >
                  specifically built
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(38px, 6.2vw, 82px)",
                  }}
                >
                  for car rental USA operators.
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
                maxWidth: "540px",
                margin: "12px 0 12px",
              }}
            >
              Aiaura answers every call, every DM, every email — 24/7, in any language, in your brand voice.
              <br />
              <strong style={{ color: "#141419" }}>You only handle deals that are ready to close.</strong>
            </motion.p>

            {/* All AI Agents Working Together Line - Enhanced Mobile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                margin: "12px 0 20px",
                padding: "8px 12px",
                borderRadius: 12,
                background: "rgba(123,116,220,0.05)",
                border: "1px solid rgba(123,116,220,0.1)",
                maxWidth: "fit-content"
              }}
            >
              <Users size={18} color="#7B74DC" />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#7B74DC",
                }}
              >
                All AI agents working together seamlessly
              </span>
            </motion.div>

            {/* CTAs - Enhanced Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <a
                href="#cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "12px 24px",
                  borderRadius: 100,
                  background: "linear-gradient(135deg, #7B74DC 0%, #9B8CE8 100%)",
                  color: "#FCFCFE",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 32px rgba(123,116,220,0.25)",
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 16px 48px rgba(123,116,220,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(123,116,220,0.25)";
                }}
              >
                Book a Call →
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <ArrowUpRight size={16} />
                </motion.div>
              </a>

              <a
                href="#solutions"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "12px 24px",
                  borderRadius: 100,
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(10px)",
                  color: "#7B74DC",
                  border: "1.5px solid rgba(123,116,220,0.2)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(123,116,220,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.8)";
                  e.currentTarget.style.transform = "";
                }}
              >
                See All Products
              </a>
            </motion.div>

            {/* Trust pills - Enhanced Mobile */}
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
                    gap: 4,
                    padding: "4px 10px",
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

          {/* Right — AI Activity Display Only */}
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
            <AIActivityDisplay />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        /* Ultra-responsive breakpoints for perfect display */
        
        /* Large Desktop: Full premium experience */
        @media (min-width: 1200px) {
          .hero-grid {
            grid-template-columns: 1fr 650px !important;
            align-items: center;
            gap: 60px !important;
          }
          .hero-right {
            display: flex !important;
          }
        }
        
        /* Desktop: Standard premium experience */
        @media (min-width: 900px) and (max-width: 1199px) {
          .hero-grid {
            grid-template-columns: 1fr 500px !important;
            align-items: center;
            gap: 40px !important;
          }
          .hero-right {
            display: flex !important;
          }
        }
        
        /* Tablet Landscape: Stacked layout */
        @media (min-width: 768px) and (max-width: 899px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center !important;
          }
          .hero-right {
            display: flex !important;
            transform: scale(0.8);
            margin: -20px auto;
            justify-content: center !important;
          }
        }
        
        /* Tablet Portrait: Compact stacked layout */
        @media (min-width: 600px) and (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            text-align: center !important;
          }
          .hero-right {
            display: flex !important;
            transform: scale(0.7);
            margin: -30px auto;
            justify-content: center !important;
          }
        }
        
        /* Large Mobile: Simplified experience */
        @media (min-width: 480px) and (max-width: 599px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            text-align: center !important;
          }
          .hero-right {
            display: flex !important;
            transform: scale(0.6);
            margin: -40px auto -20px;
            justify-content: center !important;
          }
        }
        
        /* Small Mobile: Mobile-optimized experience */
        @media (max-width: 479px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            text-align: center !important;
          }
          .hero-right {
            display: none !important;
          }
        }
        
        /* Premium glassmorphism effects with fallbacks */
        @supports (backdrop-filter: blur(10px)) {
          .glass-effect {
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
          }
        }
        
        @supports not (backdrop-filter: blur(10px)) {
          .glass-effect {
            background: rgba(255, 255, 255, 0.95) !important;
          }
        }
        
        /* Enhanced mobile typography scaling */
        @media (max-width: 767px) {
          .hero-grid {
            text-align: center !important;
          }
          
          .hero-grid h1 span {
            font-size: clamp(32px, 8vw, 42px) !important;
            line-height: 1.1 !important;
          }
          
          .hero-grid p {
            font-size: clamp(14px, 4vw, 16px) !important;
            line-height: 1.6 !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          
          .hero-grid > div:first-child {
            text-align: center !important;
          }
          
          .hero-grid > div:first-child > div {
            justify-content: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
        
        @media (max-width: 479px) {
          .hero-grid > div:first-child > div:nth-child(4) {
            flex-direction: column !important;
            align-items: center !important;
          }
          
          .hero-grid > div:first-child > div:nth-child(4) > a {
            width: 100% !important;
            max-width: 280px !important;
          }
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                     opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                     box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Performance optimizations */
        .hero-right {
          will-change: transform;
          transform-style: preserve-3d;
        }
        
        /* High DPI display optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .hero-right {
            transform: translateZ(0);
            backface-visibility: hidden;
          }
        }
        
        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .glass-effect {
            background: rgba(20, 20, 25, 0.95) !important;
            border-color: rgba(255, 255, 255, 0.1) !important;
          }
        }
        
        /* Print styles */
        @media print {
          .hero-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
