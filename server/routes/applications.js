const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Get all applications for user
router.get('/', applicationController.getUserApplications);

// Get application statistics
router.get('/stats', applicationController.getApplicationStats);

// Get single application
router.get('/:id', applicationController.getApplication);

// Create new application
router.post('/', applicationController.createApplication);

// Update application
router.put('/:id', applicationController.updateApplication);

// Delete application
router.delete('/:id', applicationController.deleteApplication);

module.exports = router; 