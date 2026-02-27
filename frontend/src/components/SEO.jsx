import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://mathallen.nu';
const DEFAULT_IMAGE = 'https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/3458r0m2_logo-mat.png';

export default function SEO({ 
  title, 
  description, 
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noindex = false,
  structuredData = null
}) {
  const fullTitle = title 
    ? `${title} | Mathallen Malmö` 
    : 'Mathallen Malmö | Stormarknad i Skåne - Veckans Erbjudanden';
  
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  
  const defaultDescription = 'Mathallen Malmö - Skånes största stormarknad med över 45.000 produkter. Färska varor, bästa priserna och nya veckokampanjer varje vecka. Öppet 07-22 alla dagar.';
  
  const metaDescription = description || defaultDescription;
  
  const defaultKeywords = 'Mathallen Malmö, stormarknad Malmö, stormarknad Skåne, veckans erbjudanden, kampanjer, färska produkter, matbutik Malmö';
  
  const metaKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:site_name" content="Mathallen Malmö" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
