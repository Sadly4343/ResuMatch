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

  // Fetch notification settings
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

  // Update a specific notification setting
  const updateNotificationSetting = async (setting: string, value: boolean) => {
    setIsSavingSettings(true);
    try {
      const response = await fetch(`http://localhost:3003/api/notifications/settings/${setting}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
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

  // Update email frequency
  const updateEmailFrequency = async (frequency: string) => {
    setIsSavingSettings(true);
    try {
      const response = await fetch('http://localhost:3003/api/notifications/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          settings: notificationSettings,
          emailFrequency: frequency
        })
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

  // Handle form input changes
  const handleCoverLetterChange = (field: string, value: string) => {
    setCoverLetterForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Generate cover letter
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coverLetterForm)
      });

      if (!response.ok) {
        throw new Error('Failed to generate cover letter');
      }

      const data = await response.json();
      setGeneratedLetter(data.letter);
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.');
      console.error('Error generating cover letter:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (!generatedLetter) return;
    
    try {
      await navigator.clipboard.writeText(generatedLetter);
      // You could add a toast notification here
      alert('Cover letter copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      alert('Failed to copy to clipboard');
    }
  };

  // Analyze resume
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: resumeText,
          job: jobDescription
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      setAnalysisError('Failed to analyze resume. Please try again.');
      console.error('Error analyzing resume:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };
  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32 }}>ResuMatch</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a href="/dashboard" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Dashboard</a>
          <a href="/applications" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Applications</a>
          <a href="/resumes" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Resumes</a>
          <a href="/tools" style={{ fontWeight: 600, color: '#2196f3', textDecoration: 'none', background: '#f0f7ff', borderRadius: 8, padding: '8px 16px' }}>Tools</a>
          <a href="/calendar" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Calendar</a>
        </nav>
        <div style={{ marginTop: 'auto', color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <span>↩️</span> Logout
        </div>
      </aside>
      <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
        <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Tools & Calendar</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
          <section style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001' }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Resume Analysis Tool</div>
            {analysisError && <div style={{ color: '#d32f2f', fontSize: 14, marginBottom: 12 }}>{analysisError}</div>}
            <div style={{ marginBottom: 12 }}>
              <textarea 
                placeholder="Paste your resume text here..." 
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                style={{ width: '100%', minHeight: 80, borderRadius: 8, border: '1px solid #ddd', padding: 8, marginBottom: 8 }} 
              />
              <textarea 
                placeholder="Paste job description here..." 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                style={{ width: '100%', minHeight: 80, borderRadius: 8, border: '1px solid #ddd', padding: 8 }} 
              />
            </div>
            <button 
              onClick={analyzeResume}
              disabled={isAnalyzing}
              style={{ 
                background: isAnalyzing ? '#ccc' : '#2196f3', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '8px 24px', 
                fontWeight: 600,
                cursor: isAnalyzing ? 'not-allowed' : 'pointer'
              }}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
            </button>
            
            {analysisResult && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                  Match Score: <span style={{ color: analysisResult.score >= 70 ? '#4caf50' : analysisResult.score >= 50 ? '#ff9800' : '#f44336' }}>
                    {analysisResult.score}%
                  </span>
                </div>
                
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Matching Keywords:</div>
                  <div style={{ fontSize: 14, color: '#666' }}>
                    {analysisResult.matching.length > 0 ? analysisResult.matching.join(', ') : 'None found'}
                  </div>
                </div>
                
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Missing Keywords:</div>
                  <div style={{ fontSize: 14, color: '#d32f2f' }}>
                    {analysisResult.missing.length > 0 ? analysisResult.missing.join(', ') : 'None - great match!'}
                  </div>
                </div>
                
                {analysisResult.aiAnalysis.gaps.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4, color: '#d32f2f' }}>Gaps to Address:</div>
                    <ul style={{ fontSize: 14, color: '#666', margin: 0, paddingLeft: 20 }}>
                      {analysisResult.aiAnalysis.gaps.map((gap: string, index: number) => (
                        <li key={index}>{gap}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysisResult.aiAnalysis.suggestions.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4, color: '#2196f3' }}>AI Suggestions:</div>
                    <ul style={{ fontSize: 14, color: '#666', margin: 0, paddingLeft: 20 }}>
                      {analysisResult.aiAnalysis.suggestions.map((suggestion: string, index: number) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysisResult.aiAnalysis.revampRecommendations.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4, color: '#4caf50' }}>Resume Revamp Recommendations:</div>
                    <ul style={{ fontSize: 14, color: '#666', margin: 0, paddingLeft: 20 }}>
                      {analysisResult.aiAnalysis.revampRecommendations.map((rec: string, index: number) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysisResult.aiAnalysis.keywordsToAdd.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4, color: '#ff9800' }}>Keywords to Add:</div>
                    <div style={{ fontSize: 14, color: '#666' }}>
                      {analysisResult.aiAnalysis.keywordsToAdd.join(', ')}
                    </div>
                  </div>
                )}
                
                <div style={{ fontSize: 12, color: '#888' }}>
                  Analyzed {analysisResult.stats.resumeWords} resume words against {analysisResult.stats.jobWords} job keywords
                </div>
              </div>
            )}
          </section>
          <section style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001' }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Cover Letter Generator</div>
            {error && <div style={{ color: '#d32f2f', fontSize: 14, marginBottom: 12 }}>{error}</div>}
            <div style={{ marginBottom: 12 }}>
              <input 
                placeholder="Your Name" 
                value={coverLetterForm.name}
                onChange={(e) => handleCoverLetterChange('name', e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd', marginBottom: 8 }}
              />
              <input 
                placeholder="Role/Position" 
                value={coverLetterForm.role}
                onChange={(e) => handleCoverLetterChange('role', e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd', marginBottom: 8 }}
              />
              <input 
                placeholder="Company Name" 
                value={coverLetterForm.company}
                onChange={(e) => handleCoverLetterChange('company', e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd', marginBottom: 8 }}
              />
              <textarea 
                placeholder="Optional custom intro..." 
                value={coverLetterForm.intro}
                onChange={(e) => handleCoverLetterChange('intro', e.target.value)}
                style={{ width: '100%', minHeight: 60, borderRadius: 8, border: '1px solid #ddd', padding: 8 }} 
              />
            </div>
            <button 
              onClick={generateCoverLetter}
              disabled={isGenerating}
              style={{ 
                background: isGenerating ? '#ccc' : '#2196f3', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '8px 24px', 
                fontWeight: 600,
                cursor: isGenerating ? 'not-allowed' : 'pointer'
              }}
            >
              {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
            </button>
            {generatedLetter && (
              <button 
                onClick={copyToClipboard}
                style={{ 
                  background: '#4caf50', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '8px 16px', 
                  fontWeight: 600,
                  marginLeft: 8,
                  cursor: 'pointer'
                }}
              >
                Copy
              </button>
            )}
            <textarea 
              readOnly 
              value={generatedLetter}
              placeholder="Generated cover letter will appear here..." 
              style={{ width: '100%', minHeight: 120, borderRadius: 8, border: '1px solid #ddd', padding: 8, marginTop: 12 }} 
            />
          </section>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <section style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001' }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Calendar View</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <button style={{ background: '#2196f3', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 16px', fontWeight: 600 }}>Add Reminder</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, background: '#f5f7fa', borderRadius: 8, padding: 8 }}>
                {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(day => <div key={day} style={{ textAlign: 'center', fontWeight: 600, color: '#888' }}>{day}</div>)}
                {[...Array(30)].map((_,i) => <div key={i} style={{ textAlign: 'center', padding: 6, color: '#222', fontWeight: 500 }}>{i+1}</div>)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 14, color: '#888' }}>
              <span>● Interview</span>
              <span>● Deadline</span>
              <span>● Follow-up</span>
            </div>
          </section>
          <section style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 8px #0001' }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Email Notification Settings</div>
            {isLoadingSettings && <div style={{ color: '#666', fontSize: 14, marginBottom: 12 }}>Loading settings...</div>}
            {isSavingSettings && <div style={{ color: '#4caf50', fontSize: 14, marginBottom: 12 }}>Saving...</div>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input 
                  type="checkbox" 
                  checked={notificationSettings.stagnantApplicationReminders}
                  onChange={(e) => updateNotificationSetting('stagnantApplicationReminders', e.target.checked)}
                  disabled={isSavingSettings}
                /> 
                Stagnant Application Reminders
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input 
                  type="checkbox" 
                  checked={notificationSettings.interviewReminders}
                  onChange={(e) => updateNotificationSetting('interviewReminders', e.target.checked)}
                  disabled={isSavingSettings}
                /> 
                Interview Reminders
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input 
                  type="checkbox" 
                  checked={notificationSettings.applicationDeadlineAlerts}
                  onChange={(e) => updateNotificationSetting('applicationDeadlineAlerts', e.target.checked)}
                  disabled={isSavingSettings}
                /> 
                Application Deadline Alerts
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input 
                  type="checkbox" 
                  checked={notificationSettings.weeklyDigest}
                  onChange={(e) => updateNotificationSetting('weeklyDigest', e.target.checked)}
                  disabled={isSavingSettings}
                /> 
                Weekly Digest
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input 
                  type="checkbox" 
                  checked={notificationSettings.newJobMatches}
                  onChange={(e) => updateNotificationSetting('newJobMatches', e.target.checked)}
                  disabled={isSavingSettings}
                /> 
                New Job Matches
              </label>
            </div>
            
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Email Frequency:</div>
              <select 
                value={emailFrequency}
                onChange={(e) => updateEmailFrequency(e.target.value)}
                disabled={isSavingSettings}
                style={{ 
                  width: '100%', 
                  padding: 8, 
                  borderRadius: 8, 
                  border: '1px solid #ddd',
                  fontSize: 14
                }}
              >
                <option value="immediate">Immediate</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Digest</option>
              </select>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 