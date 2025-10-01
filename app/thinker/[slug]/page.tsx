import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getThinkerBySlug, getNextThinker, getDisciplineBySlug, getAllThinkers } from '@/lib/data';

export async function generateStaticParams() {
  const thinkers = getAllThinkers();
  return thinkers.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thinker = getThinkerBySlug(slug);
  
  if (!thinker) return {};
  
  return {
    title: `${thinker.name} - Atlas`,
    description: thinker.tagline,
  };
}

export default async function ThinkerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thinker = getThinkerBySlug(slug);
  
  if (!thinker) {
    notFound();
  }

  const discipline = getDisciplineBySlug(thinker.primaryDiscipline);
  const nextThinker = getNextThinker(thinker.slug);

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      {/* Header */}
      <div className="mb-12">
        {discipline && (
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: discipline.color }}
            />
            <span className="text-sm text-gray-600">{discipline.name}</span>
          </div>
        )}
        
        <h1 className="text-5xl font-bold mb-4">{thinker.name}</h1>
        <p className="text-2xl text-gray-700">{thinker.tagline}</p>
      </div>

      {/* Bio */}
      <div className="prose prose-lg max-w-none mb-12">
        {thinker.bio.split('\n\n').map((paragraph, i) => (
          <p key={i} className="mb-4">{paragraph}</p>
        ))}
      </div>

      {/* Perspective */}
      <div className="border-l-4 border-gray-300 pl-6 mb-12">
        <h2 className="text-xl font-bold mb-4">Perspective</h2>
        <div className="space-y-3">
          <div>
            <span className="font-medium text-gray-700">Stance:</span>
            <p className="text-gray-900 mt-1">{thinker.perspective.stance}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Approach:</span>
            <p className="text-gray-900 mt-1 capitalize">{thinker.perspective.approach}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Expertise:</span>
            <p className="text-gray-900 mt-1">{thinker.perspective.expertise.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Notable Work */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Notable Work</h2>
        <div className="space-y-4">
          {thinker.notableWork.map((work, i) => (
            <div key={i} className="border-l-2 border-gray-200 pl-4">
              {work.url ? (
                <a 
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-lg hover:text-gray-600 transition-colors"
                >
                  {work.title} ↗
                </a>
              ) : (
                <h3 className="font-medium text-lg">{work.title}</h3>
              )}
              <p className="text-sm text-gray-600 mb-1 capitalize">{work.type}</p>
              <p className="text-gray-700">{work.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Find them</h2>
        <div className="flex flex-wrap gap-4">
          {thinker.links.website && (
            <a
              href={thinker.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Website
            </a>
          )}
          {thinker.links.twitter && (
            <a
              href={thinker.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Twitter
            </a>
          )}
          {thinker.links.substack && (
            <a
              href={thinker.links.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Substack
            </a>
          )}
        </div>
      </div>

      {/* Discovery Navigation */}
      <div className="border-t border-gray-200 pt-8 mt-12">
        <div className="text-center mb-6">
          <p className="text-gray-600 text-lg mb-2">Where to next?</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-500 transition-all hover:shadow-md text-center min-w-[200px]"
          >
            <span className="block font-medium">Explore Disciplines</span>
            <span className="block text-sm text-gray-600 mt-1">Start a new path</span>
          </Link>
          
          {nextThinker && (
            <Link
              href={`/thinker/${nextThinker.slug}`}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:shadow-lg text-center min-w-[200px] font-medium"
            >
              <span className="block">Discover Next Thinker</span>
              <span className="block text-sm text-gray-300 mt-1">Continue your journey</span>
            </Link>
          )}
        </div>
        
        {nextThinker && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Next: {nextThinker.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

