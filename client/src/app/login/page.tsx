"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "../../services/api";

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'register'>("login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (tab === 'register') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        
        const response = await apiService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        
        apiService.setToken(response.token);
        router.push('/dashboard');
      } else {
        const response = await apiService.login({
          email: formData.email,
          password: formData.password
        });
        
        apiService.setToken(response.token);
        router.push('/dashboard');
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message :'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafbfc' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 360 }}>
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 24, marginBottom: 24 }}>ResuMatch</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 24 }}>
          <button onClick={() => setTab('login')} style={{ border: 'none', background: 'none', fontWeight: tab==='login'?700:400, fontSize: 18, color: tab==='login'?'#222':'#888', borderBottom: tab==='login'?'2px solid #2196f3':'2px solid transparent', paddingBottom: 4, cursor: 'pointer' }}>Login</button>
          <button onClick={() => setTab('register')} style={{ border: 'none', background: 'none', fontWeight: tab==='register'?700:400, fontSize: 18, color: tab==='register'?'#222':'#888', borderBottom: tab==='register'?'2px solid #2196f3':'2px solid transparent', paddingBottom: 4, cursor: 'pointer' }}>Register</button>
        </div>
        
        {error && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '8px 12px', borderRadius: 4, marginBottom: 16, fontSize: 14 }}>
            {error}
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }} 
              />
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <a href="#" style={{ color: '#2196f3', fontSize: 14 }}>Forgot Password?</a>
              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  background: loading ? '#ccc' : '#2196f3', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '8px 24px', 
                  fontWeight: 600, 
                  fontSize: 16,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
            <div style={{ textAlign: 'center', color: '#888', margin: '16px 0' }}>OR CONTINUE WITH</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button type="button" style={{ flex: 1, border: '1px solid #ddd', borderRadius: 8, padding: '8px 0', background: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span>📧</span> Google</button>
              <button type="button" style={{ flex: 1, border: '1px solid #ddd', borderRadius: 8, padding: '8px 0', background: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span>🍏</span> Apple</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                value={formData.name}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }} 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }} 
              />
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }} 
              />
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm Password" 
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                background: loading ? '#ccc' : '#2196f3', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '12px 24px', 
                fontWeight: 600, 
                fontSize: 16, 
                width: '100%',
                marginBottom: 16,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
            <div style={{ textAlign: 'center', color: '#888', margin: '16px 0' }}>OR CONTINUE WITH</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button type="button" style={{ flex: 1, border: '1px solid #ddd', borderRadius: 8, padding: '8px 0', background: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span>📧</span> Google</button>
              <button type="button" style={{ flex: 1, border: '1px solid #ddd', borderRadius: 8, padding: '8px 0', background: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span>🍏</span> Apple</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 