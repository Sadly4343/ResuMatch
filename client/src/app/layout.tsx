import type { Metadata } from "next";
import Link from "next/link";
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
       <header style={{  display: 'flex',  justifyContent: 'space-between',  alignItems: 'center',  padding: '1rem 2rem',  borderBottom: '1px solid #1e293b', background: '#0f172a', position: 'sticky', top: 0,
  zIndex: 100
}}>
  <Link href="/" style={{ fontWeight: 700, fontSize: '1.5rem', textDecoration: 'none', color: '#ffffff' }}>ResuMatch</Link>
  <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
    <Link className="nav-link" href="/login" style={{ textDecoration: 'none', color: '#ffffff', fontWeight: 500 }}>Login</Link>
    <Link href="/dashboard" style={{ textDecoration: 'none', color: '#ffffff', fontWeight: 500 }}>Dashboard</Link>
    <Link href="/applications" style={{ textDecoration: 'none', color: '#ffffff', fontWeight: 500 }}>Applications & Resumes</Link>
    <Link href="/signup" style={{
      textDecoration: 'none', color: '#0f172a',background: '#7dd3fc',padding: '0.5rem 1.2rem',borderRadius: '8px', fontWeight: 600 }}>Sign Up</Link>
  </nav>
</header>
        <main style={{ minHeight: '80vh' }}>{children}</main>
      </body>
    </html>
  );
}
