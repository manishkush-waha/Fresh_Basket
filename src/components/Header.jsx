"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from '@public/TempLogo.jpg'
import { Moon, Search, ShoppingCart, Sun, User2Icon } from 'lucide-react'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUserDetails } from '@/store/userSlice'
import { useRouter } from 'next/navigation'

export default function Header() {
    const user = useSelector((state) => state?.user)
    const [isDark, setIsDark] = useState(false);
    const [showprofile, setShowprofile] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();


    try {

        async function getUserData() {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const response = await axios.post('/api/fetch-user/', { accessToken });
                if (response.data) {

                } else {
                    toast.error('Failed to fetch user data');
                }
                dispatch(setUserDetails(response.data.user));
            }
        }
        useEffect(() => {
            getUserData();
        }, [])
    } catch (error) {
        console.log(error.message);
    } finally {
        return (
            <>
                <header className='fixed flex w-full border-b-[1px] border-gray-300 shadow-md bg-gray-100'>
                    <div className='md:max-w-[1000px] w-full mx-auto flex justify-between items-center p-1 '>
                        <div>
                            <Link href={'/'}><img src={Logo} alt='Logo' className='w-[100px] rounded-2xl shrink-1' /></Link>
                        </div>
                        <Link href={'/search'} className='hidden sm:flex md:max-w-[400px] justify-between items-center gap-4 w-full border-[1px] border-gray-300 bg-gray-100 p-1 px-4 mx-5 rounded-full'>
                            <p className='outline-none border-none w-full text-[#8a8a8a]'>Search your product here...</p>
                            <Search className='font-bold' />
                        </Link>
                        <div className='flex gap-5 items-center'>
                            <div className='flex gap-5 items-center'>
                                <Link href={'/cart'}><ShoppingCart /></Link>
                                {
                                    isDark ?
                                        <Sun className='cursor-pointer' onClick={() => setIsDark(!isDark)} />
                                        :
                                        <Moon className='cursor-pointer' onClick={() => setIsDark(!isDark)} />
                                }
                            </div>
                            {
                                <div className='relative w-[50px] rounded-full my-1' >
                                    <div onClick={() => { setShowprofile(!showprofile) }} className='w-full h-full rounded-full border-[1px]  cursor-pointer flex justify-center items-center'>
                                        {
                                            user.avatar
                                                ? <img src={user?.avatar} alt='ProfileImage' width={40} height={40} className='border-[2px] border-gray-300 w-full h-full rounded-full' />
                                                : <User2Icon className='w-full h-full rounded-full' />
                                        }
                                    </div>
                                    <div className={`absolute top-[100%] rounded right-0 h-auto w-[150] sm:w-[250px] shadow-lg p-2 bg-[#d3d3d3] ${showprofile ? 'flex' : 'hidden'}`}>
                                        {
                                            user.avatar
                                                ? <div className='w-full flex flex-col gap-2'>
                                                    <div>
                                                        <h1 className='text-lg font-bold capitalize'>{user?.name}</h1>
                                                    </div>
                                                    <Link href={`/profile/${user?._id}`} onClick={() => setShowprofile(!showprofile)}><Button variant={'outline'} className='flex justify-start rounded cursor-pointer border-[1px] w-full float-start'>Profile</Button></Link>
                                                    <Link href={'/orders'} onClick={() => setShowprofile(!showprofile)}><Button variant={'outline'} className='flex justify-start rounded cursor-pointer border-[1px] w-full float-start'>Orders</Button></Link>
                                                    <Link href={'/categories'} onClick={() => setShowprofile(!showprofile)}><Button variant={'outline'} className='flex justify-start rounded cursor-pointer border-[1px] w-full float-start'>Categories</Button></Link>
                                                    <hr />
                                                    <Button variant={'outline'} onClick={() => {
                                                        setShowprofile(!showprofile);
                                                        localStorage.removeItem('accessToken');
                                                        dispatch(logout());
                                                        toast.success('Logout successfully')
                                                        router.push('/login/');
                                                    }} className='cursor-pointer'>Logout</Button>
                                                </div>
                                                : <div className='w-full p-2 h-full flex flex-col items-center gap-2'>
                                                    <Link href={'/register'} className='w-full' onClick={() => setShowprofile(!showprofile)}>
                                                        <Button variant={'outline'} className={`rounded-full cursor-pointer w-full`}>Register</Button>
                                                    </Link>
                                                    <Link href={'/login'} className='w-full' onClick={() => setShowprofile(!showprofile)}>
                                                        <Button className={`rounded-full cursor-pointer w-full`}>Login</Button>
                                                    </Link>
                                                </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </header>
            </>
        )
    }
}
