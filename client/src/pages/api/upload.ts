import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

function parseForm(req: NextApiRequest): Promise<{ file: formidable.File; key: string }> {
  return new Promise((resolve, reject) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      let file = files.file as formidable.File | formidable.File[];
      if (Array.isArray(file)) file = file[0];
      if (!file) return reject(new Error("No file uploaded"));
      let key: string | undefined;
      if (Array.isArray(fields.key)) {
        key = fields.key[0];
      } else {
        key = fields.key;
      }
      if (!key) return reject(new Error("No S3 key provided"));
      resolve({ file, key });
    });
  });
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { file, key } = await parseForm(req);

    const fileStream = fs.createReadStream(file.filepath);
    const fileName = `${Date.now()}-${file.originalFilename}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: fileStream,
      ContentType: file.mimetype ?? undefined,
    };

    await s3.send(new PutObjectCommand(params));
    return res.status(200).json({
      message: "File uploaded to S3 Bucket",
      fileName,
      uploadDate: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message =  error instanceof Error ? error.message : "Failed to upload"; 
    return res.status(500).json({ error:message });
  }
}