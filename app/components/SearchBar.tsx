'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  return (
    <div>
      {' '}
      {/* SEARCH BAR STARTS */}
      <div className="text-left py-3 text-lg m-auto flex justify-center">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded text-lg mr-3 w-[450px] p-2"
          placeholder="state, city or town"
        />
        <button
          className="bg-red-600 px-9 py-2 rounded text-white"
          onClick={() => {
            if (location === '') return
            router.push(`/search?city=${location}`)
            setLocation('')
          }}
        >
          Let's go
        </button>
      </div>
      {/* SEARCH BAR END */}
    </div>
  )
}
