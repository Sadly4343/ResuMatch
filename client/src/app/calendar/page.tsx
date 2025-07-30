"use client";
import React, { useState, useEffect } from "react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'interview' | 'deadline' | 'follow-up' | 'reminder';
  description?: string;
  time?: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    time: '',
    type: 'reminder' as CalendarEvent['type']
  });

  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const getEventsForDate = (date: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setShowAddModal(true);
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim() || !selectedDate) return;

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      time: newEvent.time,
      type: newEvent.type,
      date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    };

    setEvents([...events, event]);
    setNewEvent({ title: '', description: '', time: '', type: 'reminder' });
    setShowAddModal(false);
    setSelectedDate(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'interview': return '#2196f3';
      case 'deadline': return '#e53935';
      case 'follow-up': return '#ff9800';
      default: return '#388e3c';
    }
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div style={{ display: 'flex', minHeight: '80vh', background: '#fafbfc' }}>
      <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #eee', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32, color: '#222' }}>ResuMatch</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a href="/dashboard" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '12px 16px', fontSize: 16, transition: 'background-color 0.2s' }}>Dashboard</a>
          <a href="/resumes" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '12px 16px', fontSize: 16, transition: 'background-color 0.2s' }}>Resumes</a>
          <a href="/tools" style={{ color: '#222', textDecoration: 'none', borderRadius: 8, padding: '12px 16px', fontSize: 16, transition: 'background-color 0.2s' }}>Tools</a>
          <a href="/calendar" style={{ fontWeight: 600, color: '#2196f3', textDecoration: 'none', background: '#f0f7ff', borderRadius: 8, padding: '12px 16px', fontSize: 16 }}>Calendar</a>
        </nav>
        <div style={{ marginTop: 'auto', color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>↩️</span> 
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
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
      
      <main style={{ flex: 1, padding: '2.5rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222', margin: 0 }}>Calendar</h1>
            <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: 16 }}>Manage your job search schedule and deadlines</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              style={{ 
                background: '#fff', 
                color: '#2196f3', 
                border: '1px solid #2196f3', 
                borderRadius: 8, 
                padding: '8px 16px', 
                fontWeight: 600, 
                fontSize: 14,
                cursor: 'pointer'
              }}
            >
              ← Previous
            </button>
            <button 
              onClick={() => setCurrentDate(new Date())}
              style={{ 
                background: '#2196f3', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '8px 16px', 
                fontWeight: 600, 
                fontSize: 14,
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
                borderRadius: 8, 
                padding: '8px 16px', 
                fontWeight: 600, 
                fontSize: 14,
                cursor: 'pointer'
              }}
            >
              Next →
            </button>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
          <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #0001', padding: 24, border: '1px solid #eee' }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16, color: '#222', textAlign: 'center' }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
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
                    onClick={() => handleDateClick(day)}
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
              {events.length === 0 ? (
                <div style={{ color: '#666', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>
                  No events scheduled. Click on a date to add an event!
                </div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {events
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
                          {event.time && ` at ${event.time}`}
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#d32f2f',
                            cursor: 'pointer',
                            fontSize: 12,
                            padding: '2px 4px'
                          }}
                        >
                          ×
                        </button>
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
      </main>

      {showAddModal && (
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
            background: '#fff',
            borderRadius: 12,
            padding: 24,
            width: 400,
            maxWidth: '90vw',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            <div style={{ 
              fontWeight: 600, 
              fontSize: 18, 
              marginBottom: 16, 
              color: '#222',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              Add Event
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  fontSize: 20,
                  padding: 0
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500, color: '#222' }}>
                  Event Title *
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 6,
                    border: '1px solid #ddd',
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500, color: '#222' }}>
                  Event Type
                </label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value as CalendarEvent['type']})}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 6,
                    border: '1px solid #ddd',
                    fontSize: 14,
                    outline: 'none'
                  }}
                >
                  <option value="reminder">Reminder</option>
                  <option value="interview">Interview</option>
                  <option value="deadline">Deadline</option>
                  <option value="follow-up">Follow-up</option>
                </select>
              </div>
              
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500, color: '#222' }}>
                  Time (optional)
                </label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 6,
                    border: '1px solid #ddd',
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500, color: '#222' }}>
                  Description (optional)
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="Enter event description"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 6,
                    border: '1px solid #ddd',
                    fontSize: 14,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: '#fff',
                  color: '#666',
                  border: '1px solid #ddd',
                  borderRadius: 6,
                  padding: '10px 16px',
                  fontSize: 14,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                disabled={!newEvent.title.trim()}
                style={{
                  background: newEvent.title.trim() ? '#2196f3' : '#ccc',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 16px',
                  fontSize: 14,
                  cursor: newEvent.title.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 