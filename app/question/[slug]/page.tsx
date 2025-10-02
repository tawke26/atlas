import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import PathwayVisualization from '@/components/PathwayVisualization';

interface ContentExcerpt {
  type: 'quote' | 'blog' | 'talk' | 'interview' | 'essay' | 'book';
  title: string;
  text: string;
  source: string;
  url?: string;
  context?: string;
}

interface ThinkerPerspective {
  thinkerId: string;
  thinkerName: string;
  stance: string;
  summary: string;
  excerpts: ContentExcerpt[];
  learningPath?: string;
}

interface Question {
  id: string;
  slug: string;
  question: string;
  hook: string;
  context?: string;
  perspectives: ThinkerPerspective[];
  relatedQuestions?: string[];
  difficulty?: 'starter' | 'intermediate' | 'advanced';
  tags?: string[];
}

function getQuestion(slug: string): Question | null {
  try {
    const filePath = path.join(process.cwd(), 'data', 'questions', `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    // Remove BOM if present
    const cleanContents = fileContents.replace(/^\uFEFF/, '');
    return JSON.parse(cleanContents);
  } catch (error) {
    return null;
  }
}

export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = getQuestion(slug);

  if (!question) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <PathwayVisualization 
        questionSlug={question.slug}
        questionText={question.question}
        perspectives={question.perspectives}
      />
    </div>
  );
}

