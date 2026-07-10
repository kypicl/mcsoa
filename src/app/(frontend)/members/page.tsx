
import { getPayload } from 'payload'
import config from '@payload-config'
import { MemberList } from '@/components/MemberList'
import { fetchMedia } from '@/app/actions';

export default async function Members() {
    const logo = await fetchMedia({ mediaId:2})

    const payload = await getPayload({ config})
    const {docs} = await payload.find({
        collection: 'members',
        sort: 'name',
        limit: 100,
    })

    const members = docs.map(({id, name, category, contact_name, description, enabled, link, email, address, phone, logo}) => ({
        id,
        name,
        category: category as string,
        contact_name: contact_name ?? '',
        description,
        enabled,
        link,
        email,
        address: address ?? '',
        phone,
        logo: logo as unknown as {id: number; url: string; updatedAt: string; createdAt: string}
    }))

  return (
    <>
    <div className="relative mb-7.5 lg:h-100 md:h-90 h-85 bg-[#2F4663]">
      <div className="absolute inset-0 w-full object-cover">


          <div className="flex justify-center ">
        {logo?.url && (
          <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 md:h-60 lg:h-60 w-auto z-10" src={logo.url} alt={logo.alt || "Logo"} />
        )}
        </div>
        </div>

    </div>
    <div className="">
        <MemberList members={members} />
    </div>
    </>
  )
}
