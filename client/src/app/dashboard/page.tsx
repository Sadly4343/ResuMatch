"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import apiService from "../../services/api";
import { useSession, signIn, signOut } from "next-auth/react";
import Footer from "../components/Footer";

// TypeScript interfaces for type safety
// Application interface defines the structure of a job application
interface Application {
  _id: string;
  jobTitle: string;
  company: string;
  status: string;
  dateApplied: string;
  interviewDate?: string;
  followUpDate?: string;
  deadlineDate?: string;
  jobDescription?: string;
  salary?: string;
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Calendar Event interface for tracking important dates
interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'interview' | 'deadline' | 'follow-up' | 'reminder';
  description?: string;
  time?: string;
  applicationId?: string;
}


// State management for the dashboard component
// All state variables are properly typed with TypeScript for better development experience

export default function DashboardPage() {
  // Core application state - stores all job applications fetched from the database
  const [applications, setApplications] = useState<Application[]>([]);
  
  // UI state management
  const [loading, setLoading] = useState(true); // Shows loading spinner while fetching data
  const [showAddModal, setShowAddModal] = useState(false); // Controls add application modal visibility
  const [showEditModal, setShowEditModal] = useState(false); // Controls edit application modal visibility
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null); // Currently selected app for editing
  
  // Filter and search state
  const [filterStatus, setFilterStatus] = useState('all'); // Filters applications by status (applied, interviewing, etc.)
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering applications
  
  // User feedback state
  const [error, setError] = useState(''); // Displays error messages to users
  const [successMessage, setSuccessMessage] = useState(''); // Displays success messages to users
  const [submitting, setSubmitting] = useState(false); // Prevents multiple form submissions
  
  // Calendar functionality state
  const [currentDate, setCurrentDate] = useState(new Date()); // Current month/year for calendar view
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]); // Stores calendar events from applications
  const [showCalendarView, setShowCalendarView] = useState(false); // Toggles between list and calendar view
  const [calendarLoaded, setCalendarLoaded] = useState(false);

  // NextAuth session management - handles user authentication
  const { status } = useSession();

  // Form state for adding/editing applications
  // This object stores all form field values and is used for both creating and editing applications
  const [formData, setFormData] = useState({
    jobTitle: '', // Required field for job title
    company: '', // Required field for company name
    status: 'applied', // Default status when creating new application
    dateApplied: new Date().toISOString().split('T')[0], // Today's date as default
    interviewDate: '', // Optional interview date
    followUpDate: '', // Optional follow-up reminder date
    deadlineDate: '', // Optional application deadline
    jobDescription: '', // Optional job description for reference
    salary: '', // Optional salary information
    location: '', // Optional job location
    notes: '' // Optional personal notes about the application
  });

  // useEffect hook - runs when component mounts and when authentication status changes
  // This ensures data is loaded only when user is properly authenticated
  useEffect(() => {
    // Wait for authentication status to be determined
    if (status === "loading") return;
    
    // Redirect to login if user is not authenticated
    if (status === "unauthenticated") {
      signIn();
      return;
    }
    
    // Load user's applications and calendar events once authenticated
    loadApplications();
    loadCalendarEvents();
  }, [status]);

  // Load calendar events from browser's localStorage
  // This persists calendar events between browser sessions
  const loadCalendarEvents = () => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setCalendarEvents(JSON.parse(savedEvents));
    }
    setCalendarLoaded(true);
  };

  // Auto-save calendar events to localStorage whenever they change
  // This ensures no data is lost if user refreshes the page
  useEffect(() => {
    if (calendarLoaded) {
      localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents))
    }
  }, [calendarEvents, calendarLoaded]);

  // Fetch user's job applications from the backend API
  // This function is called when the component mounts and after CRUD operations
  const loadApplications = async () => {
    try {
      setLoading(true); // Show loading spinner
      const res = await fetch('/api/applications');
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(data); // Update state with fetched applications
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Calculate application statistics for the dashboard cards
  // These stats help users visualize their job search progress
  const stats = {
    total: applications.length, // Total number of applications
    applied: applications.filter((app: Application) => app.status === 'applied').length, // Applications submitted
    interviewing: applications.filter((app: Application) => app.status === 'interviewing').length, // In interview process
    offered: applications.filter((app: Application) => app.status === 'offered').length, // Job offers received
    rejected: applications.filter((app: Application) => app.status === 'rejected').length // Applications rejected
  };

  // Filter applications based on search term and status filter
  // This provides real-time filtering as user types or changes status filter
  const filteredApplications = applications.filter((app: Application) => {
    // Check if application matches search term (job title or company name)
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    // Check if application matches selected status filter
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus; // Both conditions must be true
  });

  // Handle form submission for both creating and editing applications
  // This function handles the complete CRUD operation flow
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setSubmitting(true); // Show loading state
    setError(''); // Clear any previous errors
    setSuccessMessage(''); // Clear any previous success messages
    
    try {
      let applicationId: string;
      
      // Determine if we're editing existing application or creating new one
      if (showEditModal && selectedApplication) {
        // Update existing application
        await apiService.updateApplication(selectedApplication._id, formData);
        applicationId = selectedApplication._id;
      } else {
        // Create new application
        const newApplication = await apiService.createApplication(formData);
        applicationId = newApplication._id;
      }
      
      // Create calendar events for any important dates in the application
      await createCalendarEvents(applicationId);
      
      // Reset UI state after successful operation
      setShowAddModal(false);
      setShowEditModal(false);
      setSelectedApplication(null);
      resetForm();
      loadApplications(); // Refresh the applications list
      setSuccessMessage('Application saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Auto-hide success message
    } catch (error) {
      console.error('Error saving application:', error);
      setError('Failed to save application. Please try again.');
      setTimeout(() => setError(''), 3000); // Auto-hide error message
    } finally {
      setSubmitting(false); // Hide loading state
    }
  };

  // Create calendar events for important dates in job applications
  // This automatically adds events to the calendar when dates are set
  const createCalendarEvents = async (applicationId: string) => {
    const events: CalendarEvent[] = [];
    
    // Create interview event if interview date is set
    if (formData.interviewDate) {
      events.push({
        id: `interview-${applicationId}-${Date.now()}`, // Unique ID for the event
        title: `Interview: ${formData.jobTitle} at ${formData.company}`,
        date: formData.interviewDate,
        type: 'interview',
        description: `Interview for ${formData.jobTitle} position at ${formData.company}`,
        applicationId
      });
    }
    
    // Create follow-up event if follow-up date is set
    if (formData.followUpDate) {
      events.push({
        id: `followup-${applicationId}-${Date.now()}`,
        title: `Follow-up: ${formData.company}`,
        date: formData.followUpDate,
        type: 'follow-up',
        description: `Follow up on application for ${formData.jobTitle} at ${formData.company}`,
        applicationId
      });
    }
    
    // Create deadline event if deadline date is set
    if (formData.deadlineDate) {
      events.push({
        id: `deadline-${applicationId}-${Date.now()}`,
        title: `Deadline: ${formData.jobTitle} at ${formData.company}`,
        date: formData.deadlineDate,
        type: 'deadline',
        description: `Application deadline for ${formData.jobTitle} at ${formData.company}`,
        applicationId
      });
    }
    
    // Add new events to existing calendar events
    setCalendarEvents((prev: CalendarEvent[]) => [...prev, ...events]);
  };

  // Handle application deletion with user confirmation
  // This prevents accidental deletions and provides user feedback
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      try {
        await apiService.deleteApplication(id); // Delete from backend
        loadApplications(); // Refresh the applications list
        setSuccessMessage('Application deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Auto-hide success message
      } catch (error) {
        console.error('Error deleting application:', error);
        setError('Failed to delete application. Please try again.');
        setTimeout(() => setError(''), 3000); // Auto-hide error message
      }
    }
  };

  // Handle application editing - populate form with existing data
  // This function prepares the edit modal with the selected application's data
  const handleEdit = (application: Application) => {
    setSelectedApplication(application); // Store the application being edited
    setFormData({
      jobTitle: application.jobTitle,
      company: application.company,
      status: application.status,
      dateApplied: application.dateApplied,
      interviewDate: application.interviewDate || '', // Use empty string if no date
      followUpDate: application.followUpDate || '',
      deadlineDate: application.deadlineDate || '',
      jobDescription: application.jobDescription || '',
      salary: application.salary || '',
      location: application.location || '',
      notes: application.notes || ''
    });
    setShowEditModal(true); // Show the edit modal
  };

  // Reset form to default values
  // This is called after successful form submission or when canceling
  const resetForm = () => {
    setFormData({
      jobTitle: '',
      company: '',
      status: 'applied', // Default status for new applications
      dateApplied: new Date().toISOString().split('T')[0], // Today's date
      interviewDate: '',
      followUpDate: '',
      deadlineDate: '',
      jobDescription: '',
      salary: '',
      location: '',
      notes: ''
    });
  };

  // Get color scheme for application status badges
  // This provides visual distinction between different application statuses
  const getStatusColor = (status: string): { background: string; color: string; border: string } => {
    switch (status) {
      case 'applied': return { background: '#e3f2fd', color: '#1976d2', border: '1px solid #bbdefb' }; // Blue for applied
      case 'interviewing': return { background: '#fff3e0', color: '#f57c00', border: '1px solid #ffcc02' }; // Orange for interviewing
      case 'offered': return { background: '#e8f5e8', color: '#388e3c', border: '1px solid #c8e6c9' }; // Green for offered
      case 'rejected': return { background: '#ffebee', color: '#d32f2f', border: '1px solid #ffcdd2' }; // Red for rejected
      default: return { background: '#f5f5f5', color: '#424242', border: '1px solid #e0e0e0' }; // Gray for unknown status
    }
  };

  // Calendar utility functions for rendering the calendar view
  // These functions handle calendar calculations and event display
  
  // Calculate the number of days in a month and which day the month starts on
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1); // First day of the month
    const lastDay = new Date(year, month + 1, 0); // Last day of the month
    const daysInMonth = lastDay.getDate(); // Total days in the month
    const startingDay = firstDay.getDay(); // Day of week the month starts on (0 = Sunday)
    return { daysInMonth, startingDay };
  };

  // Get all calendar events for a specific date
  // This is used to display event indicators on calendar days
  const getEventsForDate = (date: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return calendarEvents.filter((event: CalendarEvent) => event.date === dateString);
  };

  // Get color for different types of calendar events
  // This provides visual distinction between interviews, deadlines, and follow-ups
  const getEventColor = (type: CalendarEvent['type']): string => {
    switch (type) {
      case 'interview': return '#2196f3'; // Blue for interviews
      case 'deadline': return '#e53935'; // Red for deadlines
      case 'follow-up': return '#ff9800'; // Orange for follow-ups
      default: return '#388e3c'; // Green for other events
    }
  };

  // Calendar display constants
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  // Loading state - shows spinner while fetching data from the server
  // This provides user feedback during API calls
  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            border: '4px solid #e3f2fd', 
            borderTop: '4px solid #2196f3', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite', // CSS animation for spinning effect
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '16px', color: '#666', fontWeight: 500 }}>Loading applications...</p>
        </div>
      </div>
    );
  }

  // Main dashboard layout with sidebar navigation and content area
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fafbfc' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar Navigation */}
        {/* Contains app logo, navigation links, and logout button */}
        <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32 }}>ResuMatch</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <a href="/dashboard" style={{ fontWeight: 600, color: '#2196f3', textDecoration: 'none', background: '#f0f7ff', borderRadius: 8, padding: '8px 16px' }}>Dashboard</a>
            <a href="/resumes" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Resumes</a>
            <a href="/tools" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Tools</a>
            <a href="/calendar" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>Calendar</a>
          </nav>
          <div style={{ marginTop: 'auto', color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <span>↩️</span> 
            <button
              onClick={() => {
                signOut()
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: 15,
                cursor: 'pointer',
                padding: 0
              }}
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222', margin: 0 }}>Dashboard</h1>
              <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: 16 }}>
                Manage your job applications and track your progress
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowCalendarView(!showCalendarView)}
                style={{ 
                  background: showCalendarView ? '#1976d2' : '#fff', 
                  color: showCalendarView ? '#fff' : '#2196f3', 
                  border: '1px solid #2196f3', 
                  borderRadius: 8, 
                  padding: '12px 24px', 
                  fontWeight: 600, 
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                {showCalendarView ? 'List View' : 'Calendar View'}
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                style={{ 
                  background: '#2196f3', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '12px 24px', 
                  fontWeight: 600, 
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#1976d2'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#2196f3'}
              >
                Add New Application
              </button>
            </div>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div style={{
              background: '#e8f5e8',
              color: '#2e7d32',
              padding: '12px 16px',
              borderRadius: 8,
              marginBottom: 16,
              border: '1px solid #c8e6c9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{successMessage}</span>
              <button
                onClick={() => setSuccessMessage('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2e7d32',
                  cursor: 'pointer',
                  fontSize: 18
                }}
              >
                ×
              </button>
            </div>
          )}

          {error && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '12px 16px',
              borderRadius: 8,
              marginBottom: 16,
              border: '1px solid #ffcdd2',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{error}</span>
              <button
                onClick={() => setError('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#c62828',
                  cursor: 'pointer',
                  fontSize: 18
                }}
              >
                ×
              </button>
            </div>
          )}

          {showCalendarView ? (
            // Calendar View
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
              <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 24, border: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 18, color: '#222' }}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button 
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                      style={{ 
                        background: '#fff', 
                        color: '#2196f3', 
                        border: '1px solid #2196f3', 
                        borderRadius: 6, 
                        padding: '6px 12px', 
                        fontWeight: 600, 
                        fontSize: 12,
                        cursor: 'pointer'
                      }}
                    >
                      ←
                    </button>
                    <button 
                      onClick={() => setCurrentDate(new Date())}
                      style={{ 
                        background: '#2196f3', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: 6, 
                        padding: '6px 12px', 
                        fontWeight: 600, 
                        fontSize: 12,
                        cursor: 'pointer'
                      }}
                    >
                      Today
                    </button>
                    <button 
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                      style={{ 
                        background: '#fff', 
                        color: '#2196f3', 
                        border: '1px solid #2196f3', 
                        borderRadius: 6, 
                        padding: '6px 12px', 
                        fontWeight: 600, 
                        fontSize: 12,
                        cursor: 'pointer'
                      }}
                    >
                      →
                    </button>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(7, 1fr)', 
                  gap: 2, 
                  background: '#f5f7fa', 
                  borderRadius: 8, 
                  padding: 16,
                  border: '1px solid #eee'
                }}>
                  {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(day => (
                    <div key={day} style={{ 
                      textAlign: 'center', 
                      fontWeight: 600, 
                      color: '#666', 
                      padding: '8px 4px',
                      fontSize: 12
                    }}>
                      {day}
                    </div>
                  ))}
                  
                  {[...Array(startingDay)].map((_, i) => (
                    <div key={`empty-${i}`} style={{ padding: 8 }}></div>
                  ))}
                  
                  {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    const dayEvents = getEventsForDate(day);
                    const isToday = new Date().getDate() === day && 
                                   new Date().getMonth() === currentDate.getMonth() && 
                                   new Date().getFullYear() === currentDate.getFullYear();
                    
                    return (
                      <div 
                        key={day} 
                        style={{ 
                          textAlign: 'center', 
                          padding: 8, 
                          color: '#222', 
                          fontWeight: 500,
                          fontSize: 14,
                          cursor: 'pointer',
                          borderRadius: 4,
                          background: isToday ? '#e3f2fd' : 'transparent',
                          border: isToday ? '2px solid #2196f3' : 'none',
                          position: 'relative',
                          minHeight: 40
                        }}
                      >
                        {day}
                        {dayEvents.length > 0 && (
                          <div style={{ 
                            position: 'absolute', 
                            bottom: 2, 
                            left: '50%', 
                            transform: 'translateX(-50%)', 
                            fontSize: 8, 
                            color: getEventColor(dayEvents[0].type) 
                          }}>
                            ●
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#666', marginTop: 16, justifyContent: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#2196f3', fontSize: 16 }}>●</span> Interview
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#e53935', fontSize: 16 }}>●</span> Deadline
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#ff9800', fontSize: 16 }}>●</span> Follow-up
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#388e3c', fontSize: 16 }}>●</span> Reminder
                  </span>
                </div>
              </section>
              
              <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 24, border: '1px solid #eee' }}>
                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222' }}>Upcoming Events</div>
                <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                  {calendarEvents.length === 0 ? (
                    <div style={{ color: '#666', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>
                      No events scheduled. Add applications with dates to see events here!
                    </div>
                  ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {calendarEvents
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .slice(0, 10)
                        .map(event => (
                        <li key={event.id} style={{ 
                          padding: '12px 0', 
                          borderBottom: '1px solid #eee',
                          fontSize: 14
                        }}>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start',
                            marginBottom: 4
                          }}>
                            <div style={{ 
                              fontWeight: 600, 
                              color: getEventColor(event.type),
                              fontSize: 12
                            }}>
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                          <div style={{ 
                            fontWeight: 500, 
                            color: '#222',
                            marginBottom: 2
                          }}>
                            {event.title}
                          </div>
                          {event.description && (
                            <div style={{ 
                              color: '#666', 
                              fontSize: 12,
                              lineHeight: 1.4
                            }}>
                              {event.description}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </div>
          ) : (
            // List View
            <>
              {/* Stats Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32 }}>
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0001', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ padding: 8, background: '#e3f2fd', borderRadius: 8, marginRight: 16 }}>
                      <span style={{ fontSize: 24 }}>📊</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#666', margin: 0 }}>Total</p>
                      <p style={{ fontSize: 24, fontWeight: 700, color: '#222', margin: 0 }}>{stats.total}</p>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0001', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ padding: 8, background: '#e3f2fd', borderRadius: 8, marginRight: 16 }}>
                      <span style={{ fontSize: 24 }}>📝</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#666', margin: 0 }}>Applied</p>
                      <p style={{ fontSize: 24, fontWeight: 700, color: '#2196f3', margin: 0 }}>{stats.applied}</p>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0001', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ padding: 8, background: '#fff3e0', borderRadius: 8, marginRight: 16 }}>
                      <span style={{ fontSize: 24 }}>📅</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#666', margin: 0 }}>Interviewing</p>
                      <p style={{ fontSize: 24, fontWeight: 700, color: '#f57c00', margin: 0 }}>{stats.interviewing}</p>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0001', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ padding: 8, background: '#e8f5e8', borderRadius: 8, marginRight: 16 }}>
                      <span style={{ fontSize: 24 }}>✅</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#666', margin: 0 }}>Offered</p>
                      <p style={{ fontSize: 24, fontWeight: 700, color: '#388e3c', margin: 0 }}>{stats.offered}</p>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0001', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ padding: 8, background: '#ffebee', borderRadius: 8, marginRight: 16 }}>
                      <span style={{ fontSize: 24 }}>❌</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#666', margin: 0 }}>Rejected</p>
                      <p style={{ fontSize: 24, fontWeight: 700, color: '#d32f2f', margin: 0 }}>{stats.rejected}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters and Search */}
              <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 24, marginBottom: 24, border: '1px solid #eee' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <input
                        type="text"
                        placeholder="Search by job title or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: 8,
                          fontSize: 16,
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: 8,
                          fontSize: 16,
                          outline: 'none',
                          minWidth: 150
                        }}
                      >
                        <option value="all">All Status</option>
                        <option value="applied">Applied</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offered">Offered</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Applications Table */}
              <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', overflow: 'hidden', border: '1px solid #eee' }}>
                <div style={{ padding: '24px 24px 0 24px' }}>
                  <h3 style={{ fontWeight: 600, fontSize: 18, margin: 0, color: '#222' }}>Job Applications</h3>
                </div>
                
                {filteredApplications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#222', margin: '0 0 8px 0' }}>No applications found</h3>
                    <p style={{ color: '#666', margin: 0 }}>
                      {searchTerm || filterStatus !== 'all' 
                        ? 'Try adjusting your search or filter criteria.'
                        : 'Get started by adding your first job application.'
                      }
                    </p>
                    {!searchTerm && filterStatus === 'all' && (
                      <div style={{ marginTop: 24 }}>
                        <button
                          onClick={() => setShowAddModal(true)}
                          style={{ 
                            background: '#2196f3', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: 8, 
                            padding: '12px 24px', 
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Add Application
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f5f7fa', textAlign: 'left' }}>
                        <th style={{ padding: '16px 24px', fontWeight: 600, color: '#666', fontSize: 14 }}>Job Title</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600, color: '#666', fontSize: 14 }}>Company</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600, color: '#666', fontSize: 14 }}>Status</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600, color: '#666', fontSize: 14 }}>Date Applied</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600, color: '#666', fontSize: 14 }}>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((application) => (
                          <tr key={application._id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '16px 24px' }}>
                              <div style={{ fontWeight: 600, color: '#222' }}>{application.jobTitle}</div>
                              {application.location && (
                                <div style={{ color: '#666', fontSize: 14, marginTop: 4 }}>{application.location}</div>
                              )}
                            </td>
                            <td style={{ padding: '16px 24px', color: '#222' }}>
                              {application.company}
                            </td>
                            <td style={{ padding: '16px 24px' }}>
                              <span style={{
                                display: 'inline-block',
                                padding: '4px 12px',
                                borderRadius: 16,
                                fontSize: 12,
                                fontWeight: 600,
                                ...getStatusColor(application.status)
                              }}>
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                              </span>
                            </td>
                            <td style={{ padding: '16px 24px', color: '#222' }}>
                              {new Date(application.dateApplied).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '16px 24px' }}>
                              <div style={{ display: 'flex', gap: 12 }}>
                                <button
                                  onClick={() => handleEdit(application)}
                                  style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    color: '#2196f3', 
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: 14
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(application._id)}
                                  style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    color: '#d32f2f', 
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: 14
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </div>

      {/* Add Application Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            maxWidth: 500,
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: '#222', margin: '0 0 24px 0' }}>Add New Application</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                  placeholder="Enter job title"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Company *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                >
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offered">Offered</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Date Applied</label>
                <input
                  type="date"
                  value={formData.dateApplied}
                  onChange={(e) => setFormData({...formData, dateApplied: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Interview Date</label>
                <input
                  type="date"
                  value={formData.interviewDate}
                  onChange={(e) => setFormData({...formData, interviewDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Follow-up Date</label>
                <input
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Deadline Date</label>
                <input
                  type="date"
                  value={formData.deadlineDate}
                  onChange={(e) => setFormData({...formData, deadlineDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Salary</label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                  placeholder="Enter salary range"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Job Description</label>
                <textarea
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  placeholder="Enter job description"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  placeholder="Enter any additional notes"
                />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  style={{
                    padding: '12px 24px',
                    color: '#666',
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '12px 24px',
                    background: '#2196f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Add Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Application Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            maxWidth: 500,
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: '#222', margin: '0 0 24px 0' }}>Edit Application</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                  placeholder="Enter job title"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Company *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                >
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offered">Offered</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Date Applied</label>
                <input
                  type="date"
                  value={formData.dateApplied}
                  onChange={(e) => setFormData({...formData, dateApplied: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Interview Date</label>
                <input
                  type="date"
                  value={formData.interviewDate}
                  onChange={(e) => setFormData({...formData, interviewDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Follow-up Date</label>
                <input
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Deadline Date</label>
                <input
                  type="date"
                  value={formData.deadlineDate}
                  onChange={(e) => setFormData({...formData, deadlineDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Salary</label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                  placeholder="Enter salary range"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Job Description</label>
                <textarea
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  placeholder="Enter job description"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#222', marginBottom: 8 }}>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  placeholder="Enter any additional notes"
                />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedApplication(null);
                    resetForm();
                  }}
                  style={{
                    padding: '12px 24px',
                    color: '#666',
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    background: '#2196f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Update Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
} 