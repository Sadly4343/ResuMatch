
import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "../SessionProviderWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResuMatch - AI-Powered Job Search Platform",
  description: "Track applications, optimize your resume with AI, and land your dream job.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 2rem', 
          borderBottom: '1px solid var(--border)', 
          background: 'var(--background)', 
          position: 'sticky', 
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 4px var(--shadow-light)'
        }}>
          <Link href="/" style={{ 
            fontWeight: 700, 
            fontSize: '1.5rem', 
            textDecoration: 'none', 
            color: 'var(--text-primary)' 
          }}>
            ResuMatch
          </Link>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/login" style={{ 
              textDecoration: 'none', 
              color: 'var(--text-secondary)', 
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--secondary)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            >
              Login
            </Link>
            <Link href="/dashboard" style={{ 
              textDecoration: 'none', 
              color: 'var(--text-secondary)', 
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--secondary)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            >
              Dashboard
            </Link>
            <Link href="/applications" style={{ 
              textDecoration: 'none', 
              color: 'var(--text-secondary)', 
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--secondary)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            >
              Applications & Resumes
            </Link>
            <Link href="/signup" style={{
              textDecoration: 'none', 
              color: 'white',
              background: 'var(--primary)', 
              padding: '10px 20px',
              borderRadius: '8px', 
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--primary-dark)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--primary)';
            }}
            >
              Sign Up
            </Link>
          </nav>
        </header>
        <SessionProviderWrapper>
          <main id="main-content" style={{ minHeight: '80vh' }}>{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
