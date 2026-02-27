import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://mathallen.nu';
const DEFAULT_IMAGE = 'https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/3458r0m2_logo-mat.png';

export default function SEO({ 
  title, 
  description, 
  keywords,
  image,
  url,
  type,
  noindex,
  structuredData
}) {
  const siteTitle = 'Mathallen Malmö';
  const fullTitle = title 
    ? `${title} | ${siteTitle}` 
    : `${siteTitle} | Stormarknad i Skåne - Veckans Erbjudanden`;
  
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  
  const defaultDescription = 'Mathallen Malmö - Skånes största stormarknad med över 45.000 produkter. Färska varor, bästa priserna och nya veckokampanjer varje vecka. Öppet 07-22 alla dagar.';
  
  const metaDescription = description || defaultDescription;
  
  const defaultKeywords = 'Mathallen Malmö, stormarknad Malmö, stormarknad Skåne, veckans erbjudanden, kampanjer, färska produkter, matbutik Malmö';
  
  const metaKeywords = keywords || defaultKeywords;
  
  const ogImage = image || DEFAULT_IMAGE;
  const ogType = type || 'website';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      {noindex === true && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:site_name" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
