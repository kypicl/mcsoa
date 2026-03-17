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