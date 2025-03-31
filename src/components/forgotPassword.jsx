"use client";
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    async function GetCode() {
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }
        axios.get(`/api/forgot-password/${email}/`)
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {
                toast.error(error.message);
            })
    }

    async function varifyOtp() {

        axios.post('/api/forgot-password/',)
    }

    return (
        <div className="w-full flex justify-center ">
            <div className=" px-4 bg-gray-100 mx-auto rounded-xl gap-4 flex p-5 flex-col justify-center items-center">
                <h1 className='text-3xl font-bold'>Forgot Password</h1>

                <div className="w-full flex flex-col items-center justify-center">
                    <h2 className=''>Hello Valued Customer!</h2>
                    <p className='w-full flex justify-center items-center'>Thank you for Registering. Please verify your email address to get started.</p>
                </div>

                <div className="flex flex-col gap-2">
                    <form className='flex flex-col gap-1 w-full' action={GetCode}>
                        <label htmlFor="email" className='font-bold'>Enter your email</label>
                        <div className='flex gap-1'>
                            <input type="email" placeholder='email' id='email' className="w-full px-2 h-8 border-[1px] rounded-md border-[#a8a8a8] flex items-center justify-center" onChange={(e) => { setEmail(e.target.value) }} />
                            <button className='font-bold bg-blue-600 rounded-md text-nowrap text-white px-2 cursor-pointer'>Get code</button>
                        </div>

                    </form>
                    <p className='font-bold'>Enter the 6-digit code sent to your email:</p>
                    <div className='flex gap-4'>
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                className="w-10 h-10 border-[1px] rounded-md border-[#a8a8a8] flex items-center justify-center"
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                            />
                        ))}
                    </div>

                    <button disabled className="px-2 bg-blue-600 text-xl font-bold text-white py-1 rounded-xl disabled:cursor-no-drop disabled:bg-gray-500" onClick={varifyOtp}>Verify OTP</button>

                    <div className="flex gap-2">
                        <p>Didn't receive the code?</p>
                        <button disabled className="px-1 text-blue-800 cursor-pointer rounded disabled:cursor-no-drop">Resend Code</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;