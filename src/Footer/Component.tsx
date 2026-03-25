import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import fbicon from '../components/Media/facebook.png'
import Image from 'next/image'

import type { Footer } from '@/payload-types'

export async function Footer() {

  return (
    <footer className="py-5  border-t border-border border-[#272757]/80 text-center text-[#272757]/80 ">
      <div className="flex justify-center">
        <Link href="https://www.facebook.com/Marincountysectiononaging/">
        <Image className="h-9 w-9" src={fbicon} alt="fbicon"/>
        </Link>
      </div>

 <div>Marin County Section on Aging</div>
 <p>1000 Fourth Street #440 San Rafael, CA 94901</p>
 <p className="text-sm mt-2">©Copyright 2026 Marin County Section on Aging</p>
 <p className="text-sm">Designed by <Link className="underline" href="">Sunset Cliffs Web Solutions</Link></p>
    </footer>
  )
}
