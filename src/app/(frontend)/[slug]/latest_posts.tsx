
import { fetchPosts } from "@/app/actions"
import Link from "next/link";

export default async function LatestPosts() {
    const posts = await fetchPosts({ page:1, limit:2, sort:'-createdAt' });

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 my-20">

      {/* Header */}
      <div className="text-4xl text-[#2F4663] pl-10 mb-8 underline decoration-[#ffb703] decoration-2 underline-offset-[13px]">
        Latest Posts
      </div>

      {/* Posts */}
      <div className="grid grid-cols-2 gap-10">

            {posts.map(post => (
                <div className="shadow-lg rounded-lg p-10" key={post.title}>
                    <p className="text-xl font-bold">{post.title}</p>
                    <p>{JSON.stringify(post.content.root.children[0].children[0].text)}</p>
                    <p className="pt-5 text-end text-sm text-gray-500 hover:text-gray-900">continue reading...</p>
                    </div>
        ))}

      </div>
    <Link href="/blog">
      <div className="text-end pt-5 underline">read more posts here</div>
    </Link>
    </div>
  )
}
