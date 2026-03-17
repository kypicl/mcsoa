import React, { useEffect, useState } from "react"
import { fetchMembers } from "@/app/actions"

type Media = {
        id: number
        url: string
        alt?: string
}

type Member = {
    id: string
    name: string
    category?: string
    contact_name?: string
    description?: string
    link?: string
    email?: string
    address?: string
    phone?: string
}

export default async function Members() {

    //const [members, setMembers] = useState<Member[]>([]);
    //const [banner, setBanner] = useState<Media | null>(null);

    const members = await fetchMembers({ page: 1, limit: 100, sort: 'category' });
    /*
    useEffect(() => {
        fetch("http://localhost:3000/api/members")
        .then(res => res.json())
        .then(data => setMembers(data.docs));
    }, [])

    const bannerImage = await payload.find({
        collection: "media",
        where: {
            filename: {
                equals: "Small Members Banner.png",
            }
        })

    useEffect(() => {
        fetch("http://localhost:3000/api/media/3")
        .then(res => res.json())
        .then(data => setBanner(data));
    }, [])
    */

  return (
    <>
<div className="h-[400px] w-full">


  <img
    src={process.env.NEXT_PUBLIC_SERVER_URL + '/api/media/file/Small%20Members%20Banner.png'}
    alt={"Members banner"}
    className="h-full w-full object-cover"
  />


</div>

    <div>
        {members.map(member => (
            <div key={member.id}>
                <h3>{member.name}</h3>
                <p>{member.description}</p>
                </div>
        ))}
    </div>
    </>
  )
}
