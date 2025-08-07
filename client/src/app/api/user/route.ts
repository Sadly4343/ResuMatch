import { NextRequest, NextResponse } from "next/server";

import { authenticate } from "@/lib/auth";
import {
    getCurrentUser,
} from "@/lib/controllers/authController";
import User from "@/lib/models/User";

// GET API Route retrieve current User from the Database
export async function GET(req: NextRequest) {
    try {
        //Authenticate current request and retrieve user
        const authUser = await authenticate(req);

        // Type guard to ensure authUser has a valid email value
        if (
            !authUser ||
            typeof authUser !== "object" ||
            !("email" in authUser) ||
            typeof (authUser as { email?: unknown }).email !== "string"
        ) {
            return NextResponse.json({ message: "Invalid auth" }, { status: 401 });
        }

        // Retrieve email property from the auth user
        const email = (authUser as { email: string }).email;

        // Retrieves user in database by email
        const user = await User.findOne({ email });

        // Returns error if user is not found.
        if (!user) {
            return NextResponse.json({ message: "User isn't found" }, { status: 404 });
        }

        // Retrieves current user data
        const result = await getCurrentUser(user);

        // Returns the user data as a JSON Response
        return NextResponse.json(result);

    } catch (error: unknown) {
        // Handles any errors unknown and will return 500 status 
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ message }, { status: 500 });
    }
}