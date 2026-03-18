import React from 'react'
import { fetchMedia } from '@/app/actions';

export default async function AboutUsPage() {
  const media = await fetchMedia({ mediaId:7 })

  return     (
    <>
        <div className="relative mb-10">
      <div className="h-[400px] w-full">
       {media?.url && (
        <img
        src={media.url}
        alt={media.alt || ""}
        className="h-full w-full object-cover"
        />
       )}
      </div>
      </div>

      <div className="text-center max-w-[800px] mx-auto mb-10 text-xl mb-40">
        <div>
       The Marin County Section on Aging is managed by a committee of volunteers,
       all of whom provide services in the eldercare industry in various capacities.
        </div>
      </div>
    </>
  )
}
