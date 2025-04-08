"use server"
import { uploadToCloudinary } from "../_utils/uploadImageClodinary";
import connectDB from "@/lib/mongoDB";
import shopOwnerModel from "@/models/shopOwner.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const userId = formData.get('userId');
        const name = formData.get('name');
        const password = formData.get('password');
        const email = formData.get('email');
        const logo = formData.get('logo');
        const banner = formData.get('banner');
        const shopName = formData.get('shopName');
        const description = formData.get('description');
        const contactNumber = formData.get('contactNumber');
        const address_line = formData.get('address_line');
        const city = formData.get('city');
        const state = formData.get('state');
        const country = formData.get('country');
        const pincode = formData.get('pincode');

        const imageUris = {
            logo: null,
            banner: null,
        }

        console.log('1');
        
        // Upload logo to Cloudinary
        if (logo) {
            const fileBuffer = await logo.arrayBuffer();
            const mimeType = logo.type;
            const encoding = "base64";
            const base64Data = Buffer.from(fileBuffer).toString("base64");
            const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
            const res = await uploadToCloudinary(fileUri, logo.name);
            
            imageUris.logo = res.result.secure_url;
            if (!res.success) {
                return new Response('Failed to upload logo', { status: 500 });
            }
        }
        
        // Upload banner to Cloudinary
        console.log('2');
        if (banner) {
            const fileBuffer = await banner.arrayBuffer();
            const mimeType = banner.type;
            const encoding = "base64";
            const base64Data = Buffer.from(fileBuffer).toString("base64");
            const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
            const res = await uploadToCloudinary(fileUri, banner.name);
            
            imageUris.banner = res.result.secure_url;
            if (!res.success) {
                return new Response('Failed to upload banner', { status: 500 });
            }
        }

        console.log('3');
        await connectDB();
        
        // Hash the password
        console.log('4');
        const hashedPassword = await bcrypt.hash(password, 10);
        const shopDetails = {
            name,
            email,
            password: hashedPassword,
            shopLogo: imageUris.logo,
            shopBannerImage: imageUris.banner,
            shopName,
            description,
            shopOwner: userId,
            contactNumber,
            address_line,
            city,
            state,
            country,
            pincode,
        };
        
        console.log('5');
        const shop = await shopOwnerModel.create(shopDetails);
        if (!shop) {
            return Response.json({
                message: 'Failed to create shop',
                status: 500
            });
        }
        console.log('6');
        const token = jwt.sign({ shopId: shop._id }, (process.env.JWT_SECRET_KEY_ACCESS_TOKEN), { expiresIn: '7d' });
        const myShop = shopOwnerModel.updateOne({ email }, { accessToken: token });
        
        return Response.json({
            message: 'Shop created successfully',
            shop: myShop,
            status: 201
        });
    } catch (error) {
        return Response.json({
            message: 'Internal server error',
            status: 500,
        });
    }
}