// New type system for question-driven discovery

export interface ContentExcerpt {
  type: 'quote' | 'blog' | 'talk' | 'interview' | 'essay';
  title: string;
  text: string;
  source: string;
  url?: string;
  context?: string; // Why this matters
}

export interface ThinkerPerspective {
  thinkerId: string;
  thinkerName: string;
  stance: string; // One-line position on this question
  summary: string; // 2-3 sentence summary of their view
  excerpts: ContentExcerpt[]; // Actual content from their work
  learningPath?: string; // What question this unlocks next
}

export interface Question {
  id: string;
  slug: string;
  question: string; // The provocative question
  hook: string; // Why this question matters - the intrigue
  context?: string; // Background info if needed
  perspectives: ThinkerPerspective[]; // 3-4 different takes
  relatedQuestions?: string[]; // Question IDs that unlock after exploring this
  difficulty?: 'starter' | 'intermediate' | 'advanced';
  tags?: string[]; // For discovery
}

export interface UserProgress {
  exploredQuestions: Set<string>;
  exploredPerspectives: Map<string, string[]>; // questionId -> thinkerIds
  unlockedQuestions: Set<string>;
  currentPath: string[]; // Breadcrumb of their journey
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  questions: string[]; // Ordered question IDs
  theme?: string;
}

