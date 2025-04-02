"use server"
import connectDB from "@/lib/mongoDB";
import { uploadToCloudinary } from "../_utils/uploadImageClodinary";
import UserModel from "@/models/user.model";

export async function POST(req) {
   try {
      const formData = await req.formData();
      const file = formData.get("avatar");
      const fileBuffer = await file.arrayBuffer();
      const mimeType = file.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
      const res = await uploadToCloudinary(fileUri, file.name);
      
      await connectDB();
      const userId = formData.get("userId");
      const avatar =  res.result.secure_url;
      const user = await UserModel.findByIdAndUpdate(userId, { avatar });

      if (res.success && res.result) {
         return Response.json({
            message: "success",
            user
         });
      }
      
      return Response.json({ 
         message: "failure",
         status: 400
      });

   } catch (error) {
      return Response.json({
         message: 'Internal server error',
         status: 500
      })
   }
}