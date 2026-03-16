

export default function Meetings() {
    return (
<div className="max-w-[1100px] flex mx-auto gap-10">

  <div className="w-1/3 bg-white shadow inset-shadow-sm shadow-md rounded-lg text-center py-10">
    <h3 className="text-xl pb-4 font-semibold">Next Meeting</h3>
    <div>Date</div>
    <div>Time</div>
    <div className="py-5">In person only!</div>
    <div>The Redwoods Senior Community <br/>
    40 Camino Alto, Mill Valley  <br/>
  (across from Mt Tam High School)
  </div>
    <div className="pt-4">Any questions please email us: info@marinsectiononaging.org</div>
  </div>

  <div className="w-2/3 flex bg-white shadow shadow-md inset-shadow-sm rounded-lg text-center py-10 items-center justify-center">
    info about presentation here
  </div>

</div>
    )
}
