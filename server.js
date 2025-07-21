const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initDb } = require('./data/database');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
const authRoutes = require('./server/routes/auth');
const applicationRoutes = require('./server/routes/applications');
const toolsRoutes = require('./server/routes/tools');

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/tools', toolsRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'ResuMatch API Server',
    status: 'running',
    version: '1.0.0'
  });
});

// Initialize database and start server
initDb((err, db) => {
  if (err) {
    console.error('DB Initialization Failed:', err);
  }
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
