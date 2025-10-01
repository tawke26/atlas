import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* The Question */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-4">
            The Question
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {question.question}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {question.hook}
          </p>
        </div>

        {/* The Choice */}
        <div className="mb-12 text-center">
          <p className="text-lg text-gray-700 font-medium">
            Choose the perspective that intrigues you most
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Each offers a different lens on this question
          </p>
        </div>

        {/* Perspective Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {question.perspectives.map((perspective, index) => (
            <Link
              key={perspective.thinkerId}
              href={`/explore/${question.slug}/${perspective.thinkerId}`}
              className="block bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all group relative overflow-hidden"
            >
              {/* Number indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg">
                {index + 1}
              </div>

              {/* Content */}
              <div className="pr-12">
                <h3 className="text-xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
                  {perspective.thinkerName}
                </h3>
                <p className="text-lg font-medium text-gray-900 mb-4 leading-snug">
                  "{perspective.stance}"
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {perspective.summary}
                </p>
                
                <div className="mt-6 flex items-center text-sm font-medium text-gray-900 group-hover:translate-x-2 transition-transform">
                  Explore this view
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Context note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Don't worry about making the "right" choice. Each perspective leads to different ideas 
            and unlocks new questions to explore.
          </p>
        </div>
      </div>
    </div>
  );
}

