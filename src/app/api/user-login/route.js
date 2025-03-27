import connectDB from "@/lib/mongoDB";
import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    console.log("it start here");
    
    const connection = await connectDB();

    const { email, password } = await req.json();
    console.log(email, password);
    

    const user = await UserModel.find(email);

    console.log(user);

    if (!user) {
      console.log("it comming here");
      
      return NextResponse.json({
        message: 'User not found.'
      })
    }

    console.log(user);
    

    return NextResponse.json({
      message: 'All thigs are clear',
      success: true,
      error: false
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Any error hapened',
      success: false,
      error: error
    })
  }
}