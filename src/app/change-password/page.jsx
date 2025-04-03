"use client"
import { setUserDetails } from '@/store/userSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function ChangePassword() {
  const user = useSelector((state) => (state.user));
  const [password, setPassword] = useState('');
  const [againPassword, setAgainPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const dispach = useDispatch();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== againPassword) {
      return toast.error('Both password must be same.');
    }

    const Data = {
      userId: user?._id,
      password
    }

    setLoading(true);
    await axios.post('/api/change-password/', Data)
      .then((response) => {
        if (response.data.status == 200) {
          toast.success(response.data.message);
          router.back();
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
    setLoading(false);
    setPassword('');
    setAgainPassword('');
  }
  return (
    <>
      <div className='w-full h-auto'>
        <div className='w-[380px] sm:w-[500px] mx-auto flex flex-col gap-5 p-10 border-[1px] shadow-2xl rounded-2xl'>
          <h1 className='w-full flex justify-center items-center font-bold text-3xl'>Change Password</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <label htmlFor="password" className='flex flex-col gap-1 font-bold'>
              Password:
              <input type="password" placeholder='new password' id='password' onChange={(e) => { setPassword(e.target.value) }} className='font-semibold border-[1px] px-2 rounded-sm py-1' />
            </label>
            <label htmlFor="again_password" className='flex flex-col gap-1 font-bold'>
              Again Password:
              <input type='password' placeholder='again password' id='again_password' onChange={(e) => { setAgainPassword(e.target.value) }} className='font-semibold border-[1px] px-2 rounded-sm py-1' />
            </label>
            <button type='submit' className='bg-blue-600 text-white w-fit flex justify-end px-2 rounded-sm text-md py-1'>{loading ? 'Loading...' : 'Change Password'}</button>
          </form>
        </div>
      </div>
    </>
  )
}
