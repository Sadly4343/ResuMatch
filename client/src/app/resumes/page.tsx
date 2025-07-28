"use client";
import React from "react";

import ResumeUploader from "../components/resumeUploader";

interface UploadResult {
  message: string;
  fileUrl: string;
  fileName: string;
  uploadDate: string;
}

export default function ResumesPage() {
  const handleUploadSuccess = (data: UploadResult) => {
    console.log("uploaded", data);
  }
  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32 }}>ResuMatch</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a href="/dashboard" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Dashboard</a>
          <a href="/applications" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Applications</a>
          <a href="/resumes" style={{ fontWeight: 600, color: '#2196f3', textDecoration: 'none', background: '#f0f7ff', borderRadius: 8, padding: '8px 16px' }}>Resumes</a>
          <a href="/tools" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Tools</a>
          <a href="/calendar" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Calendar</a>
        </nav>
        <div style={{ marginTop: 'auto', color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <span>↩️</span> Logout
        </div>
      </aside>
      <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>Resume Management</div>
          <button style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16 }}>Upload New Resume</button>
        </div>
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 18 }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Your Resumes</div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📄</span>
                <span>John_Doe_Resume_Software_Engineer.pdf</span>
              </span>
              <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ color: '#888', fontSize: 13 }}>Uploaded: 2023-09-01</span>
                <button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>⬇️</button>
                <button style={{ background: 'none', border: 'none', color: '#e53935', cursor: 'pointer' }}>🗑️</button>
              </span>
            </li>
            <ResumeUploader onUploadSuccess={handleUploadSuccess}/>
            <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📄</span>
                <span>John_Doe_Resume_Product_Manager.pdf</span>
              </span>
              <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ color: '#888', fontSize: 13 }}>Uploaded: 2023-08-15</span>
                <button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>⬇️</button>
                <button style={{ background: 'none', border: 'none', color: '#e53935', cursor: 'pointer' }}>🗑️</button>
              </span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📄</span>
                <span>John_Doe_Resume_UX_Designer.pdf</span>
              </span>
              <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ color: '#888', fontSize: 13 }}>Uploaded: 2023-07-20</span>
                <button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>⬇️</button>
                <button style={{ background: 'none', border: 'none', color: '#e53935', cursor: 'pointer' }}>🗑️</button>
              </span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
} 