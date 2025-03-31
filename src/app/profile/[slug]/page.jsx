"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { LucideUser } from 'lucide-react';


export default function ProfilePage() {
  const user = useSelector((state) => state?.user)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  try {
    // useEffect(() => {
    //   if (typeof window !== 'undefined') {
    //     const accessToken = localStorage.getItem('accessToken');
    //     if (!accessToken) {
    //       router.push('/login');
    //     }
    //   }
    // }, [])
  } catch (error) {
    setError(error.message);
  } finally {
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return (
      <section >
        <div className='m-3 flex items-center justify-evenly flex-col sm:flex-row gap-9'>
          <div className='flex flex-col gap-3'>
            <div className='h-24 w-24 flex justify-center items-center bg-blue-100 rounded-full border-2 '>
              {
                user?.avatar
                  ? <img src={user?.ava} alt="User Profile" />
                  : <LucideUser size={80} />
              }
            </div>
            <div className='flex  flex-col items-center justify-center'>
              <Button> Edit</Button>
            </div>
          </div>
          <div className=' flex text-left sm:text-left'>
            <p className='font-bold  text-left sm:text-left text-2xl'>
              {user?.name}
            </p>
          </div>
        </div>
        <hr />
        <div className='m-8 mt-3 flex flex-col font-semibold '>
          <div className='flex flex-col gap-3 sm:ml-56'>
            <p>My Order</p>
            <p>My Order History</p>
            <p>Save address</p>
            <p>policy and licence </p>
            <p>Help Center</p>
            <p></p>

          </div>
          <hr />
          <div className='mt-2 mb-2 sm:ml-60'>
            <button>want to sell</button>
          </div>
          <hr />
          <div className='mt-2 sm:ml-60'>
            <button> Logout</button>
          </div>
        </div>

      </section>
    )
  }
}
