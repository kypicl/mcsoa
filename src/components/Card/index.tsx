'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'heroImage'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, heroImage } = doc || {}
  const { description, image: metaImage } = meta || {}
  const displayImage = metaImage || heroImage



  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`


  return (
    <article
      className={cn(
        'shadow-lg inset-shadow-sm hover:shadow-xl rounded-lg py-5 overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="flex justify-center">
<div className="relative place-self-center rounded-lg w-[250px] aspect-[9/9]">
  {!displayImage && <div>No image</div>}

  {displayImage && typeof displayImage !== 'string' && (
    <Media fill resource={displayImage} className="object-cover  " />
  )}
</div></div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3 className="text-xl">
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        <p className="mt-2 text-sm text-gray-700">
  {(() => {
    const text = doc.content?.root?.children?.[0]?.children?.[0]?.text ?? 'No description';
    const maxChars = 200; // <-- change this to your limit
    return text.length > maxChars ? text.slice(0, maxChars) + '…' : text;
  })()}
  </p>
  <p className="text-end mt-2">read more here →</p>

      </div>
    </article>
  )
}
