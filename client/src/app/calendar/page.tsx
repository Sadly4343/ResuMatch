"use client";
import React from "react";

export default function CalendarPage() {
  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32 }}>ResuMatch</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a href="/dashboard" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Dashboard</a>
          <a href="/applications" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Applications</a>
          <a href="/resumes" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Resumes</a>
          <a href="/tools" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Tools</a>
          <a href="/calendar" style={{ fontWeight: 600, color: '#2196f3', textDecoration: 'none', background: '#f0f7ff', borderRadius: 8, padding: '8px 16px' }}>Calendar</a>
        </nav>
        <div style={{ marginTop: 'auto', color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <span>↩️</span> Logout
        </div>
      </aside>
      <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>Calendar</div>
          <button style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16 }}>Add Event</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
          <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 18 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>November 2023</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, background: '#f5f7fa', borderRadius: 8, padding: 8 }}>
              {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(day => <div key={day} style={{ textAlign: 'center', fontWeight: 600, color: '#888', padding: 8 }}>{day}</div>)}
              {[...Array(30)].map((_,i) => (
                <div key={i} style={{ 
                  textAlign: 'center', 
                  padding: 8, 
                  color: '#222', 
                  fontWeight: 500,
                  background: i === 25 ? '#e3f2fd' : 'transparent',
                  borderRadius: i === 25 ? 4 : 0,
                  position: 'relative'
                }}>
                  {i+1}
                  {i === 25 && <div style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', fontSize: 8, color: '#2196f3' }}>●</div>}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 14, color: '#888', marginTop: 12 }}>
              <span>● Interview</span>
              <span>● Deadline</span>
              <span>● Follow-up</span>
            </div>
          </section>
          <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 18 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Upcoming Events</div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ fontWeight: 600, color: '#2196f3' }}>Nov 5</div>
                <div>Follow up with Tech Solutions Inc.</div>
              </li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ fontWeight: 600, color: '#e53935' }}>Nov 10</div>
                <div>Interview with Creative Studio</div>
              </li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ fontWeight: 600, color: '#ff9800' }}>Nov 15</div>
                <div>Application deadline - Global Innovations</div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
} 