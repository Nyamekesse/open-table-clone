import React from 'react'

export default function Forms() {
  return (
    // FORM STARTS
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="first name"
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="last name"
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Phone number"
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="email"
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Occasion (optional)"
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Requests (optional)"
      />
      <button className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300">
        Complete reservation
      </button>
      <p className="mt-4 text-sm">
        By clicking on complete reservations you are agreeing to{' '}
        <span className="text-red-400">privacy terms</span> and{' '}
        <span className="text-red-400"> policy</span>.
      </p>
    </div>
    // FORM ENDS
  )
}
