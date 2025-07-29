import { NextRequest, NextResponse } from "next/server";

import { authenticate } from "@/lib/auth";
import {
    getCurrentUser,
} from "@/lib/controllers/authController";
import User from "@/lib/models/User";


export async function GET(req: NextRequest) {
    try {
        const authUser = await authenticate(req);

        // Type guard to ensure authUser has email
        if (
            !authUser ||
            typeof authUser !== "object" ||
            !("email" in authUser) ||
            typeof (authUser as { email?: unknown }).email !== "string"
        ) {
            return NextResponse.json({ message: "Invalid auth" }, { status: 401 });
        }

        const email = (authUser as { email: string }).email;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User isn't found" }, { status: 404 });
        }

        const result = await getCurrentUser(user);
        return NextResponse.json(result);

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ message }, { status: 500 });
    }
}