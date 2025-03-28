// "use client"
import React from 'react'

export default function EmailTemplate({ name = '😊', otp = '❌❌' }) {
  return (
    <div className='p-4 flex flex-col bg-[#243849]'>
      <div className='bg-[#43518a] p-4 text-[#cddbe7] rounded'>
        <h1 className=' text-2xl font-bold my-4'>2FA code for <span className='capitalize'>{name}</span></h1>
        <hr />
        <div className='my-4 text-white'>
          <p>Here is your varification code:</p>
          <h1 className='w-full p-2 my-2 text-4xl text-[#fcffe8] rounded font-bold tracking-[10px] flex justify-center bg-[#7a969b]'>{otp}</h1>
          <p>Please make sure you never share this code with anyone.</p>
          <p><span className='font-bold'>Note: </span>The code will expire in 10 minutes.</p>
        </div>
      </div>
      <div className='p-4 text-[#cddbe7]'>
        <p>You have received this email because you are registered at Foodie Cart, to ensure the implementation of our terms of services and(or) for legitimate matters.</p>
        <a href="#" className='underline'>Privacy Policy</a><br />
        @{new Date().getFullYear()} Foodie Cart Owner .
      </div>
    </div>
  )
}
