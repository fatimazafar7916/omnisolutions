# Aiaura - AI Employees for US Car Rental Operators

A modern, high-performance landing page built with React, TanStack Start, and Vite. Features 12 AI employee solutions, interactive infographics, and seamless integrations showcase.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Tech Stack

- **Framework**: React 19 + TanStack Start
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Backend**: Supabase
- **Deployment**: Vercel

## 🎨 Features

### Landing Page Components

- **Hero Section**: Animated hero with background image and trust badges
- **Stats Strip**: Animated counters (100% calls answered, <2s response time, etc.)
- **Problem Section**: 12 interactive infographics showing industry pain points
- **Solutions Grid**: Auto-rotating table of 12 AI products
- **Integrations**: 50+ tool integrations across 6 categories
- **How It Works**: Step-by-step process visualization
- **FAQ Section**: Collapsible frequently asked questions
- **CTA Section**: Conversion-optimized call-to-action

### Key Features

- ✅ Fully responsive design
- ✅ SEO optimized (meta tags, Open Graph, Twitter Cards, Schema.org)
- ✅ Smooth scroll animations
- ✅ Interactive infographics
- ✅ Auto-rotating content
- ✅ 50+ integration logos
- ✅ Performance optimized (< 120KB gzipped)

## 📁 Project Structure

```
src/
├── components/
│   ├── landing/          # Landing page components
│   │   ├── HeroSection.jsx
│   │   ├── StatsStrip.jsx
│   │   ├── ProblemSection.jsx
│   │   ├── SolutionsGrid.jsx
│   │   ├── IntegrationsSection.jsx
│   │   └── ...
│   ├── site/             # Reusable site components
│   └── ui/               # UI component library
├── routes/               # Page routes
├── integrations/         # Supabase integration
├── lib/                  # Utility functions
└── styles.css           # Global styles
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
VITE_SUPABASE_URL=https://your-project.supabase.co
```

See `.env.example` for reference.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Via Vercel CLI**:

```bash
npm install -g vercel
vercel login
vercel --prod
```

2. **Via Vercel Dashboard**:
   - Push code to GitHub
   - Import repository at https://vercel.com/new
   - Configure environment variables
   - Deploy

See `DEPLOYMENT.md` for detailed instructions.

### Build Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `dist/client`
- **Node Version**: 18.x or higher

## 📊 Performance

- **Bundle Size**: ~374 KB (gzipped: ~119 KB)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90

## 🎯 SEO

- ✅ Unique title tags (58 chars)
- ✅ Meta descriptions (158 chars)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Schema.org JSON-LD
- ✅ robots.txt
- ✅ sitemap.xml

## 🔍 Key Sections

### Problem Section

12 interactive infographics visualizing industry pain points:

- Missed calls (73%)
- Slow DM replies (78%)
- Zero follow-up (10% conversion)
- Silent revenue loss ($420K/year)
- And 8 more...

### Solutions Grid

Auto-rotating showcase of 12 AI products:

- AI Receptionist
- DM Auto-Responder
- Follow-Up Sequences
- Review Guardian
- And 8 more...

### Integrations

50+ integrations across 6 categories:

- CRM (12 tools)
- Phone (4 tools)
- Booking (8 tools)
- Payment (8 tools)
- Calendar (5 tools)
- Communication (7 tools)

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Code Style

- ESLint for linting
- Prettier for formatting
- Run `npm run format` before committing

## 📝 Documentation

- `DEPLOYMENT.md` - Deployment guide
- `VERCEL-CHECKLIST.md` - Pre-deployment checklist
- `SEO-IMPLEMENTATION.md` - SEO documentation
- `INFOGRAPHIC-STRATEGY.md` - Design philosophy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run format` and `npm run lint`
5. Submit a pull request

## 📄 License

Private - All rights reserved

## 🆘 Support

For issues or questions:

- Check documentation in `/docs`
- Review build logs
- Contact: hello@aiaura.ai

---

Built with ❤️ for US car rental operators
