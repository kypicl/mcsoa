"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: "/", label: "HOME" },
  { href: "/members", label: "MEMBERS" },
  { href: "/aboutus", label: "ABOUT US" },
  { href: "/blog", label: "BLOG" },
  { href: "/becomeamember", label: "BECOME A MEMBER", className: "hidden sm:block" },
]

export function HeaderNav() {
  const pathname = usePathname()

  return (
    <ul className="flex items-center space-x-5 ml-auto">
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <li
            key={link.href}
            className={`hover:underline hover:decoration-[#ffb703] hover:decoration-3 hover:underline-offset-[8px]
              ${isActive ? "underline decoration-[#ffb703] decoration-3 underline-offset-[8px]" : ""}`}
          >
            <Link href={link.href} className={link.className}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}