'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GalleryData, fetchGalleryDataFromPublicSheet } from '../../lib/googleSheets';

export default function GalleriesShowcase() {
  const [galleries, setGalleries] = useState<GalleryData[]>([]);
  const [filteredGalleries, setFilteredGalleries] = useState<GalleryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGallery, setSelectedGallery] = useState<GalleryData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadGalleries = async () => {
      try {
        const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '';
        
        if (!sheetId) {
          throw new Error('Google Sheet ID not configured');
        }

        console.log('Loading galleries from sheet:', sheetId);
        const galleryData = await fetchGalleryDataFromPublicSheet(sheetId);
        console.log('Loaded galleries:', galleryData);
        setGalleries(galleryData);
        setFilteredGalleries(galleryData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading galleries:', err);
        setError(err instanceof Error ? err.message : 'Failed to load galleries');
        setLoading(false);
      }
    };

    loadGalleries();
  }, []);

  useEffect(() => {
    const filtered = galleries.filter(gallery =>
      gallery.galleryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGalleries(filtered);
  }, [searchQuery, galleries]);

  const handleGalleryClick = (gallery: GalleryData) => {
    setSelectedGallery(gallery);
  };

  const closeModal = () => {
    setSelectedGallery(null);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedGallery) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedGallery]);

  const getGalleryUrl = (gallery: GalleryData) => {
    const params = new URLSearchParams({
      piid: gallery.piid,
      productId: gallery.productId,
      scid: gallery.scid
    });
    return `/gallery?${params.toString()}`;
  };

  if (loading) {
    return (
      <>
        <style jsx global>{`
          body {
            margin: 0;
            background: #0a0a0a;
            color: #f5f5f5;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }
          .loading-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0a0a0a;
          }
          .loading-content {
            text-align: center;
          }
          .spinner {
            width: 48px;
            height: 48px;
            border: 2px solid #404040;
            border-top: 2px solid #0ea5e9;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div className="loading-container">
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Loading galleries...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style jsx global>{`
          body {
            margin: 0;
            background: #0a0a0a;
            color: #f5f5f5;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }
          .error-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0a0a0a;
          }
          .error-content {
            text-align: center;
            max-width: 400px;
            padding: 1rem;
          }
          .error-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
          .error-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .error-message {
            color: #a3a3a3;
            margin-bottom: 1.5rem;
          }
          .retry-button {
            background: #0ea5e9;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.2s;
          }
          .retry-button:hover {
            background: #0284c7;
          }
        `}</style>
        <div className="error-container">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Error Loading Galleries</h2>
            <p className="error-message">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          background: #0a0a0a;
          color: #f5f5f5;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          line-height: 1.6;
        }
        
        .container {
          min-height: 100vh;
          background: #0a0a0a;
        }
        
        .header {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 2.5rem 1rem 1.5rem 1rem;
        }
        
        .header-flex {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .back-button {
          margin-right: 1rem;
          padding: 0.5rem;
          color: #a3a3a3;
          text-decoration: none;
          border-radius: 0.375rem;
          transition: color 0.2s;
        }
        
        .back-button:hover {
          color: #f5f5f5;
        }
        
        .title {
          font-size: 2.25rem;
          font-weight: 600;
          letter-spacing: -0.025em;
          margin: 0;
        }
        
        .search-container {
          position: relative;
        }
        
        .search-input {
          width: 100%;
          background: rgba(23, 23, 23, 0.7);
          border: 1px solid #404040;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem 0.75rem 3rem;
          color: #f5f5f5;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        
        .search-input::placeholder {
          color: #737373;
        }
        
        .search-input:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.6);
        }
        
        .search-icon {
          position: absolute;
          top: 50%;
          left: 1rem;
          transform: translateY(-50%);
          color: #737373;
          pointer-events: none;
        }
        
        .main-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem 5rem 1rem;
        }
        
        .test-section {
          background: #171717;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .test-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .test-description {
          color: #a3a3a3;
          margin-bottom: 1rem;
        }
        
        .env-display {
          background: #262626;
          padding: 0.5rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
          margin-left: 0.5rem;
          font-size: 0.875rem;
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .gallery-card {
          cursor: pointer;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid #404040;
          transition: border-color 0.3s, transform 0.2s;
          background: #171717;
        }
        
        .gallery-card:hover {
          border-color: #525252;
          transform: translateY(-2px);
        }
        
        .image-container {
          position: relative;
          overflow: hidden;
        }
        
        .gallery-image {
          width: 100%;
          height: 192px;
          object-fit: cover;
          transition: transform 0.3s;
        }
        
        .gallery-card:hover .gallery-image {
          transform: scale(1.04);
        }
        
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          transition: background 0.3s;
        }
        
        .gallery-card:hover .overlay {
          background: rgba(0, 0, 0, 0.1);
        }
        
        .card-content {
          padding: 0.75rem 1rem 1rem 1rem;
        }
        
        .gallery-name {
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: -0.025em;
          color: #d4d4d4;
          margin: 0 0 0.25rem 0;
          transition: color 0.2s;
        }
        
        .gallery-card:hover .gallery-name {
          color: #f5f5f5;
        }
        
        .product-id {
          font-size: 0.75rem;
          color: #737373;
          margin: 0;
        }
        
                 @keyframes fadeIn {
           from {
             opacity: 0;
             transform: translateY(12px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }
         
         .gallery-card {
           animation: fadeIn 0.6s ease-out both;
         }
         
         .modal-overlay {
           position: fixed;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           background: rgba(0, 0, 0, 0.8);
           backdrop-filter: blur(4px);
           display: flex;
           align-items: center;
           justify-content: center;
           z-index: 1000;
         }
         
         .modal-container {
           position: relative;
           width: 503px;
           height: 670px;
           background: #171717;
           border-radius: 12px;
           border: 1px solid #404040;
           overflow: hidden;
           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
           animation: modalFadeIn 0.3s ease-out;
         }
         
         .modal-header {
           display: flex;
           align-items: center;
           justify-content: space-between;
           padding: 1rem;
           background: #262626;
           border-bottom: 1px solid #404040;
         }
         
         .modal-title {
           font-size: 1rem;
           font-weight: 600;
           margin: 0;
           color: #f5f5f5;
         }
         
         .modal-close {
           background: none;
           border: none;
           color: #a3a3a3;
           cursor: pointer;
           padding: 0.5rem;
           border-radius: 0.25rem;
           transition: color 0.2s, background-color 0.2s;
         }
         
         .modal-close:hover {
           color: #f5f5f5;
           background: #404040;
         }
         
         .modal-content {
           width: 503px;
           height: 610px; /* Total height minus header */
           overflow-x: hidden;
           overflow-y: hidden;
         }
         
         .gallery-iframe {
           width: 1000px;
           height: 610px;
           border: none;
           display: block;
         }
         
         @keyframes modalFadeIn {
           from {
             opacity: 0;
             transform: scale(0.95) translateY(-20px);
           }
           to {
             opacity: 1;
             transform: scale(1) translateY(0);
           }
         }
         
         @media (max-width: 768px) {
           .header {
             padding: 2rem 1rem 1rem 1rem;
           }
           
           .title {
             font-size: 1.875rem;
           }
           
           .gallery-grid {
             grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
             gap: 1rem;
           }
           
           .modal-container {
             width: 95vw;
             height: 80vh;
             max-width: 500px;
             max-height: 670px;
           }
           
           .modal-content {
             width: 100%;
             height: calc(100% - 60px);
           }
           
           .gallery-iframe {
             width: 200%;
             height: 100%;
           }
         }
      `}</style>
      
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-flex">
            <Link href="/" className="back-button" title="Back to home">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="title">
              Eko Gallery Showcase
            </h1>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search galleries…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </header>

        {/* Gallery Content */}
        <main className="main-content">
          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredGalleries.map((gallery, index) => (
              <div
                key={`${gallery.productId}-${index}`}
                onClick={() => handleGalleryClick(gallery)}
                className="gallery-card"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="image-container">
                  <img
                    src={gallery.thumbnailImage || '/api/placeholder/400/192'}
                    alt={gallery.galleryName}
                    className="gallery-image"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/400/192';
                    }}
                  />
                  <div className="overlay"></div>
                </div>
                <div className="card-content">
                  <p className="gallery-name">
                    {gallery.galleryName}
                  </p>
                  <p className="product-id">
                    {gallery.productId}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredGalleries.length === 0 && !loading && (
            <div style={{
              textAlign: 'center',
              padding: '5rem 1rem',
              color: '#a3a3a3'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem', color: '#f5f5f5' }}>
                No galleries found
              </h3>
              <p>
                {searchQuery ? 'Try adjusting your search terms' : 'No galleries available'}
              </p>
            </div>
                     )}
        </main>
      </div>

      {/* Gallery Modal */}
      {selectedGallery && (
        <div 
          className="modal-overlay"
          onClick={closeModal}
        >
          <div 
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">{selectedGallery.galleryName}</h3>
              <button
                onClick={closeModal}
                className="modal-close"
                title="Close gallery"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-content">
              <iframe
                src={getGalleryUrl(selectedGallery)}
                className="gallery-iframe"
                title={selectedGallery.galleryName}
                allow="fullscreen"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 