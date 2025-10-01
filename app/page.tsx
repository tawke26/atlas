import Link from 'next/link';

export const metadata = {
  title: 'Atlas - Explore Ideas Through Questions',
  description: 'A question-driven journey through diverse perspectives. Discover what great thinkers have to say about the big questions.',
};

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Hook */}
        <div className="space-y-4">
          <div className="text-sm uppercase tracking-widest text-gray-500 font-medium">
            A Question Worth Exploring
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Is social media making us more lonely or more connected?
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We've never been more "connected," yet loneliness is at an all-time high. 
            What's really happening to human connection in the digital age?
          </p>
        </div>

        {/* The Intrigue */}
        <div className="pt-8 pb-4">
          <p className="text-lg text-gray-700 max-w-xl mx-auto leading-relaxed">
            Four brilliant thinkers. Four completely different answers. 
            <span className="block mt-2 font-medium">Which perspective intrigues you most?</span>
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <Link
            href="/question/social-media-loneliness"
            className="inline-block px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:shadow-xl text-lg font-medium"
          >
            Explore the perspectives
          </Link>
        </div>

        {/* Secondary hint */}
        <div className="pt-12 text-sm text-gray-500">
          <p>No algorithms. No feed. Just ideas worth spending time with.</p>
        </div>
      </div>
    </main>
  );
}

