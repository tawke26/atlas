import Link from 'next/link';
import { getTodaysQuestion } from '@/lib/daily-question';

export const metadata = {
  title: 'Atlas - One Question A Day',
  description: 'One provocative question each day. Multiple perspectives. Real ideas worth your time.',
};

export default function Home() {
  const todaysQuestion = getTodaysQuestion();

  if (!todaysQuestion) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-gray-600">Loading today's question...</p>
        </div>
      </main>
    );
  }

  const perspectiveCount = todaysQuestion.perspectives.length;

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Hook */}
        <div className="space-y-4">
          <div className="text-sm uppercase tracking-widest text-gray-500 font-medium">
            Today's Question
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {todaysQuestion.question}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {todaysQuestion.hook}
          </p>
        </div>

        {/* The Intrigue */}
        <div className="pt-8 pb-4">
          <p className="text-lg text-gray-700 max-w-xl mx-auto leading-relaxed">
            {perspectiveCount} brilliant thinkers. {perspectiveCount} completely different answers. 
            <span className="block mt-2 font-medium">Which perspective intrigues you most?</span>
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <Link
            href={`/question/${todaysQuestion.slug}`}
            className="inline-block px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:shadow-xl text-lg font-medium"
          >
            Explore the perspectives
          </Link>
        </div>

        {/* Secondary hint */}
        <div className="pt-12 space-y-2">
          <p className="text-sm text-gray-500">One question per day. No algorithms. No feed.</p>
          <p className="text-sm text-gray-500">Just ideas worth spending time with.</p>
        </div>
      </div>
    </main>
  );
}

