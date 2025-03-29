"use client"
import axios from 'axios';
import jwt from 'jsonwebtoken'
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                toast.error("Please login first");
                router.push('/login');
                setLoading(false);
                return;
            }
            const decodedToken = jwt.decode(accessToken);
            try {
                const response = await axios.post('/api/user/', { userId: decodedToken?.userId });
                if (response.status === 201) {
                    console.log('User data:', response.data.user);
                    setUser(response.data.user);
                } else {
                    toast.error("Error fetching user data");
                }
            } catch (error) {
                toast.error("Error fetching user data");
                console.error('Error fetching user data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]); // Empty dependency array means this runs once on mount

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};