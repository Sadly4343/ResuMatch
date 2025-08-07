"use client";
import React, {useState} from "react";
import apiService from "../../services/api";

export default function SignupPage() {

  // State variables for user input and UI status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");


    // Trims name and email before server-side validation
    const trimName = name.trim();
    const trimEmail = email.trim();

    // Error if no name 
    if (!trimName) {
      setError("Name is required");
      return;
    }
    // Error if no email
    if (!trimEmail) {
      setError("Email is required");
      return;
    }
    // Email regular expression ensuring proper email 
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //test comparison of email to emailreg
    if (!emailReg.test(trimEmail)) {
      setError("Please enter a valid email");
      return;
    }
    // Checks password exists
    if (!password) {
      setError("Password is required");
      return;
    }
    // Checks both passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again!");
      return;
    }
    // Must be over 8 characters
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    // Password regular expression
    const passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

    // Compares password to password Reg ensuring at least one special character and number
    if (!passwordReg.test(password)) {
      setError("Password must contain one number and special character");
      return;
    }
    
    try {
      setLoading(true);

      // Async call to register function with values
      await apiService.register({
        name: trimName,
        email: trimEmail,
        password
      });


      alert("Account has been created!")

      // Redirect to login page on success
      window.location.href = "/login";

      // If error return error to user
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