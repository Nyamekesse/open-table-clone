import { Cuisine, Location, PRICE, Review } from '@prisma/client'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import { prisma } from '@/shared/constants'

export interface RestaurantCardType {
  id: number
  name: string
  main_image: string
  cuisine: Cuisine
  slug: string
  location: Location
  price: PRICE
  reviews: Review[]
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews: true,
    },
  })
  return restaurants
}

export default async function Home() {
  const restaurant = await fetchRestaurants()

  return (
    <>
      <Header />
      <div className="py-3 px-36  mt-10 flex items-center justify-center flex-wrap">
        {restaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </>
  )
}
