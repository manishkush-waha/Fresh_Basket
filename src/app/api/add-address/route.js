"use server"
import connectDB from "@/lib/mongoDB"
import AddressModel from "@/models/address.model";
import UserModel from "@/models/user.model";



export async function POST(req) {
    try {
        await connectDB();

        const { address } = await req.json();
        const { address_line, city, state, pincode, country, mobile, userId } = address;

        if (!address_line || !city || !state || !pincode || !country || !mobile) {
            return Response.json({
                message: "Please fill all the fields",
                status: 400
            })
        }

        const addData = await AddressModel.create(address);
        const addressId = addData?._id
        const user = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $push: { address_details: addressId } },
            { new: true }
        );

        if (!user) {
            return Response.json({
                message: "Address not added",
                status: 400
            })
        }

        return Response.json({
            message: "Address added successfully",
            status: 200,
            address_details: user?.address_details
        })

    } catch (error) {
        return Response.json({
            message: error.message,
            status: 500
        })
    }
}