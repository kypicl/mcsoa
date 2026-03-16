"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type Media = {
        id: number
        url: string
        alt?: string
    }

export function Header() {
  const pathname = usePathname()
  const [logo, setLogo] = useState<Media | null>(null)

  const links = [
    { href: "/", label: "HOME" },
    { href: "/members", label: "MEMBERS" },
    { href: "/aboutus", label: "ABOUT US" },
    { href: "/blog", label: "BLOG" },
    { href: "/contact", label: "CONTACT" },
  ]

useEffect(() => {
  fetch("http://localhost:3000/api/media/4")
    .then(res => res.json())
    .then(data => setLogo(data));
}, [])

  return (
    <>
    <div className="border flex justify-between mx-auto py-4 pl-2 md:pr-4 md:pl-4 text-blue-950">
      <div className="flex items-center space-x-5" id="navbar-default">
    <button >
        <Link href="/">
        {logo && (
  <img
    src={logo.url}
    alt={logo.alt || "Members banner"}
    className="h-[60px] w-[60px]"
  />
)}
        </Link>
      </button>
          </div>
    <ul className="flex items-center space-x-5 ml-auto">
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <li
            key={link.href}
            className={`hover:underline hover:decoration-[#ffb703] hover:decoration-3 hover:underline-offset-[8px]
              ${isActive ? "underline decoration-[#ffb703] decoration-3 underline-offset-[8px]" : ""}`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
    </div>
    </>
  )
}
