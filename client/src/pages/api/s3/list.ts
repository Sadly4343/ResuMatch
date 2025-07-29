import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: "unautorized"});
  }

  const userEmail = session.user.email; // Replace with real user email if you have auth
  const prefix = `${userEmail}/`;

  try {
    const data = await s3.send(
      new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Prefix: prefix,
      })
    );
    res.status(200).json({ files: data.Contents || [] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to list";
    res.status(500).json({ error: message });
  }
}