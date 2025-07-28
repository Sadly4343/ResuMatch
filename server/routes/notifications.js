const express = require('express');
const router = express.Router();
const NotificationSettings = require('../models/NotificationSettings');

// Get user's notification settings
router.get('/settings', async (req, res) => {
  try {
    // For now, we'll use a mock user ID. In a real app, this would come from auth middleware
    const mockUserId = '507f1f77bcf86cd799439011'; // Mock ObjectId
    
    let settings = await NotificationSettings.findOne({ user: mockUserId });
    
    // If no settings exist, create default settings
    if (!settings) {
      settings = new NotificationSettings({
        user: mockUserId,
        settings: {
          stagnantApplicationReminders: true,
          interviewReminders: false,
          applicationDeadlineAlerts: true,
          weeklyDigest: false,
          newJobMatches: true
        },
        emailFrequency: 'daily'
      });
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    res.status(500).json({ error: 'Failed to fetch notification settings' });
  }
});

// Update user's notification settings
router.put('/settings', async (req, res) => {
  try {
    const { settings, emailFrequency } = req.body;
    
    // For now, we'll use a mock user ID. In a real app, this would come from auth middleware
    const mockUserId = '507f1f77bcf86cd799439011'; // Mock ObjectId
    
    const updatedSettings = await NotificationSettings.findOneAndUpdate(
      { user: mockUserId },
      { 
        settings: settings,
        emailFrequency: emailFrequency
      },
      { 
        new: true, 
        upsert: true, // Create if doesn't exist
        runValidators: true 
      }
    );
    
    res.json(updatedSettings);
  } catch (error) {
    console.error('Error updating notification settings:', error);
    res.status(500).json({ error: 'Failed to update notification settings' });
  }
});

// Update a specific setting
router.patch('/settings/:setting', async (req, res) => {
  try {
    const { setting } = req.params;
    const { value } = req.body;
    
    // For now, we'll use a mock user ID. In a real app, this would come from auth middleware
    const mockUserId = '507f1f77bcf86cd799439011'; // Mock ObjectId
    
    const updateQuery = {};
    updateQuery[`settings.${setting}`] = value;
    
    const updatedSettings = await NotificationSettings.findOneAndUpdate(
      { user: mockUserId },
      updateQuery,
      { 
        new: true, 
        upsert: true,
        runValidators: true 
      }
    );
    
    res.json(updatedSettings);
  } catch (error) {
    console.error('Error updating notification setting:', error);
    res.status(500).json({ error: 'Failed to update notification setting' });
  }
});

module.exports = router; 