"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { Input } from "@/components/ui/input";
import ProfilePhoto from "@public/ProfilePhoto.jpeg";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc'
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/store/userSlice";

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch();

  // if they already logged in then redirect to profile page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        router.push('/profile')
      }
    }
  }, [])

  async function googleSignIn() {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (userCredencial) => {

        const user = {
          accessToken: userCredencial.user.accessToken,
          ...userCredencial._tokenResponse,
        }
        await axios.post('/api/google-register/', user)
          .then((response) => {
            if (response.data.status !== 201) {
              return toast.error(response.data.message);
            } else {
              localStorage.setItem('accessToken', response.headers.accesstoken);
              document.cookie = `accessToken=${response.headers._accesstoken}; max-age=3600; path=/`;
              toast.success(response.data.message);
              dispatch(setUserDetails(response.data.user));
              router.push(`/profile/${response.data?.userId}`);
            }
          }).catch((error) => {
            toast.error(error.message);
          })
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      })
    setIsLoading(false);
  }

  const formSchema = z.object({
    name: z.string()
      .min(2, { message: "Username must be at least 2 characters." }),
    email: z.string()
      .email({ message: "Please enter a valid email address" })
      .min(1, { message: "Email is required" }),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    again_password: z.string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      again_password: "",
    },
  })

  async function onSubmit(values, e) {
    e.preventDefault();

    if (values.again_password !== values.password) {
      return setError("Both password must be same.")
    }
    setError("");
    const data = {
      name: values.name,
      email: values.email,
      password: values.password
    }
    setIsLoading(true);
    await axios.post('/api/user-register/', data)
      .then((response) => {
        if (response.data.status !== 201) {
          return toast.error(response.data.message);
        } else {
          localStorage.setItem('accessToken', response.headers.accesstoken);
          document.cookie = `accessToken=${response.headers.accesstoken}; max-age=3600; path=/`;
          toast.success(response.data.message);
          dispatch(setUserDetails(response.data.user));
          router.push(`/profile/${response.data?._userId}`);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
    form.resetField();
    setIsLoading(false);
  }

  return (
    <>
      <div className="flex gap-2 border-[1px] border-gray-300 mx-2 sm: shadow-2xl rounded-3xl">
        <Image src={ProfilePhoto} alt="Register image" className="rounded-3xl object-cover md:flex hidden " />
        <div className="flex justify-between flex-col w-full gap-4 py-3 px-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((values, e) => onSubmit(values, e))} className="flex flex-col gap-4 border-gray-300 w-full">
              <h1 className="text-3xl font-bold text-gray-700">Create Account</h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="your name" type={'text'} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" type={'email'} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" type={'password'} {...field} />
                    </FormControl>
                    <FormMessage>
                      Password must be minimum 8 character with atleast one uppercase, one number and one special character.
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="again_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Again password</FormLabel>
                    <FormControl>
                      <Input placeholder="again password" type={'password'} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <p className="text-red-400 text-[14px] -mt-4">{error}</p>
              <div className="flex flex-col gap-2 w-full items-center justify-between">
                <Button type="submit" className="w-full float-right text-md cursor-pointer">{isLoading ? 'Loading...' : 'Register'}</Button>
                <span className="px-2 bg-white">Or</span>
                <p className="w-full border-t-[1px] mb-3 -mt-5 -z-50"></p>
                <h1 className="flex items-center gap-1 px-2 p-1 cursor-pointer border-[1px] border-[#505050fb] rounded-md" onClick={googleSignIn}><FcGoogle /> Continue with Google</h1>
              </div>
            </form>
          </Form>
          <Link href={'/login'}><Button variant={'outline'} className='w-full border-black bg-[#e2e2e2] cursor-pointer'>Already have an account. Please Login</Button></Link>
        </div>
      </div>
    </>
  )
}
