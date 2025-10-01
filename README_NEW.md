# Atlas - Question-Driven Discovery Platform

> A learning experience like slowly getting into an interesting lecture

## 🎯 What We've Built

Atlas has been completely reimagined from a rigid directory of thinkers into a **question-driven learning journey**. Instead of browsing profiles, users now:

1. **Start with a provocative question** that hooks their curiosity
2. **See 4 diverse perspectives** from different thinkers
3. **Dive deep into actual content** - quotes, essays, talks, blog posts
4. **Continue their journey** by exploring related questions

## 🚀 The New Experience

### Landing Page (`/`)
- Opens with an immediately engaging question: *"Is social media making us more lonely or more connected?"*
- Sets the hook: Why this question matters
- One clear CTA: "Explore the perspectives"

### Question Page (`/question/[slug]`)
- Shows the provocative question prominently
- Displays 4 different thinker perspectives as cards:
  - **Sherry Turkle**: "Technology promises connection but delivers isolation"
  - **danah boyd**: "It's not the technology—it's how society structures teen life"
  - **Cal Newport**: "Digital minimalism: solitude and real conversation are essential"
  - **Ethan Zuckerman**: "The problem is corporate control, not digital connection itself"
- User picks which perspective intrigues them most

### Exploration Page (`/explore/[questionSlug]/[thinkerId]`)
- Deep dive into that thinker's view
- **Actual content**: Real quotes from their books, TED talks, essays
- Each excerpt includes:
  - The quote/excerpt text
  - Source citation (with links when available)
  - Context: Why this matters
- Navigation to explore other perspectives or new questions

## 📊 Current Content

### Questions
- **1 complete question** with 4 rich perspectives and real content excerpts
- Ready to add more questions to create a learning pathway

### Thinkers
- **30 thinker profiles** across 10 disciplines (legacy data)
- **4 thinkers** with deep content in the new format:
  - Sherry Turkle (MIT, technology & psychology)
  - danah boyd (social media researcher)
  - Cal Newport (digital minimalism advocate)
  - Ethan Zuckerman (internet pioneer & critic)

## 🎮 What Makes It Different

### Not a Directory
- No browsing lists of people
- No rigid categories
- No "next thinker" button sequence

### A Learning Journey
- **Questions** drive discovery, not profiles
- **Conflicting perspectives** create engagement
- **Real content** makes it feel like learning, not browsing
- **Curiosity-driven navigation** - explore what interests you

### Like a Lecture
- Starts with a hook (the question)
- Presents multiple viewpoints (the perspectives)
- Provides depth (the excerpts and sources)
- Leaves you thinking (related questions)

## 🏗️ Architecture

### New Data Model
```typescript
Question {
  question: string       // The provocative question
  hook: string          // Why it matters
  perspectives: [       // 3-4 different takes
    {
      thinkerName
      stance           // One-line position
      summary          // 2-3 sentence overview
      excerpts: [      // Actual content!
        {
          type: 'quote' | 'talk' | 'blog' | 'essay' | 'book'
          title
          text
          source
          url
          context      // Why this matters
        }
      ]
    }
  ]
  relatedQuestions: [] // What to explore next
}
```

### Routes
- `/` - Landing with first question hook
- `/question/[slug]` - Question with perspective choices
- `/explore/[questionSlug]/[thinkerId]` - Deep dive into content

## 🔮 Next Steps to Complete the MVP

### 1. Add More Questions (Essential)
Create 5-10 more questions covering different themes:
- "Is AI making us smarter or lazier?"
- "Can capitalism solve climate change?"
- "Is democracy in crisis or just evolving?"
- "Does social media radicalize people?"
- etc.

Each needs 3-4 perspectives with real content excerpts.

### 2. Add Progression System
- Track which questions user explored
- Unlock related questions based on journey
- Show a "path" visualization of their learning

### 3. Improve Content Discovery
- After exploring a perspective, suggest:
  - Other perspectives on same question
  - Related questions this unlocks
  - Questions from same thinker on different topics

### 4. Add "Pathways"
- Curated sequences of questions on a theme
- e.g., "Technology & Society" pathway with 5 questions
- Gives structure for users who want guidance

## 💡 Why This Works

### Engagement Through Questions
Questions are inherently more engaging than "Browse thinkers". They:
- Create curiosity ("Wait, what's the answer?")
- Feel relevant ("I've wondered about this")
- Invite multiple viewpoints (no single "correct" answer)

### Real Content > Bios
Actual quotes, essays, and talks are:
- More substantive than taglines
- Give a real sense of the thinker's style
- Make learning feel genuine, not gamified
- Build credibility

### Non-Linear Discovery
Users can:
- Jump between questions
- Compare perspectives
- Follow their curiosity
- Create their own learning path

This feels more like real intellectual exploration than a rigid tutorial.

## 🛠️ Tech Stack
- **Next.js 15** - App Router with server components
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **JSON data files** - Questions and perspectives stored as JSON

## 📦 Getting Started

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## 🎨 Design Philosophy

- **Clarity over decoration** - Clean typography, lots of whitespace
- **Content-first** - The ideas are the star, not the interface
- **Thoughtful pacing** - One question at a time, inviting depth
- **Respectful of attention** - No infinite scroll, no algorithmic feed

## 📝 Content Guidelines

When adding new questions:
1. **Make them genuinely provocative** - No obvious answers
2. **Find real conflicting views** - Not just slight variations
3. **Use actual content** - Quote their books, talks, essays
4. **Include context** - Why does this excerpt matter?
5. **Link to sources** - Let users go deeper if they want

---

**This is Atlas v2.0** - A question-driven learning experience that respects your curiosity and time.

