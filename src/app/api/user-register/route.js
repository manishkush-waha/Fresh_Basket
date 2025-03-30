"use server"
import connectDB from '@/lib/mongoDB';
import UserModel from '@/models/user.model';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const foundUser = await UserModel.findOne({ email });
    if (foundUser) {
      return Response.json({
        message: 'User already exist',
        status: 409
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      name,
      email,
      password: hashedPassword,
    }

    const user = await UserModel.create(userData);
    const token = jwt.sign({ userId: user._id }, (process.env.JWT_SECRET_KEY_ACCESS_TOKEN), { expiresIn: '7d' });
    await UserModel.updateOne({ email }, { accessToken: token });

    const response = Response.json({
      message: 'User Created',
      status: 201
    });

    response.headers.set('accessToken', token);
    return response;
  } catch (error) {
    return Response.json({
      message: 'server error',
      success: false,
      error: error
    })
  }
}


