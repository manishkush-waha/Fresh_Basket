"use server"
import connectDB from '@/lib/mongoDB';
import UserModel from '@/models/user.model';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'

export async function POST(req, res) {
  try {
    // const connection = await connectDB();

    const { name, email, password } = await req.json();

    console.log("yaha aa raha hai", email);
    // const foundUser = await UserModel.findOne({ email });

    // console.log(foundUser);
    // if (foundUser) {
    //   return Response.json({
    //     message: 'User already exist',
    //     status: 409
    //   })
    // }
    // const hashedPassword = await bcrypt.hash(password, 10);

    // const userData = {
    //   name,
    //   email,
    //   password: hashedPassword,
    // }

    // const user = await UserModel.create(userData);

    console.log("try code executed.");
    return Response.json({
      message: 'User created',
      success: true,
      error: false
    })
  } catch (error) {
    console.log("catch code executed.");
    return Response.json({
      message: 'server error',
      success: false,
      error: error
    })
  }
}


