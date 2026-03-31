import React from 'react'
import { fetchMedia } from '@/app/actions';
import Link from 'next/link';

export default async function ContactPage() {
  const banner = await fetchMedia({ mediaId:1 })
  const logo = await fetchMedia({ mediaId:9 })

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


      <div className="max-w-[1200px] w-full mb-40 mx-auto px-5 place-content-center text-center ">
          <p>If you need to make edits to your submission please click <Link href="https://docs.google.com/forms/d/e/1FAIpQLScefidUcyfXGj5fDoW_-DmddJNgHxxnyXn7kVbU35Mg9EQzaQ/viewform?usp=header" className="underline hover:text-blue-500">here</Link></p>
<Link href="https://docs.google.com/forms/d/e/1FAIpQLScefidUcyfXGj5fDoW_-DmddJNgHxxnyXn7kVbU35Mg9EQzaQ/viewform?usp=header">
  <button className={"text-blue-950  bg-[#ffb703] text-[#272757] hover:bg-[#272757] hover:text-[#ffb703] mr-3 mt-5 text-sm box-border rounded-full rounded-base shadow px-4 py-2.5 border-rounded"}>BECOME A MEMBER → </button>
</Link>
        <div className="md:flex justify-center  md:place-content-center md:mt-10 mt-20 gap-8 ">
          <div className="flex justify-center">
          <div className=" mb-20 md:mb-0 w-[300px] py-10 rounded-lg bg-[#2F4663] text-lg/7.5 md:text-xl/7.5 text-white p-3 place-content-center">
          <p>Membership is $80 annually.
          (Includes a free standard listing in our online directory displaying
          your business name, logo,
          primary contact name, and phone number, website link.)
          </p>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLScefidUcyfXGj5fDoW_-DmddJNgHxxnyXn7kVbU35Mg9EQzaQ/viewform?usp=header">
           <button className={"text-blue-950  bg-[#ffb703] text-[#272757] hover:bg-[#272757] hover:text-[#ffb703] mr-3 mt-5 text-sm box-border rounded-full rounded-base shadow px-4 py-2.5 border-rounded"}>SIGN UP→ </button>
          </Link>
          </div>
          </div>

          <div className="md:w-[700px] rounded inset-shadow-sm shadow-md p-5 text-start">
            <h3 className="text-lg my-2.5 font-bold text-[#2F4663]">What are the benefits of a membership to the MCSOA?</h3>
            <div className="text-base/7.5">
            <p >• An abundance of networking with other services that may assist the
     older adults you serve. Our members become connected to
     resources in our community.</p>
     <p>• Educational meetings covering a broad range of topics that are
     of interest to members and the population we serve.</p>
     <p>• A listing on the MCSOA website and the opportunity to list
    your events on the MCSOA website.</p>
     <p>• An opportunity for your company being highlighted to give a 5-minute
    presentation and sponsor a gift for a member</p>
     <p>• Attend the July and December meetings that are exclusively for
    members</p>
     <p>• Opportunities for sponsorship of meeting refreshments with your
    personal “5 Minutes of Fame” for additional exposure
    for your agency.
</p>
          </div>
          </div>
        </div>

      </div>
    </>

  )

}
