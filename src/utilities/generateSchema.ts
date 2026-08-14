import { getServerSideURL } from './getURL'

export interface SchemaPageProps {
  title: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string
  type?: 'Article' | 'WebPage' | 'Organization'
}

/**
 * Generates JSON-LD structured data for SEO
 * Supports Article, WebPage, and Organization schema types
 */
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Marin County Section on Aging',
    description: 'Support, Dignity, Connection, Well-being for older adults in Marin County',
    url: getServerSideURL(),
    logo: `${getServerSideURL()}/favicon.svg`,
    sameAs: [
      'https://www.facebook.com/MarinCountyOnAging', // Update with your actual social URLs
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@example.com', // Update with your contact email
    },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  }
}

export const generatePageSchema = (props: SchemaPageProps) => {
  const { title, description, url, image, datePublished, dateModified, author, type = 'WebPage' } = props

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description,
    url,
    name: title,
    ...(image && { image }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(author && { author: { '@type': 'Person', name: author } }),
  }

  if (type === 'Article') {
    return {
      ...baseSchema,
      articleSection: 'Information',
      isAccessibleForFree: true,
    }
  }

  return baseSchema
}
