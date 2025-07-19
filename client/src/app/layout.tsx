import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid #eee', background: '#fff', position: 'sticky', top: 0, zIndex: 100
        }}>
          <a href="/" style={{ fontWeight: 700, fontSize: '1.5rem', textDecoration: 'none', color: '#222' }}>ResuMatch</a>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="/login" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Login</a>
            <a href="/dashboard" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Dashboard</a>
            <a href="/applications" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Applications & Resumes</a>
            <a href="/signup" style={{ textDecoration: 'none', color: '#fff', background: '#2196f3', padding: '0.5rem 1.2rem', borderRadius: '8px', fontWeight: 600 }}>Sign Up</a>
          </nav>
        </header>
        <main style={{ minHeight: '80vh' }}>{children}</main>
      </body>
    </html>
  );
}
