"use client";
import React, { useEffect, useState } from "react";

interface S3File {
    Key: string;
    [key: string]: unknown;
}

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
          </li>
        ))}
      </ul>
    </div>
  );
}