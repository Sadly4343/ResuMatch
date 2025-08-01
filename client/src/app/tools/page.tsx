"use client";
import { STRING_LITERAL_DROP_BUNDLE } from "next/dist/shared/lib/constants";
import React, { useState } from "react";

export default function ToolsPage() {
  // Cover letter form state
  const [coverLetterForm, setCoverLetterForm] = useState({
    name: '',
    role: '',
    company: '',
    intro: ''
  });

  type EventType = 'application' | 'interview' | 'deadline' | 'followup';

  type CalendarEvent = {
    id: string;
    title: string;
    date: string;
    type: EventType;
    description?: string;
  }
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

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: 'application',
    description: ''
  });

  // Fetch notification settings and resumes on component mount
  React.useEffect(() => {
    fetchNotificationSettings();
    fetchUploadedResumes();
  }, []);

  const fetchNotificationSettings = async () => {
    setIsLoadingSettings(true);
    try {
      const response = await fetch('/api/notifications/settings');
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
      const response = await fetch(`/api/notifications/settings/${setting}`, {
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
      const response = await fetch('/api/notifications/settings', {
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

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowEventForm(true);
    setNewEvent(prev => ({ ...prev, date: formatDate(date) }));
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    
    const event = {
      id: Date.now().toString(),
      ...newEvent,
      type: newEvent.type as EventType,
    };
    
    setEvents(prev => [...prev, event]);
    setNewEvent({ title: '', date: '', type: 'application', description: '' });
    setShowEventForm(false);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'application': return '#2196f3';
      case 'interview': return '#4caf50';
      case 'deadline': return '#f44336';
      case 'followup': return '#ff9800';
      default: return '#666';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'application': return 'Application';
      case 'interview': return 'Interview';
      case 'deadline': return 'Deadline';
      case 'followup': return 'Follow-up';
      default: return type;
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

  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
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
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222' }}>Tools & Calendar</h1>
        <p style={{ color: '#666', fontSize: 16, marginBottom: 32 }}>AI-powered tools to enhance your job search</p>

        {/* Resume Analysis & Cover Letter */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
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

        {/* Calendar & Notification Settings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Calendar Section */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#222' }}>Application Calendar</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>Track your job applications and deadlines</p>
            
            {/* Calendar Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                style={{
                  background: '#f5f5f5',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                ←
              </button>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222' }}>
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                style={{
                  background: '#f5f5f5',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                →
              </button>
            </div>

            {/* Calendar Grid */}
            <div style={{ marginBottom: 16 }}>
              {/* Day headers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, marginBottom: 8 }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{ 
                    textAlign: 'center', 
                    fontSize: 12, 
                    fontWeight: 600, 
                    color: '#666',
                    padding: '8px 4px'
                  }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
                {(() => {
                  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
                  const days = [];
                  
                  // Add empty cells for days before the first day of the month
                  for (let i = 0; i < startingDay; i++) {
                    days.push(<div key={`empty-${i}`} style={{ height: 40 }} />);
                  }
                  
                  // Add days of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const dateString = formatDate(date);
                    const dayEvents = getEventsForDate(dateString);
                    const isToday = formatDate(new Date()) === dateString;
                    
                    days.push(
                      <div
                        key={day}
                        onClick={() => handleDateClick(date)}
                        style={{
                          height: 40,
                          border: '1px solid #eee',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          background: isToday ? '#e3f2fd' : '#fff',
                          fontSize: 12,
                          position: 'relative'
                        }}
                      >
                        <span style={{ fontWeight: isToday ? 600 : 400 }}>{day}</span>
                        {dayEvents.length > 0 && (
                          <div style={{
                            position: 'absolute',
                            bottom: 2,
                            display: 'flex',
                            gap: 1
                          }}>
                            {dayEvents.slice(0, 3).map((event, index) => (
                              <div
                                key={index}
                                style={{
                                  width: 4,
                                  height: 4,
                                  borderRadius: '50%',
                                  background: getEventTypeColor(event.type)
                                }}
                              />
                            ))}
                            {dayEvents.length > 3 && (
                              <div style={{
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                background: '#999',
                                fontSize: 8,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                              }}>
                                +
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  return days;
                })()}
              </div>
            </div>

            {/* Add Event Button */}
            <button
              onClick={() => setShowEventForm(true)}
              style={{
                background: '#2196f3',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                width: '100%',
                marginBottom: 16
              }}
            >
              + Add Event
            </button>

            {/* Event Form Modal */}
            {showEventForm && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <div style={{
                  background: 'white',
                  padding: 24,
                  borderRadius: 12,
                  width: '90%',
                  maxWidth: 400
                }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#222' }}>
                    Add New Event
                  </h3>
                  
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Google Application Deadline"
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
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Date
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
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
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Event Type
                    </label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as EventType }))}
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        fontSize: 14
                      }}
                    >
                      <option value="application">Application</option>
                      <option value="interview">Interview</option>
                      <option value="deadline">Deadline</option>
                      <option value="followup">Follow-up</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>
                      Description (Optional)
                    </label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Add any notes..."
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

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      onClick={() => setShowEventForm(false)}
                      style={{
                        flex: 1,
                        background: '#f5f5f5',
                        color: '#666',
                        border: 'none',
                        padding: '12px',
                        borderRadius: 8,
                        fontSize: 14,
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addEvent}
                      style={{
                        flex: 1,
                        background: '#2196f3',
                        color: 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: 8,
                        fontSize: 14,
                        cursor: 'pointer'
                      }}
                    >
                      Add Event
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Events List */}
            {events.length > 0 && (
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#333' }}>
                  Upcoming Events
                </h4>
                <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                  {events
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 5)
                    .map(event => (
                      <div
                        key={event.id}
                        style={{
                          padding: 12,
                          border: '1px solid #eee',
                          borderRadius: 8,
                          marginBottom: 8,
                          background: '#f9f9f9'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              fontSize: 14, 
                              fontWeight: 500, 
                              color: '#222',
                              marginBottom: 4
                            }}>
                              {event.title}
                            </div>
                            <div style={{ 
                              fontSize: 12, 
                              color: '#666',
                              marginBottom: 4
                            }}>
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: 12,
                              fontSize: 10,
                              fontWeight: 500,
                              color: 'white',
                              background: getEventTypeColor(event.type)
                            }}>
                              {getEventTypeLabel(event.type)}
                            </div>
                            {event.description && (
                              <div style={{ 
                                fontSize: 12, 
                                color: '#666',
                                marginTop: 4
                              }}>
                                {event.description}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#f44336',
                              cursor: 'pointer',
                              fontSize: 12,
                              padding: 4
                            }}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Notification Settings Section */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#222' }}>Notification Settings</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>Customize your email notifications</p>
            
            {isLoadingSettings ? (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ fontSize: 14, color: '#666' }}>Loading settings...</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={notificationSettings.stagnantApplicationReminders}
                      onChange={(e) => updateNotificationSetting('stagnantApplicationReminders', e.target.checked)}
                      style={{ width: 16, height: 16 }}
                    />
                    <span style={{ fontSize: 14, color: '#333' }}>Stagnant Application Reminders</span>
                  </label>
                </div>
                
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={notificationSettings.interviewReminders}
                      onChange={(e) => updateNotificationSetting('interviewReminders', e.target.checked)}
                      style={{ width: 16, height: 16 }}
                    />
                    <span style={{ fontSize: 14, color: '#333' }}>Interview Reminders</span>
                  </label>
                </div>
                
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={notificationSettings.applicationDeadlineAlerts}
                      onChange={(e) => updateNotificationSetting('applicationDeadlineAlerts', e.target.checked)}
                      style={{ width: 16, height: 16 }}
                    />
                    <span style={{ fontSize: 14, color: '#333' }}>Application Deadline Alerts</span>
                  </label>
                </div>
                
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyDigest}
                      onChange={(e) => updateNotificationSetting('weeklyDigest', e.target.checked)}
                      style={{ width: 16, height: 16 }}
                    />
                    <span style={{ fontSize: 14, color: '#333' }}>Weekly Digest</span>
                  </label>
                </div>
                
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={notificationSettings.newJobMatches}
                      onChange={(e) => updateNotificationSetting('newJobMatches', e.target.checked)}
                      style={{ width: 16, height: 16 }}
                    />
                    <span style={{ fontSize: 14, color: '#333' }}>New Job Matches</span>
                  </label>
                </div>
                
                <div style={{ marginTop: 16 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#333' }}>Email Frequency</label>
                  <select
                    value={emailFrequency}
                    onChange={(e) => updateEmailFrequency(e.target.value)}
                    style={{
                      width: '100%',
                      padding: 12,
                      border: '1px solid #ddd',
                      borderRadius: 8,
                      fontSize: 14
                    }}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                {isSavingSettings && (
                  <div style={{ textAlign: 'center', padding: 8 }}>
                    <div style={{ fontSize: 14, color: '#666' }}>Saving...</div>
                  </div>
                )}
              </div>
            )}
          </div>
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
