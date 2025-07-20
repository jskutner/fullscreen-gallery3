'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-neutral-900 to-neutral-950 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
            Eko Gallery Platform
          </h1>
          <p className="text-xl text-neutral-300 mb-12 leading-relaxed">
            Experience interactive galleries powered by Eko technology. Choose between our 
            gallery showcase or create individual gallery experiences.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* Gallery Showcase */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="text-4xl mb-4">🎨</div>
              <h2 className="text-2xl font-semibold mb-4 group-hover:text-sky-400 transition-colors">
                Gallery Showcase
              </h2>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                Browse multiple galleries in a beautiful grid layout. Content managed dynamically 
                through Google Sheets - no code updates needed.
              </p>
              <Link 
                href="/galleries"
                className="inline-flex items-center justify-center w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
              >
                View Gallery Showcase
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Individual Gallery */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="text-4xl mb-4">⚙️</div>
              <h2 className="text-2xl font-semibold mb-4 group-hover:text-sky-400 transition-colors">
                Custom Gallery
              </h2>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                Configure and embed a single gallery with custom parameters. Perfect for 
                testing specific gallery configurations.
              </p>
              <Link 
                href="/gallery/form"
                className="inline-flex items-center justify-center w-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Configure Gallery
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mt-16 p-6 bg-neutral-800/30 rounded-xl border border-neutral-700">
            <h3 className="text-lg font-medium mb-3">🚀 Getting Started</h3>
            <p className="text-sm text-neutral-400">
              New to the platform? Check out the{' '}
              <Link href="/gallery-examples/simple.html" className="text-sky-400 hover:text-sky-300">
                gallery examples
              </Link>{' '}
              or read the{' '}
              <Link href="/GOOGLE_SHEETS_SETUP.md" className="text-sky-400 hover:text-sky-300">
                setup guide
              </Link>{' '}
              to configure your Google Sheets backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 