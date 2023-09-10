import React from 'react'

export default function Header() {
  return (
    //   HEADER STARTS
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.p4S1QVLTTCkfLYHEvfCc5wHaE8%26pid%3DApi&f=1&ipt=98dd480d4e56a5cd5be57a13aecaf5682b3488ad3c77851c629cd5adcfe8c53a&ipo=images"
          alt=""
          className="w-32 h-18 rounded"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">Arian Grande</h1>
          <div className="flex mt-3">
            <p className="mr-6 ">Tues, 22, 2023</p>
            <p className="mr-6 ">7:30 PM</p>
            <p className="mr-6 ">3 people</p>
          </div>
        </div>
      </div>
    </div>
    //  HEADER ENDS
  )
}
