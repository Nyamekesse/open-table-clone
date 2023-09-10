import { Cuisine, Location, PRICE } from '@prisma/client'
import Link from 'next/link'

export default function SearchSideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[]
  cuisines: Cuisine[]
  searchParams: {
    city?: string | undefined
    cuisine?: string | undefined
    price?: PRICE | undefined
  }
}) {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: '$',
      className: 'border w-full text-center text-reg font-light rounded-l p-2',
    },
    {
      price: PRICE.REGULAR,
      label: '$$',
      className: ' border w-full text-center text-reg font-light  p-2',
    },
    {
      price: PRICE.EXPENSIVE,
      label: '$$$',
      className:
        'border-r border-t border-b w-full text-center text-reg font-light rounded-r p-2',
    },
  ]
  return (
    <div className="w-1/5">
      <div className="border-b flex flex-col pb-4">
        <h1 className="mb-2">Regions</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: '/search',
              query: { ...searchParams, city: location.name },
            }}
            className="font-light font-reg capitalize"
            key={location.id}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: '/search',
              query: { ...searchParams, cuisine: cuisine.name },
            }}
            className="font-light font-reg capitalize"
            key={cuisine.id}
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map((price) => (
            <Link
              key={price.price}
              href={{
                pathname: '/search',
                query: { ...searchParams, price: price.price },
              }}
              className={price.className}
            >
              {price.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
