export interface GalleryConfig {
  piid: string;
  productId: string;
  scid: string;
}

export const galleries: Record<string, GalleryConfig> = {
  'high-anxiety': {
    piid: 'f9bf5b29-89fa-45cf-9940-c6962825146f',
    productId: 'high-anxiety',
    scid: '71e2e7cb-eb18-4da9-a37b-6566557c8d1f'
  }
  // Add more galleries here as needed
}; 