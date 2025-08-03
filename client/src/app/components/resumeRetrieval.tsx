"use client";
import React, { useEffect, useState } from "react";
import styles from './resumeRetrieval.module.css';

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
          console.error("Error fetchign Resumes", err);
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
    console.error("Error fetchign Signed URLS", err);
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
    console.error("Error Deleting Resumes", err);
    alert("error deleting resume");

  } finally {
    setLoadingLink(null);
  }
}



return (
    <div>
        <h2 style={{ color: 'black',fontSize: "30px", fontWeight: 'bolder', display: 'flex', justifyContent: 'center'}}>Uploaded Resumes</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red"}}> {error}</p>}
        <ul className={styles.resumeList}>
            {files.map((file: S3File) => (
            <li key={file.Key}
            className={styles.resumeItem}>
              <span className={styles.fileName}>
              {file.Key.split("/").pop()}
              </span>
              <button
                onClick={() => handleViewClick(file.Key)}
                disabled={loadingLink === file.Key}
                                style={{ marginLeft: 10, background: loadingLink === file.key ? "#cdd0ffff" : "#482fd3ff",
                  color: "#fff", border: "none", borderRadius: 6, padding: "5px 15px", fontWeight: 600, cursor: loadingLink === file.Key ? "not-allowed" : "pointer", transition: "background 0.2s"}}
          >View</button>
          
           <button
                onClick={() => handleViewDelete(file.Key)}
                disabled={loadingLink === file.Key}
                style={{ marginLeft: 10, background: loadingLink === file.key ? "#ffcdd2" : "#d32f2f",
                  color: "#fff", border: "none", borderRadius: 6, padding: "5px 15px", fontWeight: 600, cursor: loadingLink === file.Key ? "not-allowed" : "pointer", transition: "background 0.2s"}}
          >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}