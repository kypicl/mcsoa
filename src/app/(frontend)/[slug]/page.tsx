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
  const banner = await fetchMedia({mediaId:1})
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
    <div className="relative lg:h-140 md:h-120 h-85">
      <div className="absolute inset-0 w-full object-cover">
        {banner &&
        <img src={banner.url} alt={banner.alt || "Home banner"}
        className="h-full w-full object-cover" />}


          <div className="flex justify-center ">
        {logo?.url && (
          <img className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 md:h-70 lg:h-100 w-auto z-10" src={logo.url} alt={logo.alt || "Logo"} />
        )}
        </div>
        </div>

    </div>


  {/* description paragraph  */}
    <div className="text-center text-base/7.5 max-w-[800px] mx-auto px-5 lg:px-0 mt-10 md:mt-15 mb-10 md:text-xl/7.5">
      <div>The Marin Section on Aging is a coalition of agencies, organizations and individuals
        concerned with the well-being of older persons. We are a network alliance advocating
        for and promoting the development, coordination and implementation of older adult services
        in Marin.  We hold morning meetings the 3rd Thursday of each month featuring speakers and member
        networking opportunities.
        </div>
        <Link href="/members">
        <button className={"text-blue-950  bg-[#ffb703] text-[#272757] hover:bg-[#272757] hover:text-[#ffb703] mr-3 mt-5 text-sm box-border rounded-full rounded-base shadow px-4 py-2.5 border-rounded"}>MEMBERS DIRECTORY → </button>
        </Link>
        <Link href="/becomeamember">
        <button className={"bg-gray-100 border border-gray-200 hover:bg-gray-200 mt-5 text-sm  rounded-full rounded-base shadow px-4 py-2.5 "}>BECOME A MEMBER</button>
        </Link>
    </div>

{/* next meeting */}

<Meetings />
<LatestPosts />



      {/* Header */}
      <div  className="text-4xl mb-10 text-center text-[#2F4663] pl-10 mb-7.5 underline decoration-[#ffb703] decoration-2 underline-offset-[15px]">
       Membership
      </div>

          <div className="mb-30 py-10 bg-[#2F4663] text-white">
            <div className="flex justify-center">
              <div className="w-200 text-center md:text-start">
            <h3 className="text-lg mb-2.5 font-bold ">What are the benefits of a membership to the MCSOA?</h3>
            <div className="text-base/7.5">
            <p>• An abundance of networking with other services that may assist the
     older adults you serve. Our members become connected to
     resources in our community.</p>
     <p>• Educational meetings covering a broad range of topics that are
     of interest to members and the population we serve.</p>
     <p>• A listing on the MCSOA website and the opportunity to list
    your events on the MCSOA website.</p>
     <p>• An opportunity for your company being highlighted to give a 5-minute
    presentation and sponsor a gift for a member</p>
     <p>• Attend the July and December meetings that are exclusively for
    members</p>
     <p>• Opportunities for sponsorship of meeting refreshments with your
    personal “5 Minutes of Fame” for additional exposure
    for your agency.
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
