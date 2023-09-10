'use client'

export default function ReservationCard() {
  return (
    <div className="fixed w-[20%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg ">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party Size</label>
        <select name="" id="" className="py-3 border-b font-light">
          <option value="">1 person</option>
          <option value="">2 people</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <input
            type="text"
            name=""
            id=""
            className="py-3 border-b font-light w-28"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 border-b font-light ">
            <option value="7:30 am">7:30 am</option>
            <option value="8:30 am">8:30 am</option>
            <option value="9:30 am">9:30 am</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="bg-red-600 rounded px-4 text-white w-full font-bold h-16">
          Find a time
        </button>
      </div>
    </div>
  )
}
