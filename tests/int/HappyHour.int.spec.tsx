import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import HappyHour from '../../src/app/(frontend)/[slug]/happy_hour'

vi.mock('@/app/actions', () => ({
  fetchMedia: vi.fn(async () => ({
    url: 'https://example.com/flyer.jpg',
    alt: 'Happy hour flyer',
    caption: {
      root: {
        children: [
          { children: [{ text: 'Next Sponsor' }] },
          { children: [{ text: 'Past Sponsor' }] },
        ],
      },
    },
  })),
}))

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: any) => createElement('img', { alt, ...props }),
}))

describe('HappyHour', () => {
  it('opens the flyer image in a new tab when clicked', async () => {
    render(await HappyHour())

    const link = screen.getByRole('link', { name: /happy hour flyer/i })
    expect(link).toHaveAttribute('href', 'https://example.com/flyer.jpg')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
