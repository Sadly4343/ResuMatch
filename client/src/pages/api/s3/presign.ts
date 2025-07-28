import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;
  if (!key || typeof key !== "string") {
    return res.status(400).json({ error: "Missing or invalid key" });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5 minutes
    res.status(200).json({ url });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to generate pre-signed URL" });
  }
}