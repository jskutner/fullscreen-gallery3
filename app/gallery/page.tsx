import React, { Suspense } from 'react';
import GalleryPageClient from './GalleryPageClient';

export default function GalleryPage() {
  return (
    <Suspense fallback={<div style={{color: 'white', textAlign: 'center', marginTop: '2rem'}}>Loading...</div>}>
      <GalleryPageClient />
    </Suspense>
  );
} 