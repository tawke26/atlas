import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Thinker Not Found</h2>
      <p className="text-xl text-gray-600 mb-8">
        This thinker doesn't exist in our atlas yet. 
        Perhaps they're waiting to be discovered.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          ← Back to Disciplines
        </Link>
      </div>
    </div>
  );
}

