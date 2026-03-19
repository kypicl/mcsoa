
import React, { useEffect, useState } from "react"
import { getPayload } from 'payload'
import config from '@payload-config'
import { MemberList } from '@/components/MemberList'

export default async function Members() {

    const payload = await getPayload({ config})
    const {docs} = await payload.find({
        collection: 'members',
        sort: 'category',
        limit: 100,
    })

    const members = docs.map(({id, name, category, contact_name, description, link, email, address, phone, logo}) => ({
        id,
        name,
        category: category as string,
        contact_name,
        description,
        link,
        email,
        address,
        phone,
        logo: logo as unknown as {url: string}
    }))

    /*
    useEffect(() => {
        fetch("http://localhost:3000/api/members")
        .then(res => res.json())
        .then(data => setMembers(data.docs));
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/api/media/3")
        .then(res => res.json())
        .then(data => setBanner(data));
    }, [])
    */
  var categories: string[] = [];
  for (var i = 0; i < members.length; i++) {
    if (members[i].category && !categories.includes(members[i].category as string)) {
      categories.push(members[i].category as string);
    }
  }

  //const [selectCategory, setSelectCategory] = useState<string>("general");

  return (
    <>
    <div className="h-[400px] w-full">
      
      
      <img
        src={process.env.NEXT_PUBLIC_SERVER_URL + '/api/media/file/Small%20Members%20Banner.png'}
        alt={"Members banner"}
        className="h-full w-full object-cover"
      />
    
      
    </div>
    <td>
        <MemberList members={members} />
    </td>
    </>
  )
}
