# Atlas - A Discovery Platform for Thinkers

> Bringing back genuine internet exploration, one thinker at a time.

## What is Atlas?

Atlas is an antidote to algorithmic feeds and engagement optimization. It's a curated platform that introduces you to interesting thinkers—people with genuine perspectives who aren't optimized for virality, but who have something real to say.

Unlike social media feeds that drown you in noise, Atlas presents **one person at a time**, with transparent biases, visual identities, and thoughtful context. No infinite scroll, no engagement metrics, just quality introductions to voices worth listening to.

---

## Core Principles

1. **Paced Discovery** - One person at a time, no infinite scroll
2. **Transparent Bias** - Clear perspective labeling, honest about angles
3. **Visual Memory** - Custom illustrations that make thinkers memorable
4. **Deep Curation** - Quality over virality, substance over optimization
5. **Respect for Attention** - Thoughtful design that values user time

---

## Project Status

✅ **Phase 1 MVP Complete and Ready to Deploy!**

- ✅ **Phase 1**: MVP with 10 disciplines, 3 starter thinkers each (30 total)
  - All 30 thinker profiles created
  - Full working Next.js application
  - About page and 404 handling
  - SEO metadata
  - Responsive design
  - Ready for production
- ⏳ **Phase 2**: Smart discovery engine based on initial choices
- ⏳ **Phase 3**: Interactive atlas with personalized recommendations
- ⏳ **Phase 4**: Community curation and scaling

---

## Documentation

- [**ARCHITECTURE.md**](./ARCHITECTURE.md) - Complete system architecture, tech stack, data models, and development phases
- [**TECHNICAL_SPEC.md**](./TECHNICAL_SPEC.md) - Database schemas, API design, and implementation details
- [**ONBOARDING_FLOW.md**](./ONBOARDING_FLOW.md) - Discipline-based onboarding and discovery flow

---

## Tech Stack (Planned)

### Phase 1
- **Frontend**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Custom Design System
- **Data**: Local JSON files
- **Deployment**: Vercel
- **Illustrations**: SVG assets

### Phase 2+
- **Database**: PostgreSQL
- **Search**: Algolia or Typesense
- **Auth**: NextAuth.js
- **CMS**: Sanity.io or custom

---

## Getting Started (Coming Soon)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
atlas-side-project/
├── docs/                  # Documentation
├── public/
│   └── illustrations/     # Thinker illustrations
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── data/             # JSON data files (Phase 1)
│   ├── lib/              # Utilities and data fetching
│   └── styles/           # Global styles
├── ARCHITECTURE.md       # System architecture
├── TECHNICAL_SPEC.md     # Technical specifications
└── README.md             # This file
```

---

## Design Philosophy

### The Problem We're Solving

The internet used to feel like discovery. Now it feels like you're being fed. The same voices, optimized for engagement, pushed through algorithms that don't care about depth. Atlas is about finding people who make you stop and think, not people who make you click.

### How It Works

1. **Choose your discipline**: Start by selecting one of 10 intellectual disciplines—from Technology & Society to Philosophy to Climate & Environment.

2. **Meet three starters**: Get introduced to 3 prominent, thoughtful thinkers in that field. Pick one to begin your journey.

3. **One at a time**: You don't get a feed. You get one person. Their story, their perspective, their work.

4. **Transparent perspectives**: Every profile clearly states the person's stance, approach, and expertise. No pretense of neutrality—just honesty about where they're coming from.

5. **Guided discovery**: After your first choice, the platform suggests related thinkers—mostly similar (70%), some different (30%) to expand your horizons.

6. **Topic exploration**: Browse by specific topics that cut across disciplines. Find unexpected connections.

---

## Content Strategy

### What Makes a Good Atlas Thinker?

- **Genuine perspective**: They have a clear point of view, not just hot takes
- **Depth over breadth**: They think deeply about specific topics
- **Underexposed**: Not necessarily famous, but worth knowing
- **Honest about biases**: Clear about their stance and background
- **Quality work**: Essays, research, talks, projects that demonstrate their thinking

### Topics We Care About

Atlas covers diverse intellectual terrain:
- Technology & Society
- Justice & Ethics
- Culture & Psychology
- Economics & Systems
- Science & Philosophy
- Art & Creativity
- Politics & Power

The key is **intersections**—people who bring unusual combinations of expertise and perspective.

---

## Contributing (Future)

Currently in development. Contribution guidelines will be added once the platform is live.

### Ideas for Contribution
- Suggest thinkers for curation
- Create illustrations (with consistent style guide)
- Write thinker profiles
- Improve the platform itself

---

## Roadmap

### Phase 1: Foundation (Weeks 1-4)
- [x] Architecture planning
- [x] Discipline structure defined (10 disciplines)
- [x] Sample thinker profiles created
- [ ] Next.js project setup
- [ ] Onboarding flow (discipline selection)
- [ ] Core components (ThinkerCard, DisciplineSelector)
- [ ] Complete all 30 starter thinker profiles
- [ ] Deploy MVP

### Phase 2: Discovery Engine (Weeks 5-8)
- [ ] Topic navigation
- [ ] Atlas view (collection interface)
- [ ] Basic search
- [ ] 30-50 thinkers

### Phase 3: Interactive Atlas (Weeks 9-16)
- [ ] User accounts
- [ ] Personal collections
- [ ] Recommendations
- [ ] 100+ thinkers

### Phase 4: Community & Scale
- [ ] Curator network
- [ ] Submission system
- [ ] Mobile app
- [ ] API

---

## Why "Atlas"?

An atlas is a collection that helps you navigate—it shows you the terrain, the connections, the relationships between places. This platform is an atlas of thinkers: a map of perspectives that helps you navigate the intellectual landscape.

---

## License

TBD

---

## Contact

TBD

---

**Status**: Planning & Architecture Phase  
**Last Updated**: 2025-09-30  
**Version**: 0.1.0

