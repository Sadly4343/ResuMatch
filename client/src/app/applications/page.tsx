"use client";
import React from "react";

export default function ApplicationsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32, color: '#222' }}>ResuMatch</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a href="/dashboard" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '12px 16px', fontSize: 16, transition: 'background-color 0.2s' }}>Dashboard</a>
          <a href="/applications" style={{ fontWeight: 600, color: '#2196f3', textDecoration: 'none', background: '#f0f7ff', borderRadius: 8, padding: '12px 16px', fontSize: 16 }}>Applications</a>
          <a href="/resumes" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '12px 16px', fontSize: 16, transition: 'background-color 0.2s' }}>Resumes</a>
          <a href="/tools" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '12px 16px', fontSize: 16, transition: 'background-color 0.2s' }}>Tools</a>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222', margin: 0 }}>Applications & Resumes</h1>
            <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: 16 }}>Manage your job applications and resume collection</p>
          </div>
          <button style={{ 
            background: '#2196f3', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 8, 
            padding: '12px 24px', 
            fontWeight: 600, 
            fontSize: 16,
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#1976d2'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#2196f3'}
          >+ Add New Application</button>
        </div>
        
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 24, marginBottom: 32, border: '1px solid #eee' }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}>Your Applications</div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#666' }}>Status:</span>
              <select style={{ 
                padding: '8px 12px', 
                borderRadius: 6, 
                border: '1px solid #ddd', 
                fontSize: 14,
                outline: 'none'
              }}>
                <option>All</option>
                <option>Interview</option>
                <option>Applied</option>
                <option>Offer</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#666' }}>Sort by:</span>
              <select style={{ 
                padding: '8px 12px', 
                borderRadius: 6, 
                border: '1px solid #ddd', 
                fontSize: 14,
                outline: 'none'
              }}>
                <option>Date Applied</option>
                <option>Status</option>
              </select>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f7fa', textAlign: 'left' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: '#666', fontSize: 14 }}>Company</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: '#666', fontSize: 14 }}>Job Title</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: '#666', fontSize: 14 }}>Status</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: '#666', fontSize: 14 }}>Date Applied</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: '#666', fontSize: 14 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px 24px', color: '#222', fontSize: 14 }}>Tech Solutions Inc.</td>
                  <td style={{ padding: '16px 24px', color: '#222', fontSize: 14 }}>Software Engineer</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: 16,
                      fontSize: 12,
                      fontWeight: 600,
                      background: '#fff3e0',
                      color: '#f57c00',
                      border: '1px solid #ffcc02'
                    }}>
                      Interview
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#222', fontSize: 14 }}>2023-10-26</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#2196f3', 
                        cursor: 'pointer',
                        fontSize: 16,
                        padding: '4px'
                      }}>👁️</button>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#2196f3', 
                        cursor: 'pointer',
                        fontSize: 16,
                        padding: '4px'
                      }}>✏️</button>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#d32f2f', 
                        cursor: 'pointer',
                        fontSize: 16,
                        padding: '4px'
                      }}>🗑️</button>
                    </div>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px 24px', color: '#222', fontSize: 14 }}>Global Innovations</td>
                  <td style={{ padding: '16px 24px', color: '#222', fontSize: 14 }}>Product Manager</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: 16,
                      fontSize: 12,
                      fontWeight: 600,
                      background: '#e3f2fd',
                      color: '#1976d2',
                      border: '1px solid #bbdefb'
                    }}>
                      Applied
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#222', fontSize: 14 }}>2023-10-20</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#2196f3', 
                        cursor: 'pointer',
                        fontSize: 16,
                        padding: '4px'
                      }}>👁️</button>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#2196f3', 
                        cursor: 'pointer',
                        fontSize: 16,
                        padding: '4px'
                      }}>✏️</button>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#d32f2f', 
                        cursor: 'pointer',
                        fontSize: 16,
                        padding: '4px'
                      }}>🗑️</button>
                    </div>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px 24px', color: '#222', fontSize: 14 }}>Creative Solutions</td>
                  <td style={{ padding: '16px 24px', color: '#222', fontSize: 14 }}>UX Designer</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: 16,
                      fontSize: 12,
                      fontWeight: 600,
                      background: '#e8f5e8',
                      color: '#388e3c',
                      border: '1px solid #c8e6c9'
                    }}>
                      Offer
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#222', fontSize: 14 }}>2023-10-15</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#2196f3', 
                        cursor: 'pointer',
                        fontSize: 16,
                        padding: '4px'
                      }}>👁️</button>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#2196f3', 
                        cursor: 'pointer',
                        fontSize: 16,
                        padding: '4px'
                      }}>✏️</button>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#d32f2f', 
                        cursor: 'pointer',
                        fontSize: 16,
                        padding: '4px'
                      }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 24, border: '1px solid #eee' }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}>Your Resumes</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button style={{ 
              background: '#2196f3', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 8, 
              padding: '10px 20px', 
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#1976d2'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#2196f3'}
            >Upload New Resume</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '16px 0', 
              borderBottom: '1px solid #eee',
              fontSize: 14
            }}>
              <span style={{ color: '#222', fontWeight: 500 }}>📄 John_Doe_Resume_Software_Engineer.pdf</span>
              <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ color: '#666', fontSize: 13 }}>Uploaded: 2023-09-01</span>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#2196f3', 
                  cursor: 'pointer',
                  fontSize: 16,
                  padding: '4px'
                }}>⬇️</button>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#d32f2f', 
                  cursor: 'pointer',
                  fontSize: 16,
                  padding: '4px'
                }}>🗑️</button>
              </span>
            </li>
            <li style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '16px 0', 
              borderBottom: '1px solid #eee',
              fontSize: 14
            }}>
              <span style={{ color: '#222', fontWeight: 500 }}>📄 John_Doe_Resume_Product_Manager.pdf</span>
              <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ color: '#666', fontSize: 13 }}>Uploaded: 2023-08-15</span>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#2196f3', 
                  cursor: 'pointer',
                  fontSize: 16,
                  padding: '4px'
                }}>⬇️</button>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#d32f2f', 
                  cursor: 'pointer',
                  fontSize: 16,
                  padding: '4px'
                }}>🗑️</button>
              </span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
} 