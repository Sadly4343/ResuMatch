import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { authenticate } from "@/lib/auth";
import {
    getCurrentUser,
} from "@/lib/controllers/authController";

export async function GET(req: NextRequest) {
    try {
        const user = await authenticate(req);
        const result = await getCurrentUser(user);
        return NextResponse.json(result);

    } catch (error: any ) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
}