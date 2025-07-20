"use client";
import React from "react";

export default function HomePage() {
  return (
    <div style={{ minHeight: '80vh' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: '#222' }}>
          Take Control of Your Job Search with ResuMatch
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
          Track applications, optimize your resume with AI, and land your dream job.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/signup" style={{ background: '#2196f3', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Sign Up Free</a>
          <a href="/login" style={{ background: '#f5f5f5', color: '#222', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Log In</a>
        </div>
      </section>

      {/* Key Features Section */}
      <section style={{ padding: '4rem 2rem', background: '#fafbfc' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', color: '#222' }}>Key Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px #0001' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📁</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Job Application Tracker</h3>
            <p style={{ color: '#666' }}>Effortlessly track every application, interview, and offer in one place.</p>
          </div>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px #0001' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧠</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>AI-Powered Resume Analysis</h3>
            <p style={{ color: '#666' }}>Get instant feedback and suggestions to optimize your resume for specific jobs.</p>
          </div>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px #0001' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Resume & Cover Letter Management</h3>
            <p style={{ color: '#666' }}>Store, organize, and generate tailored resumes and cover letters with ease.</p>
          </div>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px #0001' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Calendar & Reminders</h3>
            <p style={{ color: '#666' }}>Never miss a deadline or interview with integrated calendar and email reminders.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '4rem 2rem', background: '#fff' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', color: '#222' }}>How ResuMatch Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#2196f3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.5rem', margin: '0 auto 1rem' }}>1</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Sign Up</h3>
            <p style={{ color: '#666' }}>Create your free account in minutes.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#2196f3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.5rem', margin: '0 auto 1rem' }}>2</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Add Applications</h3>
            <p style={{ color: '#666' }}>Log your job applications and their statuses.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#2196f3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.5rem', margin: '0 auto 1rem' }}>3</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Optimize Resume</h3>
            <p style={{ color: '#666' }}>Use AI tools to tailor your resume and cover letter.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#2196f3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.5rem', margin: '0 auto 1rem' }}>4</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Land Your Dream Job</h3>
            <p style={{ color: '#666' }}>Stay organized and confident throughout your job search.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '4rem 2rem', background: '#fafbfc' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', color: '#222' }}>What Our Users Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ background: '#e3f2fd', padding: '2rem', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem', fontStyle: 'italic' }}>&quot;ResuMatch transformed my job search! The AI analysis is a game-changer.</p>
            <p style={{ fontWeight: 600, color: '#2196f3' }}>- Jane D.</p>
          </div>
          <div style={{ background: '#e3f2fd', padding: '2rem', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem', fontStyle: 'italic' }}>&quot;Finally, a tool that keeps all my applications organized. Highly recommend!</p>
            <p style={{ fontWeight: 600, color: '#2196f3' }}>- Mark S.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ padding: '4rem 2rem', background: '#e3f2fd', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#222' }}>Ready to Simplify Your Job Search?</h2>
        <a href="/signup" style={{ background: '#2196f3', color: '#fff', padding: '12px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Get Started Free</a>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem', background: '#f5f5f5', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
          <a href="#" style={{ color: '#666', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Contact</a>
          <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Terms of Service</a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🐦</span>
          <span style={{ fontSize: '1.2rem' }}>💼</span>
          <span style={{ fontSize: '1.2rem' }}>📘</span>
        </div>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>© 2023 ResuMatch. All rights reserved.</p>
      </footer>
    </div>
  );
}
