'use client'

import { useContext, useState } from 'react'
import { partySize as partySizes, times } from '../../../../data'
import DatePicker from 'react-datepicker'
import useAvailabilities from '@/hooks/useAvailabilities'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { Time, convertToDisplayTime } from '@/utils/convertToDisplayTime'
import { AuthenticationContext } from '@/app/context/authContext'

export default function ReservationCard({
  openTime,
  closedTime,
  slug,
}: {
  openTime: string
  closedTime: string
  slug: string
}) {
  const { data: userInfo } = useContext(AuthenticationContext)
  const { data, loading, error, fetchAvailabilities } = useAvailabilities()
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [time, setTime] = useState(openTime)
  const [partySize, setPartySize] = useState('2')
  const [day, setDay] = useState(new Date().toISOString().split('T')[0])

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split('T')[0])
      return setSelectedDate(date)
    }
    return setSelectedDate(null)
  }

  const handleClick = () => {
    fetchAvailabilities({ slug, time, partySize, day })
  }
  const filterTimeByRestaurantOpenWindow = () => {
    const timesWithInWindow: typeof times = []
    let isWithinWindow = false

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true
      }
      if (isWithinWindow) {
        timesWithInWindow.push(time)
      }
      if (time.time == closedTime) {
        isWithinWindow = false
      }
    })
    return timesWithInWindow
  }
  return (
    <div className="w-auto bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg ">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party Size</label>
        <select
          name=""
          id=""
          className="py-3 border-b font-light"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-24"
            dateFormat="MMMM d"
            wrapperClassName="w-[45%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name="time"
            id="time"
            className="py-3 border-b font-light "
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimeByRestaurantOpenWindow().map((time) => (
              <option key={time.time} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        {userInfo ? (
          <button
            className="bg-red-600 rounded px-4 text-white w-full font-bold h-16"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? <CircularProgress color="inherit" /> : 'Find a time'}
          </button>
        ) : (
          <button
            className="bg-gray-400 rounded px-4 text-white w-full font-bold h-16"
            disabled={true}
          >
            Log in to Find time
          </button>
        )}
      </div>
      {data && data.length ? (
        <div className="mt-4 ">
          <p className="text-reg">Select a time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  key={time.time.toString()}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white rounded mr-3 mb-3"
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </Link>
              ) : (
                <div
                  key={time.time.toString()}
                  className="bg-gray-500 p-2 w-24 mb-3 rounded mr-3 text-center"
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
