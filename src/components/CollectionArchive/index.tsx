import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
<div className="container mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 justify-center">
    {posts?.map((result, index) => (
      <Card
        key={index}
        className="h-full w-full"
        doc={result}
        relationTo="posts"
        showCategories
      />
    ))}
  </div>
</div>
  )
}
