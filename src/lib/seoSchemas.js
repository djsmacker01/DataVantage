export const SITE_URL = 'https://datavantage.ng'
export const SITE_NAME = 'DataVantage'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`

export const PERSON_SCHEMA = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#muminah-shehu`,
  name: 'Muminah Omolara Shehu',
  givenName: 'Muminah',
  familyName: 'Shehu',
  jobTitle: 'Data Analyst & Microsoft Certified Power BI Expert',
  description:
    '4+ years of experience in SQL, Power BI, data engineering, and analytics consulting. Microsoft Fabric, Azure, and Power BI certified. Based in Lagos, Nigeria.',
  url: SITE_URL,
  email: 'muminahshehu@gmail.com',
  telephone: '+2348106741718',
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/muminah-shehu.jpg`,
    width: 800,
    height: 1000,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos State',
    addressCountry: 'NG',
  },
  sameAs: [
    'https://linkedin.com/in/muminah-shehu',
    'http://bit.ly/Myportfolioproject',
  ],
  knowsAbout: [
    'Data Analysis',
    'Business Intelligence',
    'Power BI',
    'SQL',
    'Python',
    'Data Engineering',
    'ETL Pipelines',
    'Azure Data Factory',
    'Tableau',
    'Data Modeling',
    'SSRS',
    'Advanced Excel',
    'Microsoft Fabric',
    'Database Administration',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Microsoft Fabric Data Engineer',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'Microsoft' },
      dateCreated: '2025-11',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Azure Database Administrator Associate',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'Microsoft' },
      dateCreated: '2024-12',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Microsoft Certified Power BI Data Analyst',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'Microsoft' },
      dateCreated: '2022-11',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Data Analytics Professional',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'Google' },
      dateCreated: '2021-12',
    },
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Lagos State University',
    sameAs: 'https://lasu.edu.ng',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Hygeia HMO',
    sameAs: 'https://hygeiagroup.com',
  },
}

export const ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/favicon.svg`,
    width: 32,
    height: 32,
  },
  founder: { '@id': `${SITE_URL}/#muminah-shehu` },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+2348106741718',
    email: 'muminahshehu@gmail.com',
    contactType: 'customer service',
    availableLanguage: ['English'],
    areaServed: 'NG',
  },
}

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Nigeria's premier data and business intelligence platform. Data analysis, consulting, training, and engineering services by Muminah Shehu.",
  inLanguage: 'en-NG',
  publisher: ORGANIZATION_SCHEMA,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export function makeBreadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      ...items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    ],
  }
}

export function makeArticleSchema({ title, excerpt, coverImage, publishedAt, modifiedAt, slug, author, tags, category }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/blog/${slug}#article`,
    headline: title,
    description: excerpt,
    image: coverImage
      ? {
          '@type': 'ImageObject',
          url: coverImage,
          width: 1200,
          height: 630,
        }
      : undefined,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: PERSON_SCHEMA,
    publisher: ORGANIZATION_SCHEMA,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
    url: `${SITE_URL}/blog/${slug}`,
    inLanguage: 'en-NG',
    keywords: tags?.join(', ') || category || '',
    articleSection: category || 'Data & Analytics',
    about: {
      '@type': 'Thing',
      name: category || 'Data Analytics',
    },
  }
}

export function makeVideoSchema({ title, description, thumbnailUrl, createdAt, slug, ytId }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${SITE_URL}/videos/${slug}#video`,
    name: title,
    description: description,
    thumbnailUrl: thumbnailUrl,
    uploadDate: createdAt,
    url: `${SITE_URL}/videos/${slug}`,
    embedUrl: ytId ? `https://www.youtube.com/embed/${ytId}` : undefined,
    author: PERSON_SCHEMA,
    publisher: ORGANIZATION_SCHEMA,
    inLanguage: 'en-NG',
  }
}
