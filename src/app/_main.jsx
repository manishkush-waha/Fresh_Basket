"use client"
import { setUserDetails } from '@/store/userSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Loading from './loading';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import Footer from '@/components/Footer';

export default function MainPage({ children }) {
    const router = useRouter();
    const [userType, setUserType] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    async function getUserData() {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setUserType('USER');
        }
        if (accessToken) {
            const response = await axios.post('/api/fetch-user/', { accessToken });
            if (response.data.user) {
                if (response.data.user.role == 'SHOPOWNER') {
                    setUserType('SHOPOWNER');
                    router.push('/shop-dashboard/');
                } else {
                    setUserType('USER');
                }
            } else {
                toast.error('Failed to fetch user data');
            }
            dispatch(setUserDetails(response.data.user));
            setLoading(false);
        }
        setLoading(false);
    }
    useEffect(() => {
        getUserData();
    }, [])

    if (loading) {
        return (
            <>
                <Loading />
            </>
        )
    }

    if (userType === 'SHOPOWNER') {
        return (
            <>
                {children}
            </>
        )
    }

    if (userType === 'USER') {
        return (
            <>
                <Header />
                <Tabs />
                <div className='py-20 md:max-w-[1000px] w-full mx-auto'>
                    {children}
                </div>
                <Footer />
            </>
        )
    }
}
