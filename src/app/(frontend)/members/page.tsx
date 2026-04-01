
import { getPayload } from 'payload'
import config from '@payload-config'
import { MemberList } from '@/components/MemberList'
import { fetchMedia } from '@/app/actions';

export default async function Members() {
    const banner = await fetchMedia({ mediaId:1 })
    const logo = await fetchMedia({ mediaId:2})

    const payload = await getPayload({ config})
    const {docs} = await payload.find({
        collection: 'members',
        sort: 'name',
        limit: 100,
    })

    const members = docs.map(({id, name, category, contact_name, description, link, email, address, phone, logo}) => ({
        id,
        name,
        category: category as string,
        contact_name: contact_name ?? '',
        description,
        link,
        email,
        address: address ?? '',
        phone,
        logo: logo as unknown as {id: number; url: string; updatedAt: string; createdAt: string}
    }))

    /*
    useEffect(() => {
        fetch("http://localhost:3000/api/members")
        .then(res => res.json())
        .then(data => setMembers(data.docs));
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/api/media/3")
        .then(res => res.json())
        .then(data => setBanner(data));
    }, [])
    */
  /*var categories: string[] = [];
  for (var i = 0; i < members.length; i++) {
    if (members[i].category && !categories.includes(members[i].category as string)) {
      categories.push(members[i].category as string);
    }
  }*/

  return (
    <>
    <div className="relative mb-7.5 lg:h-140 md:h-120 h-85">
      <div className="absolute inset-0 w-full object-cover">
        {banner?.url &&
        <img src={banner.url} alt={banner.alt || "Home banner"}
        className="h-full w-full object-cover" />}


          <div className="flex justify-center ">
        {logo?.url && (
          <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 md:h-70 lg:h-80 w-auto z-10" src={logo.url} alt={logo.alt || "Logo"} />
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
