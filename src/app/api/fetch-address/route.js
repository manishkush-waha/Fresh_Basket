"use server"
import connectDB from "@/lib/mongoDB"
import AddressModel from "@/models/address.model";

export async function POST(req) {
    try {
        await connectDB();

        const form = await req.formData();
        const userId = form.get('userId');
        if (!userId) {
            return Response.json({
                message: "userId not found",
                status: 400
            })
        }

        const addDetails = await AddressModel.find({ userId })
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
            status: 500,
            error: error.message,
        })
    }
}


// export async function DELETE(req) {
//     try {
//         await connectDB();
//         // const form = await req.formData();
//         // console.log(form);
        
//         // const addId = form.get('addId');
//         console.log("log");
        
//         const addId = await req;
//         console.log("log", addId.headers);
        
//         console.log(addId);
//         if (!addId) {
//             return Response.json({
//                 message: 'Failed to delete.',
//                 status: 404
//             });
//         }

//         const user = await AddressModel.findByIdAndDelete({ addId });

//         return Response.json({
//             message: 'Address deleted successfully',
//             status: 200
//         });
//     } catch (error) {
//         return Response.json({
//             message: "Internal server error",
//             status: 500
//         })
//     }
// }