import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") return res.status(405).end();

    const { key } = req.body;
    if (!key) return res.status(400).json({ error: "No Key"});

    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
        });

        await s3.send(command);
        res.status(200).json({ success: true });

    } catch (err) {
        console.error("Delete error", err);
        res.status(500).json({ error: "Failed to delete Resume"});
    }
}