import React from 'react'
import { fetchMedia } from '@/app/actions';
import Link from 'next/link';

export default async function AboutUsPage() {
  const media = await fetchMedia({ mediaId:1 })
  const aboutUsLogo = await fetchMedia({ mediaId:11})
  const profilepicplaceholder = await fetchMedia({ mediaId:11})

  return     (
    <>
    <div className="relative mb-15 md:mb-20 lg:h-140 md:h-120 h-85">
      <div className="absolute inset-0 w-full object-cover">
       {media?.url && (
        <img
        src={media.url}
        alt={media.alt || ""}
        className="h-full w-full object-cover"
        />
       )}
          <div className="flex justify-center">
        {aboutUsLogo?.url && (
          <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 md:h-70 lg:h-80 w-auto z-10" src={aboutUsLogo.url} alt={aboutUsLogo.alt || "About Us Logo"} />
        )}
        </div>
        </div>
      </div>


            <div className="max-w-[1200px] w-full mx-auto px-5 mb-10 place-content-center">
        <div className="text-center text-3xl md:text-4xl/15 text-[#2F4663]  mb-7.5 underline decoration-[#ffb703] decoration-2 underline-offset-[15px]">
        Meet the Committee
      </div>
            <div className="text-center max-w-[800px] mx-auto text-xl/7.5 mb-10">
        <div>
       The Marin County Section on Aging is managed by a committee of volunteers,
       all of whom provide services in the eldercare industry in various capacities.
        </div>
      </div>

<div className="md:bg-gray-100 lg:bg-transparent"></div>
{/* 1. Row of Volunteers */}

      <div className="md:grid md:grid-cols-3 md:gap-5 ">
            <div className="mb-10 md:mb-0 h-full text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
      <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {profilepicplaceholder?.url && (
        <img
        src={profilepicplaceholder.url}
        alt={profilepicplaceholder.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div>
      </div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Terri Abelar</div>
          <div className="text-md pb-2.5">Business Officer</div>
          <div className="text-sm">Aging Solutions, Inc.</div>
          <div className="text-sm underline"><Link href="https://agingsolutions.com/">agingsolutions.com</Link></div>
          <div className="text-sm">(415) 324-5088</div>
        </div>

            <div className="mb-5 md:mb-0 text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
      <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {profilepicplaceholder?.url && (
        <img
        src={profilepicplaceholder.url}
        alt={profilepicplaceholder.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div>
      </div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Lorena Garbarino</div>
          <div className="text-md px-2">5-Minute Company Highlight/Gift</div>
          <div className="text-md pb-2.5">Sponsor Coordinator</div>
          <div className="text-sm">Suncrest Hospice</div>
          <div className="text-sm underline"><Link href="https://www.suncresthospicecare.com/">suncresthospicecare.com/</Link></div>
          <div className="text-sm">LGarbarino@suncrestcare.com</div>
        </div>

            <div className="h-full text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
       <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {profilepicplaceholder?.url && (
        <img
        src={profilepicplaceholder.url}
        alt={profilepicplaceholder.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div>
      </div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">William Foster</div>
          <div className="text-md pb-2.5 lg:px-2">Director of Community Relations</div>
          <div className="text-sm">The Redwoods, A Community of Seniors</div>
          <div className="text-sm underline"><Link href="https://www.theredwoods.org/">theredwoods.org</Link></div>
          <div className="text-sm">wfoster@theredwoods.org</div>
        </div>
      </div>
      </div>


{/* 2. Row of Volunteers */}
       <div className="max-w-[1400px] w-full mx-auto px-5 mb-40 place-content-center">
      <div className="md:grid md:grid-cols-4 md:gap-5 lg:gap-0 min-h-[200px]">
            <div className="mb-5 md:mb-0 h-full text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
       <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {profilepicplaceholder?.url && (
        <img
        src={profilepicplaceholder.url}
        alt={profilepicplaceholder.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div></div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Johnell Davidson</div>
          <div className="text-md pb-2.5">Speaker Seeker</div>

          <div className="text-sm ">Neighborly Senior Placement</div>
          <div className="text-sm underline"><Link href="https://neighborlyseniorplacement.com/">neighborlyseniorplacement.com</Link></div>
          <div className="text-sm">(415) 294-0505</div>
        </div>

            <div className="mb-5 md:mb-0 h-full text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
       <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {profilepicplaceholder?.url && (
        <img
        src={profilepicplaceholder.url}
        alt={profilepicplaceholder.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div></div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Libby Wood</div>
          <div className="text-md pb-2.5">Certified Senior Move Manager</div>
          <div className="text-sm">Senior Settlers</div>
          <div className="text-sm underline"><Link href="https://www.senior-settlers.com/">senior-settlers.com</Link></div>
          <div className="text-sm">(415) 755-3340</div>
          <div className="text-sm">libby@senior-settlers.com</div>
        </div>

            <div className="mb-5 md:mb-0 h-full text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
       <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {profilepicplaceholder?.url && (
        <img
        src={profilepicplaceholder.url}
        alt={profilepicplaceholder.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div></div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Carly Migdal</div>
          <div className="text-md pb-2.5"></div>
          <div className="text-sm">Sage Eldercare Solutions</div>
          <div className="text-sm underline"><Link href="https://www.sageeldercare.com/">sageeldercare.com</Link></div>
          <div className="text-sm">(650) 652-5642</div>
          <div className="text-sm">cmigdal@sageeldercare.com</div>
        </div>

            <div className="mb-5 md:mb-0 h-full text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
       <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {profilepicplaceholder?.url && (
        <img
        src={profilepicplaceholder.url}
        alt={profilepicplaceholder.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div></div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Deonah Salari</div>
          <div className="text-md pb-2.5"></div>
          <div className="text-sm">Anchor Health</div>
          <div className="text-sm underline"><Link href="https://www.anchorhpc.com/">anchorhpc.com/</Link></div>
          <div className="text-sm">(951) 255-0131</div>
          <div className="text-sm">Dsharifi@anchorhpc.com</div>
        </div>
        </div>
      </div>
    </>
  )
}
