'use client'
import useReservation from '@/hooks/useReservation'
import { CircularProgress } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'

export default function Forms({
  slug,
  date,
  partySize,
}: {
  slug: string
  partySize: string
  date: string
}) {
  const [day, time] = date.split('T')
  const [didBook, setDidBook] = useState(false)
  const { loading, createReservation, error } = useReservation()
  const [inputs, setInputs] = useState({
    bookerFirstName: '',
    bookerLastName: '',
    bookerPhone: '',
    bookerEmail: '',
    bookerOccasion: '',
    bookerRequest: '',
  })
  const [disabled, setDisabled] = useState(true)
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    setInputs({ ...inputs, [name]: value })
  }
  const handleClick = async () => {
    console.log(inputs)
    const booking = await createReservation({
      slug,
      day,
      time,
      partySize,
      bookerEmail: inputs.bookerEmail,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerPhone: inputs.bookerPhone,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    })
  }
  useEffect(() => {
    if (
      inputs.bookerEmail &&
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone
    )
      return setDisabled(false)
    return setDisabled(true)
  }, [inputs])
  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div>
          <h1>You all booked up</h1>
          <p>Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <input
            name="bookerFirstName"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="first name"
            onChange={handleChangeInput}
            value={inputs.bookerFirstName}
          />
          <input
            name="bookerLastName"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="last name"
            onChange={handleChangeInput}
            value={inputs.bookerLastName}
          />
          <input
            name="bookerPhone"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            onChange={handleChangeInput}
            value={inputs.bookerPhone}
          />
          <input
            name="bookerEmail"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="email"
            onChange={handleChangeInput}
            value={inputs.bookerEmail}
          />
          <input
            name="bookerOccasion"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            onChange={handleChangeInput}
            value={inputs.bookerOccasion}
          />
          <input
            name="bookerRequest"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            onChange={handleChangeInput}
            value={inputs.bookerRequest}
          />
          <button
            disabled={disabled || loading}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              'Complete reservation'
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking on complete reservations you are agreeing to{' '}
            <span className="text-red-400">privacy terms</span> and{' '}
            <span className="text-red-400"> policy</span>.
          </p>
        </>
      )}
    </div>
  )
}
