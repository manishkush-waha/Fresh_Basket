"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const user = useSelector((state)=> state?.user)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  try {
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          router.push('/login');
        }
      }
    }, [])
  } catch (error) {
    setError(error.message);
  } finally {
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return (
      <>
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className='text-2xl font-bold'>Profile Page</h1>
          <div className='flex flex-col items-center justify-center'>
            <h2 className='text-xl font-bold'>{user?.name}</h2>
            <p className='text-gray-500'>{user?.email}</p>
          </div>
        </div>
      </>
    )
  }
}
