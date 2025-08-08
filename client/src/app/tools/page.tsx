/**
 * Tools Page - Created by Halle Cooper
 * AI-powered resume analysis and cover letter generation tools
 */

"use client";
import React, { useState } from "react";
import Footer from "../components/Footer"; // Footer imported by Halle Cooper


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect } from "react";


export default function ToolsPage() {

     const { status } = useSession();
     const router = useRouter();
   
  
  // Cover letter form state
  const [coverLetterForm, setCoverLetterForm] = useState({
    name: '',
    role: '',
    company: '',
    intro: ''
  });

  // Cover letter result state
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // Resume analysis state
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedResumes, setUploadedResumes] = useState<Array<{ id: string; name: string; content: string }>>([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [isLoadingResumes, setIsLoadingResumes] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    matching: string[];
    missing: string[];
    aiAnalysis: {
      gaps: string[];
      suggestions: string[];
      revampRecommendations: string[];
      keywordsToAdd: string[];
    };
    stats: {
      resumeWords: number;
      jobWords: number;
      matches: number;
    };
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState('');

  // Fetch resumes on component mount
  React.useEffect(() => {
    fetchUploadedResumes();
  }, []);

  const fetchUploadedResumes = async () => {
    setIsLoadingResumes(true);
    try {
      const response = await fetch('/api/resumefetch');
      if (response.ok) {
        const data = await response.json();
        setUploadedResumes(data.resumes || []);
      }
    } catch (error) {
      console.error('Error fetching uploaded resumes:', error);
    } finally {
      setIsLoadingResumes(false);
    }
  };

  const handleResumeSelect = (resumeId: string) => {
    setSelectedResumeId(resumeId);
    const selectedResume = uploadedResumes.find(resume => resume.id === resumeId);
    if (selectedResume) {
      setResumeText(selectedResume.content);
    }
  };

  const handleCoverLetterChange = (field: string, value: string) => {
    setCoverLetterForm(prev => ({ ...prev, [field]: value }));
  };

  const generateCoverLetter = async () => {
    if (!coverLetterForm.name || !coverLetterForm.role || !coverLetterForm.company) {
      setError('Please fill in Name, Role, and Company fields');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/tools/coverletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coverLetterForm)
      });

      if (!response.ok) throw new Error('Failed to generate cover letter');

      const data = await response.json();
      setGeneratedLetter(data.letter);
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedLetter) return;

    try {
      await navigator.clipboard.writeText(generatedLetter);
      alert('Cover letter copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      alert('Failed to copy to clipboard');
    }
  };

  const downloadAsPDF = () => {
    if (!generatedLetter) return;

    // Create a new window with the cover letter content
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download PDF');
      return;
    }

    // Create the HTML content for the PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cover Letter - ${coverLetterForm.name}</title>
          <style>
            body {
              font-family: 'Times New Roman', serif;
              line-height: 1.6;
              margin: 1in;
              font-size: 12pt;
              color: #333;
            }
            .header {
              margin-bottom: 20px;
            }
            .date {
              margin-bottom: 20px;
            }
            .content {
              white-space: pre-wrap;
              margin-bottom: 20px;
            }
            .signature {
              margin-top: 40px;
            }
            @media print {
              body {
                margin: 0.5in;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <strong>${coverLetterForm.name}</strong><br>
            ${coverLetterForm.role ? `Position: ${coverLetterForm.role}` : ''}<br>
            ${coverLetterForm.company ? `Company: ${coverLetterForm.company}` : ''}
          </div>
          
          <div class="date">
            ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          
          <div class="content">
            ${generatedLetter}
          </div>
          
          <div class="signature">
            Sincerely,<br>
            ${coverLetterForm.name}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  const analyzeResume = async () => {
    if (!resumeText || !jobDescription) {
      setAnalysisError('Please provide both resume text and job description');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError('');

    try {
      const response = await fetch('/api/tools/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: resumeText, job: jobDescription })
      });

      if (!response.ok) throw new Error('Failed to analyze resume');

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      setAnalysisError('Failed to analyze resume. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

     useEffect(() => {
   
       if ( status === "unauthenticated") {
         router.push("/login");
       }
     }, [status, router]);
   
     if (status === "loading") {
       return <div>Loading...</div>;
     }
     if (status === "unauthenticated") {
       return null;
     }
   

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fafbfc' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <aside className="aside" style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32, color: '#222' }}>ResuMatch</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <a href="/dashboard" style={navLinkStyle}>Dashboard</a>
            <a href="/resumes" style={navLinkStyle}>Resumes</a>
            <a href="/tools" style={activeNavLinkStyle}>Tools</a>
            <a href="/calendar" style={navLinkStyle}>Calendar</a>
          </nav>
          <div style={{ marginTop: 'auto', color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <span>↩️</span> 
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
              style={logoutButtonStyle}
            >
              Logout
            </button>
          </div>
        </aside>
        <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222' }}>Tools</h1>
          <p style={{ color: '#666', fontSize: 16, marginBottom: 32 }}>AI-powered tools to enhance your job search</p>

          {/* Resume Analysis & Cover Letter */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {/* Resume Analysis Section */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#222' }}>Resume Analysis</h2>
              <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>Paste your resume and job description to get AI-powered analysis</p>
              
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>Your Resume</label>
                
                {/* Resume Selection Dropdown */}
                {uploadedResumes.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', marginBottom: 6, fontSize: 12, color: '#666' }}>
                      Or select from uploaded resumes:
                    </label>
                    <select
                      value={selectedResumeId}
                      onChange={(e) => handleResumeSelect(e.target.value)}
                      style={{
                        width: '100%',
                        padding: 8,
                        border: '1px solid #ddd',
                        borderRadius: 6,
                        fontSize: 14,
                        background: '#fff'
                      }}
                    >
                      <option value="">-- Select a resume --</option>
                      {uploadedResumes.map((resume) => (
                        <option key={resume.id} value={resume.id}>
                          {resume.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here or select from uploaded resumes above..."
                  style={{
                    width: '100%',
                    minHeight: 120,
                    padding: 12,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 14,
                    resize: 'vertical'
                  }}
                />
                
                {isLoadingResumes && (
                  <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                    Loading uploaded resumes...
                  </div>
                )}
              </div>
              
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  style={{
                    width: '100%',
                    minHeight: 120,
                    padding: 12,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 14,
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <button
                onClick={analyzeResume}
                disabled={isAnalyzing}
                style={{
                  background: isAnalyzing ? '#ccc' : '#2196f3',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                  width: '100%'
                }}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
              </button>
              
              {analysisError && (
                <div style={{ marginTop: 12, padding: 12, background: '#ffebee', color: '#c62828', borderRadius: 8, fontSize: 14 }}>
                  {analysisError}
                </div>
              )}
              
              {analysisResult && (
                <div style={{ marginTop: 20, padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#222' }}>Analysis Results</h3>
                  
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#2196f3', marginBottom: 4 }}>
                      {analysisResult.score}% Match
                    </div>
                    <div style={{ fontSize: 12, color: '#666' }}>
                      {analysisResult.stats.matches} keywords matched
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>Matching Keywords</h4>
                      <div style={{ fontSize: 12, color: '#4caf50' }}>
                        {analysisResult.matching.join(', ')}
                      </div>
                    </div>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>Missing Keywords</h4>
                      <div style={{ fontSize: 12, color: '#f44336' }}>
                        {analysisResult.missing.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>AI Suggestions</h4>
                    <ul style={{ fontSize: 12, color: '#666', paddingLeft: 16 }}>
                      {analysisResult.aiAnalysis.suggestions.map((suggestion, index) => (
                        <li key={index} style={{ marginBottom: 4 }}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Cover Letter Generator Section */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#222' }}>Cover Letter Generator</h2>
              <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>Generate a personalized cover letter with AI</p>
              
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>Your Name</label>
                <input
                  type="text"
                  value={coverLetterForm.name}
                  onChange={(e) => handleCoverLetterChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 14
                  }}
                />
              </div>
              
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>Job Role</label>
                <input
                  type="text"
                  value={coverLetterForm.role}
                  onChange={(e) => handleCoverLetterChange('role', e.target.value)}
                  placeholder="e.g., Software Engineer"
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 14
                  }}
                />
              </div>
              
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>Company Name</label>
                <input
                  type="text"
                  value={coverLetterForm.company}
                  onChange={(e) => handleCoverLetterChange('company', e.target.value)}
                  placeholder="e.g., Google"
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 14
                  }}
                />
              </div>
              
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>Introduction (Optional)</label>
                <textarea
                  value={coverLetterForm.intro}
                  onChange={(e) => handleCoverLetterChange('intro', e.target.value)}
                  placeholder="Any specific points you'd like to include..."
                  style={{
                    width: '100%',
                    minHeight: 80,
                    padding: 12,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 14,
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <button
                onClick={generateCoverLetter}
                disabled={isGenerating}
                style={{
                  background: isGenerating ? '#ccc' : '#4caf50',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                  width: '100%',
                  marginBottom: 12
                }}
              >
                {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
              </button>
              
              {error && (
                <div style={{ marginBottom: 12, padding: 12, background: '#ffebee', color: '#c62828', borderRadius: 8, fontSize: 14 }}>
                  {error}
                </div>
              )}
              
              {generatedLetter && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222' }}>Generated Cover Letter</h3>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={copyToClipboard}
                        style={{
                          background: '#2196f3',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: 6,
                          fontSize: 12,
                          cursor: 'pointer'
                        }}
                      >
                        Copy
                      </button>
                      <button
                        onClick={downloadAsPDF}
                        style={{
                          background: '#4caf50',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: 6,
                          fontSize: 12,
                          cursor: 'pointer'
                        }}
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                  <div style={{
                    padding: 16,
                    background: '#f9f9f9',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 14,
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    maxHeight: 300,
                    overflowY: 'auto'
                  }}>
                    {generatedLetter}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

// Style constants
const navLinkStyle = {
  color: '#222',
  textDecoration: 'none',
  borderRadius: 8,
  padding: '12px 16px',
  fontSize: 16,
  transition: 'background-color 0.2s',
};

const activeNavLinkStyle = {
  ...navLinkStyle,
  fontWeight: 600,
  color: '#2196f3',
  background: '#f0f7ff',
};

const logoutButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#888',
  fontSize: 15,
  cursor: 'pointer',
  padding: 0,
};
