const Application = require('../models/Application');

// Get all applications for a user
const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .sort({ dateApplied: -1 });
    
    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single application
const getApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new application
const createApplication = async (req, res) => {
  try {
    const {
      jobTitle,
      company,
      status,
      dateApplied,
      jobDescription,
      salary,
      location,
      notes,
      interviewDate,
      followUpDate
    } = req.body;

    const application = new Application({
      user: req.user._id,
      jobTitle,
      company,
      status: status || 'applied',
      dateApplied: dateApplied || new Date(),
      jobDescription,
      salary,
      location,
      notes,
      interviewDate,
      followUpDate
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update application
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete application
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get application statistics
const getApplicationStats = async (req, res) => {
  try {
    const stats = await Application.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalApplications = await Application.countDocuments({ user: req.user._id });
    const recentApplications = await Application.find({ user: req.user._id })
      .sort({ dateApplied: -1 })
      .limit(5);

    res.json({
      stats,
      totalApplications,
      recentApplications
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplicationStats
}; 