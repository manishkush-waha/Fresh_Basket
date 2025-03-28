import connectDB from "@/lib/mongoDB";
import UserModel from "@/models/user.model";
import jwt from 'jsonwebtoken'



export async function PUT(req, res) {
    try {
        const { displayName, email, emailVerified, photoUrl, accessToken, refreshToken } = await req.json();

        await connectDB();
        const data = {
            name: displayName,
            email,
            avatar: photoUrl,
            emailVerified,
        }

        const foundUser = await UserModel.findOne({ email });
        if (foundUser) {
            return Response.json({
                message: 'User already exist',
                status: 409
            })
        }

        const user = await UserModel.create(data);

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY_ACCESS_TOKEN, { expiresIn: '7d' });

        const response = Response.json({
            message: 'User Created',
            status: 201
        });

        response.headers.set('_accessToken', token);
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