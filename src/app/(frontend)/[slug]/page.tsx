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
import { fetchMedia } from '@/app/actions'
import { Media } from '@/components/Media'

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
  const logo = await fetchMedia({ mediaId:10 })

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
    <>
  {/* // banner picture */}
<div className="h-100 bg-[#2F4663] flex items-center justify-center">
  {logo?.url && (
<Media imgClassName="h-60 md:h-70 w-auto" resource = {logo} />
  )}
</div>


  {/* description paragraph  */}
    <div className="bg-[#2F4663]  text-white w-full text-center text-base/7.5 mx-auto px-5 lg:px-0 pb-20 md:text-xl/7.5">
    <div className="max-w-[800px] mx-auto rounded-lg">
      <div className="">The Marin Section on Aging is a coalition of agencies, organizations and individuals
        concerned with the well-being of older persons. We are a network alliance advocating
        for and promoting the development, coordination and implementation of older adult services
        in Marin.  We hold morning meetings the 3rd Thursday of each month featuring speakers and member
        networking opportunities.
        </div>
        <Link href="/members">
        <button className={"text-blue-950  bg-[#ffb703] text-[#2F4663] hover:grayscale-[50%] mr-3 mt-5 text-sm box-border rounded-full rounded-base shadow px-4 py-2.5 border-rounded"}>MEMBERS DIRECTORY → </button>
        </Link>
        <Link href="/becomeamember">
        <button className={"bg-gray-100 border border-gray-200 hover:bg-gray-200 mt-5 text-sm text-[#2F4663] rounded-full rounded-base shadow px-4 py-2.5 "}>BECOME A MEMBER</button>
        </Link>
    </div></div>

{/* next meeting */}

<Meetings />
<LatestPosts />



      {/* Header */}
      <div  className="text-4xl mt-20 mb-10 text-center text-[#2F4663] md:pl-10 mb-7.5 underline decoration-[#ffb703] decoration-2 underline-offset-[15px]">
       Membership
      </div>

          <div className="mb-30 py-10 bg-[#2F4663] text-white px-2.5">
            <div className="flex justify-center">
              <div className="w-200 text-start">
            <h3 className="text-lg mb-2.5 font-bold ">Monthly meetings are open to the public. However, we strongly encourage and appreciate your membership. After attending up to three meetings we ask that you consider officially joining MCSOA.  Here's what you get for your membership:</h3>
            <div className="text-base/7.5">
            <p>• Regular networking opportunities with other senior services</p>
     <p>• Educational presentations covering a broad range of relevant topics</p>
     <p>• A listing in the MCSOA directory</p>
     <p>• The opportunity to list events on the MCSOA website</p>
     <p>• Participation in members-only meetings</p>
     <p>• The opportunity to give 5-minute spotlight presentation
</p>
</div>
<Link href="/becomeamember">
 <button className={"text-blue-950 bg-[#ffb703] text-[#272757] hover:bg-[#272757] hover:text-[#ffb703] mr-2.5 mt-5 text-sm box-border rounded-full rounded-base shadow px-5 py-2.5 border-rounded"}>BECOME A MEMBER→ </button>
</Link>
</div>

          </div>
          </div>


    </>
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
