import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HeaderNav } from './HeaderNav'

async function getLogo() {
  const payload = await getPayload({ config })

  try {
    const media = await payload.findByID({
      collection: 'media',
      id: 4,
    })
    return media
  } catch {
    return null
  }
}

export async function Header() {
  const logo = await getLogo()

  return (
    <div className="border border-[#3A58AA]/4 bg-[#3A58AA]/5 flex justify-between mx-auto py-4 pl-1 md:pr-5 md:pl-5 text-blue-950 h-[80px] text-sm md:text-base">
      <div className="flex items-center space-x-5" id="navbar-default">
        <Link href="/">
          {logo?.url && (
            <Image
              src={logo.url}
              alt={logo.alt || "MCSOA logo"}
              width={logo.width ?? 60}
              height={logo.height ?? 60}
              className="h-[60px] w-[60px]"
              priority
            />
          )}
        </Link>
      </div>
      <HeaderNav />
    </div>
  )
}
