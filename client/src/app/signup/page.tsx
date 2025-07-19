"use client";
import React from "react";

export default function SignupPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafbfc' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 360 }}>
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Create Your Account</div>
        <form>
          <div style={{ marginBottom: 16 }}>
            <input type="email" placeholder="Enter your email." style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }} />
            <input type="password" placeholder="Create a password." style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }} />
            <input type="password" placeholder="Confirm your password." style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
          </div>
          <button type="submit" style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 16, width: '100%', marginBottom: 16 }}>Sign Up</button>
          <div style={{ textAlign: 'center', color: '#666' }}>
            Already have an account? <a href="/login" style={{ color: '#2196f3', textDecoration: 'none' }}>Log In</a>
          </div>
        </form>
      </div>
    </div>
  );
} 