import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { generatePageSchema } from './generateSchema'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const docUrl = Array.isArray(doc?.slug) ? `/${doc?.slug.join('/')}` : '/'

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Marin County Section on Aging'
    : 'Marin County Section on Aging'

  // Generate structured data
  const schema = generatePageSchema({
    title: doc?.meta?.title || 'Marin County Section on Aging',
    description: doc?.meta?.description || 'Support, Dignity, Connection, Well-being',
    url: `${getServerSideURL()}${docUrl}`,
    image: ogImage,
    type: 'WebPage',
  })

  return {
    description: doc?.meta?.description,
    robots: 'index, follow',
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
      title,
      url: docUrl,
      type: 'website',
      siteName: 'Marin County Section on Aging',
    }),
    title,
    other: {
      'script:ld+json': JSON.stringify(schema),
    },
  }
}
