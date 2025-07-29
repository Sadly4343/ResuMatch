"use client";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import React, { useEffect, useState } from "react";

interface S3File {
    Key: string;
    [key: string]: unknown;
}
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default function ResumeList() {
    const [files, setFiles] = useState<S3File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingLink, setLoadingLink] = useState<string | null>(null);

    useEffect(() => {

        const fetchFiles = async () => {

        setLoading(true);
        setError(null);

        try{
            const res = await fetch("/api/s3/list");
            if (!res.ok) throw new Error("Failed to fetch the Resumes");
            const data = await res.json();
            setFiles(data.files || []);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("unknown error");
          }


        } finally {
            setLoading(false);
        }
    };
    fetchFiles();


}, [] );

const handleViewClick = async (key: string) => {
  setLoadingLink(key);
  try {
    const filename = key.split("/").pop() ?? "";
    const res = await fetch(`/api/resumefetch?filename=${encodeURIComponent(filename)}`);
    const data = await res.json();
    if (res.ok && data.url) {
      window.open(data.url, "_blank");
    } else {
      alert(data.error || "Failed to get signed URL")
    } 

  } catch (err) {
    alert("Error fetching signed URL");
  } finally {
    setLoadingLink(null);
  }
}

const handleViewDelete = async (key: string) => {
  setLoadingLink(key);
  try {
    const res = await fetch("/api/s3/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ key }),
    })

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Failed to delete Resume");
    }

    setFiles((prev) => prev.filter((f) => f.Key !== key));
  } catch (err) {
    alert("error deleting resume");

  } finally {
    setLoadingLink(null);
  }
}



return (
    <div>
        <h2>Uploaded Resumes</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red"}}> {error}</p>}
        <ul>
            {files.map((file: S3File) => (
            <li key={file.Key}>
              {file.Key.split("/").pop()}
              <button
                onClick={() => handleViewClick(file.Key)}
                disabled={loadingLink === file.Key}
                style={{ marginLeft: 10}}
          >View</button>
          
           <button
                onClick={() => handleViewDelete(file.Key)}
                disabled={loadingLink === file.Key}
                style={{ marginLeft: 10}}
          >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}