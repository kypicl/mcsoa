'use client'

import { Media } from '@/payload-types'
import { useState } from 'react'

type Member = {
  id: number
  name: string
  category: string
  contact_name: string
  description: string
  link: string
  email: string
  address: string
  phone: string
  logo: Media
}

export function MemberList({ members }: { members: Member[] }) {
  const [filter, setFilter] = useState('')

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(filter.toLowerCase())
  )

  var categories: string[] = [];
  for (var i = 0; i < members.length; i++) {
    if (members[i].category && !categories.includes(members[i].category as string)) {
      categories.push(members[i].category as string);
    }
  }

  return (
    <div>
      Search: <input value={filter} onChange={e => setFilter(e.target.value)} />
      <div>
      <select onChange={e => setFilter(e.target.value)} name= "select category" id="category">
        {categories.map((category) => (
          <option value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
      {filtered.map(p => (
        <div key={p.id}>{p.name} — {p.phone}</div>
      ))}
    </div>
  )
}