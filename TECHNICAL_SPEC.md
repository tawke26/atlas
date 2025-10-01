# Technical Specification

## Database Schema (Phase 2+)

### PostgreSQL Schema

```sql
-- Thinkers Table
CREATE TABLE thinkers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  tagline TEXT NOT NULL,
  bio TEXT NOT NULL,
  
  -- Perspective
  stance TEXT,
  biases TEXT[], -- Array of bias strings
  expertise TEXT[], -- Array of expertise areas
  
  -- Visual
  illustration_url VARCHAR(500),
  color_palette TEXT[], -- Hex codes
  illustration_style VARCHAR(100),
  
  -- Meta
  curated_by VARCHAR(255),
  date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  
  -- Search
  search_vector tsvector, -- Full-text search
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Topics Table
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  illustration_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Themes Table (broader than topics)
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Thinker-Topic Junction (many-to-many)
CREATE TABLE thinker_topics (
  thinker_id UUID REFERENCES thinkers(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY (thinker_id, topic_id)
);

-- Thinker-Theme Junction
CREATE TABLE thinker_themes (
  thinker_id UUID REFERENCES thinkers(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  PRIMARY KEY (thinker_id, theme_id)
);

-- Topic Relations (topics that often appear together)
CREATE TABLE topic_relations (
  topic_a_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  topic_b_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  strength INTEGER DEFAULT 1, -- How often they appear together
  PRIMARY KEY (topic_a_id, topic_b_id)
);

-- Notable Work
CREATE TABLE notable_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thinker_id UUID REFERENCES thinkers(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  url VARCHAR(1000),
  work_type VARCHAR(50), -- article, book, podcast, video, project
  description TEXT,
  order_index INTEGER, -- For sorting
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Links
CREATE TABLE thinker_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thinker_id UUID REFERENCES thinkers(id) ON DELETE CASCADE,
  platform VARCHAR(100), -- website, twitter, substack, etc.
  url VARCHAR(1000) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users (Phase 2)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- User Collections
CREATE TABLE user_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  thinker_id UUID REFERENCES thinkers(id) ON DELETE CASCADE,
  discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  UNIQUE(user_id, thinker_id)
);

-- User Saved Topics
CREATE TABLE user_saved_topics (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, topic_id)
);

-- User Preferences
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  discovery_pace VARCHAR(20) DEFAULT 'weekly', -- weekly, biweekly, monthly
  email_updates BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Discovery History (analytics)
CREATE TABLE discovery_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  thinker_id UUID REFERENCES thinkers(id) ON DELETE CASCADE,
  event_type VARCHAR(50), -- viewed, saved, rated, shared
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_thinkers_slug ON thinkers(slug);
CREATE INDEX idx_thinkers_featured ON thinkers(featured) WHERE featured = TRUE;
CREATE INDEX idx_thinkers_published ON thinkers(published) WHERE published = TRUE;
CREATE INDEX idx_thinkers_search ON thinkers USING gin(search_vector);
CREATE INDEX idx_topics_slug ON topics(slug);
CREATE INDEX idx_user_collections_user ON user_collections(user_id);
CREATE INDEX idx_discovery_events_user ON discovery_events(user_id);
CREATE INDEX idx_discovery_events_created ON discovery_events(created_at);
```

---

## API Routes (Next.js App Router)

### Public Routes

#### `GET /api/thinkers`
Fetch all published thinkers (paginated)

**Query Params:**
- `page` (number): Page number
- `limit` (number): Items per page
- `topic` (string): Filter by topic slug
- `featured` (boolean): Filter featured only

**Response:**
```json
{
  "thinkers": [
    {
      "id": "uuid",
      "slug": "jane-doe",
      "name": "Jane Doe",
      "tagline": "Exploring AI ethics from a disability justice lens",
      "illustration": {
        "url": "/illustrations/jane-doe.svg",
        "palette": ["#FF6B6B", "#4ECDC4"]
      },
      "topics": ["AI Ethics", "Disability Justice"]
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "totalPages": 5
  }
}
```

---

#### `GET /api/thinkers/[slug]`
Fetch single thinker profile

**Response:**
```json
{
  "id": "uuid",
  "slug": "jane-doe",
  "name": "Jane Doe",
  "tagline": "...",
  "bio": "Full bio here...",
  "perspective": {
    "stance": "Believes AI development must center marginalized voices",
    "biases": ["Disability rights advocate", "Anti-corporatist"],
    "expertise": ["AI Ethics", "Disability Studies", "Tech Policy"]
  },
  "illustration": {
    "url": "/illustrations/jane-doe.svg",
    "palette": ["#FF6B6B", "#4ECDC4"],
    "style": "geometric-abstract"
  },
  "topics": [
    { "id": "uuid", "name": "AI Ethics", "slug": "ai-ethics" }
  ],
  "themes": [
    { "id": "uuid", "name": "Justice & Technology" }
  ],
  "notableWork": [
    {
      "title": "The Disability Dongle",
      "url": "https://...",
      "type": "article",
      "description": "Critique of accessibility theater in tech"
    }
  ],
  "links": {
    "website": "https://...",
    "twitter": "https://twitter.com/..."
  },
  "curatedBy": "Atlas Team",
  "dateAdded": "2025-01-15T00:00:00Z"
}
```

---

#### `GET /api/thinkers/random`
Get a random thinker for "today's discovery"

**Query Params:**
- `exclude` (string): Comma-separated slugs to exclude
- `topic` (string): Optionally filter by topic

**Response:** Same as single thinker response

---

#### `GET /api/topics`
List all topics with thinker counts

**Response:**
```json
{
  "topics": [
    {
      "id": "uuid",
      "name": "AI Ethics",
      "slug": "ai-ethics",
      "description": "...",
      "thinkerCount": 12,
      "relatedTopics": ["Technology", "Philosophy"]
    }
  ]
}
```

---

#### `GET /api/topics/[slug]`
Get topic with associated thinkers

**Response:**
```json
{
  "topic": {
    "id": "uuid",
    "name": "AI Ethics",
    "slug": "ai-ethics",
    "description": "..."
  },
  "thinkers": [
    // Array of thinker summaries
  ],
  "relatedTopics": [
    { "id": "uuid", "name": "Philosophy", "slug": "philosophy" }
  ]
}
```

---

### Authenticated Routes (Phase 2+)

#### `POST /api/collections/add`
Add thinker to user's collection

**Body:**
```json
{
  "thinkerId": "uuid",
  "notes": "Optional notes"
}
```

#### `GET /api/collections`
Get user's saved thinkers

#### `POST /api/collections/rate`
Rate a thinker (1-5)

#### `GET /api/recommendations`
Get personalized thinker recommendations based on collection

---

## File Structure for Phase 1 (JSON-based)

### Example Thinker File: `src/data/thinkers/jane-doe.json`

```json
{
  "id": "jane-doe",
  "slug": "jane-doe",
  "name": "Jane Doe",
  "tagline": "Exploring AI ethics from a disability justice lens",
  "bio": "Jane Doe is a researcher and advocate who centers disability justice in conversations about artificial intelligence. With a background in human-computer interaction and disability studies, she challenges the tech industry's approach to accessibility and questions who benefits from AI development.\n\nHer work examines how AI systems perpetuate ableism and proposes frameworks for more equitable technology design. She's particularly interested in how disabled communities are often treated as inspiration rather than collaborators.\n\nJane writes at the intersection of ethics, design, and justice, bringing a perspective that's simultaneously critical and constructive.",
  "perspective": {
    "stance": "AI development must center the voices and needs of disabled people, not treat them as an afterthought or inspiration",
    "biases": [
      "Disability rights advocate",
      "Skeptical of corporate tech ethics",
      "Anti-inspiration porn",
      "Pro-accessibility as baseline, not feature"
    ],
    "expertise": [
      "AI Ethics",
      "Disability Studies",
      "Human-Computer Interaction",
      "Tech Policy"
    ]
  },
  "illustration": {
    "primaryImage": "/illustrations/jane-doe.svg",
    "colorPalette": ["#FF6B6B", "#4ECDC4", "#95E1D3"],
    "style": "geometric-abstract"
  },
  "topics": ["ai-ethics", "disability-justice", "technology-critique"],
  "themes": ["justice", "technology", "inclusion"],
  "notableWork": [
    {
      "title": "The Disability Dongle",
      "url": "https://medium.com/...",
      "type": "article",
      "description": "A critique of accessibility theater in Silicon Valley"
    },
    {
      "title": "AI Isn't Accessible by Default",
      "url": "https://...",
      "type": "talk",
      "description": "Keynote on building inclusive AI systems"
    }
  ],
  "links": {
    "website": "https://janedoe.com",
    "twitter": "https://twitter.com/janedoe",
    "substack": null
  },
  "curatedBy": "Atlas Team",
  "dateAdded": "2025-01-15",
  "featured": true
}
```

---

### Example Topics File: `src/data/topics.json`

```json
{
  "topics": [
    {
      "id": "ai-ethics",
      "name": "AI Ethics",
      "slug": "ai-ethics",
      "description": "Critical examination of artificial intelligence's social, ethical, and political implications",
      "relatedTopics": ["technology-critique", "philosophy", "policy"],
      "illustration": "/illustrations/topics/ai-ethics.svg"
    },
    {
      "id": "disability-justice",
      "name": "Disability Justice",
      "slug": "disability-justice",
      "description": "Framework that understands disability as a political identity and centers the most marginalized",
      "relatedTopics": ["social-justice", "accessibility", "inclusion"]
    }
  ]
}
```

---

## Component Architecture

### Core Components

#### `ThinkerCard.tsx`
The main profile display component

**Props:**
```typescript
interface ThinkerCardProps {
  thinker: Thinker;
  variant?: 'full' | 'summary' | 'minimal';
  onNext?: () => void;
  onSave?: () => void;
}
```

**Variants:**
- `full`: Complete profile with all details
- `summary`: Bio + key info for topic pages
- `minimal`: Name, tagline, illustration for grids

---

#### `IllustrationViewer.tsx`
Displays thinker illustration with color palette

**Props:**
```typescript
interface IllustrationViewerProps {
  src: string;
  alt: string;
  palette?: string[];
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}
```

---

#### `BiasLabel.tsx`
Visual indicator for perspective/bias

**Props:**
```typescript
interface BiasLabelProps {
  bias: string;
  variant?: 'tag' | 'badge' | 'inline';
  color?: string;
}
```

---

#### `TopicExplorer.tsx`
Interactive topic browsing interface

**Features:**
- Visual grid of topics
- Filter by theme
- Show thinker count
- Related topic connections

---

## Data Fetching Patterns

### Phase 1: Static JSON

```typescript
// lib/thinkers.ts
import fs from 'fs';
import path from 'path';

const thinkersDirectory = path.join(process.cwd(), 'src/data/thinkers');

export function getAllThinkers(): Thinker[] {
  const filenames = fs.readdirSync(thinkersDirectory);
  
  return filenames
    .filter(name => name.endsWith('.json'))
    .map(filename => {
      const filePath = path.join(thinkersDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents) as Thinker;
    })
    .filter(t => t.published !== false); // Only published
}

export function getThinkerBySlug(slug: string): Thinker | null {
  try {
    const filePath = path.join(thinkersDirectory, `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
}

export function getThinkersByTopic(topicSlug: string): Thinker[] {
  const allThinkers = getAllThinkers();
  return allThinkers.filter(t => t.topics.includes(topicSlug));
}

export function getRandomThinker(excludeSlugs: string[] = []): Thinker {
  const thinkers = getAllThinkers()
    .filter(t => !excludeSlugs.includes(t.slug));
  
  return thinkers[Math.floor(Math.random() * thinkers.length)];
}

export function getFeaturedThinker(): Thinker | null {
  const featured = getAllThinkers().filter(t => t.featured);
  return featured.length > 0 ? featured[0] : null;
}
```

---

### Phase 2: Database with Prisma

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Thinker {
  id              String   @id @default(uuid())
  slug            String   @unique
  name            String
  tagline         String
  bio             String
  stance          String?
  biases          String[]
  expertise       String[]
  
  illustrationUrl String?
  colorPalette    String[]
  illustrationStyle String?
  
  topics          ThinkerTopic[]
  themes          ThinkerTheme[]
  notableWorks    NotableWork[]
  links           ThinkerLink[]
  
  curatedBy       String
  dateAdded       DateTime @default(now())
  featured        Boolean  @default(false)
  published       Boolean  @default(false)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([slug])
  @@index([featured])
}

model Topic {
  id          String   @id @default(uuid())
  slug        String   @unique
  name        String
  description String?
  thinkers    ThinkerTopic[]
  
  @@index([slug])
}

model ThinkerTopic {
  thinkerId String
  topicId   String
  thinker   Thinker @relation(fields: [thinkerId], references: [id])
  topic     Topic   @relation(fields: [topicId], references: [id])
  
  @@id([thinkerId, topicId])
}

// ... more models
```

---

## Recommendation Algorithm (Phase 3)

### Simple Content-Based Approach

```typescript
// lib/recommendations.ts
export function getRecommendations(
  userCollectionThinkerIds: string[],
  allThinkers: Thinker[]
): Thinker[] {
  // Get topics from user's collection
  const collectedThinkers = allThinkers
    .filter(t => userCollectionThinkerIds.includes(t.id));
  
  const topicCounts = new Map<string, number>();
  collectedThinkers.forEach(thinker => {
    thinker.topics.forEach(topic => {
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
    });
  });
  
  // Score uncollected thinkers by topic overlap
  const uncollected = allThinkers
    .filter(t => !userCollectionThinkerIds.includes(t.id));
  
  const scored = uncollected.map(thinker => {
    const score = thinker.topics.reduce((sum, topic) => {
      return sum + (topicCounts.get(topic) || 0);
    }, 0);
    
    return { thinker, score };
  });
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(s => s.thinker);
}
```

### Advanced: Semantic Similarity (Future)

- Use embeddings for bio text
- Compare vector similarity
- Find thinkers with similar "vibe"
- Consider using OpenAI embeddings or sentence-transformers

---

## Performance Considerations

### Phase 1 Optimizations
- Static generation for all thinker profiles
- Image optimization (Next.js Image component)
- SVG illustrations for crisp rendering
- Minimal JavaScript bundle

### Phase 2 Optimizations
- Database query optimization (proper indexes)
- Caching layer (Redis for frequently accessed data)
- CDN for static assets
- Lazy loading for topic grids

### Phase 3 Optimizations
- Background jobs for recommendation calculation
- Elasticsearch for advanced search
- Edge caching for personalized content
- WebSocket for real-time features (if needed)

---

## Security Considerations

### Data Protection
- Environment variables for secrets
- No API keys in client code
- Rate limiting on API routes
- Input validation and sanitization

### Authentication (Phase 2)
- Secure session management
- Email verification
- Password hashing (if not using magic links)
- CSRF protection

### Content Security
- Curator verification process
- Link validation (check for broken links)
- Content moderation guidelines
- Report/flag system for issues

---

## Testing Strategy

### Unit Tests
- Data fetching functions
- Recommendation algorithm
- Utility functions

### Integration Tests
- API routes
- Database operations
- Authentication flow

### E2E Tests (Playwright)
- User journey: discover → view → explore topics
- Collection management flow
- Search functionality

### Visual Regression Tests
- Component snapshots
- Illustration rendering
- Responsive design

---

## Deployment Pipeline

### CI/CD with GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Monitoring & Analytics

### Phase 1
- Vercel Analytics (built-in)
- Simple logging
- Error tracking (Sentry)

### Phase 2+
- User behavior tracking (privacy-focused)
- Discovery patterns
- Popular topics/thinkers
- Search query analysis
- Performance monitoring

---

**Last Updated**: 2025-09-30
**Version**: 1.0

