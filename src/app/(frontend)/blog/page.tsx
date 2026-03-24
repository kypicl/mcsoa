import React from 'react'
import Posts from './posts';
import { fetchMedia } from '@/app/actions';

export default async function BlogPage() {
  const media = await fetchMedia({ mediaId:6 })

  return    (
    <>
    <div className="relative">
      <div className="h-[400px] w-full place-self-center">
       {media?.url && (
        <img
        src={media.url}
        alt={media.alt || ""}
        className="h-full w-full object-cover"
        />
       )}
      </div>
      </div>
  <div className="max-w-[1200px] w-full mx-auto  px-6 my-20">
      <Posts/>
    </div>
    </>
  )
}
