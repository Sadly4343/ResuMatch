"use client";
import React, { useState } from "react";

export default function ToolsPage() {
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

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    stagnantApplicationReminders: true,
    interviewReminders: false,
    applicationDeadlineAlerts: true,
    weeklyDigest: false,
    newJobMatches: true
  });
  const [emailFrequency, setEmailFrequency] = useState('daily');
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Fetch notification settings on component mount
  React.useEffect(() => {
    fetchNotificationSettings();
  }, []);

  const fetchNotificationSettings = async () => {
    setIsLoadingSettings(true);
    try {
      const response = await fetch('http://localhost:3003/api/notifications/settings');
      if (response.ok) {
        const data = await response.json();
        setNotificationSettings(data.settings);
        setEmailFrequency(data.emailFrequency);
      }
    } catch (error) {
      console.error('Error fetching notification settings:', error);
    } finally {
      setIsLoadingSettings(false);
    }
  };

  const updateNotificationSetting = async (setting: string, value: boolean) => {
    setIsSavingSettings(true);
    try {
      const response = await fetch(`http://localhost:3003/api/notifications/settings/${setting}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value })
      });

      if (response.ok) {
        const data = await response.json();
        setNotificationSettings(data.settings);
        setEmailFrequency(data.emailFrequency);
      }
    } catch (error) {
      console.error('Error updating notification setting:', error);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const updateEmailFrequency = async (frequency: string) => {
    setIsSavingSettings(true);
    try {
      const response = await fetch('http://localhost:3003/api/notifications/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: notificationSettings, emailFrequency: frequency })
      });

      if (response.ok) {
        const data = await response.json();
        setNotificationSettings(data.settings);
        setEmailFrequency(data.emailFrequency);
      }
    } catch (error) {
      console.error('Error updating email frequency:', error);
    } finally {
      setIsSavingSettings(false);
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
      const response = await fetch('http://localhost:3003/api/tools/coverletter', {
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

  const analyzeResume = async () => {
    if (!resumeText || !jobDescription) {
      setAnalysisError('Please provide both resume text and job description');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError('');

    try {
      const response = await fetch('http://localhost:3003/api/tools/analyze', {
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

  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32, color: '#222' }}>ResuMatch</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a href="/dashboard" style={navLinkStyle}>Dashboard</a>
          <a href="/applications" style={navLinkStyle}>Applications</a>
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
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222' }}>Tools & Calendar</h1>
        <p style={{ color: '#666', fontSize: 16, marginBottom: 32 }}>AI-powered tools to enhance your job search</p>

        {/* Resume Analysis & Cover Letter */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
          {/* Add your working resume and cover letter sections here (the detailed working version from your `feature/tools-page` branch) */}
        </div>

        {/* Calendar & Notification Settings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Add your working calendar and email settings sections here (from the `feature/tools-page`) */}
        </div>
      </main>
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
