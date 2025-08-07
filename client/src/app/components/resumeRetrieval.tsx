"use client";
import React, { useEffect, useState } from "react";
import styles from './resumeRetrieval.module.css';

// Interface representing an S3 file object with a required 'Key' property
interface S3File {
    Key: string;
    [key: string]: unknown;
}

// Function to retrieve Resume List from S3 Bucket
export default function ResumeList() {

  // Files: array of S3file objects
  // Loading: indicator if data is currently loading
  // Error: holds the error message or null
  // LoadingLink: holds loading link string or null

    const [files, setFiles] = useState<S3File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingLink, setLoadingLink] = useState<string | null>(null);

    // useEffect hook to fetch data async when components or dependencies change
    useEffect(() => {

      // Async function to fetch files
        const fetchFiles = async () => {
        
        // Sets loading true and clear any previous errors before try block
        setLoading(true);
        setError(null);

        // Calls API to retrieve list of resumes from database
        try{
            const res = await fetch("/api/s3/list");
            if (!res.ok) throw new Error("Failed to fetch the Resumes");
            const data = await res.json();
            setFiles(data.files || []);
          
          // Handles errors during Resumes
        } catch (err) {
          console.error("Error fetching Resumes", err);
          if (err instanceof Error) {

            setError(err.message);
          } else {
            // Unknown error else block
            setError("unknown error");
          }

          // Resets loading to false when succesful or fails
        } finally {
            setLoading(false);
        }
    };
    //Calls to the async fetchFiles function
    fetchFiles();


}, [] );

// Retrieves a specific resume when the view button click is clicked
const handleViewClick = async (key: string) => {
  setLoadingLink(key);
  try {
    // Retrieves filename from full S3 Key and fetches signed URL as JSON value
    const filename = key.split("/").pop() ?? "";
    const res = await fetch(`/api/resumefetch?filename=${encodeURIComponent(filename)}`);
    const data = await res.json();

    // If successful, opens the resume document in a new browser window
    if (res.ok && data.url) {
      window.open(data.url, "_blank");
    } else {
      alert(data.error || "Failed to get signed URL")
    } 

    // Throws error during retrieving Signed Urls
  } catch (err) {
    console.error("Error fetching Signed URLS", err);
    alert("Error fetching signed URL");
  } finally {
    // Reset loading link state after complete call
    setLoadingLink(null);
  }
}

// Deletes a specific resume when the delete button click is clicked
const handleViewDelete = async (key: string) => {
  setLoadingLink(key);
  try {
    // Sends DELETE request to remove resume from S3 with key
    const res = await fetch("/api/s3/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ key }),
    })

    const data = await res.json();
    // Alert if failed to delete Resume
    if (!res.ok) {
      alert(data.error || "Failed to delete Resume");
    }
    // Remove deleted file from local react state
    setFiles((prev) => prev.filter((f) => f.Key !== key));
  } catch (err) {
    
    // Catches any errors for deleting resumes
    console.error("Error Deleting Resumes", err);
    alert("error deleting resume");

      // Reset loading link state after complete call
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