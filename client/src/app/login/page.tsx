"use client";
import React, {useState} from "react";
import apiService from "../../services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login email:", email, "password", password);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const result = await apiService.login({
        email,
        password
      });

      apiService.setToken(result.token);
      alert("Account has been Logged In")

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error: ", error);
      const errorMessage = error instanceof Error ? error.message : "Login Failure";
      setError(errorMessage || "Login has failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafbfc' }}>
      <div style={{ 
        background: '#fff', 
        borderRadius: 16, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
        padding: '2.5rem 2rem', 
        minWidth: 400, 
        maxWidth: 450,
        border: '1px solid #eee'
      }}>
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 24, marginBottom: 24, color: '#222' }}>
          Login To Your Account
        </div>
        
        {error && ( 
          <div style={{ 
            background: '#ffebee',
            color: '#c62828',
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 20,
            border: '1px solid #ffcdd2',
            fontSize: 14,
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}> 
          <div style={{ marginBottom: 20 }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                borderRadius: 8, 
                border: '1px solid #ddd', 
                marginBottom: 16,
                fontSize: 16,
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              disabled={loading}
            />
            <input 
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                borderRadius: 8, 
                border: '1px solid #ddd',
                fontSize: 16,
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            style={{ 
              background: '#2196f3', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 8, 
              padding: '14px 24px', 
              fontWeight: 600, 
              fontSize: 16, 
              width: '100%', 
              marginBottom: 20,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#1976d2'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#2196f3'}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login Here'}
          </button>
          
          <div style={{ textAlign: 'center', color: '#666', fontSize: 14 }}>
            Don&apos;t have an account? <a href="/signup" style={{ color: '#2196f3', textDecoration: 'none', fontWeight: 500 }}>Sign Up Here</a>
          </div>
        </form>
      </div>
    </div>
  );
} 