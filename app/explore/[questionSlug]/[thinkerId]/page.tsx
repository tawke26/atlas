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
    const cleanContents = fileContents.replace(/^\uFEFF/, '');
    return JSON.parse(cleanContents);
  } catch (error) {
    return null;
  }
}

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    quote: 'Quote',
    blog: 'Blog Post',
    talk: 'Talk',
    interview: 'Interview',
    essay: 'Essay',
    book: 'Book Excerpt'
  };
  return labels[type] || type;
}

export default async function ExplorePage({ 
  params 
}: { 
  params: Promise<{ questionSlug: string; thinkerId: string }>
}) {
  const { questionSlug, thinkerId } = await params;
  const question = getQuestion(questionSlug);

  if (!question) {
    notFound();
  }

  const perspective = question.perspectives.find(
    p => p.thinkerId === thinkerId
  );

  if (!perspective) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link 
            href={`/question/${questionSlug}`}
            className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-flex items-center group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to perspectives
          </Link>
          
          <div className="space-y-3">
            <div className="text-sm uppercase tracking-widest text-gray-500 font-medium">
              {question.question}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {perspective.thinkerName}'s View
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              "{perspective.stance}"
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-xl leading-relaxed text-gray-700">
            {perspective.summary}
          </p>
        </div>

        {/* Excerpts */}
        <div className="space-y-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Explore the ideas</h2>
            <p className="text-gray-600">
              Here's what {perspective.thinkerName.split(' ')[0]} has said about this:
            </p>
          </div>

          {perspective.excerpts.map((excerpt, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-8 border border-gray-200"
            >
              {/* Type badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700 uppercase tracking-wide">
                  {getTypeLabel(excerpt.type)}
                </span>
                {excerpt.url && (
                  <a 
                    href={excerpt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    View source
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>

              <h3 className="text-xl font-bold mb-4">{excerpt.title}</h3>
              
              {/* The actual content */}
              <blockquote className="text-lg leading-relaxed text-gray-800 mb-4 pl-4 border-l-4 border-gray-300 italic">
                "{excerpt.text}"
              </blockquote>

              {/* Source */}
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Source:</span> {excerpt.source}
              </p>

              {/* Context */}
              {excerpt.context && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-medium text-gray-900">Why this matters:</span> {excerpt.context}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* What's next */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Where to next?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              You've explored one perspective on this question. Want to see how others think about it, 
              or dive into a new question?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href={`/question/${questionSlug}`}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-500 transition-all hover:shadow-md text-center min-w-[240px]"
              >
                <span className="block font-medium">See other perspectives</span>
                <span className="block text-sm text-gray-600 mt-1">on this question</span>
              </Link>
              
              <Link
                href="/"
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:shadow-lg text-center min-w-[240px] font-medium"
              >
                <span className="block">Explore new questions</span>
                <span className="block text-sm text-gray-300 mt-1">Continue your journey</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

