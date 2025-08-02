
import React from "react";

export default function HomePage() {
  return (
    <div style={{ minHeight: '80vh' }}>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem', 
        background: 'var(--background)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            marginBottom: '1rem', 
            color: 'var(--text-primary)',
            lineHeight: 1.2
          }}>
            Take Control of Your Job Search with ResuMatch
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-secondary)', 
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            Track applications, optimize your resume with AI, and land your dream job.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/signup" className="btn btn-primary">Sign Up Free</a>
            <a href="/login" className="btn btn-secondary">Log In</a>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section style={{ 
        padding: '4rem 2rem', 
        background: 'var(--secondary)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="container">
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '3rem', 
            color: 'var(--text-primary)' 
          }}>
            Key Features
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem', 
            maxWidth: '1200px', 
            margin: '0 auto' 
          }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📁</div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Job Application Tracker</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Effortlessly track every application, interview, and offer in one place.</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧠</div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>AI-Powered Resume Analysis</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Get instant feedback and suggestions to optimize your resume for specific jobs.</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Resume & Cover Letter Management</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Store, organize, and generate tailored resumes and cover letters with ease.</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅</div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Calendar & Reminders</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Never miss a deadline or interview with integrated calendar and email reminders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ 
        padding: '4rem 2rem', 
        background: 'var(--background)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="container">
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '3rem', 
            color: 'var(--text-primary)' 
          }}>
            How ResuMatch Works
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem', 
            maxWidth: '1000px', 
            margin: '0 auto' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--primary)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#fff', 
                fontWeight: 700, 
                fontSize: '1.5rem', 
                margin: '0 auto 1rem' 
              }}>
                1
              </div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Sign Up</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Create your free account in minutes.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--primary)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#fff', 
                fontWeight: 700, 
                fontSize: '1.5rem', 
                margin: '0 auto 1rem' 
              }}>
                2
              </div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Add Applications</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Log your job applications and their statuses.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--primary)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#fff', 
                fontWeight: 700, 
                fontSize: '1.5rem', 
                margin: '0 auto 1rem' 
              }}>
                3
              </div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Optimize Resume</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Use AI tools to tailor your resume and cover letter.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--primary)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#fff', 
                fontWeight: 700, 
                fontSize: '1.5rem', 
                margin: '0 auto 1rem' 
              }}>
                4
              </div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Land Your Dream Job</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Stay organized and confident throughout your job search.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ 
        padding: '4rem 2rem', 
        background: 'var(--secondary)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="container">
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '3rem', 
            color: 'var(--text-primary)' 
          }}>
            What Our Users Say
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem', 
            maxWidth: '800px', 
            margin: '0 auto' 
          }}>
            <div style={{ 
              background: 'var(--accent)', 
              padding: '2rem', 
              borderRadius: '12px',
              border: '1px solid var(--border)'
            }}>
              <p style={{ 
                fontSize: '1.1rem', 
                marginBottom: '1rem', 
                fontStyle: 'italic',
                color: 'var(--text-primary)'
              }}>
                &quot;ResuMatch transformed my job search! The AI analysis is a game-changer.&quot;
              </p>
              <p style={{ fontWeight: 600, color: 'var(--primary)' }}>- Jane D.</p>
            </div>
            <div style={{ 
              background: 'var(--accent)', 
              padding: '2rem', 
              borderRadius: '12px',
              border: '1px solid var(--border)'
            }}>
              <p style={{ 
                fontSize: '1.1rem', 
                marginBottom: '1rem', 
                fontStyle: 'italic',
                color: 'var(--text-primary)'
              }}>
                &quot;Finally, a tool that keeps all my applications organized. Highly recommend!&quot;
              </p>
              <p style={{ fontWeight: 600, color: 'var(--primary)' }}>- Mark S.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ 
        padding: '4rem 2rem', 
        background: 'var(--accent)', 
        textAlign: 'center',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            marginBottom: '1rem', 
            color: 'var(--text-primary)' 
          }}>
            Ready to Simplify Your Job Search?
          </h2>
          <a href="/signup" className="btn btn-primary" style={{ fontSize: '1.1rem' }}>
            Get Started Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '2rem', 
        background: 'var(--background)', 
        textAlign: 'center', 
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--border)'
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>About</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginBottom: '1rem' 
          }}>
            <span style={{ fontSize: '1.4rem' }}>🐦</span>
            <span style={{ fontSize: '1.4rem' }}>💼</span>
            <span style={{ fontSize: '1.4rem' }}>📘</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            © 2025 ResuMatch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
