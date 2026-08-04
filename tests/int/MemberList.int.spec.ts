import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemberList } from '../../src/components/MemberList'

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: any) => createElement('img', { alt, ...props }),
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => createElement('a', { href }, children),
}))

describe('MemberList', () => {
  it('renders members when category is null', () => {
    const members = [
      {
        id: 1,
        name: 'Test Member',
        category: null,
        contact_name: 'Contact Name',
        description: 'A test member',
        enabled: true,
        link: 'https://example.com',
        email: 'test@example.com',
        address: '123 Main St',
        phone: '555-1234',
        logo: undefined,
      },
    ]

    render(createElement(MemberList, { members: members as any }))

    expect(screen.getByText('Test Member')).toBeTruthy()
  })
})
