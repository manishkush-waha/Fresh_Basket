import connectDB from "@/lib/mongoDB";
import UserModel from "@/models/user.model";



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
        console.log(user);

        return Response.json({
            message: 'User Created',
            status: 201
        })
    } catch (error) {
        return Response.json({
            message: 'Server error',
            status: 400,
            success: false,
            error: error
        })

    }
}