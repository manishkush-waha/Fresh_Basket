"use client"
import { setShopDetails } from '@/store/shopSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Loading from '../loading';

export default function ShopDashboard() {
  const shopDetails = useSelector((state) => state.shop);
  const [loading, setLoading] = useState(false)
  const dispath = useDispatch();

  async function handleFetch() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return toast.info('Access Token not found');
    }
    console.log(accessToken);


    const form = new FormData();
    form.set('accessToken', accessToken);
    setLoading(true);
    await axios.post('/api/fetch-shop/', form)
      .then((response) => {
        dispath(setShopDetails(response.data.shop))
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
    setLoading(false);
    console.log(shopDetails);
  }

  useEffect(() => {
    handleFetch();
  })

  if (loading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <>
      <div className='md:max-w-[1000px] w-full mx-auto'>
        <div>
          shop page
        </div>
      </div>
    </>
  )
}