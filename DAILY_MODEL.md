# Atlas: One Question Per Day Model

## ✅ What's Been Built

### Core System
- **Daily rotation engine** - Questions automatically rotate based on date
- **4 complete questions** with rich perspectives and real content
- **Tomorrow's preview** - Teaser shown after exploring perspectives
- **Dynamic homepage** - Shows today's question automatically

### The Questions We Have

1. **Is social media making us more lonely or more connected?**
   - Perspectives: Sherry Turkle, danah boyd, Cal Newport, Ethan Zuckerman
   
2. **Is AI making us smarter or just better at faking it?**
   - Perspectives: Gary Marcus, Andy Matuschak, Ethan Mollick, Paul Bloom

3. **Can capitalism solve climate change, or is it the problem?**
   - Perspectives: Kate Raworth, Mariana Mazzucato, Alex Epstein, Naomi Klein

4. **Is democracy in crisis, or just evolving?**
   - Perspectives: Yascha Mounk, Francis Fukuyama, Timothy Snyder

### The User Experience

1. **Land on homepage**
   - See "Today's Question" with hook
   - One CTA: "Explore the perspectives"

2. **Choose a perspective**
   - See 3-4 different thinker stances
   - Pick the one that intrigues you

3. **Read real content**
   - Quotes from their books
   - TED talk excerpts
   - Essays and blog posts
   - Source citations

4. **See tomorrow's teaser**
   - "Tomorrow's question: ..."
   - Builds anticipation to return

5. **Compare or return**
   - Option to see other perspectives
   - Or return to today's question

## 🔄 How The Rotation Works

```
Current Date → Days Since Jan 1, 2025 → Modulo Question Count → Today's Question
```

Example:
- Jan 1, 2025 = Day 0 → Question 1 (social media)
- Jan 2, 2025 = Day 1 → Question 2 (AI)
- Jan 3, 2025 = Day 2 → Question 3 (capitalism/climate)
- Jan 4, 2025 = Day 3 → Question 4 (democracy)
- Jan 5, 2025 = Day 4 → Back to Question 1

With 4 questions, it cycles every 4 days. Add more questions, and the cycle extends.

## 📊 Current Status

**Questions**: 4 complete (need 10-15 for good rotation)
**Features**: ✅ Daily rotation, ✅ Tomorrow preview, ⏳ Archive page

## 🎯 Next Steps

### Priority 1: Add More Questions (6-11 more)
Create questions on:
- Does education need to be redesigned for AI?
- Is inequality inevitable in capitalism?
- Can we have free speech and online safety?
- Is objectivity possible in journalism?
- Should we trust experts?
- Is progress real or an illusion?
- Can technology make us happier?
- etc.

### Priority 2: Build Archive Page
- `/archive` route
- Shows last 30 days of questions
- Let users catch up on missed questions
- Could add "bookmarks" feature later

### Priority 3: Polish About Page
Explain:
- Why one question per day
- How we choose questions
- What makes perspectives worth reading
- The anti-algorithm philosophy

### Priority 4: Launch & Iterate
- Deploy to Vercel
- Share with early users
- Track which questions resonate
- Add more based on feedback

## 🎨 Design Philosophy

### Why One Question Per Day Works:

1. **Creates a ritual** - Like morning coffee or evening news
2. **Respects attention** - No endless scrolling
3. **Encourages depth** - Spend real time with ideas
4. **Builds anticipation** - "What's tomorrow's question?"
5. **Sustainable content** - 10-15 questions = weeks of unique content
6. **Natural pacing** - Matches how people actually think

### What Makes This Different:

**Not**: Another content feed, viral takes, echo chambers
**Is**: Thoughtful disagreement, real sources, slow thinking

**Not**: Algorithm-driven, personalized, engagement-optimized
**Is**: Same question for everyone, human-curated, time-bounded

**Not**: Gamified learning, progress bars, achievements
**Is**: Intrinsic curiosity, genuine interest, optional exploration

## 🚀 Technical Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- JSON files for questions
- Date-based rotation logic
- No database needed (yet)

## 📝 Content Guidelines

Each question should:
1. Be genuinely provocative (no obvious answer)
2. Have 3-4 truly different perspectives (not variations)
3. Include real content (quotes, not summaries)
4. Cite sources (with links when possible)
5. Add context (why this excerpt matters)

## 💡 Future Ideas

- Email reminders for tomorrow's question
- "Save for later" bookmarking
- Share specific perspectives on social
- Themed weeks (e.g., "AI Week", "Climate Week")
- Community submitted questions
- Thinker profiles (link back to old system)
- RSS feed of daily questions

---

**Atlas is now a daily intellectual ritual, not a browsing experience.**

One question. Multiple perspectives. Come back tomorrow.

