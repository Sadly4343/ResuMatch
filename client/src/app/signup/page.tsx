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

  const  handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password's do not match try again!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const result = await apiService.register({
        name,
        email,
        password
      });

      apiService.setToken(result.token);
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
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafbfc' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 360 }}>
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Create Your Account</div>
        {error && ( 
          <div style={{ 
            background: 'red',
            color: 'green',
            padding: '8px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '2px solid black',
            textAlign: 'center'
          }}>
            {error}
            </div>
        )}
        <form onSubmit={handleSignup}> 
          <div style={{ marginBottom: 16 }}>
              <input 
            type="text" 
            placeholder="Enter your name." 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }}
            disabled={loading} />
            <input 
            type="email" 
            placeholder="Enter your email." 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }} 
            disabled={loading}/>
            <input type="password" 
            placeholder="Create a password."
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }} 
            disabled={loading}/>
            <input type="password" 
            placeholder="Confirm your password."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} 
            disabled={loading}/>
          </div>
          <button type="submit" style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 16, width: '100%', marginBottom: 16, cursor: 'pointer' }}>{loading ? 'Creating Account...' : 'Sign Up' }</button>
          <div style={{ textAlign: 'center', color: '#666' }}>
            Already have an account? <a href="/login" style={{ color: '#2196f3', textDecoration: 'none' }}>Log In</a>
          </div>
        </form>
      </div>
    </div>
  );
} 