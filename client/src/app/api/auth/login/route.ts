import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/controllers/authController";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const data = await req.json();
        const result = await login(data);
        return NextResponse.json(result, { status: 201 });

    } catch (error: any ) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}