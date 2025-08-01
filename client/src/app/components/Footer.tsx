import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: '#fff',
      borderTop: '1px solid #eee',
      padding: '2rem 3rem',
      marginTop: 'auto',
      color: '#666',
      fontSize: 14
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 1200,
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <div style={{ fontWeight: 600, color: '#222', fontSize: 16 }}>
            ResuMatch
          </div>
          <span style={{ color: '#999' }}>•</span>
          <span>AI-powered job search platform</span>
        </div>
        
        <div style={{ color: '#999', fontSize: 12 }}>
          © 2025 ResuMatch. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 