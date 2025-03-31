"use server"
import connectDB from "@/lib/mongoDB";
import UserModel from "@/models/user.model";

// GET endpoint to send OTP
export async function GET(req) {
    try {
        await connectDB();
        const { email } = await req.json();

        if (!email) {
            return Response.json({
                error: 'Email is required',
                status: 400
            });
        }

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return Response.json({
                error: 'User not found',
                status: 404
            });
        }

        // Generate OTP
        const otp = generatedOtp();
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 10);

        await UserModel.updateOne(
            { email }, {
            $set: {
                forgot_password_otp: otp,
                forgot_password_expiry: expiry
            }
        });

        return Response.json({
            message: 'OTP sent successfully',
            status: 200,
            otp
        });
    } catch (error) {
        return Response.json({
            error: error.message,
            status: 500
        });
    }
}


// POST endpoint to verify OTP
// export async function POST(request) {
//     try {
//         await connectToDB();
//         const body = await request.json();
//         const { email, otp } = body;

//         if (!email || !otp) {
//             return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
//         }

//         // Find user and verify OTP
//         const user = await User.findOne({
//             email,
//             resetPasswordOTP: otp,
//             resetPasswordOTPExpiry: { $gt: Date.now() }
//         });

//         if (!user) {
//             return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
//         }

//         // Clear OTP fields
//         user.resetPasswordOTP = undefined;
//         user.resetPasswordOTPExpiry = undefined;
//         await user.save();

//         return NextResponse.json({ success: true, message: 'OTP verified successfully' }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }