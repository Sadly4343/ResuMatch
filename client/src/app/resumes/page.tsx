"use client";
import React from "react";

import ResumeUploader from "../components/resumeUploader";
import ResumeList from "../components/resumeRetrieval";

import { useRef } from "react";



interface UploadResult {
  message: string;
  fileUrl: string;
  fileName: string;
  uploadDate: string;
}

export default function ResumesPage() {
  

  const dialogBox = useRef<HTMLDialogElement>(null);

  const handleOpen = () => {
    dialogBox.current?.showModal();

  };

  const handleClose = () => {
    dialogBox.current?.close();
  }

  const handleUploadSuccess = (data: UploadResult) => {
    console.log("uploaded", data);
  }


  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32 }}>ResuMatch</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a href="/dashboard" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Dashboard</a>
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
          <button onClick={handleOpen} style={{  background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16 }}>Upload New Resume</button>
          <dialog ref={dialogBox} style={{ padding: '50px', color: 'black', backgroundColor: '#2196f3', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
              <ResumeUploader onUploadSuccess={handleUploadSuccess} />
              <button onClick={handleClose} style={{margin: 'px', textAlign: 'center'}}>Close</button>
          </dialog>
        </div>
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 18 }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Your Resumes</div>
            <ResumeList />
    
        </section>
      </main>
    </div>
  );
} 