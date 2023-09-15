import { findAvailableTables } from '@/services/restaurant/findAvailableTables'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug, day, partySize, time } = req.query as {
    slug: string
    day: string
    partySize: string
    time: string
  }
  const {
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccasion,
    bookerRequest,
  } = req.body
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      tables: true,
      open_time: true,
      close_time: true,
    },
  })
  if (!restaurant)
    return res.status(400).json({ errorMessage: 'Invalid data provided' })
  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  )
    return res
      .status(400)
      .json({ errorMessage: 'Restaurant is not open at that time' })

  const searchTimesWithTable = await findAvailableTables({
    day,
    time,
    res,
    restaurant,
  })
  if (!searchTimesWithTable)
    return res.status(400).json({ errorMessage: 'Invalid data provided' })
  const searchTimeWithTable = searchTimesWithTable.find((t) => {
    return t.date.toISOString() === new Date(`${day}T${time}`).toISOString()
  })
  if (!searchTimeWithTable)
    return res
      .status(400)
      .json({ errorMessage: 'No availability, Cannot book' })
  const tablesCount: { 2: number[]; 4: number[] } = {
    2: [],
    4: [],
  }
  searchTimeWithTable.tables.forEach((table) => {
    if (table.seats === 2) {
      tablesCount[2].push(table.id)
    } else {
      tablesCount[4].push(table.id)
    }
  })
  const tablesToBook: number[] = []

  let seatsRemaining = parseInt(partySize)
  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (tablesCount[4].length) {
        tablesToBook.push(tablesCount[4][0])
        tablesCount[4].shift()
        seatsRemaining = seatsRemaining - 4
      } else {
        tablesToBook.push(tablesCount[2][0])
        tablesCount[2].shift()
        seatsRemaining = seatsRemaining - 2
      }
    } else {
      if (tablesCount[2].length) {
        tablesToBook.push(tablesCount[2][0])
        tablesCount[2].shift()
        seatsRemaining = seatsRemaining - 2
      } else {
        tablesToBook.push(tablesCount[4][0])
        tablesCount[4].shift()
        seatsRemaining = seatsRemaining - 4
      }
    }
  }
  const booking = await prisma.booking.create({
    data: {
      number_of_people: parseInt(partySize),
      booking_time: new Date(`${day}T${time}`),
      booker_email: bookerEmail,
      booker_phone: bookerPhone,
      booker_firstName: bookerFirstName,
      booker_lastName: bookerLastName,
      restaurant_id: restaurant.id,
      booker_occasion: bookerOccasion,
      booker_request: bookerRequest,
    },
  })
  const bookingsOnTableData = tablesToBook.map((table_id) => {
    return {
      table_id,
      booking_id: booking.id,
    }
  })
  await prisma.bookingsOnTable.createMany({
    data: bookingsOnTableData,
  })
  return res.json(booking)
}

export default async function reserveHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await handler(req, res)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
