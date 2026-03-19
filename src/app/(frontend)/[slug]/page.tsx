import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'
import Link from 'next/link'
import Meetings from './meetings'
import LatestPosts from './latest_posts'

import { generateMeta } from '@/utilities/generateMeta'

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

type Media = {
        id: number
        url: string
        alt?: string
    }

export default async function Page({ params: paramsPromise }: Args) {
  const bannerRes = await fetch("http://localhost:3000/api/media/1")
  const banner: Media = await bannerRes.json()



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



  return (
  // banner picture
    <div className="relative mb-40">
      <div className="lg:h-[600px] md:h-[400px] h-[300px] w-full">
        {banner &&
        <img src={banner.url} alt={banner.alt || "Home banner"}
        className="h-full w-full object-cover" />}
      </div>


  {/* description paragraph  */}
    <div className="text-center max-w-[800px] mx-auto mt-10 mb-10 md:text-xl">
      <div>The Marin Section on Aging is a coalition of agencies, organizations and individuals
        concerned with the well-being of older persons. We are a network alliance advocating
        for and promoting the development, coordination and implementation of older adult services
        in Marin.  We hold morning meetings the 3rd Thursday of each month featuring speakers and member
        networking opportunities.
        </div>
        <Link href="/members">
        <button className={"text-blue-950  bg-[#ffb703] text-[#272757] hover:bg-[#272757] hover:text-[#ffb703] mr-3 mt-5 text-sm box-border rounded-full rounded-base shadow px-4 py-2.5 border-rounded"}>MEMBERS DIRECTORY → </button>
        </Link>
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLScefidUcyfXGj5fDoW_-DmddJNgHxxnyXn7kVbU35Mg9EQzaQ/viewform?usp=header">
        <button className={"bg-gray-100 border border-gray-200 hover:bg-gray-200 mt-5 text-sm  rounded-full rounded-base shadow px-4 py-2.5 "}>BECOME A MEMBER</button>
        </Link>
    </div>

{/* next meeting */}

<Meetings />
<LatestPosts />

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
