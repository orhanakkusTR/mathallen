import { useEffect } from 'react';

const BASE_URL = 'https://mathallen.nu';

export default function SEO({ 
  title, 
  description, 
  url
}) {
  useEffect(() => {
    // Update document title
    const siteTitle = 'Mathallen Malmö';
    if (title) {
      document.title = `${title} | ${siteTitle}`;
    } else {
      document.title = `${siteTitle} | Stormarknad i Skåne - Veckans Erbjudanden`;
    }
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description);
    }
    
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && url) {
      canonical.setAttribute('href', `${BASE_URL}${url}`);
    }
    
    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) {
      ogTitle.setAttribute('content', `${title} | Mathallen Malmö`);
    }
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) {
      ogDesc.setAttribute('content', description);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && url) {
      ogUrl.setAttribute('href', `${BASE_URL}${url}`);
    }
    
  }, [title, description, url]);

  return null; // This component doesn't render anything
}
