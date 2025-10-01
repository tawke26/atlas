import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDisciplineBySlug, getStarterThinkers, getDisciplines } from '@/lib/data';

export async function generateStaticParams() {
  const disciplines = getDisciplines();
  return disciplines.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const discipline = getDisciplineBySlug(slug);
  
  if (!discipline) return {};
  
  return {
    title: `${discipline.name} - Atlas`,
    description: discipline.description,
  };
}

export default async function DisciplinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const discipline = getDisciplineBySlug(slug);
  
  if (!discipline) {
    notFound();
  }

  const starters = getStarterThinkers(discipline.id);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Link 
        href="/" 
        className="text-gray-600 hover:text-gray-900 mb-8 inline-block"
      >
        ← Back to disciplines
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: discipline.color }}
          />
          <h1 className="text-4xl font-bold">{discipline.name}</h1>
        </div>
        <p className="text-xl text-gray-600">{discipline.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Choose your starting point</h2>
        <p className="text-gray-600 text-lg">Each thinker offers a different lens into this field. Pick one that resonates.</p>
      </div>

      <div className="space-y-6">
        {starters.map((thinker, index) => (
          <Link
            key={thinker.id}
            href={`/thinker/${thinker.slug}`}
            className="block p-8 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-xl transition-all group hover:-translate-y-1 relative overflow-hidden"
          >
            <div 
              className="absolute top-0 right-0 text-9xl font-bold opacity-5 select-none"
              style={{ color: discipline.color }}
            >
              {index + 1}
            </div>
            <div className="relative flex gap-6 items-start">
              {thinker.photo && (
                <div className="flex-shrink-0">
                  <img 
                    src={thinker.photo} 
                    alt={thinker.name}
                    className="w-20 h-20 rounded-lg object-cover shadow-md"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">
                  {thinker.name}
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">{thinker.tagline}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="text-gray-600">
                    <span className="font-medium">Approach:</span> <span className="capitalize">{thinker.perspective.approach.replace('-', ' ')}</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Expertise:</span> {thinker.perspective.expertise.slice(0, 3).join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

