export default function LatestPosts() {
  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 my-20">

      {/* Header */}
      <div className="text-4xl text-[#2F4663] pl-10 mb-8">
        Latest Posts
      </div>

      {/* Posts */}
      <div className="grid grid-cols-2 gap-10">
        <div className="shadow-lg rounded-lg p-10">
            <div>Header</div>
            <div>Image</div>
            <div>Short description</div>
        </div>
        <div className="shadow-lg rounded-lg p-10">2</div>
      </div>

      <div className="text-end pt-5 underline">read more posts here</div>

    </div>
  )
}
