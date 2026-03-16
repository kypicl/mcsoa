"use client";
import React from 'react';
import { useEffect, useState } from "react";

type Media = {
        id: number
        url: string
        alt?: string
    }


export default function Members() {
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
    const [members, setMembers] = useState<Member[]>([]);
    const [banner, setBanner] = useState<Media | null>(null)

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

  return (
    <>
<div className="h-[400px] w-full">


{banner && (
  <img
    src={banner.url}
    alt={banner.alt || "Members banner"}
    className="h-full w-full object-cover"
  />
)}


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
