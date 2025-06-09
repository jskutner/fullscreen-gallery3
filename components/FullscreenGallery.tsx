import React, { useEffect, useCallback, useState } from 'react';
import { EkoGallery, getEkoProductConfigUrl, ekoWebPixel } from '@ekolabs/eko-gallery-react';
import '../app/globals.css';

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
        const configUrl = getEkoProductConfigUrl(scid);
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
          console.log('Original items:', productConfig.items);
          productConfig.items = productConfig.items.map((item: any) => {
            console.log('Processing item:', item);
            if (item.thumbnail) {
              // Extract the filename from the path
              const filename = item.thumbnail.split('/').pop();
              console.log('Original thumbnail path:', item.thumbnail);
              console.log('Extracted filename:', filename);
              // Update the path to use our thumbnails directory
              item.thumbnail = `/images/gallery-thumbnails/${filename}`;
              console.log('New thumbnail path:', item.thumbnail);
            }
            return item;
          });
          console.log('Updated items:', productConfig.items);
        }

        // Add required properties if they don't exist
        const galleryConfig = {
          ...productConfig,
          loadingTimeout: productConfig.loadingTimeout || 30000,
          piid,
          productId,
          scid
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
  }, [scid, productId, piid, isInitialized]);

  const onEkoGalleryEvent = useCallback((event: string, data: any) => {
    console.log(`*** Received Eko Event: ${event}
*** Payload: ${JSON.stringify(data)}`);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center text-white">
        Loading gallery...
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center text-white">
        {error || 'Failed to load gallery'}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <EkoGallery
        className="w-full h-full"
        config={config}
        variantId={productId}
        onEvent={onEkoGalleryEvent}
      />
    </div>
  );
} 