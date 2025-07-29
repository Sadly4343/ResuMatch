import { NextRequest, NextResponse } from "next/server";

import { authenticate } from "@/lib/auth";
import {
    getCurrentUser,
} from "@/lib/controllers/authController";

export async function GET(req: NextRequest) {
    try {
        const user = await authenticate(req);
        const result = await getCurrentUser(user);
        return NextResponse.json(result);

    }  catch (error: unknown ) {
         const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ message }, { status: 500});
    }
}