import React from 'react'
import Posts from './posts';
import { fetchMedia } from '@/app/actions';
import Link from 'next/link';

export default async function BlogPage() {
  const logo = await fetchMedia({ mediaId:6})

  return    (
    <>
    <div className="relative mb-7.5 lg:h-100 md:h-90 h-85 bg-[#2F4663]">
      <div className="absolute inset-0 w-full object-cover">


          <div className="flex justify-center ">
        {logo?.url && (
          <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 md:h-60 lg:h-60 w-auto z-10" src={logo.url} alt={logo.alt || "Logo"} />
        )}
        </div>
        </div>

    </div>
{/* <div className="max-w-[1200px] h-100 w-full flex justify-center mx-auto  px-6 my-10">
  <iframe className = "h-full w-full" src="https://docs.google.com/forms/d/e/1FAIpQLSeRaos2qw6RUX7gF61aj0tH2QUzglDdsmclGziFCNh9Tp2R5A/viewform?embedded=true">Loading…</iframe>
</div> */}
  <div className="max-w-[1200px] w-full mx-auto  px-6 my-20">
    <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeRaos2qw6RUX7gF61aj0tH2QUzglDdsmclGziFCNh9Tp2R5A/viewform" className="underline">
    Do you have a speaker recommendation for MCSOA? Please click here and fill out the form.</Link>
    <Posts/>
  </div>
  </>
  )
}
