import React from 'react'
import Posts from './posts';
import { fetchMedia } from '@/app/actions';

export default async function BlogPage() {
  const banner = await fetchMedia({ mediaId:1 })
  const logo = await fetchMedia({ mediaId:6})

  return    (
    <>
    <div className="relative mb-20 lg:h-140 md:h-120 h-85">
      <div className="absolute inset-0 w-full object-cover">
        {banner?.url &&
        <img src={banner.url} alt={banner.alt || "Home banner"}
        className="h-full w-full object-cover" />}


          <div className="flex justify-center ">
        {logo?.url && (
          <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 md:h-70 lg:h-80 w-auto z-10" src={logo.url} alt={logo.alt || "Logo"} />
        )}
        </div>
        </div>

    </div>


  <div className="max-w-[1200px] w-full mx-auto  px-6 my-20">
      <Posts/>
    </div>
    </>
  )
}
