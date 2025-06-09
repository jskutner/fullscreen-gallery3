declare module '@ekolabs/eko-gallery-react' {
  export const EkoGallery: React.FC<{
    className?: string;
    config: any;
    variantId?: string;
    onEvent?: (event: string, data: any) => void;
  }>;

  export const getEkoProductConfigUrl: (scid: string) => string;
  
  export const getEkoAnalyticsSnippet: (isProduction: boolean) => string;
  
  export const ekoWebPixel: {
    init: (isProduction: boolean) => void;
    onRouteChanged: () => void;
    track: (event: string, data?: any) => void;
  };
} 