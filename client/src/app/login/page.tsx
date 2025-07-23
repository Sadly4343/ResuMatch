"use client";
import React, {useState} from "react";
import apiService from "../../services/api";




export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const  handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login email:", email, "password", password);
    setError("");


    if (password.length < 6) {
      alert("Password must be at least 6 characters");
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
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 360 }}>
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Login To Your Account</div>
        <form onSubmit={handleLogin}> 
          <div style={{ marginBottom: 16 }}>
            <input 
            type="email" 
            placeholder="Enter your email." 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }} />
            <input type="password" 
            placeholder="Input your password."
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }} />
          </div>
          <button type="submit" style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 16, width: '100%', marginBottom: 16 }}>Login Here</button>
          <div style={{ textAlign: 'center', color: '#666' }}>
            Don't have an account? <a href="/signup" style={{ color: '#2196f3', textDecoration: 'none' }}>Sign Up Here</a>
          </div>
        </form>
      </div>
    </div>
  );
} 