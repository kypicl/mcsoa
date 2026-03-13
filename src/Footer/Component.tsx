import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

export async function Footer() {

  return (
    <footer className="mt-auto border-t border-border">
 <div>hello i am the footer</div>
    </footer>
  )
}
