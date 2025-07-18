const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { initDb, getDatabase } = require('./data/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup (optional, if using EJS)
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Root route (renders a view)
app.get('/', (req, res) => {
  res.render('index', {
    title: 'ResuMatch - AI Resume Web App',
    user: null,
  });
});

// API route to fetch users from MongoDB
app.get('/api/users', async (req, res) => {
  try {
    const db = getDatabase();
    console.log('DB Name:', db.databaseName);
    const collections = await db.listCollections().toArray();
    console.log('Collections in DB:', collections.map(c => c.name));

    const users = await db.collection('users').find().toArray();
    console.log('Users found:', users.length);
    res.json(users);
  } catch (err) {
    console.error('Failed to retrieve the Users', err);
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