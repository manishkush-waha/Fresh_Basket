"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Logo from '@public/TempLogo.jpg'
import ProfileImage from '@public/ProfilePhoto.jpeg'
import { Menu, Moon, Search, ShoppingCart, Sun, User2Icon } from 'lucide-react'
import { Button } from './ui/button'

export default function Header() {
    const [isDark, setIsDark] = useState(false);
    const [isLogedIn, setIsLogedIn] = useState(false);


    return (
        <>
            <div className='fixed flex w-full border-b-[1px] border-gray-300 shadow-md bg-gray-100'>
                <div className='md:max-w-[1000px] w-full mx-auto flex justify-between items-center p-1 '>
                    <div>
                        <Link href={'/'}><Image src={Logo} alt='Logo' className='w-[100px] rounded-2xl shrink-1' /></Link>
                    </div>
                    <div className='hidden sm:flex md:max-w-[400px] justify-between items-center gap-4 w-full border-[1px] border-gray-300 bg-gray-100 p-1 px-4 mx-5 rounded-full'>
                        <input type="text" placeholder='Search your product here...' className='outline-none border-none w-full' />
                        <Search className='font-bold' />
                    </div>
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
                        <div>
                            {
                                isLogedIn ?
                                    <Link href={'/profile'}>
                                        <Image src={ProfileImage} width={40} alt='ProfileImage' className='bg-gray-300 rounded-full my-1 border-[1px] border-gray-300' />
                                    </Link>
                                    :
                                    <div className='flex items-center gap-2'>
                                        <Link href={'/user/register'}>
                                            <Button variant={'outline'} className={`rounded-full cursor-pointer`}>Register</Button>
                                        </Link>
                                        <Link href={'/user/login'}>
                                            <Button className={`rounded-full cursor-pointer`}>Login</Button>
                                        </Link>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
