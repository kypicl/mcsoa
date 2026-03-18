'use server'
import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export async function fetchMembers({ page = 1, limit=10, sort = 'category'}) {
    const payload = await getPayload({ config: buildConfig })
    const members = await payload.find({
        collection: 'members',
        sort,
        limit,
        page,
    })
    return members.docs
}

export async function fetchPosts({ page = 1, limit=2, sort = '-createdAt'}) {
    const payload = await getPayload({ config: buildConfig })
    const posts = await payload.find({
        collection: 'posts',
        limit,
        sort,
        page,
    })
    return posts.docs
}

export async function fetchMedia({mediaId=1}) {
    const payload = await getPayload({config: buildConfig})
    const media = await payload.findByID({
        collection: 'media',
        id: mediaId,
    })
    return media
}
