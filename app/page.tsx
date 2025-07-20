'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          background: linear-gradient(135deg, #0c4a6e 0%, #262626 50%, #0a0a0a 100%);
          color: white;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          min-height: 100vh;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 1rem;
        }
        .content-center {
          text-align: center;
          max-width: 64rem;
          margin: 0 auto;
        }
        .title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          background: linear-gradient(to right, #38bdf8, #3b82f6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .subtitle {
          font-size: 1.25rem;
          color: #d4d4d8;
          margin-bottom: 3rem;
          line-height: 1.6;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 4rem;
        }
        .card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s;
          cursor: pointer;
        }
        .card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          transition: color 0.3s;
        }
        .card:hover .card-title {
          color: #38bdf8;
        }
        .card-description {
          color: #a3a3a3;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          font-weight: 500;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }
        .button-primary {
          background: #0ea5e9;
          color: white;
        }
        .button-primary:hover {
          background: #0284c7;
          transform: scale(1.02);
        }
        .button-secondary {
          background: #525252;
          color: white;
        }
        .button-secondary:hover {
          background: #404040;
          transform: scale(1.02);
        }
        .getting-started {
          margin-top: 4rem;
          padding: 1.5rem;
          background: rgba(38, 38, 38, 0.3);
          border-radius: 0.75rem;
          border: 1px solid #525252;
        }
        .getting-started h3 {
          font-size: 1.125rem;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }
        .getting-started p {
          font-size: 0.875rem;
          color: #a3a3a3;
          margin: 0;
        }
        .link {
          color: #38bdf8;
          text-decoration: none;
        }
        .link:hover {
          color: #0ea5e9;
        }
        @media (min-width: 768px) {
          .title {
            font-size: 3.75rem;
          }
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
      <div className="container">
        <div className="content-center">
          <h1 className="title">
            Eko Gallery Platform
          </h1>
          <p className="subtitle">
            Experience interactive galleries powered by Eko technology. Choose between our 
            gallery showcase or create individual gallery experiences.
          </p>
          
          <div className="grid">
            {/* Gallery Showcase */}
            <div className="card">
              <div className="card-icon">🎨</div>
              <h2 className="card-title">
                Gallery Showcase
              </h2>
              <p className="card-description">
                Browse multiple galleries in a beautiful grid layout. Content managed dynamically 
                through Google Sheets - no code updates needed.
              </p>
              <Link 
                href="/galleries"
                className="button button-primary"
              >
                View Gallery Showcase
                <svg style={{width: '20px', height: '20px', marginLeft: '8px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Individual Gallery */}
            <div className="card">
              <div className="card-icon">⚙️</div>
              <h2 className="card-title">
                Custom Gallery
              </h2>
              <p className="card-description">
                Configure and embed a single gallery with custom parameters. Perfect for 
                testing specific gallery configurations.
              </p>
              <Link 
                href="/gallery/form"
                className="button button-secondary"
              >
                Configure Gallery
                <svg style={{width: '20px', height: '20px', marginLeft: '8px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="getting-started">
            <h3>🚀 Getting Started</h3>
            <p>
              New to the platform? Check out the{' '}
              <Link href="/gallery-examples/simple.html" className="link">
                gallery examples
              </Link>{' '}
              or read the{' '}
              <Link href="/GOOGLE_SHEETS_SETUP.md" className="link">
                setup guide
              </Link>{' '}
              to configure your Google Sheets backend.
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 