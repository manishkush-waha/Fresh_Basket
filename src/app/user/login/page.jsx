"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { Input } from "@/components/ui/input";
import ProfilePhoto from "@public/ProfilePhoto.jpeg";
import Image from "next/image";
import Link from "next/link";

export default function FormPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)


  const formSchema = z.object({
    email: z.string()
      .email({ message: "Please enter a valid email address" })
      .min(1, { message: "Email is required" }),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },

  })

  async function onSubmit(values, e) {
    e.preventDefault();
    setError("");

    setIsLoading(true);
    const response = await fetch('/api/user-login/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    }).then(data => {
      if (data.error) {
        setError(data.error);
      }
    }).catch(err => {
      setError('An error occurred during logging.');
    });

    console.log(values, response);
    setIsLoading(false);
  }


  return (
    <>
      <div className="flex gap-2 justify-center border-[1px]  h-[400px] border-gray-300 mx-2 sm: space-y-4 shadow-2xl rounded-3xl">
        <div className="flex flex-col justify-between w-full py-3 px-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((values, e) => onSubmit(values, e))} className="flex flex-col gap-5 sm:p-2 border-gray-300 w-full h-full">
              <h1 className="w-full flex justify-center items-center text-3xl font-bold text-gray-700">Login Form</h1>
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
                  </FormItem>
                )}
              />
              <p className="text-red-400 text-[14px] -mt-5">{error}</p>
              <Link href={'/user/forgot-password'} className="w-full flex justify-end text-blue-800 -mb-4">Forgot Password?</Link>
              <Button type="submit" className="float-right text-md cursor-pointer">{isLoading ? 'Loading...' : 'Login'}</Button>
            </form>
          </Form>
          <p>If you have'nt an account. Please <Link href={'/user/register'} className=" px-2 py-1 border-[1px] border-gray-300 rounded-md bg-gray-100">Register</Link></p>
        </div>
        <Image src={ProfilePhoto} alt="Register image" className="rounded-3xl object-cover md:flex hidden " />
      </div>
    </>
  )
}
