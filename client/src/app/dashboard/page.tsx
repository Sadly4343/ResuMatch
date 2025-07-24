"use client";
import React, { useState, useEffect } from "react";
import apiService from "../../services/api";

export default function DashboardPage() {
  // State management
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form state for adding/editing applications
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    status: 'applied',
    dateApplied: new Date().toISOString().split('T')[0],
    jobDescription: '',
    salary: '',
    location: '',
    notes: ''
  });

  // Fetch applications on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await apiService.getApplications();
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      // For demo purposes, use mock data if API fails
      setApplications([
        {
          _id: '1',
          jobTitle: 'Software Engineer',
          company: 'Tech Solutions Inc.',
          status: 'interview',
          dateApplied: '2023-10-26',
          location: 'San Francisco, CA',
          salary: '$120,000'
        },
        {
          _id: '2',
          jobTitle: 'Product Manager',
          company: 'Innovate Corp.',
          status: 'applied',
          dateApplied: '2023-10-20',
          location: 'New York, NY',
          salary: '$140,000'
        },
        {
          _id: '3',
          jobTitle: 'UX Designer',
          company: 'Creative Studio',
          status: 'offer',
          dateApplied: '2023-10-15',
          location: 'Austin, TX',
          salary: '$110,000'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from applications data
  const stats = {
    inProgress: applications.filter(app => app.status === 'applied').length,
    interviews: applications.filter(app => app.status === 'interview').length,
    offers: applications.filter(app => app.status === 'offer').length,
    total: applications.length
  };

  // Filter applications based on search and status
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle form submission for adding new application
  const handleAddApplication = async (e) => {
    e.preventDefault();
    try {
      await apiService.createApplication(formData);
      setShowAddModal(false);
      setFormData({
        jobTitle: '',
        company: '',
        status: 'applied',
        dateApplied: new Date().toISOString().split('T')[0],
        jobDescription: '',
        salary: '',
        location: '',
        notes: ''
      });
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error('Failed to create application:', error);
      alert('Failed to create application. Please try again.');
    }
  };

  // Handle form submission for editing application
  const handleEditApplication = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateApplication(selectedApplication._id, formData);
      setShowEditModal(false);
      setSelectedApplication(null);
      setFormData({
        jobTitle: '',
        company: '',
        status: 'applied',
        dateApplied: new Date().toISOString().split('T')[0],
        jobDescription: '',
        salary: '',
        location: '',
        notes: ''
      });
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error('Failed to update application:', error);
      alert('Failed to update application. Please try again.');
    }
  };

  // Handle delete application
  const handleDeleteApplication = async (id) => {
    if (confirm('Are you sure you want to delete this application?')) {
      try {
        await apiService.deleteApplication(id);
        fetchApplications(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete application:', error);
        alert('Failed to delete application. Please try again.');
      }
    }
  };

  // Open edit modal
  const openEditModal = (application) => {
    setSelectedApplication(application);
    setFormData({
      jobTitle: application.jobTitle || '',
      company: application.company || '',
      status: application.status || 'applied',
      dateApplied: application.dateApplied ? new Date(application.dateApplied).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      jobDescription: application.jobDescription || '',
      salary: application.salary || '',
      location: application.location || '',
      notes: application.notes || ''
    });
    setShowEditModal(true);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-yellow-100 text-yellow-800';
      case 'offer': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Modal component
  const ApplicationModal = ({ isOpen, onClose, onSubmit, title, submitText }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={formData.jobTitle}
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date Applied</label>
                <input
                  type="date"
                  value={formData.dateApplied}
                  onChange={(e) => setFormData({...formData, dateApplied: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Salary</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., $120,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Job Description</label>
              <textarea
                value={formData.jobDescription}
                onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
                placeholder="Brief description of the role..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows="2"
                placeholder="Any additional notes..."
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                {submitText}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="text-2xl font-bold text-gray-800 mb-8">ResuMatch</div>
        <nav className="flex flex-col space-y-2">
          <a href="/dashboard" className="flex items-center px-4 py-2 text-primary bg-blue-50 rounded-lg font-medium">
            Dashboard
          </a>
          <a href="/applications" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            Applications
          </a>
          <a href="/resumes" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            Resumes
          </a>
          <a href="/tools" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            Tools
          </a>
          <a href="/calendar" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            Calendar
          </a>
        </nav>
        <div className="mt-auto text-gray-500 text-sm flex items-center cursor-pointer hover:text-gray-700">
          <span className="mr-2">↩️</span> Logout
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John Doe!</h1>
          <p className="text-gray-600">Here's a quick overview of your job search progress.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Your Applications</h2>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    + Add New Application
                  </button>
                </div>
                
                {/* Search and Filter */}
                <div className="flex gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Status</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-medium text-gray-700">Job Title</th>
                        <th className="text-left p-3 font-medium text-gray-700">Company</th>
                        <th className="text-left p-3 font-medium text-gray-700">Status</th>
                        <th className="text-left p-3 font-medium text-gray-700">Date Applied</th>
                        <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-8 text-gray-500">
                            Loading applications...
                          </td>
                        </tr>
                      ) : filteredApplications.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-8 text-gray-500">
                            No applications found.
                          </td>
                        </tr>
                      ) : (
                        filteredApplications.map((app) => (
                          <tr key={app._id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-3 text-gray-900 font-medium">{app.jobTitle}</td>
                            <td className="p-3 text-gray-700">{app.company}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </span>
                            </td>
                            <td className="p-3 text-gray-600">{app.dateApplied}</td>
                            <td className="p-3">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openEditModal(app)}
                                  className="text-primary hover:text-blue-600 text-sm font-medium"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteApplication(app._id)}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Applications</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.interviews}</div>
                  <div className="text-sm text-gray-600">Interviews</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.offers}</div>
                  <div className="text-sm text-gray-600">Offers</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">Upload Resume</div>
                  <div className="text-sm text-gray-600">Add a new resume to your profile</div>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">Analyze Resume</div>
                  <div className="text-sm text-gray-600">Get AI-powered resume feedback</div>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">Generate Cover Letter</div>
                  <div className="text-sm text-gray-600">Create tailored cover letters</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <ApplicationModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddApplication}
          title="Add New Application"
          submitText="Add Application"
        />
        
        <ApplicationModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditApplication}
          title="Edit Application"
          submitText="Update Application"
        />
      </main>
    </div>
  );
} 