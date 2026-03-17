"use client"
import { useEffect, useState } from "react"

type Media = {
  id: number
  url: string
  alt?: string
}

type Post = {
  id: number
  title: string
  heroImage: Media
  content: any
}

export default function Meetings() {
  const [post, setPost ] = useState<Post | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/api/posts/3?depth=2")
      const data = await res.json()
        setPost(data)

    }
    fetchPost()
  }, [])

  if (!post) return <div>Loading... </div>

    return (
<div className="max-w-[1100px] flex items-center mx-auto py-8">

  <div className="w-2/5 bg-[#2F4663] text-white rounded-lg text-center  py-10 p-8">
    <h3 className="text-xl pb-4 font-semibold underline decoration-[#ffb703] decoration-3 underline-offset-[13px]">Next Meeting</h3>
    <div>Date</div>
    <div>Time</div>
    <div className="py-5">In person only!</div>
    <div>The Redwoods Senior Community <br/>
    40 Camino Alto, Mill Valley  <br/>
  (across from Mt Tam High School)
  </div>
    <div className="pt-4">Any questions please email us: info@marinsectiononaging.org</div>
  </div>

  <div className="pl-8 w-4/5 bg-white shadow shadow-md inset-shadow-sm rounded-lg py-10">
  <div className="text-xl">{post.title}</div>
    <div className="flex gap-10 w-full justify-center mt-5">
      <div className="w-1/3">
            {post.heroImage && (
        <img
          src={post.heroImage.url}
          alt={post.heroImage.alt || ""}
        />
      )}
      </div>
      <div className="w-3/5 mr-10">{post.content.root.children[0].children[0].text}</div>
    </div>
  </div>

</div>
    )
}
