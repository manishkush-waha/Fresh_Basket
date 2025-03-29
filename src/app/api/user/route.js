"use server"

import connectDB from "@/lib/mongoDB";

export async function POST(req) {
    try {
        connectDB();
        const { userId } = await req.json();

        console.log("userId", userId);


        return new Response(JSON.stringify({ userId }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}