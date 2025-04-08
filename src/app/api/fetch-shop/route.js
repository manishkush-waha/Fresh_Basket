"use server"
import connectDB from "@/lib/mongoDB";
import shopOwnerModel from "@/models/shopOwner.model";
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        await connectDB();
        const { accessToken } = await req.json();
        console.log(accessToken);

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
        const shopId = jwt.decode(accessToken);
        console.log(shopId);
        const shop = await shopOwnerModel.findById(shopId);

        if (!shop) {
            return Response.json(
                { message: "Something goes wrong" },
                { status: 404 }
            );
        }

        return Response.json({
            message: "shop fetched successfully",
            shop,
            status: 201,
        });
    } catch (error) {
        return Response.json(
            { message: "Error fetching users", error: error.message },
            { status: 500 }
        );
    }
}