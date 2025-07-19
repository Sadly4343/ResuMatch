"use client";
import React from "react";

export default function ToolsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32 }}>ResuMatch</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a href="/dashboard" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Dashboard</a>
          <a href="/applications" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Applications</a>
          <a href="/resumes" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Resumes</a>
          <a href="/tools" style={{ fontWeight: 600, color: '#2196f3', textDecoration: 'none', background: '#f0f7ff', borderRadius: 8, padding: '8px 16px' }}>Tools</a>
          <a href="/calendar" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Calendar</a>
        </nav>
        <div style={{ marginTop: 'auto', color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <span>↩️</span> Logout
        </div>
      </aside>
      <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
        <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Tools & Calendar</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
          <section style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001' }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Resume Analysis Tool</div>
            <div style={{ marginBottom: 12 }}>
              <select style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd', marginBottom: 8 }}>
                <option>Select Resume</option>
              </select>
              <textarea placeholder="Paste Job Description or upload" style={{ width: '100%', minHeight: 60, borderRadius: 8, border: '1px solid #ddd', padding: 8 }} />
            </div>
            <button style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 600 }}>Analyze Resume</button>
            <div style={{ marginTop: 16, color: '#888', fontSize: 15 }}>Gap report and suggestions will appear here after analysis.</div>
          </section>
          <section style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001' }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Cover Letter Generator</div>
            <div style={{ marginBottom: 12 }}>
              <select style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd', marginBottom: 8 }}>
                <option>Select Resume</option>
              </select>
              <textarea placeholder="Paste Job Description" style={{ width: '100%', minHeight: 60, borderRadius: 8, border: '1px solid #ddd', padding: 8 }} />
            </div>
            <button style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 600 }}>Generate Cover Letter</button>
            <textarea readOnly placeholder="Generated cover letter will appear here..." style={{ width: '100%', minHeight: 60, borderRadius: 8, border: '1px solid #ddd', padding: 8, marginTop: 12 }} />
          </section>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <section style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001' }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Calendar View</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <button style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 16px', fontWeight: 600 }}>Add Reminder</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, background: '#f5f7fa', borderRadius: 8, padding: 8 }}>
                {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(day => <div key={day} style={{ textAlign: 'center', fontWeight: 600, color: '#888' }}>{day}</div>)}
                {[...Array(30)].map((_,i) => <div key={i} style={{ textAlign: 'center', padding: 6, color: '#222', fontWeight: 500 }}>{i+1}</div>)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 14, color: '#888' }}>
              <span>● Interview</span>
              <span>● Deadline</span>
              <span>● Follow-up</span>
            </div>
          </section>
          <section style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001' }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Email Notification Settings</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input type="checkbox" defaultChecked /> Stagnant Application Reminders
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input type="checkbox" /> Interview Reminders
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input type="checkbox" defaultChecked /> Application Deadline Alerts
              </label>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 