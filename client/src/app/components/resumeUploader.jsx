"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

// Resume Upload Function to Upload to S3 Bucket for Storage with presigned URL
export default function ResumeUploader({ onUploadSuccess }) {

    const { data: session } = useSession();

    // Holds the file selected by user for upload 
    const [selectedFile, setSelectedFile] = useState(null);

    // Indicates if an upload is currently in progress
    const [loading, setLoading] = useState(false);

    // Holds the result of the upload
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // Stores S3 presigned URL for uploading the file
    const [presignedUrl, setPresignedUrl] = useState(null);

    // Handles Resume Upload to S3 Bucket
    async function handleUpload() {

        // Ensure a file selected before upload
        if (!selectedFile) {
            alert("Must select an appropriate file first.");
            return;
        }
        
        // Retrieve user's email from session
        const userEmail = session?.user?.email;

        // If no email  throw error
        if (!userEmail) {
            setError("Must be logged in");
            return;
        }

        // Presigned URL Key construction from email & file name
        const key = `${userEmail}/${selectedFile.name}`;

        // Form data for submission attach key and selectedfile
        const formData = new FormData();
        formData.append('key', key);
        formData.append('file', selectedFile);

        // Reset states before upload
        setLoading(true);
        setError(null);
        setResult(null);
        setPresignedUrl(null);

        try {
            // Call the API route to upload File
            const response = await fetch(`/api/upload`, {
                method: "POST",
                body: formData,
            });

            // If response fails throw error
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Server issue ${response.status}: ${errorMessage}`)
            }

            // Parse response JSON and update state
            const data = await response.json();
            setResult(data);

            // Call the success callback 
            onUploadSuccess?.(data);
        } catch (err) {
            setError("Failure uploading file", err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding:10, border: "3px solid black", borderRadius: 20}}>
            <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => setSelectedFile(e.target.files[0])}/>
            <button onClick={handleUpload} disabled={loading}> {loading ? "Uploading..." : " Upload Resume"} </button>

            {error && <p style={{ color: "blue"}}> {error}</p>}
            {result && (
                <div style={{ background: "green", padding: 5, marginTop: 5}}>
                    <h4>Upload Success!</h4>
                    <p><strong>File:</strong> {result.fileName}</p>
                </div>
            )}
        </div>
    )
}