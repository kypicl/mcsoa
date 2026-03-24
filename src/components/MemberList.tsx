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
  const [nameFilter, setNameFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [profilePicPlaceholder, setProfilePicPlaceholder] = useState<any>(null)

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(nameFilter.toLowerCase()) && m.category.toLowerCase().includes(categoryFilter.toLowerCase())
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

  return (
    <div className="mx-10 max-w-[900px] lg:mx-auto ">
          <div className="max-w-[1200px] w-full mx-auto px-6 my-5 place-content-center text-center gap-2">
                <p>If you need to make edits to your submission please click
                  <Link href="https://docs.google.com/forms/d/e/1FAIpQLScefidUcyfXGj5fDoW_-DmddJNgHxxnyXn7kVbU35Mg9EQzaQ/viewform?usp=header" className="underline hover:text-blue-500 ml-1">here</Link></p>
      </div>
      <div className="flex justify-center">
       <button className={"text-blue-950 bg-[#ffb703] text-[#272757] hover:bg-[#272757] hover:text-[#ffb703] mr-3 mb-10 text-sm box-border rounded-full rounded-base shadow px-4 py-2.5 border-rounded"}>BECOME A MEMBER→ </button></div>
    <div className="my-8 md:flex gap-10 justify-center">
      <div className="rounded-lg px-2 py-1.5 w-[300px] shadow-lg inset-shadow-sm ">
        <div className="flex rounded-lg">
        <Image src={searchicon} alt="searchicon" className="h-[30px] w-[30px]"/>
        <input className=" rounded-lg" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
      </div>
      </div>
            <div className="shadow-lg inset-shadow-sm rounded-lg mt-3 md:mt-0 py-3 px-3 w-[300px] md:w-auto lace-content-center justify-center flex">
      <select onChange={e => setCategoryFilter(e.target.value)} name= "select category" id="category">
        <option selected disabled>Filter by category</option>
        <option value= "">All Categories</option>
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
          <div className="mb-8 p-10 shadow-lg inset-shadow-sm hover:shadow-xl rounded-lg overflow-hidden bg-card hover:cursor-pointer">
            <div className="lg:flex w-full place-self-center">
              <div className="lg:w-1/4">
              <div className="flex justify-center">
      <div className="place-self-center h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {profilePicPlaceholder?.url && (
        <img
        src={profilePicPlaceholder.url}
        alt={profilePicPlaceholder.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
       </div>
       </div>
      </div>
      <div className="lg:w-3/4 text-center">
      <p className="text-[#2F4663] font-semibold">{p.category}</p>
      <p className="font-bold text-2xl text-[#2F4663] underline decoration-[#ffb703] decoration-1 underline-offset-[10px]">{p.name}</p>
      <div className="lg:flex gap-8 justify-center mt-3 ">
      <p className="lg:w-1/2 lg:text-end">👤 {p.contact_name}</p>
      <Link href={p.link} className="underline lg:w-1/2 lg:text-start">{p.link}</Link>
      </div>
      <div className="lg:flex gap-8 mb-3 justify-center ">
      <p className="lg:w-1/2 lg:text-end">📞 {p.phone}</p>
      <p className="lg:w-1/2 lg:text-start">✉️ {p.email}</p>
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
