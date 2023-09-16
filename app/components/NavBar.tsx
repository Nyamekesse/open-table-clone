'use client'
import Link from 'next/link'
import AuthModal from './AuthModal'
import { useContext } from 'react'
import { AuthenticationContext } from '../context/authContext'
import useAuth from '@/hooks/useAuth'

export default function NavBar() {
  const { data, loading } = useContext(AuthenticationContext)
  const { signout } = useAuth()
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        Open Table
      </Link>
      <div className="">
        {loading ? null : (
          <div className="flex ">
            {data ? (
              <div className="flex justify-center items-center pr-3">
                <h1 className="px-4 font-bold text-reg">
                  {data.firstName} {data.lastName}
                </h1>
                <button
                  className="px-4 bg-blue-400 mr-3 text-white border p-1 rounded"
                  onClick={signout}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center pr-3">
                <AuthModal isSignIn={true} />
                <AuthModal isSignIn={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
