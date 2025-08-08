"use client";
import React, {useState} from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {

  // State variables for user input and UI status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  // Handle Login form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

    // Prevents page refresh on login
    e.preventDefault();
    console.log("Login email:", email, "password", password);
    setError("");

    //  Validate password length
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      // Attempt login from NextAuth credentials provider
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // Handle login error returned by NextAuth
      if (result?.error) {
        console.error("login error:", error);
        setError(result.error);
      } else {
        // Alert and Login user and redirect to dashboard
        alert("Account has been logged");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("login error:", error);
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
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email." 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="input"
              style={{ marginBottom: 12 }}
              disabled={loading}
            />
            <label htmlFor="password">Password</label>
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
