import React, { useEffect, useState } from "react";

interface S3File {
    Key: string;
    [key: string]: any;
}

export default function ResumeList() {
    const [files, setFiles] = useState<S3File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchFiles = async () => {

        setLoading(true);
        setError(null);

        try{
            const res = await fetch("/api/s3/list");
            if (!res.ok) throw new Error("Failed to fetch the Resumes");
            const data = await res.json();
            setFiles(data.files || []);
        } catch (err: any) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };
    fetchFiles();


}, [] );

return (
    <div>
        <h2>Uploaded Resumes</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red"}}> {error}</p>}
        <ul>
            {files.map((file: S3File) => (
            <li key={file.Key}>
            <a
              href={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${file.Key}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.Key.split("/").pop()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}