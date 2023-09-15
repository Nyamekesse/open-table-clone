import { NextApiResponse, NextApiRequest } from 'next'
import { times } from '../../../../data'
import { PrismaClient } from '@prisma/client'
import { findAvailableTables } from '@/services/restaurant/findAvailableTables'

const prisma = new PrismaClient()

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug, day, time, partySize } = req.query as {
    slug: string
    day: string
    time: string
    partySize: string
  }

  if (!day || !time || !time || !partySize)
    return res.status(400).json({ errorMessage: 'Invalid data provided' })

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  })
  if (!restaurant)
    return res.status(400).json({ errorMessage: 'Invalid data provided' })
  const searchTimesWithTable = await findAvailableTables({
    day,
    time,
    res,
    restaurant,
  })
  if (!searchTimesWithTable)
    return res.status(400).json({ errorMessage: 'Invalid data provided' })
  const availabilities = searchTimesWithTable
    .map((t) => {
      const sumSeats = t.tables.reduce((sum, tables) => {
        return sum + tables.seats
      }, 0)
      return {
        time: t.time,
        available: sumSeats >= parseInt(partySize),
      }
    })
    .filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`)
      const timeIsBeforeClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`)
      return timeIsAfterOpeningHour && timeIsBeforeClosingHour
    })
  return res.json(availabilities)
}

export default async function availabilityHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await handler(req, res)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
