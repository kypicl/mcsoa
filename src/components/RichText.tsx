import React from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

export default function RichText({ content }: { content: any }) {
  return (
    <div className="prose">
      <LexicalRichText data={content} />
    </div>
  )
}
