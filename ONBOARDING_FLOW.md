# Onboarding & Discovery Flow

## User Journey

### Step 1: Choose Your Discipline
User is presented with 10 disciplines to start their journey:

1. **Technology & Society** - AI, digital culture, internet dynamics
2. **Philosophy** - Ethics, epistemology, meaning, existence  
3. **Economics & Systems** - Markets, inequality, alternative economies
4. **Psychology & Mind** - Human behavior, cognition, mental health
5. **Climate & Environment** - Sustainability, ecology, climate justice
6. **Politics & Power** - Governance, democracy, social movements
7. **Science & Research** - Cutting-edge research, scientific method, discoveries
8. **Culture & Media** - Art, literature, criticism, cultural theory
9. **Justice & Rights** - Human rights, criminal justice, social justice
10. **History & Civilization** - Historical analysis, civilizational trends

### Step 2: Meet Three Starting Points
For the chosen discipline, user sees **3 prominent, relatively balanced thinkers**:
- Brief intro (name, tagline, one-line stance)
- Quick preview of their perspective
- Visual distinction (simple color/pattern, no complex illustrations)

User selects ONE to start with.

### Step 3: First Profile
Full profile of selected thinker:
- Bio (2-3 paragraphs)
- Perspective & stance
- Notable work (3-5 pieces)
- Where to find them
- Topics they explore

### Step 4: Discovery Continues
After reading the profile, user can:
- **Next**: Get another thinker (algorithm considers their choice)
- **Explore Topics**: Browse by specific topics within/across disciplines
- **Change Discipline**: Start fresh with a new discipline

## Recommendation Logic

### Initial Selection Impact
The first thinker chosen tells us:
- Which discipline interests them
- What kind of perspective they gravitate toward (more traditional vs radical, theoretical vs practical, etc.)

### Subsequent Recommendations
After first choice:
1. **70% similar** - Thinkers in same discipline or adjacent topics
2. **30% different** - Expose to related but different perspectives
3. **Never repeat** - Keep track of seen thinkers
4. **Balance introduced** - Alternate between similar and contrasting views

### Topic-Based Discovery
If user explores by topic:
- Show all thinkers who engage with that topic
- Across disciplines (cross-pollination)
- Sorted by relevance to their journey so far

## Data Structure Changes

### Discipline Model
```typescript
interface Discipline {
  id: string;
  name: string;
  slug: string;
  description: string;
  starterThinkers: string[]; // IDs of 3 starting thinkers
  color: string; // Simple color code for visual distinction
}
```

### Updated Thinker Model
```typescript
interface Thinker {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  bio: string;
  
  // Simplified perspective
  perspective: {
    stance: string;
    approach: string; // "empirical", "theoretical", "activist", "critical", etc.
    leanings?: string[]; // Optional political/ideological leanings
    expertise: string[];
  };
  
  // Primary discipline + topics
  primaryDiscipline: string; // discipline ID
  topics: string[];
  
  // Content
  notableWork: WorkReference[];
  links: {
    website?: string;
    twitter?: string;
    substack?: string;
    other?: string[];
  };
  
  // Discovery metadata
  complexity: 'accessible' | 'moderate' | 'advanced'; // Reading level
  controversiality: 'mainstream' | 'moderate' | 'controversial'; // How polarizing
  
  // Meta
  dateAdded: Date;
  featured: boolean;
  isStarter: boolean; // One of the 3 starting thinkers for a discipline
}
```

## UI Flow

### Landing Page
```
┌─────────────────────────────────────────────┐
│         Welcome to Atlas                     │
│                                              │
│  Discover thinkers worth listening to.      │
│  Choose a discipline to begin:              │
│                                              │
│  [Technology & Society]  [Philosophy]       │
│  [Economics & Systems]   [Psychology]       │
│  [Climate & Environment] [Politics]         │
│  [Science]               [Culture]          │
│  [Justice & Rights]      [History]          │
│                                              │
└─────────────────────────────────────────────┘
```

### Starter Selection
```
┌─────────────────────────────────────────────┐
│   ← Back                Technology & Society │
│                                              │
│   Start with one of these thinkers:         │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Zeynep Tufekci                        │  │
│  │ Technosociologist examining digital   │  │
│  │ power and social movements            │  │
│  │                                        │  │
│  │ [Learn More]                          │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Ethan Zuckerman                       │  │
│  │ Scholar of digital public spaces      │  │
│  │ and civic technology                  │  │
│  │                                        │  │
│  │ [Learn More]                          │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ danah boyd                            │  │
│  │ Researcher studying technology's      │  │
│  │ impact on society and culture         │  │
│  │                                        │  │
│  │ [Learn More]                          │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Thinker Profile
```
┌─────────────────────────────────────────────┐
│   Zeynep Tufekci                            │
│   Technosociologist examining digital power │
│                                              │
│   Bio:                                      │
│   [2-3 paragraphs about who they are...]   │
│                                              │
│   Perspective:                              │
│   • Stance: [Clear statement]               │
│   • Approach: Empirical, Data-driven        │
│   • Expertise: Sociology, Tech, Movements   │
│                                              │
│   Notable Work:                             │
│   • Twitter and Tear Gas (Book)             │
│   • The Atlantic columns                    │
│   • NYT Opinion pieces                      │
│                                              │
│   Topics: Platforms, Algorithms, Protests   │
│                                              │
│   [Find them: Website | Twitter | ...]      │
│                                              │
│   ─────────────────────────────────────────│
│                                              │
│   [← Previous]  [Next Thinker →]           │
│   [Explore Topics]  [Change Discipline]     │
└─────────────────────────────────────────────┘
```

## Implementation Priority

### Phase 1 (MVP)
1. 10 disciplines defined
2. 3 starter thinkers per discipline (30 total)
3. Basic onboarding flow
4. Simple sequential discovery ("Next" button)
5. Static JSON data

### Phase 2 (Smart Discovery)
1. Track user journey (what they've seen)
2. Basic recommendation algorithm
3. Topic-based browsing
4. Cross-discipline connections

### Phase 3 (Personalization)
1. User accounts (optional)
2. Save favorites
3. Advanced recommendations based on reading patterns
4. Custom pacing preferences

## Disciplines & Starter Thinkers (Proposed)

### 1. Technology & Society
- **Zeynep Tufekci** - Technosociologist, platforms & power
- **Ethan Zuckerman** - Digital public spaces, civic tech
- **danah boyd** - Social media, youth culture, privacy

### 2. Philosophy
- **Kwame Anthony Appiah** - Ethics, identity, cosmopolitanism
- **Martha Nussbaum** - Capabilities approach, emotions, justice
- **Daniel Dennett** - Consciousness, free will, evolution

### 3. Economics & Systems
- **Mariana Mazzucato** - Innovation economics, public value
- **Kate Raworth** - Doughnut economics, ecological limits
- **Branko Milanović** - Inequality, global capitalism

### 4. Psychology & Mind
- **Lisa Feldman Barrett** - Emotions, neuroscience
- **Paul Bloom** - Empathy, morality, pleasure
- **Carol Dweck** - Growth mindset, motivation

### 5. Climate & Environment
- **Kate Marvel** - Climate scientist, communication
- **Ayana Elizabeth Johnson** - Marine biology, climate policy
- **Michael E. Mann** - Climate science, denialism

### 6. Politics & Power
- **Yascha Mounk** - Democracy, populism, identity
- **Anne Applebaum** - Authoritarianism, history, Eastern Europe
- **Francis Fukuyama** - Political order, democracy, identity

### 7. Science & Research
- **Sean Carroll** - Physics, cosmology, philosophy of science
- **Jennifer Doudna** - CRISPR, bioethics, gene editing
- **Carlo Rovelli** - Quantum gravity, time, science communication

### 8. Culture & Media
- **Jia Tolentino** - Internet culture, feminism, essays
- **Ta-Nehisi Coates** - Race, America, history, essays
- **Pankaj Mishra** - Globalization, modernity, literature

### 9. Justice & Rights
- **Bryan Stevenson** - Criminal justice, mass incarceration
- **Kimberlé Crenshaw** - Critical race theory, intersectionality
- **Albie Sachs** - Human rights, constitutional law

### 10. History & Civilization
- **Yuval Noah Harari** - Big history, human evolution, future
- **Jill Lepore** - American history, democracy, technology
- **Timothy Snyder** - Tyranny, freedom, Eastern Europe

---

## Notes on "Unbiased" Starting Points

These thinkers are chosen as starters because they:
1. **Are widely respected** across ideological lines
2. **Focus on evidence** and rigorous thinking
3. **Engage thoughtfully** with multiple perspectives
4. **Are accessible** to general audiences
5. **Have substantial bodies of work** that demonstrate their thinking

This doesn't mean they have no perspective (everyone does), but they're not primarily ideologues or activists—they're scholars and thinkers who prioritize understanding over advocacy.

After the user starts with one of these, we can introduce more diverse and potentially more opinionated voices, knowing they have a solid foundation.

---

**Last Updated**: 2025-10-01
**Version**: 2.0 (Discipline-based onboarding)

