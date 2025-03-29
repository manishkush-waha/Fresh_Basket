"use server";
import connectDB from "@/lib/mongoDB";
import UserModel from "@/models/user.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return Response.json({
        message: 'User not found.',
        status: 404
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json({
        message: 'Invalid email or password.',
        status: 401
      })
    }
    const token = jwt.sign({ userId: user._id }, (process.env.JWT_SECRET_KEY_ACCESS_TOKEN), { expiresIn: '7d' });
    await UserModel.updateOne({ email }, { accessToken: token });

    const response = Response.json({
      message: 'Login successful',
      status: 201
    });

    response.headers.set('accessToken', token);
    return response;
  } catch (error) {
    return Response.json({
      message: 'Server error',
      status: 400,
      error: error
    })
  }
}