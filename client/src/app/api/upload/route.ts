// File for setting up resume uploads to AWS Bucket.

import { NextRequest, NextResponse } from "next/server";
import { S3 } from "aws-sdk";
import formidable from "formidable";

export const config = {
    api: {
        bodyParser: false,
    }
}

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.ACCESS_REGION,

});

async function parseForm(req: NextRequest): Promise<{ file: any}> {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req as any, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ file: files.file});
        });
    });

}

export async function POST(req: NextRequest) {
    try {
        const { file } = await parseForm(req);


    if (!file) {
        return NextResponse.json({ error: "No File Uploaded" }), { status: 400 };
    }

    const fileName = `${Date.now()}-${file.originalFilename}`;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `resumes/${fileName}`,
        Body: file.filepath ? require("fs").createReadStream(file.filepath) : file,
        ContentType: file.mimetype,
        ACL: "private",
    };

    const uploadFinal = await s3.upload(params).promise();

    return NextResponse.json({
        message: "File uploaded to S3 Bucket",
        fileUrl: uploadFinal.Location,
        fileName,
        uploadDate: new Date().toISOString(),
    });
} catch (error: any) {
    console.error("S3 upload error", error);
    return NextResponse.json({ error: "failed to upload the resume"}, { status: 500 });
}

}
