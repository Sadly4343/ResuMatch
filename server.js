const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { initDb } = require('./data/database');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Mongoose Connected');
  } catch (error) {
    console.error('Mongoose not connected');
  }
};

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
const resumeRoutes = require('./server/routes/upload');

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/upload', resumeRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'ResuMatch API Server',
    status: 'running',
    version: '1.0.0'
  });
});

initDb((err, db) => {
  if (err) {
    console.log('Native MongoDb error');
  } else {
    console.log('Native connected');
  }

  connectMongoose();

  app.listen(PORT, () => {
    console.log('Server running');
  });
});
