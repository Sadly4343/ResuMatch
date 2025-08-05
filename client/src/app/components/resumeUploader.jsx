"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function ResumeUploader({ onUploadSuccess }) {

    const { data: session } = useSession();
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [presignedUrl, setPresignedUrl] = useState(null);

    async function handleUpload() {
        if (!selectedFile) {
            alert("Must select an appropriate file first.");
            return;
        }

        const userEmail = session?.user?.email;
        if (!userEmail) {
            setError("Must be loggged in");
            return;
        }

        const key = `${userEmail}/${selectedFile.name}`;

        const formData = new FormData();
        formData.append('key', key);
        formData.append('file', selectedFile);

        setLoading(true);
        setError(null);
        setResult(null);
        setPresignedUrl(null);

        try {
            const response = await fetch(`/api/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Server issue ${response.status}: ${errorMessage}`)
            }

            const data = await response.json();
            setResult(data);
            onUploadSuccess?.(data);

        } catch (err) {
            setError("test", err.message);
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