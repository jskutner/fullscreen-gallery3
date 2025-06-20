import React, { useEffect, useCallback, useState, useRef } from 'react';
import { EkoGallery, getEkoProductConfigUrl, ekoWebPixel } from '@ekolabs/eko-gallery-react';
import { useSearchParams } from 'next/navigation';

interface FullscreenGalleryProps {
  piid: string;
  productId: string;
  scid: string;
}

export default function FullscreenGallery({ piid, productId, scid }: FullscreenGalleryProps) {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const navHeight = searchParams.get('navHeight');
  const cacheBusterParam = searchParams.get('ck');

  // Log the navHeight value when it changes
  useEffect(() => {
    console.log('Nav height from URL:', navHeight);
  }, [navHeight]);

  // Set nav container height when navHeight is present
  useEffect(() => {
    if (!navHeight) return;
    
    const height = parseInt(navHeight, 10);
    if (!isNaN(height)) {
      console.log('Setting nav container height to:', height);
      document.documentElement.style.setProperty('--nav-container-height', `${height}px`);
    }
  }, [navHeight]);

  // Initialize Eko Web Pixel
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        ekoWebPixel.init(process.env.NODE_ENV === 'production');
        setIsInitialized(true);
      } catch (err) {
        console.error('Error initializing Eko Web Pixel:', err);
      }
    }
  }, []);

  // Fetch config
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const configUrlBase = getEkoProductConfigUrl(scid);
        // Only add cache buster if present in URL
        let configUrl = configUrlBase;
        if (cacheBusterParam) {
          configUrl += (configUrlBase.includes('?') ? '&' : '?') + 'ck=' + encodeURIComponent(cacheBusterParam);
        }
        console.log('Fetching config from:', configUrl);
        
        const response = await fetch(configUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);

        if (!data.data || !data.data[productId]) {
          throw new Error(`Invalid response format: missing config for product ${productId}`);
        }

        // Get the config for this specific product
        const productConfig = data.data[productId];
        console.log('Original Product config:', productConfig);

        // Update image paths to use our thumbnails directory
        if (productConfig.items && Array.isArray(productConfig.items)) {
          productConfig.items = productConfig.items.map((item: any) => {
            if (item.thumbnail) {
              const filename = item.thumbnail.split('/').pop();
              item.thumbnail = `/images/gallery-thumbnails/${filename}`;
            }
            return item;
          });
        }

        // Create the final config object with all required properties
        const galleryConfig = {
          ...productConfig,
          loadingTimeout: productConfig.loadingTimeout || 30000,
          piid,
          productId,
          scid,
          publishItem: productConfig.publishItem || {},
          items: productConfig.items || []
        };

        console.log('Final gallery config:', galleryConfig);
        setConfig(galleryConfig);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching gallery config:', err);
        setError(`Failed to load gallery configuration: ${err?.message || 'Unknown error'}`);
        setLoading(false);
      }
    };

    if (isInitialized) {
      fetchConfig();
    }
  }, [scid, productId, piid, isInitialized, cacheBusterParam]);

  const onEkoGalleryEvent = useCallback((event: string, data: any) => {
    console.log(`*** Received Eko Event: ${event}\n*** Payload: ${JSON.stringify(data)}`);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center text-white">
        Loading gallery...
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center text-white">
        {error || 'Failed to load gallery'}
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black">
      <EkoGallery
        className="w-full h-full"
        config={config}
        variantId={productId}
        onEvent={onEkoGalleryEvent}
      />
    </div>
  );
}