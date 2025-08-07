import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/controllers/authController";
import { connectDB } from "@/lib/mongoose";

// POST API Call for Login Logic
export async function POST(req: NextRequest) {
    try {
        // Connect to database
        await connectDB();
        
        // Parse the body data and calls the login controller
        const data = await req.json();
        const result = await login(data);

        // Returns success respons
        return NextResponse.json(result, { status: 201 });

    
    } catch (error: unknown ) {
        // Handle any errors and return status
         const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ message }, { status: 500});
    }
}