"use server"

import connectDB from "@/lib/mongoDB"
import AddressModel from "@/models/address.model";


export async function POST(req) {
    try {
        console.log("first");
        await connectDB();
        console.log("first");
        const { myAddress } = req.json();
        
        console.log("first");
        console.log(myAddress);
        if (!myAddress) {
            return Response.json({
                message: "addressId not found",
                status: 400
            })
        }
        
        console.log("first");
        const addDetails = await AddressModel.findById({ myAddress });
        
        console.log(addDetails);
        console.log("first");
        if (!addDetails) {
            return Response.json({
                message: "Address not found",
                status: 400
            })
        }

        return Response.json({
            message: "Address fetched successfully",
            status: 200,
            addDetails
        })
    } catch (error) {
        return Response.json({
            message: "Internal server error",
            status: 500
        })
    }
}