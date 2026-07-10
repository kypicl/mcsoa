import React from 'react'
import { fetchMedia } from '@/app/actions';
import Link from 'next/link';
import Image from 'next/image'
import { Media } from '@/components/Media'

export default async function AboutUsPage() {
  const aboutUsLogo = await fetchMedia({ mediaId:11})
  const terriphoto = await fetchMedia({ mediaId:97 })
  const lorenaphoto = await fetchMedia({ mediaId:99 })
  const williamphoto = await fetchMedia({ mediaId:102 })
  const johnellphoto = await fetchMedia({ mediaId:106 })
  const libbyphoto = await fetchMedia({ mediaId:148 })
  const carlyphoto = await fetchMedia({ mediaId:110 })
  const deohnahphoto = await fetchMedia({ mediaId:113 })



  return     (
    <>
    <div className="relative mb-7.5 lg:h-100 md:h-90 h-85 bg-[#2F4663]">
      <div className="absolute inset-0 w-full object-cover">
          <div className="flex justify-center">
        {aboutUsLogo?.url && (
          <Media imgClassName="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 md:h-60 lg:h-60 w-auto z-10" resource={aboutUsLogo}/>
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
       {terriphoto?.url && (
        <Image
        src={terriphoto.url}
        alt={terriphoto.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div>
      </div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Terri Abelar</div>
          <div className="text-md pb-2.5">Business Officer</div>
          <div className="text-sm px-2.5">Aging Solutions, Inc.</div>
          <div className="text-sm break-all px-2.5 underline"><Link href="https://agingsolutions.com/">agingsolutions.com</Link></div>
          <div className="text-sm break-all px-2.5">(415) 324-5088</div>
        </div>

            <div className="mb-5 md:mb-0 text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
      <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {lorenaphoto?.url && (
        <Image
        src={lorenaphoto.url}
        alt={lorenaphoto.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />

       )}
      </div>
      </div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Lorena Garbarino</div>
          <div className="text-md break pb-2.5 px-2.5">5-Minute Company Highlight/Gift Sponsor Coordinator</div>
          <div className="text-sm px-2.5">Suncrest Hospice</div>
          <div className="text-sm break-all px-2.5 underline"><Link href="https://www.suncrestcare.com/">suncrestcare.com</Link></div>
          <div className="text-sm break-all px-2.5">(415) 949-8354</div>
          <div className="text-sm break-all px-2.5">LGarbarino@suncrestcare.com</div>
        </div>

            <div className="h-full text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
       <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {williamphoto?.url && (
        <Image
        src={williamphoto.url}
        alt={williamphoto.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div>
      </div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">William Foster</div>
          <div className="text-md pb-2.5 lg:px-2">Director of Community Relations</div>
          <div className="text-sm px-2.5">The Redwoods, A Community of Seniors</div>
          <div className="text-sm break-all px-2.5 underline"><Link href="https://www.theredwoods.org/">theredwoods.org</Link></div>
          <div className="text-sm break-all px-2.5">wfoster@theredwoods.org</div>
        </div>
      </div>
      </div>


{/* 2. Row of Volunteers */}
       <div className="max-w-[1400px] w-full mx-auto px-5 mb-40 place-content-center">
      <div className="md:grid md:grid-cols-4 md:gap-5 lg:gap-0 min-h-[200px]">
            <div className="mb-5 md:mb-0 h-full text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
       <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {johnellphoto?.url && (
        <Image
        src={johnellphoto.url}
        alt={johnellphoto.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div></div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Johnell Davidson</div>
          <div className="text-md pb-2.5">Speaker Seeker</div>
          <div className="text-sm px-2.5 ">Neighborly Senior Placement</div>
          <div className="text-sm break-all px-2.5">(415) 294-0505</div>
          <div className="text-sm break-all px-2.5">johnell@neighborlyseniorplacement.com</div>
        </div>

            <div className="mb-5 md:mb-0 h-full text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
       <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {libbyphoto?.url && (
        <Image
        src={libbyphoto.url}
        alt={libbyphoto.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div></div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Libby Wood</div>
          <div className="text-md pb-2.5">Certified Senior Move Manager</div>
          <div className="text-sm px-2.5">Senior Settlers</div>
          <div className="text-sm break-all px-2.5 underline"><Link href="https://www.senior-settlers.com/">senior-settlers.com</Link></div>
          <div className="text-sm px-2.5">(415) 755-3340</div>
          <div className="text-sm break-all px-2.5">libby@senior-settlers.com</div>
        </div>

            <div className="mb-5 md:mb-0 h-full text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
       <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {carlyphoto?.url && (
        <img
        src={carlyphoto.url}
        alt={carlyphoto.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div></div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Carly Migdal</div>
          <div className="text-md pb-2.5"></div>
          <div className="text-sm px-2.5">Sage Eldercare Solutions</div>
          <div className="text-sm break-all px-2.5 underline"><Link href="https://www.sageeldercare.com/">sageeldercare.com</Link></div>
          <div className="text-sm px-2.5">(650) 652-5642</div>
          <div className="text-sm break-all px-2.5">cmigdal@sageeldercare.com</div>
        </div>

            <div className="mb-5 md:mb-0 h-full text-center shadow lg:shadow md:shadow-none rounded-lg rounded-lg w-[250px] lg:w-[250px] md:w-[170px] py-5 place-items-center place-self-center">
       <div className="flex justify-center">
      <div className="h-[180px] w-[180px] md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]">
       {deohnahphoto?.url && (
        <Image
        src={deohnahphoto.url}
        alt={deohnahphoto.alt || ""}
        className="h-full w-full object-cover rounded-full"
        />
       )}
      </div></div>
          <div className="text-xl font-bold pt-2.5 text-[#272757]">Deonah Salari</div>
          <div className="text-md pb-2.5"></div>
          <div className="text-sm break-all px-2.5">Anchor Health</div>
          <div className="text-sm break-all px-2.5 underline"><Link href="https://www.anchorhpc.com/">anchorhpc.com/</Link></div>
          <div className="text-sm break-all px-2.5">(951) 255-0131</div>
          <div className="text-sm break-all px-2.5">Dsharifi@anchorhpc.com</div>
        </div>
        </div>
      </div>
    </>
  )
}
