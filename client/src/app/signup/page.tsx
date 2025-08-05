"use client";
import React, {useState} from "react";
import apiService from "../../services/api";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const trimName = name.trim();
    const trimEmail = email.trim();

    if (!trimName) {
      setError("Name is required");
      return;
    }

    if (!trimEmail) {
      setError("Email is required");
      return;
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailReg.test(trimEmail)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    const passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (!passwordReg.test(password)) {
      setError("Password must contain one number and special character");
      return;
    }

    try {
      setLoading(true);

      await apiService.register({
        name: trimName,
        email: trimEmail,
        password
      });

      alert("Account has been created!")

      window.location.href = "/login";
    } catch (error) {
      console.error("Signup error: ", error);
      const errorMessage = error instanceof Error ? error.message : "Registration Failure";
      setError(errorMessage);
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
        minWidth: 400, 
        maxWidth: 450
      }}>
        <div style={{ 
          textAlign: 'center', 
          fontWeight: 700, 
          fontSize: 24, 
          marginBottom: 24, 
          color: 'var(--text-primary)' 
        }}>
          Create Your Account
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
        
        <form onSubmit={handleSignup}> 
          <div style={{ marginBottom: 20 }}>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="input"
              style={{ marginBottom: 16 }}
              disabled={loading} 
            />
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="input"
              style={{ marginBottom: 16 }}
              disabled={loading}
            />
            <input 
              type="password" 
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
              className="input"
              style={{ marginBottom: 16 }}
              disabled={loading}
            />
            <input 
              type="password" 
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="input"
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: 20 }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14 }}>
            Already have an account? <a href="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Log In</a>
          </div>
        </form>
      </div>
    </div>
  );
} 