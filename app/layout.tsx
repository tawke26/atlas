import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Atlas - Discover Thinkers Worth Listening To',
  description: 'A curated platform for discovering thoughtful voices across disciplines',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                <a href="/" className="hover:text-gray-600 transition-colors">
                  Atlas
                </a>
              </h1>
              <nav>
                <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </a>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="border-t border-gray-200 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            <p>Discover thinkers worth listening to, one at a time.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

