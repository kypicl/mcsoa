import { fetchMedia } from '@/app/actions'
import Image from 'next/image'

export default async function SockDrive() {
  const flyer = await fetchMedia({ mediaId: 193 })

  return (
    <section className="mt-5 w-full bg-white px-7.5 pt-5 pb-20">
      <div className="mx-auto max-w-280">
        <h2 className="mb-10 text-center text-4xl text-[#2F4663] underline decoration-[#ffb703] decoration-2 underline-offset-[13px]">
          Annual Sock Drive
        </h2>
        {flyer?.url && (
          <div className="mx-auto">
            <a
              href={flyer.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${flyer.alt || 'annual sock drive flyer'} in a new tab`}
              className="relative mx-auto block aspect-[3/4] w-full max-w-[400px]"
            >
              <Image
                src={flyer.url}
                alt={flyer.alt || 'Annual sock drive flyer'}
                fill
                className="object-contain"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
