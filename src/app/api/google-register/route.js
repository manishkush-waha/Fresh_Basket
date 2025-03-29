import connectDB from "@/lib/mongoDB";
import UserModel from "@/models/user.model";
import jwt from 'jsonwebtoken'



export async function POST(req) {
    try {
        await connectDB();
        
        const { displayName, email, emailVerified, photoUrl } = await req.json();
        const userData = {
            name: displayName,
            email,
            password: email,
            avatar: photoUrl,
            emailVerified,
        }

        const foundUser = await UserModel.findOne({ email });
        if (foundUser) {
            return Response.json({
                message: 'User already exist, Please login.',
                status: 409
            })
        }

        const user = await UserModel.create(userData);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY_ACCESS_TOKEN, { expiresIn: '7d' });
        await UserModel.updateOne({ email }, { accessToken: token });

        const response = Response.json({
            message: 'User Created',
            status: 201
        });

        response.headers.set('accessToken', token);
        return response;
    } catch (error) {
        return Response.json({
            message: 'Server error',
            status: 400,
            success: false,
            error: error
        })

    }
}