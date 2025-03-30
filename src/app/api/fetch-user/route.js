"use server"
import connectDB from "@/lib/mongoDB";
import jwt from "jsonwebtoken";
import UserModel from "@/models/user.model";

export async function POST(req) {
    try {
        await connectDB();
        const { accessToken } = await req.json();
        if (!accessToken) {
            return Response.json({
                message: "Access token not found",
                status: 401,
            });
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY_ACCESS_TOKEN);
        if (!decoded) {
            return Response.json(
                { message: "Invalid access token" },
                { status: 401 }
            );
        }
        const userId = jwt.decode(accessToken).userId;
        const user = await UserModel.findById(userId);

        if (!user) {
            return Response.json(
                { message: "Some goes wrong" },
                { status: 404 }
            );
        }

        return Response.json({
            message: "User fetched successfully",
            user,
            status: 201,
        });
    } catch (error) {
        return Response.json(
            { message: "Error fetching users", error: error.message },
            { status: 500 }
        );
    }
}

// export async function POST(req) {
//     try {
//         await connectDB();
//         const accessToken = await req.json();

//         if (!accessToken) {
//             return Response.json({
//                 message: "Access token not found",
//                 status: 401,
//             });
//         }

//         const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY_ACCESS_TOKEN);
//         if (!decoded) {
//             return Response.json(
//                 { message: "Invalid access token" },
//                 { status: 401 }
//             );
//         }
//         const userId = jwt.decode(accessToken).userId;

//         const user = await UserModel.findById(userId);

//         if (!user) {
//             return Response.json(
//                 { message: "Some goes wrong" },
//                 { status: 404 }
//             );
//         }

//         return Response.json({
//             message: "User fetched successfully",
//             user,
//             status: 201,
//         });
//     } catch (error) {
//         return Response.json(
//             { message: "Error fetching users", error: error.message },
//             { status: 500 }
//         );
//     }
// }