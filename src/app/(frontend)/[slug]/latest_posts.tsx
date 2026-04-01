
import { fetchPosts } from "@/app/actions"
import Link from "next/link";
import { Media } from '@/components/Media'

export default async function LatestPosts() {
    const posts = await fetchPosts({ page:1, limit:2, sort:'-createdAt' });



  return (
    <div className="w-full bg-[#3A58AA]/5 px-7.5 py-20 mt-20">
      <div className="max-w-280 mx-auto">

      {/* Header */}
      <div  className="text-4xl text-[#2F4663] text-center md:text-start md:pl-10 mb-10 underline decoration-[#ffb703] decoration-2 underline-offset-[13px]">
        Latest Posts
      </div>

      {/* Posts */}
      <div className="md:grid md:grid-cols-2 gap-10 ">
        {posts.map((post) => {
  const image = post.heroImage || post.meta?.image

  return (
    <div key={post.title} className="mb-5 md:mb-0 bg-white p-10 text-center shadow-lg inset-shadow-sm hover:shadow-xl rounded-lg pb-5 pt-10 overflow-hidden bg-card hover:cursor-pointer">
        <Link href={`/posts/${post.slug}`}>
    <div className="flex justify-center">
    <div className="relative w-[250px] aspect-[9/9] mb-4 place-self-center">
      {image && typeof image !== 'string' && (
        <Media fill resource={image} className="object-cover rounded-lg" />
      )}
    </div></div>
    <p className="text-xl font-bold">{post.title}</p>



          <p className="mt-2 text-sm text-gray-700">
  {(() => {
    const text = JSON.stringify((post.content?.root?.children as any[])?.[0]?.children?.[0]?.text) ?? 'No description';
    const maxChars = 200; // <-- change this to your limit
    return text.length > maxChars ? text.slice(0, maxChars) + '…' : text;
  })()}
  </p>
                    <p className="pt-5 text-end text-sm text-gray-500 hover:text-gray-900">

                    continue reading...

                    </p>
                    </Link>
    </div>

  )
})}

      </div>
    <Link href="/blog">
      <div className="text-end pt-5 underline text-gray-700">read more posts here</div>
    </Link>
    </div>
    </div>
  )
}
