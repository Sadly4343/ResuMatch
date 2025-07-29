import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/auth";
import {
    getUserApplications,
    createApplication,
} from "@/lib/controllers/applicationController";
import { connectDB } from "@/lib/mongoose";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await authenticate(req);
        const userId = (user as { id: string }).id;
        const applications = await getUserApplications(userId);
        return NextResponse.json(applications);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ message }, { status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await authenticate(req);
        const userId = (user as { id: string }).id;
        const data = await req.json();
        const application = await createApplication(userId, data);
        return NextResponse.json(application, { status: 201 });
    } catch (error: unknown){
     const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ message }, { status: 500});
    }
}