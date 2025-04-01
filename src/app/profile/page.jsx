"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function ProfilePage() {
    const router = useRouter();

    // if they already not logged in then redirect to profile page
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                router.push('/login')
            }
        }
    }, [])
}
