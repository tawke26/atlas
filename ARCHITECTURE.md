# Atlas Architecture Document

## Project Vision

A discovery platform that brings back genuine internet exploration by introducing users to thinkers one at a time, with transparent perspectives, visual identities, and topic-based navigation.

---

## Core Principles

1. **Paced Discovery** - One person at a time, no infinite scroll
2. **Transparent Bias** - Clear perspective labeling, honest about angles
3. **Visual Memory** - Custom illustrations that make thinkers memorable
4. **Deep Curation** - Quality over virality, substance over optimization
5. **Respect for Attention** - Thoughtful design that values user time

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     USER INTERFACE                       │
│  (Minimalist, Paced, One-at-a-Time Presentation)        │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────┴───────────────────────────────────────┐
│                   APPLICATION LAYER                      │
│  • Profile Discovery Engine                              │
│  • Topic/Tag Navigation                                  │
│  • Collection Management                                 │
│  • Search & Recommendation (Phase 2)                     │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────┴───────────────────────────────────────┐
│                     DATA LAYER                           │
│  • Thinker Profiles                                      │
│  • Topics & Tags                                         │
│  • Visual Assets                                         │
│  • User Collections (Phase 2)                            │
└──────────────────────────────────────────────────────────┘
```

---

## Tech Stack Recommendations

### Phase 1: MVP (Static/Minimal Backend)

**Frontend:**
- **Framework**: Next.js 14+ (App Router)
  - Server-side rendering for performance
  - Static generation for thinker profiles
  - Easy progressive enhancement
  - Built-in routing and API routes

- **Styling**: Tailwind CSS + Custom Design System
  - Rapid prototyping
  - Consistent spacing/typography
  - Custom components for unique feel

- **Animations**: Framer Motion
  - Smooth transitions between profiles
  - Delightful micro-interactions

**Data Storage (Phase 1):**
- **Local JSON/Markdown Files**
  - Simple content management
  - Version-controlled curation
  - Easy to edit and maintain
  - No database overhead initially

**Illustration Management:**
- **Local Assets** (SVG preferred)
  - Stored in `/public/illustrations`
  - Optimized for web
  - Consider generative art approach later

**Deployment:**
- **Vercel** or **Netlify**
  - Zero-config Next.js deployment
  - CDN distribution
  - Preview deployments
  - Free tier to start

### Phase 2: Scaling (Interactive Atlas)

**Backend:**
- **Framework**: Next.js API Routes → NestJS/Express (if needed)
- **Database**: PostgreSQL
  - Structured thinker data
  - Relationships between topics
  - User collections
  - Search indexing

- **Search**: Algolia or Typesense
  - Fast semantic search
  - Topic-based filtering
  - "Show me thinkers like X" functionality

- **CMS (Optional)**: 
  - Sanity.io or custom admin panel
  - Curator-friendly interface
  - Preview before publish

**Authentication (Phase 2+):**
- **NextAuth.js**
  - User accounts for collections
  - Email-based auth (simple, appropriate)
  - No social login needed (on-brand)

---

## Data Models

### Thinker Profile

```typescript
interface Thinker {
  id: string;                    // Unique identifier
  slug: string;                  // URL-friendly name
  
  // Basic Info
  name: string;
  tagline: string;               // One-line hook
  bio: string;                   // 2-3 paragraphs
  
  // Perspective
  perspective: {
    stance: string;              // Their core angle/lens
    biases: string[];            // Openly stated biases
    expertise: string[];         // Areas of deep knowledge
  };
  
  // Visual Identity
  illustration: {
    primaryImage: string;        // Path to main illustration
    colorPalette: string[];      // Associated colors
    style: string;               // Visual vibe descriptor
  };
  
  // Content
  topics: string[];              // Tagged topics (AI, culture, etc.)
  themes: string[];              // Cross-cutting themes
  notableWork: WorkReference[];  // Key writings/projects
  
  // Discovery
  links: {
    website?: string;
    twitter?: string;
    substack?: string;
    other?: string[];
  };
  
  // Meta
  curatedBy: string;             // Curator name
  dateAdded: Date;
  featured: boolean;             // For weekly/monthly drops
}

interface WorkReference {
  title: string;
  url?: string;
  type: 'article' | 'book' | 'podcast' | 'video' | 'project';
  description: string;
}
```

### Topic/Tag Structure

```typescript
interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  relatedTopics: string[];       // Topic graph
  thinkerCount: number;
  illustration?: string;         // Optional topic visual
}

interface Theme {
  id: string;
  name: string;
  description: string;
  topics: string[];              // Topics within this theme
  thinkers: string[];            // Thinkers exploring this theme
}
```

### User Collection (Phase 2)

```typescript
interface UserCollection {
  userId: string;
  discoveredThinkers: {
    thinkerId: string;
    discoveredAt: Date;
    notes?: string;              // User's own notes
    rating?: number;             // Optional personal rating
  }[];
  savedTopics: string[];
  preferences?: {
    discoveryPace: 'weekly' | 'biweekly' | 'monthly';
    emailUpdates: boolean;
  };
}
```

---

## File Structure

```
atlas-side-project/
│
├── docs/
│   ├── ARCHITECTURE.md          # This file
│   ├── DESIGN_SYSTEM.md         # Visual language, typography
│   └── CURATION_GUIDE.md        # How to add thinkers
│
├── public/
│   ├── illustrations/           # Thinker illustrations
│   └── assets/                  # Other static files
│
├── src/
│   ├── app/                     # Next.js app directory
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Homepage/current discovery
│   │   ├── discover/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Individual thinker profile
│   │   ├── topics/
│   │   │   ├── page.tsx         # Topic index
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Topic detail with thinkers
│   │   ├── atlas/
│   │   │   └── page.tsx         # Full collection view
│   │   └── api/                 # API routes (Phase 2)
│   │
│   ├── components/
│   │   ├── ThinkerCard.tsx      # Main profile display
│   │   ├── IllustrationViewer.tsx
│   │   ├── TopicExplorer.tsx
│   │   ├── BiasLabel.tsx        # Perspective indicator
│   │   └── Layout/
│   │
│   ├── data/
│   │   ├── thinkers/            # JSON or MD files per thinker
│   │   │   ├── jane-doe.json
│   │   │   └── john-smith.json
│   │   ├── topics.json
│   │   └── themes.json
│   │
│   ├── lib/
│   │   ├── thinkers.ts          # Data fetching logic
│   │   ├── topics.ts
│   │   └── utils.ts
│   │
│   └── styles/
│       └── globals.css          # Tailwind + custom styles
│
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

---

## Development Phases

### Phase 1: Foundation (Weeks 1-4)
**Goal**: Working MVP with 10-20 curated thinkers

**Deliverables:**
- [ ] Next.js project setup with TypeScript
- [ ] Core data models and sample JSON data
- [ ] Single thinker profile page (fully designed)
- [ ] Homepage with "today's thinker" concept
- [ ] Basic topic filtering
- [ ] 10 fully curated thinker profiles with illustrations
- [ ] Deploy to Vercel

**Key Features:**
- One-at-a-time presentation
- Profile with bio, perspective, biases
- Simple illustration display
- Basic topic tags
- Navigation between thinkers

---

### Phase 2: Discovery Engine (Weeks 5-8)
**Goal**: Rich exploration experience

**Deliverables:**
- [ ] Topic index page (visual grid)
- [ ] Topic detail pages (thinkers within topic)
- [ ] "Atlas" view (all thinkers, organized visually)
- [ ] Search functionality (basic text)
- [ ] 30-50 total thinkers
- [ ] Weekly digest concept (featured thinker)

**Key Features:**
- Browse by topic/theme
- Visual collection interface
- Filter by perspective/bias
- Related thinkers suggestions

---

### Phase 3: Interactive Atlas (Weeks 9-16)
**Goal**: Personalized discovery tool

**Deliverables:**
- [ ] User accounts (simple email auth)
- [ ] Personal collections ("My Thinkers")
- [ ] Reading notes functionality
- [ ] Advanced search (semantic)
- [ ] Recommendation engine
- [ ] Email digest opt-in
- [ ] 100+ thinkers

**Key Features:**
- Save and organize thinkers
- Track discovery journey
- "Show me thinkers like X"
- Intersection queries ("AI + ethics")
- Personal curation

---

### Phase 4: Community & Scale (Future)
**Goal**: Sustainable platform with curator community

**Potential Features:**
- Curator submissions (vetted)
- Thinker profiles that evolve over time
- Connection maps (influence graphs)
- Conversation/dialogue features
- API for external use
- Mobile app consideration

---

## Design Considerations

### User Experience
1. **Pacing Mechanism**: How do you control "one at a time"?
   - Option A: Literal gate (one per day/week)
   - Option B: Intentional friction (deliberate "next" button)
   - Option C: Curated sequence (numbered journey)

2. **Illustration Style**: 
   - Consistent art direction across all thinkers
   - Could be commissioned, AI-assisted, or generative
   - Should be memorable and capture "essence"

3. **Bias Presentation**:
   - Not judgmental, just transparent
   - Visual indicators (badges, colors?)
   - Self-declared vs curator-interpreted

### Content Strategy
1. **Curation Criteria**: 
   - What makes someone worthy of inclusion?
   - Balance between obscure and accessible
   - Diversity of perspectives required

2. **Topic Taxonomy**:
   - Broad categories (AI, Culture, Politics, etc.)
   - Specific intersections (AI + Ethics)
   - Evolving based on content

3. **Quality Control**:
   - Vetting process for submissions
   - Regular updates to profiles
   - Dead link management

---

## Technical Decisions to Make

### Immediate (Before Coding)
1. **Illustration Approach**: 
   - Commission artists?
   - AI-generated with consistent prompts?
   - Generative art algorithm?
   - Mix of approaches?

2. **Content Format**: 
   - JSON files vs Markdown with frontmatter?
   - Recommendation: **Markdown with frontmatter** (easier to write)

3. **Discovery Mechanism**:
   - Random selection?
   - Curated sequence?
   - Algorithm-based (but transparent)?

### Medium-Term (Phase 2)
4. **Database Choice**: PostgreSQL vs MongoDB vs Supabase
5. **Search Implementation**: Build vs Algolia vs Typesense
6. **CMS Need**: Custom admin vs headless CMS

### Long-Term (Phase 3+)
7. **Recommendation Algorithm**: Collaborative filtering, content-based, hybrid?
8. **Monetization**: Free forever, donations, premium features, grants?
9. **Content Licensing**: How do you handle thinker data rights?

---

## Success Metrics

### Phase 1
- Site loads fast (<2s)
- Profiles are compelling (qualitative feedback)
- 10 thinkers feel like enough for proof of concept

### Phase 2
- Users explore 3+ thinkers per session
- Topic-based browsing is intuitive
- Return visits happen naturally

### Phase 3
- Users build meaningful collections
- Recommendations feel relevant
- Word-of-mouth growth begins

---

## Risks & Mitigations

### Risk: Curation bottleneck
**Mitigation**: Start small, build curator network gradually, clear guidelines

### Risk: Thinker consent/accuracy
**Mitigation**: Verification process, option for subjects to review their profile

### Risk: Illustration quality/consistency
**Mitigation**: Define style guide early, consider single artist for consistency

### Risk: Discoverability paradox
**Mitigation**: The "anti-algorithm" is still a design choice—be intentional about it

### Risk: Scaling costs
**Mitigation**: Keep infrastructure simple, leverage free tiers, consider donations later

---

## Next Steps

1. **Validate Core Concept**: 
   - Sketch/wireframe the thinker profile page
   - Write 2-3 sample profiles (real people)
   - Get feedback from trusted sources

2. **Set Up Development Environment**:
   - Initialize Next.js project
   - Configure TypeScript, Tailwind
   - Set up basic file structure

3. **Create First Thinker**:
   - Pick one person to profile
   - Write bio, identify biases, tag topics
   - Create/commission illustration
   - Build profile page around this real content

4. **Iterate on Design**:
   - Focus on the single-thinker experience
   - Make it feel special, not just another blog

---

## Open Questions

- Who are the first 10 thinkers you'd want to feature?
- What's your personal involvement in curation vs community-driven?
- What's the tone: academic, casual, poetic, journalistic?
- How do you prevent this from becoming an echo chamber?
- What makes a "good" thinker for this platform?

---

**Last Updated**: 2025-09-30
**Version**: 1.0 (Initial Architecture)

