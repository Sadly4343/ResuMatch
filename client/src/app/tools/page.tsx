"use client";
import React from "react";

export default function ToolsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32, color: '#222' }}>ResuMatch</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a href="/dashboard" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '12px 16px', fontSize: 16, transition: 'background-color 0.2s' }}>Dashboard</a>
          <a href="/applications" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '12px 16px', fontSize: 16, transition: 'background-color 0.2s' }}>Applications</a>
          <a href="/resumes" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '12px 16px', fontSize: 16, transition: 'background-color 0.2s' }}>Resumes</a>
          <a href="/tools" style={{ fontWeight: 600, color: '#2196f3', textDecoration: 'none', background: '#f0f7ff', borderRadius: 8, padding: '12px 16px', fontSize: 16 }}>Tools</a>
          <a href="/calendar" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '12px 16px', fontSize: 16, transition: 'background-color 0.2s' }}>Calendar</a>
        </nav>
        <div style={{ marginTop: 'auto', color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <span>↩️</span> 
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: 15,
              cursor: 'pointer',
              padding: 0
            }}
          >
            Logout
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222', margin: 0 }}>Tools & Calendar</h1>
          <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: 16 }}>AI-powered tools to enhance your job search</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
          <section style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0001', border: '1px solid #eee' }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}>Resume Analysis Tool</div>
            <div style={{ marginBottom: 16 }}>
              <select style={{ 
                width: '100%', 
                padding: '12px 16px', 
                borderRadius: 8, 
                border: '1px solid #ddd', 
                marginBottom: 12,
                fontSize: 14,
                outline: 'none'
              }}>
                <option>Select Resume</option>
              </select>
              <textarea 
                placeholder="Paste Job Description or upload" 
                style={{ 
                  width: '100%', 
                  minHeight: 80, 
                  borderRadius: 8, 
                  border: '1px solid #ddd', 
                  padding: '12px 16px',
                  fontSize: 14,
                  outline: 'none',
                  resize: 'vertical'
                }} 
              />
            </div>
            <button style={{ 
              background: '#2196f3', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 8, 
              padding: '12px 24px', 
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#1976d2'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#2196f3'}
            >Analyze Resume</button>
            <div style={{ marginTop: 16, color: '#666', fontSize: 14 }}>Gap report and suggestions will appear here after analysis.</div>
          </section>
          
          <section style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0001', border: '1px solid #eee' }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}>Cover Letter Generator</div>
            <div style={{ marginBottom: 16 }}>
              <select style={{ 
                width: '100%', 
                padding: '12px 16px', 
                borderRadius: 8, 
                border: '1px solid #ddd', 
                marginBottom: 12,
                fontSize: 14,
                outline: 'none'
              }}>
                <option>Select Resume</option>
              </select>
              <textarea 
                placeholder="Paste Job Description" 
                style={{ 
                  width: '100%', 
                  minHeight: 80, 
                  borderRadius: 8, 
                  border: '1px solid #ddd', 
                  padding: '12px 16px',
                  fontSize: 14,
                  outline: 'none',
                  resize: 'vertical'
                }} 
              />
            </div>
            <button style={{ 
              background: '#2196f3', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 8, 
              padding: '12px 24px', 
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#1976d2'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#2196f3'}
            >Generate Cover Letter</button>
            <textarea 
              readOnly 
              placeholder="Generated cover letter will appear here..." 
              style={{ 
                width: '100%', 
                minHeight: 80, 
                borderRadius: 8, 
                border: '1px solid #ddd', 
                padding: '12px 16px', 
                marginTop: 12,
                fontSize: 14,
                outline: 'none',
                resize: 'vertical',
                background: '#f9f9f9'
              }} 
            />
          </section>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <section style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0001', border: '1px solid #eee' }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}>Calendar View</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <button style={{ 
                  background: '#2196f3', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '8px 16px', 
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#1976d2'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#2196f3'}
                >Add Reminder</button>
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gap: 2, 
                background: '#f5f7fa', 
                borderRadius: 8, 
                padding: 16,
                border: '1px solid #eee'
              }}>
                {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(day => (
                  <div key={day} style={{ 
                    textAlign: 'center', 
                    fontWeight: 600, 
                    color: '#666',
                    fontSize: 12,
                    padding: '8px 4px'
                  }}>
                    {day}
                  </div>
                ))}
                {[...Array(30)].map((_,i) => (
                  <div key={i} style={{ 
                    textAlign: 'center', 
                    padding: 8, 
                    color: '#222', 
                    fontWeight: 500,
                    fontSize: 14,
                    cursor: 'pointer',
                    borderRadius: 4,
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => (e.target as HTMLDivElement).style.background = '#e3f2fd'}
                  onMouseOut={(e) => (e.target as HTMLDivElement).style.background = 'transparent'}
                  >
                    {i+1}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#666' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#2196f3', fontSize: 16 }}>●</span> Interview
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#f57c00', fontSize: 16 }}>●</span> Deadline
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#388e3c', fontSize: 16 }}>●</span> Follow-up
              </span>
            </div>
          </section>
          
          <section style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0001', border: '1px solid #eee' }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}>Email Notification Settings</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#222' }}>
                <input type="checkbox" defaultChecked style={{ width: 16, height: 16 }} /> 
                Stagnant Application Reminders
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#222' }}>
                <input type="checkbox" style={{ width: 16, height: 16 }} /> 
                Interview Reminders
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#222' }}>
                <input type="checkbox" defaultChecked style={{ width: 16, height: 16 }} /> 
                Application Deadline Alerts
              </label>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 