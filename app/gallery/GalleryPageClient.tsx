'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import FullscreenGallery from '../../components/FullscreenGallery';

export default function GalleryPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryConfig, setGalleryConfig] = useState<any>(null);
  const [formValues, setFormValues] = useState({
    piid: '',
    productId: '',
    scid: '',
    navHeight: '500'
  });

  useEffect(() => {
    // Get query parameters
    const queryPiid = searchParams.get('piid');
    const queryProductId = searchParams.get('productId');
    const queryScid = searchParams.get('scid');
    const queryNavHeight = searchParams.get('navHeight');

    // If all required query parameters are provided, use them
    if (queryPiid && queryProductId && queryScid) {
      setGalleryConfig({
        piid: queryPiid,
        productId: queryProductId,
        scid: queryScid
      });
      setIsLoading(false);
      return;
    }

    // If no query parameters, show form
    setIsLoading(false);
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { piid, productId, scid, navHeight } = formValues;
    
    // Build query string
    const queryString = new URLSearchParams({
      piid,
      productId,
      scid,
      ...(navHeight && { navHeight })
    }).toString();

    // Navigate to the same page with query parameters
    router.push(`/gallery?${queryString}`);
  };

  if (isLoading) {
    return <div style={{color: 'white', textAlign: 'center', marginTop: '2rem'}}>Loading...</div>;
  }

  if (error) {
    return <div style={{color: 'white', textAlign: 'center', marginTop: '2rem'}}>{error}</div>;
  }

  if (!galleryConfig) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex">
        <div style={{ width: '70%', height: '100vh', position: 'relative' }}>
          {/* Gallery placeholder (left) */}
          <span style={{ color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>Gallery Area (70%)</span>
        </div>
        <div className="column-right" style={{ width: '30%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Placeholder for right column content */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            width: '100%',
            maxWidth: '32rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: 'white',
              textAlign: 'center'
            }}>
              Eko Gallery 3<br></br>React Embed Configurator
            </h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="productId" style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#d1d5db',
                    marginBottom: '0.5rem'
                  }}>
                    Product ID
                  </label>
                  <input
                    type="text"
                    id="productId"
                    name="productId"
                    value={formValues.productId}
                    onChange={handleInputChange}
                    style={{
                      width: '93%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    placeholder="e.g., high-anxiety"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="piid" style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#d1d5db',
                    marginBottom: '0.5rem'
                  }}>
                    PIID
                  </label>
                  <input
                    type="text"
                    id="piid"
                    name="piid"
                    value={formValues.piid}
                    onChange={handleInputChange}
                    style={{
                      width: '93%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    placeholder="e.g., f9bf5b29-89fa-45cf-9940-c6962825146f"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="scid" style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#d1d5db',
                    marginBottom: '0.5rem'
                  }}>
                    SCID
                  </label>
                  <input
                    type="text"
                    id="scid"
                    name="scid"
                    value={formValues.scid}
                    onChange={handleInputChange}
                    style={{
                      width: '93%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    placeholder="e.g., 71e2e7cb-eb18-4da9-a37b-6566557c8d1f"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="navHeight" style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#d1d5db',
                    marginBottom: '0.5rem'
                  }}>
                    Navigation Height (px)
                  </label>
                  <input
                    type="number"
                    id="navHeight"
                    name="navHeight"
                    value={formValues.navHeight}
                    onChange={handleInputChange}
                    style={{
                      width: '93%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    placeholder="e.g., 500"
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'white',
                  color: 'black',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  transform: 'scale(1)',
                  opacity: 1
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseDown={e => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseUp={e => {
                  e.currentTarget.style.opacity = '0.9';
                }}
              >
                Load Gallery
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex">
      <div style={{ width: '70%', height: '100vh', position: 'relative' }}>
        <FullscreenGallery 
          piid={galleryConfig.piid}
          productId={galleryConfig.productId}
          scid={galleryConfig.scid}
        />
      </div>
      <div className="column-right" style={{ width: '30%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Placeholder for right column content */}
        <span style={{ color: 'white', fontSize: '1.2rem' }}>Right Column (30%)</span>
      </div>
    </div>
  );
} 