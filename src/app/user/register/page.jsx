"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { Input } from "@/components/ui/input";
import ProfilePhoto from "@public/ProfilePhoto.jpeg";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { toast } from "react-toastify";

export default function FormPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)


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
    const response = await axios.post('/api/user-register/', data);

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    form.resetField();
    setIsLoading(false);
  }


  return (
    <>
      <div className="flex gap-2 border-[1px] h-[480px] border-gray-300 mx-2 sm: shadow-2xl rounded-3xl">
        <Image src={ProfilePhoto} alt="Register image" className="rounded-3xl object-cover md:flex hidden " />
        <div className="flex justify-between flex-col w-full py-3 px-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((values, e) => onSubmit(values, e))} className="flex flex-col gap-4 border-gray-300 w-full">
              <h1 className="w-full flex justify-center items-center text-3xl font-bold text-gray-700">Register Form</h1>
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
              <Button type="submit" className="float-right text-md cursor-pointer">{isLoading ? 'Loading...' : 'Register'}</Button>
            </form>
          </Form>
          <p>If you already have an account. Please <Link href={'/user/login'} className=" px-2 py-1 border-[1px] border-gray-300 rounded-md bg-gray-100">Login</Link></p>
        </div>
      </div>
    </>
  )
}
