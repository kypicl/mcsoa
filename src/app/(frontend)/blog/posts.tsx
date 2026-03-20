import { fetchPosts } from "@/app/actions"
import Page from "../posts/page"


export default async function Posts() {
    const posts = await fetchPosts({ page:1, limit:10, sort:'-createdAt' })


    return (
        <>
        <div className="">
            <Page />

            {/* {posts.map(post => (
                <div className="shadow-lg rounded-lg p-10" key={post.title}>
                    <p className="text-xl font-bold">{post.title}</p>
                    <p>{JSON.stringify(post.content.root.children[0].children[0].text)}</p>

                    <p className="pt-5 text-end text-sm text-gray-500 hover:text-gray-900">continue reading...</p>
                    </div>
        ))} */}

      </div>
        </>
    )
}
