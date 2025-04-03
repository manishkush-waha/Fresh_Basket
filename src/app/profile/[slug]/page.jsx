"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ArrowBigRightDashIcon, LogOut, LucideUser, Pencil } from 'lucide-react';
import Link from 'next/link';
import { logout, updatedAvatar } from '@/store/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '@/app/loading';
import { handleAddAddress } from '@/store/addressSlice';


export default function ProfilePage() {
  const user = useSelector((state) => state?.user)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addressDetails, setAddressDetails] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        router.push('/login');
      }
    }
  }, [])


  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return toast.error("Image not selected");
    }
    const blob = new Blob([file], { type: file.type });
    const form = new FormData();
    form.set('avatar', blob);
    form.set('userId', user?._id)
    try {
      setLoading(true)
      const response = await axios.post('/api/upload-image/', form);
      dispatch(updatedAvatar(response.data.user?.avatar));
      toast.success("Avatar updated, Please refresh.")
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }


  async function fetchAddressDetails() {
    const form = new FormData();
    form.set('userId', user?._id);
    await axios.post('/api/fetch-address/', form)
      .then((response) => {
        if (response.data.status === 200) {
          setAddressDetails(response.data?.addDetails)
          // dispatch(handleAddAddress(response.data?.addDetails));
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }
  useEffect(() => {
    fetchAddressDetails();
  }, []);


  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <>
       {error}
      </>
    )
  }

  return (
    <section >
      <div className='m-3 flex items-center justify-evenly flex-col sm:flex-row gap-9'>
        <div className='flex flex-col gap-3'>
          <div className='relative h-26 w-26 flex justify-center items-center cursor-pointer bg-blue-100 rounded-full border-2 -z-20'>
            {
              user?.avatar
                ? <img src={user?.avatar} alt="User Profile" className='rounded-full -z-10' />
                : <LucideUser size={90} />
            }
          </div>
          <label htmlFor="uploadImage" className='cursor-pointer z-[1000px] bg-gray-50 p-1 -mt-12 w-fit rounded-full border-[1px] hover:bg-gray-200 '>
            <Pencil className='p-[3px]' />
            <input type="file" id='uploadImage' placeholder='Select' accept='image/*' onChange={handleUploadAvatarImage} className='hidden' />
          </label>
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
            addressDetails[0]
              ? <div className='flex flex-col'>
                <p className='w-full font-bold'>{addressDetails[0].pincode}</p>
                <div className='w-full '>
                  <p>{addressDetails[0].address_line}</p>
                  <p>{addressDetails[0].city}</p>
                </div>
                <div className='w-full flex gap-2'>
                  <i>{addressDetails[0].state},</i>
                  <i>{addressDetails[0].country}</i>
                </div>
              </div>
              : <button className='px-2 py-1 bg-blue-600 text-white cursor-pointer rounded-sm' onClick={() => { router.push('/profile/add-address/') }}>Add Address</button>
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
