import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { generateSignedUrl } from "@/lib/s3/s3-utils";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401});
    }

    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");

    if (!filename) {
        return NextResponse.json({ error: "No Filename"}, { status: 400});

    }

    const bucket = process.env.AWS_BUCKET_NAME!;
    if (!bucket) {
        return NextResponse.json({ error: "no s3"})
    }
    const key = `${session.user.email}/${filename}`;

    try {
        const url = await generateSignedUrl(bucket, key, 300);
        return NextResponse.json({ url });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to generate signed URL"}, { status: 500 });
    }
}