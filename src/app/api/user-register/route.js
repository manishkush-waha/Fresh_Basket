"use server"

import connectDB from '@/lib/mongoDB';
import UserModel from '@/models/user.model';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'

export async function POST(req, res) {
  try {
    const connection = await connectDB();

    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
    }

    const user = await UserModel.create(userData);
    
    console.log("Its came here.");
    // return NextResponse.json({
    //   message: 'POST All thigs are clear',
    //   success: true,
    //   error: false
    // })
    return res.status(201).json({
      message: 'User Created',
      user: user
    })
  } catch (error) {
    return NextResponse.json({
      message: 'POST Any error hapened',
      success: false,
      error: error
    })
  }
}


