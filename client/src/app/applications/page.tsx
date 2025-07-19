"use client";
import React from "react";

export default function ApplicationsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32 }}>ResuMatch</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a href="/dashboard" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Dashboard</a>
          <a href="/applications" style={{ fontWeight: 600, color: '#2196f3', textDecoration: 'none', background: '#f0f7ff', borderRadius: 8, padding: '8px 16px' }}>Applications</a>
          <a href="/resumes" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Resumes</a>
          <a href="/tools" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Tools</a>
          <a href="/calendar" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Calendar</a>
        </nav>
        <div style={{ marginTop: 'auto', color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <span>↩️</span> Logout
        </div>
      </aside>
      <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>Applications & Resumes</div>
          <button style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16 }}>+ Add New Application</button>
        </div>
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 18, marginBottom: 32 }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Your Applications</div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
            <div>Status: <select><option>All</option><option>Interview</option><option>Applied</option><option>Offer</option></select></div>
            <div>Sort by: <select><option>Date Applied</option><option>Status</option></select></div>
          </div>
          <table style={{ width: '100%' }}>
            <thead>
              <tr style={{ background: '#f5f7fa', textAlign: 'left' }}>
                <th style={{ padding: 12 }}>Company</th>
                <th style={{ padding: 12 }}>Job Title</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Date Applied</th>
                <th style={{ padding: 12 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: 12 }}>Tech Solutions Inc.</td>
                <td style={{ padding: 12 }}>Software Engineer</td>
                <td style={{ padding: 12 }}>Interview ▼</td>
                <td style={{ padding: 12 }}>2023-10-26</td>
                <td style={{ padding: 12 }}>
                  <button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>👁️</button>
                  <button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>✏️</button>
                  <button style={{ background: 'none', border: 'none', color: '#e53935', cursor: 'pointer' }}>🗑️</button>
                </td>
              </tr>
              <tr>
                <td style={{ padding: 12 }}>Global Innovations</td>
                <td style={{ padding: 12 }}>Product Manager</td>
                <td style={{ padding: 12 }}>Applied ▼</td>
                <td style={{ padding: 12 }}>2023-10-20</td>
                <td style={{ padding: 12 }}>
                  <button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>👁️</button>
                  <button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>✏️</button>
                  <button style={{ background: 'none', border: 'none', color: '#e53935', cursor: 'pointer' }}>🗑️</button>
                </td>
              </tr>
              <tr>
                <td style={{ padding: 12 }}>Creative Solutions</td>
                <td style={{ padding: 12 }}>UX Designer</td>
                <td style={{ padding: 12 }}>Offer ▼</td>
                <td style={{ padding: 12 }}>2023-10-15</td>
                <td style={{ padding: 12 }}>
                  <button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>👁️</button>
                  <button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>✏️</button>
                  <button style={{ background: 'none', border: 'none', color: '#e53935', cursor: 'pointer' }}>🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 18 }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Your Resumes</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
            <button style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600 }}>Upload New Resume</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <span>📄 John_Doe_Resume_Software_Engineer.pdf</span>
              <span style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: '#888', fontSize: 13 }}>Uploaded: 2023-09-01</span>
                <button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>⬇️</button>
                <button style={{ background: 'none', border: 'none', color: '#e53935', cursor: 'pointer' }}>🗑️</button>
              </span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <span>📄 John_Doe_Resume_Product_Manager.pdf</span>
              <span style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: '#888', fontSize: 13 }}>Uploaded: 2023-08-15</span>
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