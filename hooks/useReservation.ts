import axios from 'axios'
import { useState } from 'react'

export default function useReservation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createReservation = async ({
    slug,
    partySize,
    day,
    time,
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccasion,
    bookerRequest,
  }: {
    slug: string
    day: string
    time: string
    partySize: string
    bookerEmail: string
    bookerPhone: string
    bookerFirstName: string
    bookerLastName: string
    bookerOccasion: string
    bookerRequest: string
  }) => {
    setLoading(true)

    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerEmail,
          bookerPhone,
          bookerFirstName,
          bookerLastName,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: { day, time, partySize },
        }
      )
      setLoading(false)
      return response.data
    } catch (error: any) {
      setLoading(false)
      setError(error.response.data.errorMessage)
      console.log(error)
    }
  }

  return { loading, error, createReservation }
}
