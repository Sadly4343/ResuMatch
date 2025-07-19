"use client";
import React from "react";

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32 }}>ResuMatch</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a href="/dashboard" style={{ fontWeight: 600, color: '#2196f3', textDecoration: 'none', background: '#f0f7ff', borderRadius: 8, padding: '8px 16px' }}>Dashboard</a>
          <a href="/applications" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Applications</a>
          <a href="/resumes" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Resumes</a>
          <a href="/tools" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Tools</a>
          <a href="/calendar" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Calendar</a>
        </nav>
        <div style={{ marginTop: 'auto', color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <span>↩️</span> Logout
        </div>
      </aside>
      <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Welcome back, John Doe!</div>
        <div style={{ color: '#666', marginBottom: 32 }}>Here's a quick overview of your job search progress.</div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          <section style={{ flex: 2 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Your Applications</div>
            <table style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', marginBottom: 24 }}>
              <thead>
                <tr style={{ background: '#f5f7fa', textAlign: 'left' }}>
                  <th style={{ padding: 12 }}>Job Title</th>
                  <th style={{ padding: 12 }}>Company</th>
                  <th style={{ padding: 12 }}>Status</th>
                  <th style={{ padding: 12 }}>Date Applied</th>
                  <th style={{ padding: 12 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: 12 }}>Software Engineer</td>
                  <td style={{ padding: 12 }}>Tech Solutions Inc.</td>
                  <td style={{ padding: 12 }}>Interview Scheduled</td>
                  <td style={{ padding: 12 }}>2023-10-26</td>
                  <td style={{ padding: 12 }}><button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>View</button></td>
                </tr>
                <tr>
                  <td style={{ padding: 12 }}>Product Manager</td>
                  <td style={{ padding: 12 }}>Innovate Corp.</td>
                  <td style={{ padding: 12 }}>Applied</td>
                  <td style={{ padding: 12 }}>2023-10-20</td>
                  <td style={{ padding: 12 }}><button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>View</button></td>
                </tr>
                <tr>
                  <td style={{ padding: 12 }}>UX Designer</td>
                  <td style={{ padding: 12 }}>Creative Studio</td>
                  <td style={{ padding: 12 }}>Offer Received</td>
                  <td style={{ padding: 12 }}>2023-10-15</td>
                  <td style={{ padding: 12 }}><button style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer' }}>View</button></td>
                </tr>
              </tbody>
            </table>
            <button style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16 }}>Add New Application</button>
          </section>
          <aside style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 22, color: '#2196f3' }}>3</div>
              <div style={{ color: '#888' }}>Applications in Progress</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 22, color: '#2196f3' }}>2</div>
              <div style={{ color: '#888' }}>Interviews Scheduled</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001' }}>
              <div style={{ fontWeight: 700, fontSize: 22, color: '#2196f3' }}>1</div>
              <div style={{ color: '#888' }}>Offer Received</div>
            </div>
          </aside>
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 32 }}>
          <section style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001' }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Reminders & Notifications</div>
            <ul style={{ color: '#444', fontSize: 15, paddingLeft: 18 }}>
              <li>🔔 Follow up with Tech Solutions Inc. by Nov 5th.</li>
              <li>🔔 Update status for Innovate Corp. application.</li>
              <li>✅ Interview with Creative Studio on Nov 10th.</li>
            </ul>
          </section>
          <section style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001' }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Quick Shortcuts</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button style={{ background: '#e3f2fd', color: '#2196f3', border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 600 }}>Upload Resume</button>
              <button style={{ background: '#e3f2fd', color: '#2196f3', border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 600 }}>Analyze Resume</button>
              <button style={{ background: '#e3f2fd', color: '#2196f3', border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 600 }}>Generate Cover Letter</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 