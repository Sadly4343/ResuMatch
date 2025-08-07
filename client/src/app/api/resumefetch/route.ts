import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { generateSignedUrl } from "@/lib/s3/s3-utils";

// GET API call Returns Resume Data
export async function GET(req: NextRequest) {

    // Retrieves current users session with NextAuth
    const session = await getServerSession(authOptions);

    // If no authenticated user or email, then return 401 error 
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401});
    }


    // Retrieve filename query paramter from request URL
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");

    // If no filename return error status 400 no filename
    if (!filename) {
        return NextResponse.json({ error: "No Filename"}, { status: 400});

    }

    // Retrieve AWS bucket name from environment variables
    const bucket = process.env.AWS_BUCKET_NAME!;


    // No AWS bucket in environment variables throw error
    if (!bucket) {
        return NextResponse.json({ error: "no s3"})
    }

    // Set S3 object key value for bucket as authenticated user and filename
    const key = `${session.user.email}/${filename}`;


    try {
        // Generate signedUrl value for the storage of resumes with bucket and key values
        const url = await generateSignedUrl(bucket, key, 300);
        return NextResponse.json({ url });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to generate signed URL"}, { status: 500 });
    }
}