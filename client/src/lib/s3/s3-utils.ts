import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// Call to S3 Bucket Setup
const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },


});

// Used to generate signed URL for storage and retrieval from bucket
export const generateSignedUrl = async (bucket: string, key: string, expresInSeconds = 300) => {
    try {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key});
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: expresInSeconds});
    return signedUrl;
    } catch {
        throw new Error("file not found or not availabe in S3 yet");
    }
}