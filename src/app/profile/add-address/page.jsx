"use client"
import { handleAddAddress } from '@/store/addressSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function AddAddressPage() {
    const user = useSelector((state) => state?.user);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [address, setAddress] = useState({
        address_line: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",
        userId: user._id,
    })

    async function HandleSavaAddress(e) {
        e.preventDefault();
        
        setLoading(true);
        await axios.post('/api/add-address/', { address })
            .then((response) => {
                if (response.status === 200) {
                    toast.success(response.data.message);
                    router.back();
                    setLoading(false);
                }
            })
            .catch((error) => {
                toast.error(error.message);
            })
        setLoading(false);
    }

    return (
        <section className='w-full flex flex-col gap-3 px-5'>
            <div className='w-full flex flex-col gap-3'>
                <h1 className='w-full flex justify-center items-center text-3xl font-bold'>Add Address</h1>
                <p className='text-gray-600'>Add your address details here</p>
            </div>
            <form className='flex flex-col gap-5 p-5 border-[1px] border-gray-300 rounded-md shadow-md' onSubmit={HandleSavaAddress}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="" className='flex flex-col font-bold'>
                        Address Line:
                        <input type="text" placeholder="address line" className='border-[1px] border-gray-300 p-2 rounded-md font-medium' required
                            onChange={(e) => setAddress({ ...address, address_line: e.target.value })} />
                    </label>
                    <label htmlFor="" className='flex flex-col font-bold'>
                        City:
                        <input type="text" placeholder="City" className='border-[1px] border-gray-300 p-2 rounded-md font-medium' required
                            onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                    </label>
                    <label htmlFor="" className='flex flex-col font-bold'>
                        State:
                        <input type="text" placeholder="State" className='border-[1px] border-gray-300 p-2 rounded-md font-medium' required
                            onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                    </label>
                    <label htmlFor="" className='flex flex-col font-bold'>
                        Pincode:
                        <input type="text" placeholder="Pincode" className='border-[1px] border-gray-300 p-2 rounded-md font-medium' required
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                    </label>
                    <label htmlFor="" className='flex flex-col font-bold'>
                        Country:
                        <input type="text" placeholder="Country" className='border-[1px] border-gray-300 p-2 rounded-md font-medium' required
                            onChange={(e) => setAddress({ ...address, country: e.target.value })} />
                    </label>
                    <label htmlFor="" className='flex flex-col font-bold'>
                        Mobile:
                        <input type="text" placeholder="Mobile" className='border-[1px] border-gray-300 p-2 rounded-md font-medium' required
                            onChange={(e) => setAddress({ ...address, mobile: e.target.value })} />
                    </label>
                </div>
                <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded-md'>{loading ? "Loading..." : "Add Address"}</button>
            </form>
        </section>
    )
}
