"use client";
import React, {useState} from "react";
import apiService from "../../services/api";
import { signIn } from "next-auth/react";

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
      alert("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        alert("Account has been logged");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setError("Login has failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--secondary)' 
    }}>
      <div className="card" style={{ 
        padding: '2.5rem 2rem', 
        minWidth: 340, 
        maxWidth: 360 
      }}>
        <div style={{ 
          textAlign: 'center', 
          fontWeight: 700, 
          fontSize: 24, 
          marginBottom: 24,
          color: 'var(--text-primary)'
        }}>
          Login To Your Account
        </div>
        
        {error && (
          <div style={{ 
            background: 'var(--error)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 20,
            fontSize: 14,
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}> 
          <div style={{ marginBottom: 16 }}>
            <input 
              type="email" 
              placeholder="Enter your email." 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="input"
              style={{ marginBottom: 12 }}
              disabled={loading}
            />
            <input 
              type="password" 
              placeholder="Input your password."
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
              className="input"
              style={{ marginBottom: 12 }}
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: 16 }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login Here'}
          </button>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            Don&apos;t have an account? <a href="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Sign Up Here</a>
          </div>
        </form>
      </div>
    </div>
  );
} 