import { Helmet } from 'react-helmet-async';

const SEO_CONFIG = {
  siteName: 'Mathallen Malmö',
  siteUrl: 'https://mathallen.se',
  defaultImage: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1200',
  twitterHandle: '@mathallen',
};

export default function SEO({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  noindex = false 
}) {
  const fullTitle = title 
    ? `${title} | ${SEO_CONFIG.siteName}` 
    : `${SEO_CONFIG.siteName} | Din lokala stormarknad sedan 1985`;
  
  const metaDescription = description || 
    'Mathallen Malmö - Kvalitet, prisvärdhet och attraktiva veckokampanjer. Över 30.000 produkter i sortimentet. Öppet alla dagar 07-22.';
  
  const metaImage = image || SEO_CONFIG.defaultImage;
  const metaUrl = url ? `${SEO_CONFIG.siteUrl}${url}` : SEO_CONFIG.siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={metaUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content="sv_SE" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}
