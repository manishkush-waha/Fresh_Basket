"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ArrowBigRightDashIcon, LogOut, LucideUser, Pencil } from 'lucide-react';
import Link from 'next/link';
import { logout } from '@/store/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';


export default function ProfilePage() {
  const user = useSelector((state) => state?.user)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addressId, setAddressId] = useState({
    path: useParams()
  });
  const [userAddressId, setUserAddressId] = useState([])
  const router = useRouter();
  const dispatch = useDispatch();


  try {
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          router.push('/login');
        }
      }
    }, [])

    async function fetchAddressDetails() {
      console.log("Manish kushwaha");

      await axios.post('/api/fetch-address/', { myAddress: addressId.path })
      //   .then((response) => {
      //     if (response.data.status === 200) {
      //       console.log(response.data);
      //       setUserAddressId([response.data.addDetails]);
      //       toast.success(response.data.message)
      //     } else {
      //       console.log(response.data);
      //     }
      //   })
      //   .catch((error) => {
      //     toast.error(error.message);
      //   })
    }

    useEffect(() => {
      fetchAddressDetails();
    }, [user?.address_details[0]]);


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
            <div className='relative h-26 w-26 flex justify-center items-center bg-blue-100 rounded-full border-2 -z-20'>
              {
                user?.avatar
                  ? <img src={user?.avatar} alt="User Profile" className='rounded-full -z-10' />
                  : <LucideUser size={90} />
              }
              <div className='absolute cursor-pointer bg-white rounded-full p-2 top-[65%] left-[65%] border-[1px]'>
                <Pencil size={20} color='blue' className='cursor-pointer' />
              </div>
            </div>
          </div>
          <div className='flex flex-col text-left sm:text-left gap-1 items-center justify-center'>
            <p className='font-bold  text-left sm:text-left text-2xl'>
              {user?.name}
            </p>
            <p className=' text-md text-gray-600'>
              {user?.email}
            </p>
          </div>
          <div className='hidden md:flex flex-col gap-2'>
            {
              user?.address_details[0]
                ? <div>
                  <p className='text-md text-gray-600'>Address</p>
                </div>
                : <button className='px-2 py-1 bg-blue-600 text-white cursor-pointer rounded-md' onClick={() => { router.push('/profile/add-address/') }}>Add Address</button>
            }
          </div>
        </div>
        <hr />
        <div className='flex flex-col gap-10 font-semibold p-5'>
          <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-2 w-full'>
              <Link href='/orders/' className='w-full flex justify-between items-center px-4 py-2 text-nowrap border-[1px] border-gray-400 rounded-md capitalize'>My Order<ArrowBigRightDashIcon /></Link>
              <Link href='/order-history/' className='w-full flex justify-between items-center px-4 py-2 text-nowrap border-[1px] border-gray-400 rounded-md capitalize'>My Order History<ArrowBigRightDashIcon /></Link>
              <Link href='/saved-address/' className='w-full flex justify-between items-center px-4 py-2 text-nowrap border-[1px] border-gray-400 rounded-md capitalize'>Saved address<ArrowBigRightDashIcon /></Link>
              <div className='flex gap-2'>
                <Link href='/my-wishlist/' className='w-full flex justify-between items-center px-4 py-2 text-nowrap border-[1px] border-gray-400 rounded-md capitalize'>My Wishlist<ArrowBigRightDashIcon /></Link>
                <Link href='/change-password/' className='w-full flex justify-between items-center px-4 py-2 text-nowrap border-[1px] border-gray-400 rounded-md capitalize'>Change Password<ArrowBigRightDashIcon /></Link>
              </div>
            </div>
            <div className='flex w-full flex-col gap-2'>
              <Link href='/privacy-policy' className='w-full flex justify-between items-center px-4 py-2 text-nowrap border-[1px] border-gray-400 rounded-md capitalize'>policy and licence <ArrowBigRightDashIcon /></Link>
              <Link href='/faqs' className='w-full flex justify-between items-center px-4 py-2 text-nowrap border-[1px] border-gray-400 rounded-md capitalize'>Help with FAQs<ArrowBigRightDashIcon /></Link>
            </div>
            <Link href='/shop-dashboard' className='w-full flex justify-between items-center px-4 py-2 text-nowrap border-[1px] border-gray-400 rounded-md capitalize'>Want to sell<ArrowBigRightDashIcon /></Link>
          </div>
          <button className='border-[1px] border-gray-400 rounded-md capitalize w-full flex justify-between items-center px-4 py-2 text-nowrap' onClick={() => {
            localStorage.removeItem('accessToken');
            dispatch(logout());
            toast.success('Logout successfully')
            router.push('/login/')
          }}>Logout <LogOut /></button>
        </div>
      </section >
    )
  }
}
