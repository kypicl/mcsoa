import React from 'react'
import Link from 'next/link'



export function Header() {
  return (
    <>
    <div className="border flex justify-between mx-auto py-4 pl-2 md:pr-4 md:pl-4">
      <div className="flex items-center space-x-5" id="navbar-default">
    <button className='box-border rounded-full border rounded-base shadow-xs px-4 py-2.5 text-sm border-rounded' >
        <Link href="/">Logo</Link>
      </button>
          </div>
      <ul className="flex items-center space-x-5 ml-auto">
        <li>
          <Link href="/" >Home</Link>
        </li>
        <li>
          <Link href="/members">Members</Link>
        </li>
        <li>
          <Link href="/aboutus">About us</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
    </>
  )
}
