import {
  Phone,
  MessageCircle,
  Mail,
  UserCheck,
  Repeat,
  Star,
  ShieldCheck,
  FileText,
  CalendarCheck,
  Sparkles,
  Languages,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export type Employee = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  capabilities: string[];
  integrations: string[];
  roi: string;
};

export const EMPLOYEES: Employee[] = [
  {
    slug: "voice-agent",
    name: "Voice Agent",
    tagline: "Answers every call, day or night",
    description:
      "A natural-sounding AI voice agent that picks up every inbound call within one ring, qualifies the renter, checks fleet availability, and books the reservation — in your brand's tone.",
    icon: Phone,
    capabilities: [
      "Sub-second pickup, 24/7",
      "Natural multilingual conversation",
      "Live availability lookup in HQ Rental",
      "Books, modifies, or cancels reservations",
    ],
    integrations: ["Twilio", "HQ Rental", "HubSpot"],
    roi: "Recover 60–80% of after-hours bookings",
  },
  {
    slug: "dm-agent",
    name: "DM Agent",
    tagline: "Replies to every Instagram & WhatsApp DM",
    description:
      "Handles all inbound DMs across Instagram, WhatsApp, and Messenger in seconds — qualifies leads, sends quotes, and hands off only the deals worth your team's time.",
    icon: MessageCircle,
    capabilities: [
      "Instagram, WhatsApp, Messenger",
      "Auto-quote with photos & pricing",
      "Lead scoring and CRM sync",
      "Brand-voice tuned per location",
    ],
    integrations: ["Instagram", "WhatsApp", "HubSpot"],
    roi: "5x faster DM response time",
  },
  {
    slug: "email-agent",
    name: "Email Agent",
    tagline: "Inbox zero, around the clock",
    description:
      "Reads, classifies, and replies to every inbound email — quotes, contract questions, damage disputes, partnership requests — and escalates only when needed.",
    icon: Mail,
    capabilities: [
      "Triage by intent and urgency",
      "Personalized quotes within minutes",
      "Threaded follow-ups",
      "Smart escalation to humans",
    ],
    integrations: ["Gmail", "Outlook", "HubSpot"],
    roi: "90% of emails handled without a human",
  },
  {
    slug: "lead-qualifier",
    name: "Lead Qualifier",
    tagline: "Only hot leads reach your team",
    description:
      "Scores every inbound lead against your ICP — fleet match, budget, dates, location — and routes only qualified renters to your closers.",
    icon: UserCheck,
    capabilities: [
      "Real-time scoring",
      "Custom qualification criteria",
      "Round-robin or skill-based routing",
      "Full handoff context",
    ],
    integrations: ["HubSpot", "HQ Rental"],
    roi: "3x close rate on routed leads",
  },
  {
    slug: "follow-up-agent",
    name: "Follow-up Agent",
    tagline: "Never lets a lead go cold",
    description:
      "Automatic, human-feeling multi-touch sequences across SMS, email, and DM until the renter books, declines, or asks to stop.",
    icon: Repeat,
    capabilities: [
      "Multi-channel cadences",
      "Reactivation of cold leads",
      "Birthday & anniversary touches",
      "Compliance-aware opt-outs",
    ],
    integrations: ["Twilio", "HubSpot", "WhatsApp"],
    roi: '27% of "lost" leads recovered',
  },
  {
    slug: "review-manager",
    name: "Review Manager",
    tagline: "Protects your reputation, automatically",
    description:
      "Asks happy renters for 5-star reviews at the perfect moment, replies to every review, and flags negative ones to ops in real time.",
    icon: Star,
    capabilities: [
      "Smart-timed review asks",
      "AI replies in your voice",
      "Negative-review alerting",
      "Cross-platform: Google, Yelp, Turo",
    ],
    integrations: ["Google Business", "Yelp", "Turo"],
    roi: "+1.4 stars in 90 days",
  },
  {
    slug: "insurance-verifier",
    name: "Insurance Verifier",
    tagline: "Verifies coverage in under a minute",
    description:
      "Collects, parses, and validates renter insurance documents end-to-end — saving 15+ minutes per booking and reducing fraud risk.",
    icon: ShieldCheck,
    capabilities: [
      "OCR + policy validation",
      "Carrier API checks",
      "Auto-collect missing info",
      "Audit-ready documentation",
    ],
    integrations: ["HQ Rental", "Stripe Identity"],
    roi: "15 min saved per booking",
  },
  {
    slug: "quote-sender",
    name: "Quote Sender",
    tagline: "Branded quotes in seconds",
    description:
      "Generates and sends fully branded quotes — fleet photos, pricing, terms, deposit — in seconds, on any channel the renter is on.",
    icon: FileText,
    capabilities: [
      "Dynamic pricing rules",
      "Fleet imagery & specs",
      "One-click acceptance link",
      "Stripe deposit on accept",
    ],
    integrations: ["Stripe", "HQ Rental"],
    roi: "Quote response time: hours → seconds",
  },
  {
    slug: "booking-agent",
    name: "Booking Agent",
    tagline: "Closes the reservation end-to-end",
    description:
      "Walks the renter through the full booking — vehicle, dates, add-ons, deposit, signature — without human involvement.",
    icon: CalendarCheck,
    capabilities: [
      "Real-time availability",
      "Add-on upsell",
      "Deposit collection",
      "E-signature on contract",
    ],
    integrations: ["HQ Rental", "Stripe"],
    roi: "+22% conversion vs. manual",
  },
  {
    slug: "concierge",
    name: "Concierge",
    tagline: "VIP experience for every renter",
    description:
      "Pre-arrival prep, delivery coordination, in-rental support, and white-glove follow-through — at exotic-rental quality, on every booking.",
    icon: Sparkles,
    capabilities: [
      "Pre-arrival itineraries",
      "Delivery & pickup coordination",
      "In-rental support thread",
      "VIP recovery on issues",
    ],
    integrations: ["WhatsApp", "Twilio"],
    roi: "NPS +35 across the fleet",
  },
  {
    slug: "multilingual-agent",
    name: "Multilingual Agent",
    tagline: "Sells in 40+ languages",
    description:
      "Talks, writes, and quotes fluently in 40+ languages — capturing international renters who would otherwise drop off.",
    icon: Languages,
    capabilities: [
      "40+ languages, native fluency",
      "Auto language detection",
      "Localized currency & terms",
      "Cultural tone matching",
    ],
    integrations: ["All channels"],
    roi: "+18% international bookings",
  },
  {
    slug: "ops-reporter",
    name: "Ops Reporter",
    tagline: "Knows what's working before you do",
    description:
      "Reads every conversation, every booking, every review — and ships a daily ops digest with the wins, the leaks, and the fixes.",
    icon: BarChart3,
    capabilities: [
      "Daily AI ops digest",
      "Lost-revenue attribution",
      "Agent-by-agent KPIs",
      "Slack & email delivery",
    ],
    integrations: ["Slack", "Email"],
    roi: "Find leaks before they cost you",
  },
];

export const TIERS = [
  {
    name: "Hyper-Exotic",
    fleet: "Lamborghini, Ferrari, Bugatti, McLaren",
    promise:
      "Concierge-level AI for $2M+ vehicles. Every renter feels chauffeur-handled before the keys are in their hand.",
  },
  {
    name: "Luxury",
    fleet: "Rolls-Royce, Bentley, G-Wagon, Range Rover",
    promise:
      "Premium booking flow with insurance verification, deposit handling, and white-glove follow-up baked in.",
  },
  {
    name: "Premium",
    fleet: "BMW, Mercedes, Tesla, Porsche",
    promise:
      "Dial up volume without dropping quality. Multi-channel agents close 3x more inbound, 24/7.",
  },
  {
    name: "Standard Multi-Location",
    fleet: "Economy through full-size, multiple locations",
    promise:
      "Every location gets a full AI staff — voice, DMs, email, follow-up — for less than one part-time hire.",
  },
];

export const INTEGRATIONS = [
  { name: "HubSpot", category: "CRM" },
  { name: "Twilio", category: "Voice & SMS" },
  { name: "Stripe", category: "Payments" },
  { name: "HQ Rental", category: "Fleet management" },
  { name: "Instagram", category: "Social DMs" },
  { name: "WhatsApp", category: "Messaging" },
  { name: "Gmail", category: "Email" },
  { name: "Outlook", category: "Email" },
  { name: "Google Business", category: "Reviews" },
  { name: "Yelp", category: "Reviews" },
  { name: "Turo", category: "Marketplace" },
  { name: "Slack", category: "Ops" },
];
