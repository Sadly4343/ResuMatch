const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { initDb, getDatabase } = require('./data/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route (API info)
app.get('/', (req, res) => {
  res.json({
    description: 'Backend API for ResuMatch - AI Resume Web App',
    frontend: 'React app runs on port 3000',
    endpoints: {
      users: '/api/users',
      resumes: '/api/resumes',
  
    }
  });
});

// API route to fetch users from MongoDB
app.get('/api/users', async (req, res) => {
  try {
    const db = getDatabase();
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    console.error('Failed to retrieve the Users', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/resumes', async (req, res) => {
  try {
    const db = getDatabase();
    const resumes = await db.collection('resumes').find().toArray();
    res.json(resumes);
  } catch (err) {
      console.error('Failed to retrieve the Resumes', err); 
    res.status(500).json({ message: 'Server Error' });
  }
});

// Initialize DB and start server
initDb((err) => {
  if (err) {
    console.error('DB Initialization Failed:', err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});