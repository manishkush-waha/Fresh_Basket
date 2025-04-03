"use server"

import connectDB from "@/lib/mongoDB"
import UserModel from "@/models/user.model";
import bcrypt from 'bcryptjs'


export async function POST(req) {
    try {
        await connectDB();

        const { userId, password } = await req.json();
        console.log(userId, password);
        if (!userId && !password) {
            return Response.json({
                message: "Provide userId and password",
                status: 404
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });
        
        if (!user) {
            return Response.json({
                message: "Failed to change password.",
                status: 400
            })
        }

        return Response.json({
            message: "Successfully changed your password.",
            status: 200,
            user
        })
    } catch (error) {
        return Response.json({
            message: 'Internal server error',
            status: 500,
            error
        })
    }
}