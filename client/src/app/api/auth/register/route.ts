import { NextRequest, NextResponse } from "next/server";
import { register } from "@/lib/controllers/authController";
import { connectDB } from "@/lib/mongoose";

// POST API Call for Register Logic
export async function POST(req: NextRequest) {
    try {
        // Connect to the database
        await connectDB();

        // Parse body data and call register controller
        const data = await req.json();
        const result = await register(data);

        // Return success response
        return NextResponse.json(result, { status: 201 });

    } catch (error: unknown ) {

        // Handle all return error responses
         const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ message }, { status: 500});
    }
}