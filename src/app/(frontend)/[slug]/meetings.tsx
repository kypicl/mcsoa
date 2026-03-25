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
  const [extensionVisible, setExtensionVisible] = useState(false)
  const contentText = post?.content?.root?.children?.[0]?.children?.[0]?.text || ""
  const contentTextExtention = post?.content?.root?.children[1]?.children[0]?.text || ""


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
      <>
      <div className="max-w-280 w-full mx-auto px-6">
      <div  className="text-4xl mt-25 text-center text-[#2F4663] pl-10 underline decoration-[#ffb703] decoration-2 underline-offset-[13px]">
       Next Meeting
      </div></div>
      <div className="flex justify-center ">
<div className="lg:max-w-280  gap-5 lg:flex items-center py-8 ">

  <div className="mb-2 lg:mb-0 lg:w-1/3 lg:ml-0 w-[400px] bg-[#2F4663] text-white rounded-lg text-center  py-10 p-8">
    <h3 className="text-xl pb-4 font-semibold ">Next Meeting</h3>
    <div>Date</div>
    <div>Time</div>
    <div className="py-5 underline">In person only!</div>
    <div>The Redwoods Senior Community <br/>
    40 Camino Alto, Mill Valley  <br/>
  (across from Mt Tam High School)
  </div>
    <div className="pt-4">Any questions please email us: info@marinsectiononaging.org</div>

  </div>

  <div className=" lg:place-items-start lg::w-[600px] lg:mr-0 w-[400px] text-center lg:text-left px-6 lg:px-0 lg:pl-8 lg:w-2/3 bg-white shadow shadow-md inset-shadow-sm rounded-lg py-5">
  <div className="text-xl">{post.title}</div>
    <div className="lg:flex gap-5 w-full lg:justify-center mt-5 ">
      <div className="lg:w-1/3 pb-4 lg:pb-0">
      {!post.content && (
        <div className="text-xl">Next Speaker coming soon</div>
      )}
            {post.heroImage && (
              <div className="flex justify-center">
        <img
          className="w-[220px] aspect-square rounded lg:mb-7"
          src={post.heroImage.url}
          alt={post.heroImage.alt || ""}
        />
        </div>
      )}

      </div>
      <div className="lg:w-3/5 lg:mr-1">
      {contentText && <div>{contentText}</div>}

      {/* {post.content && (
        <div className="">{post.content?.root?.children[0]?.children[0]?.text}</div>
      )} */}
      {/* {post.content && (
        <div>{post.content.root.children[1].children[0].text}</div>
      )} */}

<div className="mt-2">{extensionVisible ? contentTextExtention : ""}</div>
      <button onClick={() => {
    setExtensionVisible(prev => !prev)
  }} className="relative z-50 mt-3 text-end pr-5 text-gray-700 underline ">{extensionVisible ? "read less" : "read more"}</button>

      </div>
    </div>
  </div>

</div>
</div></>
    )
}
