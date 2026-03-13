import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    // <article className="pt-16 pb-24">
    //   <PageClient />
    //   {/* Allows redirects for valid pages too */}
    //   <PayloadRedirects disableNotFound url={url} />

    //   {draft && <LivePreviewListener />}

    //   <RenderHero {...hero} />
    //   <RenderBlocks blocks={layout} />
    // </article>
<div className="relative">
  <Link href="https://media.istockphoto.com/id/2163867926/photo/hospital-doctor-using-spreadsheet-for-billing-codes-on-desktop.jpg?s=1024x1024&w=is&k=20&c=e5qmQZlbJ-ZoVx9spGErft0Rz5PaN4MZx8r8-6QpxIk=">

    <Image
      src="https://media.istockphoto.com/id/2163867926/photo/hospital-doctor-using-spreadsheet-for-billing-codes-on-desktop.jpg?s=1024x1024&w=is&k=20&c=e5qmQZlbJ-ZoVx9spGErft0Rz5PaN4MZx8r8-6QpxIk="
      alt="Care Management Photo"
      width={500}
      height={400}
      className="w-full h-[200px] md:h-[300px] object-cover"
    />

    <div className="absolute top-2/3 lg:top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-2/3 w-full text-center text-white text-2xl md:text-3xl">
      Marin Section On Aging
    </div>

  </Link>
</div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
