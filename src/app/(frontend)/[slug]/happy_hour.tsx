import { fetchMedia } from '@/app/actions'
import Image from 'next/image'

export default async function HappyHour () {
    const flyer = await fetchMedia({ mediaId:170 })
    const captionChildren = flyer?.caption?.root?.children as Array<{ text?: string }> | undefined
    const nextSponsor = captionChildren?.[0]?.children?.[0]?.text ?? ''
    const pastSponsors = captionChildren?.[1]?.children?.[0]?.text ?? ''

    return (
        <>
        <div className="w-full bg-[#3A58AA]/5 px-7.5 py-20 mt-20">
        <div className="max-w-280 mx-auto  place-content-center">
        <div  className="text-4xl text-[#2F4663] text-center md:pl-10 mb-10 underline decoration-[#ffb703] decoration-2 underline-offset-[13px]">
        Happy Hour</div>

      <div className="md:grid md:grid-cols-2 gap-10">
        <div className="flex justify-center">
<div className="relative h-[400px] w-[300px] ">
  {flyer?.url && (
    <Image
      src={flyer.url}
      alt={flyer.alt || ""}
      fill
      className="object-cover"
    />
  )}
</div>
        </div>
        <div >
            <p className="text-xl mb-2.5">Sponsors:</p>
            <p className="mb-5">Thank you to this month's sponsor: {nextSponsor}</p>
            <p className="text-xl mb-2.5">Previous Sponsors: </p>
            <p className="mb-5">{pastSponsors}</p>
      </div></div>
        </div></div>
        </>
    )
}
