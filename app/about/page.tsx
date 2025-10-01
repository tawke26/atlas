import Link from 'next/link';

export const metadata = {
  title: 'About Atlas - Discover Thinkers Worth Listening To',
  description: 'Learn about our mission to bring back genuine discovery on the internet',
};

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Link 
        href="/" 
        className="text-gray-600 hover:text-gray-900 mb-8 inline-block"
      >
        ← Back to home
      </Link>

      <h1 className="text-5xl font-bold mb-8">About Atlas</h1>

      <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem</h2>
          <p>
            The internet used to feel like discovery. Now it feels like you're being fed. 
            The same voices, optimized for engagement, pushed through algorithms that don't 
            care about depth or substance.
          </p>
          <p>
            We're drowning in content but starving for genuine intellectual nourishment. 
            The thinkers who make you stop and reconsider—who aren't optimized for virality 
            but have something real to say—are harder than ever to find.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
          <p>
            Atlas is different. We present <strong>one thinker at a time</strong>, 
            with no infinite scroll, no engagement metrics, no algorithmic manipulation.
          </p>
          <p>
            Each profile tells you who they are, what they believe, where their biases lie, 
            and why their work matters. We're not pretending to be "neutral"—we're being 
            honest about perspectives.
          </p>
          <p>
            You choose a discipline that interests you. You meet three starting points. 
            Then you discover one person at a time, building your own atlas of voices 
            worth listening to.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Principles</h2>
          <ul className="space-y-3">
            <li>
              <strong>Paced Discovery</strong> — One person at a time, thoughtfully presented
            </li>
            <li>
              <strong>Transparent Perspectives</strong> — Clear about stance, approach, and expertise
            </li>
            <li>
              <strong>Deep Curation</strong> — Quality over virality, substance over optimization
            </li>
            <li>
              <strong>Respect for Attention</strong> — No dark patterns, no manipulation
            </li>
            <li>
              <strong>Genuine Diversity</strong> — Perspectives across disciplines and worldviews
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Gets Included?</h2>
          <p>
            We look for thinkers who:
          </p>
          <ul className="space-y-2">
            <li>Have a clear, well-developed perspective</li>
            <li>Think deeply about specific questions</li>
            <li>Produce substantial work (books, research, essays)</li>
            <li>Are honest about their stance and biases</li>
            <li>Aren't necessarily famous, but are worth knowing</li>
          </ul>
          <p>
            We aim for intellectual diversity—not just political balance, but genuine 
            variety in how people think, what questions they ask, and what methods they use.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why "Atlas"?</h2>
          <p>
            An atlas is a collection that helps you navigate—it shows terrain, connections, 
            relationships between places. This platform is an atlas of thinkers: a map of 
            perspectives that helps you navigate the intellectual landscape.
          </p>
          <p>
            Like a geographic atlas, it's meant to be explored slowly, to be returned to, 
            to reveal patterns and connections over time.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Next?</h2>
          <p>
            This is just the beginning. We're starting with 30 carefully curated thinkers 
            across 10 disciplines. As we grow, we'll add more voices, more ways to explore, 
            and more ways to discover unexpected connections.
          </p>
          <p>
            But the core will never change: thoughtful introductions to people worth listening to, 
            one at a time, with no manipulation and no rush.
          </p>
        </section>

        <div className="border-t border-gray-200 pt-8 mt-12">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Start Discovering →
          </Link>
        </div>
      </div>
    </div>
  );
}

