import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--background)',
      borderTop: '1px solid var(--border)',
      padding: '2rem 3rem',
      marginTop: 'auto',
      color: 'var(--text-secondary)',
      fontSize: 14
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 16 }}>
            ResuMatch
          </div>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span>AI-powered job search platform</span>
        </div>
        
        <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>
          © 2025 ResuMatch. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 