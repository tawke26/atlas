# Quick Start Guide - Atlas

## The New Approach (Updated 2025-10-01)

We've streamlined Atlas to focus on what matters:

### ✅ What We're Building

**A discipline-based discovery platform** where users:
1. Choose one of **10 intellectual disciplines**
2. Pick from **3 prominent thinkers** in that field to start
3. Begin a guided journey of discovery based on their choice

### ❌ What We're NOT Building (Yet)

- Complex illustration system (waste of time for MVP)
- User accounts (Phase 2)
- Advanced recommendations (Phase 2)
- Infinite customization options

---

## The Core Data

### 10 Disciplines

1. **Technology & Society** - Digital platforms, AI, internet dynamics
2. **Philosophy** - Ethics, consciousness, meaning
3. **Economics & Systems** - Markets, inequality, alternatives
4. **Psychology & Mind** - Behavior, cognition, emotions
5. **Climate & Environment** - Climate science, sustainability
6. **Politics & Power** - Democracy, authoritarianism, governance
7. **Science & Research** - Discoveries, scientific method
8. **Culture & Media** - Art, criticism, cultural theory
9. **Justice & Rights** - Human rights, criminal justice
10. **History & Civilization** - Historical analysis, trends

### 30 Starter Thinkers (3 per discipline)

These are **prominent, relatively unbiased** voices—respected scholars who prioritize evidence and thoughtful analysis over ideology.

**See `disciplines.json` for the complete list**

Example starters:
- **Technology**: Zeynep Tufekci, Ethan Zuckerman, danah boyd
- **Philosophy**: Kwame Anthony Appiah, Martha Nussbaum, Daniel Dennett
- **Economics**: Mariana Mazzucato, Kate Raworth, Branko Milanović

---

## User Flow

```
Landing Page
    ↓
Choose Discipline
    ↓
See 3 Starters → Pick One
    ↓
Read Full Profile
    ↓
Next Thinker (recommended)
    ↓
Continue Discovery...
```

### Key UX Principles

1. **Paced, not rushed** - One profile at a time
2. **Guided, not algorithmic** - Clear logic for recommendations
3. **Simple, not cluttered** - Focus on content, not features
4. **Transparent, not neutral** - Everyone has a perspective

---

## Data Structure

### Thinker Profile (Simplified)
```json
{
  "id": "slug",
  "name": "Name",
  "tagline": "One-line description",
  "bio": "2-3 paragraphs",
  "perspective": {
    "stance": "Their core position",
    "approach": "empirical | theoretical | activist",
    "expertise": ["Area 1", "Area 2"]
  },
  "primaryDiscipline": "discipline-id",
  "topics": ["topic-1", "topic-2"],
  "notableWork": [
    {
      "title": "Work Title",
      "type": "book | article | talk | project",
      "url": "https://...",
      "description": "Brief description"
    }
  ],
  "links": {
    "website": "https://...",
    "twitter": "https://..."
  },
  "complexity": "accessible | moderate | advanced",
  "controversiality": "mainstream | moderate | controversial",
  "isStarter": true
}
```

**See `/thinkers/` folder for examples:**
- `zeynep-tufekci.json`
- `kate-raworth.json`
- `martha-nussbaum.json`

---

## MVP Feature List (Phase 1)

### Must Have
- [ ] 10 disciplines defined ✅ (Done)
- [ ] 30 starter thinker profiles ⏳ (3 done, 27 to go)
- [ ] Landing page with discipline selection
- [ ] Discipline → 3 starters page
- [ ] Individual thinker profile page
- [ ] Simple "Next" recommendation (can be random initially)
- [ ] Basic navigation (back, explore topics)
- [ ] Responsive design
- [ ] Deploy to Vercel

### Nice to Have (Can Wait)
- Smart recommendations based on first choice
- Topic browsing/filtering
- Search functionality
- User progress tracking (localStorage)
- Sharing functionality

### Not Now
- User accounts
- Favorites/collections
- Email digests
- Complex algorithms
- Illustrations/visual system

---

## Tech Stack (Decided)

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data**: Local JSON files (in `/thinkers/` folder)
- **Deployment**: Vercel
- **No database needed for Phase 1**

---

## File Structure (Planned)

```
atlas-side-project/
├── thinkers/                    # Thinker JSON files ✅
│   ├── zeynep-tufekci.json     ✅
│   ├── kate-raworth.json       ✅
│   ├── martha-nussbaum.json    ✅
│   └── ... (27 more)
├── disciplines.json             # Disciplines data ✅
├── docs/                        # Planning docs ✅
│   ├── ARCHITECTURE.md         ✅
│   ├── TECHNICAL_SPEC.md       ✅
│   └── ONBOARDING_FLOW.md      ✅
├── src/                         # Next.js app (to be created)
│   ├── app/
│   │   ├── page.tsx            # Landing (discipline selection)
│   │   ├── [discipline]/
│   │   │   └── page.tsx        # Starter selection
│   │   └── thinker/
│   │       └── [slug]/
│   │           └── page.tsx    # Thinker profile
│   ├── components/
│   │   ├── DisciplineCard.tsx
│   │   ├── ThinkerCard.tsx
│   │   └── StarterSelector.tsx
│   ├── lib/
│   │   ├── thinkers.ts         # Load thinker data
│   │   └── disciplines.ts      # Load discipline data
│   └── styles/
│       └── globals.css
├── public/
│   └── ...
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md                    ✅
```

---

## Next Steps

### Immediate (This Week)
1. ✅ Define disciplines and structure
2. ✅ Create 3 sample thinker profiles
3. ⏳ Complete remaining 27 starter profiles
4. ⏳ Initialize Next.js project
5. ⏳ Build landing page UI

### Week 2
1. Build discipline selection page
2. Build starter selection page
3. Build thinker profile page
4. Wire up data loading

### Week 3
1. Add navigation between thinkers
2. Basic recommendation logic
3. Polish design
4. Responsive layout

### Week 4
1. Final content review
2. Testing
3. Deploy to Vercel
4. Get feedback

---

## Content Creation TODO

Need to create 27 more thinker profiles:

### Technology & Society (2 more)
- [ ] Ethan Zuckerman
- [ ] danah boyd

### Philosophy (2 more)
- [ ] Kwame Anthony Appiah
- [ ] Daniel Dennett

### Economics & Systems (2 more)
- [ ] Mariana Mazzucato
- [ ] Branko Milanović

### Psychology & Mind (3)
- [ ] Lisa Feldman Barrett
- [ ] Paul Bloom
- [ ] Carol Dweck

### Climate & Environment (3)
- [ ] Kate Marvel
- [ ] Ayana Elizabeth Johnson
- [ ] Michael E. Mann

### Politics & Power (3)
- [ ] Yascha Mounk
- [ ] Anne Applebaum
- [ ] Francis Fukuyama

### Science & Research (3)
- [ ] Sean Carroll
- [ ] Jennifer Doudna
- [ ] Carlo Rovelli

### Culture & Media (3)
- [ ] Jia Tolentino
- [ ] Ta-Nehisi Coates
- [ ] Pankaj Mishra

### Justice & Rights (3)
- [ ] Bryan Stevenson
- [ ] Kimberlé Crenshaw
- [ ] Albie Sachs

### History & Civilization (3)
- [ ] Yuval Noah Harari
- [ ] Jill Lepore
- [ ] Timothy Snyder

---

## Questions to Resolve

1. **Recommendation Logic for Phase 1**: 
   - Start with random within same discipline?
   - Or simple topic-based matching?
   - **Decision**: Keep it simple—recommend from same discipline first, then branch out

2. **Visual Design**:
   - Minimalist or editorial style?
   - Color-coding by discipline?
   - **Decision**: Use discipline colors, clean typography, lots of whitespace

3. **Mobile vs Desktop First**:
   - **Decision**: Mobile-first, works great on desktop

4. **How to Handle "Next"**:
   - Completely random?
   - Within discipline first?
   - **Decision**: 70% same discipline, 30% related topics

---

## Success Criteria for Phase 1

- [ ] All 30 starter profiles are complete and compelling
- [ ] User can flow from landing → discipline → starter → profile smoothly
- [ ] Site loads fast (<2s)
- [ ] Design feels intentional and calm (not overwhelming)
- [ ] Mobile experience is excellent
- [ ] Can get meaningful feedback from 5-10 test users

---

## Philosophy Reminders

**Keep returning to these:**

1. **Less is more** - Every feature we don't build is time saved
2. **Content first** - The thinker profiles are the product
3. **Respect attention** - No dark patterns, no manipulation
4. **Start narrow** - Better to do one thing well than many things poorly
5. **Ship fast** - Get it in front of real users and iterate

---

**Last Updated**: 2025-10-01  
**Status**: Planning Complete, Ready to Build 🚀

