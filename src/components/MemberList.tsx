'use client'

import { Media } from '@/payload-types'
import { useEffect, useState } from 'react'
import searchicon from "./Media/search_icon.png"
import Image from 'next/image'
import { fetchMedia } from '@/app/actions';
import Link from 'next/link'

type Member = {
  id: number
  name: string
  category: string
  contact_name: string
  description: string
  link: string
  email: string
  address: string
  phone: string
  logo: Media
}


export function MemberList({ members }: { members: Member[] }) {
  const [filter, setFilter] = useState('')
  const [profilePicPlaceholder, setProfilePicPlaceholder] = useState<any>(null)

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(filter.toLowerCase())
  )
    useEffect(() => {
    async function loadPic() {
      const pic = await fetchMedia({ mediaId: 8 })
      setProfilePicPlaceholder(pic)
    }

    loadPic()
  }, [])


  var categories: string[] = [];
  for (var i = 0; i < members.length; i++) {
    if (members[i].category && !categories.includes(members[i].category as string)) {
      categories.push(members[i].category as string);
    }
  }
  console.log(members)
  return (
    <div className="mx-10 max-w-[900px] lg:mx-auto ">
    <div className="my-8 flex gap-10 justify-center">
      <div className="border rounded-lg px-2 py-1.5 w-[300px] shadow">
        <div className="flex rounded-lg bg-white">
        <Image src={searchicon} alt="searchicon" className="h-[30px] w-[30px]"/>
        <input className="bg-white rounded-lg" value={filter} onChange={e => setFilter(e.target.value)} />
      </div>
      </div>
            <div className="border rounded-lg px-2 py-1.5 w-[300px]">
      <select onChange={e => setFilter(e.target.value)} name= "select category" id="category">
        {categories.map((category) => (
          <option value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    </div>

{/* Members Cards */}
      {filtered.map(p => (
        <div key={p.id}>
          <div className="bg- mb-8 p-10 shadow-lg inset-shadow-sm hover:shadow-xl rounded-lg overflow-hidden bg-card hover:cursor-pointer">
            <div className="md:flex w-full">
              <div className="w-1/4">
      <div className=" h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {profilePicPlaceholder?.url && (
        <img
        src={profilePicPlaceholder.url}
        alt={profilePicPlaceholder.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
       </div>
      </div>
      <div className="w-3/4 text-center">
      <p className="text-[#2F4663] font-semibold">{p.category}</p>
      <p className="font-bold text-2xl text-[#2F4663] underline decoration-[#ffb703] decoration-1 underline-offset-[10px]">{p.name}</p>
      <div className="flex gap-8 justify-center mt-3 ">
      <p className="w-1/2 text-end">👤 {p.contact_name}</p>
      <Link href={p.link} className="underline w-1/2 text-start">{p.link}</Link>
      </div>
      <div className="flex gap-8 mb-3 justify-center ">
      <p className="w-1/2 text-end">📞 {p.phone}</p>
      <p className="w-1/2 text-start">✉️ {p.email}</p>
      </div>

      <p className="mb-3 text-sm ">{p.description}</p>
      <p className="">📍 {p.address}</p>


      </div>

            </div>
          </div>
          </div>
      ))}

</div>
  )
}
