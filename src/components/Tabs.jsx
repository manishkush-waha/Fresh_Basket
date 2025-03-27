import { HomeIcon, Layers, Search, ShoppingCart, User2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function Tabs() {
  return (
    <>
      <div className=' flex w-full fixed bottom-[1%] sm:hidden z-50'>
        <div className='w-[95%] mx-auto flex justify-between items-center border-[1px] bg-gray-100 p-1 rounded-xl shadow-md'>
          <Link href={'/'} className='flex flex-col justify-center items-center font-semibold py-1 px-2'><HomeIcon />Home</Link>
          <Link href={'/categories'} className='flex flex-col justify-center items-center font-semibold py-1 px-2'><Layers />Category</Link>
          <Link href={'/search'} className='flex flex-col justify-center items-center font-semibold py-1 px-2'><Search />Search</Link>
          <Link href={'/cart'} className='flex flex-col justify-center items-center font-semibold py-1 px-2'><ShoppingCart />Cart</Link>
          <Link href={'/profile'} className='flex flex-col justify-center items-center font-semibold py-1 px-2'><User2Icon />Profile</Link>
        </div>
      </div>
    </>
  )
}
