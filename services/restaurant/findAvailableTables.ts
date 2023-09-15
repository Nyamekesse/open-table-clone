import { times } from '@/data'
import { prisma } from '@/shared/constants'
import { GetResult } from '@prisma/client/runtime/library'
import { NextApiResponse } from 'next'

export const findAvailableTables = async ({
  time,
  day,
  res,
  restaurant,
}: {
  time: string
  day: string
  restaurant: {
    tables: (GetResult<
      {
        id: number
        seats: number
        restaurant_id: number
        created_at: Date
        updated_at: Date
      },
      any
    > & {})[]
    open_time: string
    close_time: string
  } | null
  res: NextApiResponse
}) => {
  const searchTimes = times.find((t) => {
    return t.time === time
  })?.searchTimes
  if (!searchTimes)
    return res.status(400).json({ errorMessage: 'Invalid data provided' })
  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      BookingsOnTable: true,
    },
  })

  const bookingTableObject: { [key: string]: { [key: number]: true } } = {}
  bookings.forEach((booking) => {
    bookingTableObject[booking.booking_time.toISOString()] =
      booking.BookingsOnTable.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        }
      }, {})
  })
  if (!restaurant)
    return res.status(400).json({ errorMessage: 'Invalid data provided' })
  const tables = restaurant.tables
  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    }
  })
  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTableObject[t.date.toISOString()]) {
        if (bookingTableObject[t.date.toISOString()][table.id]) return false
      }
      return true
    })
  })

  return searchTimesWithTables
}
