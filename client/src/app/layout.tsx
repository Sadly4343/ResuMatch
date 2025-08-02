
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
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 2rem', 
          borderBottom: '1px solid #e0e0e0', 
          background: '#ffffff', 
          position: 'sticky', 
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)'
        }}>
          <Link href="/" style={{ 
            fontWeight: 700, 
            fontSize: '1.5rem', 
            textDecoration: 'none', 
            color: '#222222' 
          }}>
            ResuMatch
          </Link>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/login" style={{ 
              textDecoration: 'none', 
              color: '#666666', 
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            >
              Login
            </Link>
            <Link href="/dashboard" style={{ 
              textDecoration: 'none', 
              color: '#666666', 
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}

            >
              Dashboard
            </Link>
            <Link href="/applications" style={{ 
              textDecoration: 'none', 
              color: '#666666', 
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}

            >
              Applications & Resumes
            </Link>
            <Link href="/signup" style={{
              textDecoration: 'none', 
              color: 'white',
              background: '#2196f3', 
              padding: '10px 20px',
              borderRadius: '8px', 
              fontWeight: 600,
              transition: 'all 0.2s ease'
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
