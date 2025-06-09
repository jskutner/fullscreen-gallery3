'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import FullscreenGallery from '../../../components/FullscreenGallery';
import { galleries } from '../../config/galleries';

export default function GalleryPage() {
  const params = useParams();
  const productId = params.productId as string;
  
  const galleryConfig = galleries[productId];
  
  if (!galleryConfig) {
    return <div>Gallery not found</div>;
  }

  return (
    <FullscreenGallery 
      piid={galleryConfig.piid}
      productId={galleryConfig.productId}
      scid={galleryConfig.scid}
    />
  );
} 