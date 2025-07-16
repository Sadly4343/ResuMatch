const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const { initDb, getDatabase } = require('./data/database')
const dotenv = require('dotenv');
const mongodb = require('./data/database')

=======
const mongodb = require('./data/database')
const dotenv = require('dotenv');
>>>>>>> 1cf928db1884f390f94cad8427243a24657c7d0c

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', './views');

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'ResuMatch - AI Resume Web App;',
        user: null
    });
})

<<<<<<< HEAD
initDb((err, db ) => {
=======
app.get('/api/users', (req, res) => {
    res.json({ users: [] });
})





mongodb.intDb((err) => {
>>>>>>> 1cf928db1884f390f94cad8427243a24657c7d0c
    if (err) {
        console.log(err);
    }
    else {
        app.listen(PORT, () => {
            console.log(`Running on the port ${PORT}`);
        })
    }
<<<<<<< HEAD
})

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
    res.status(500).json({ message: 'Server Errors '});
  }
});






=======
})
>>>>>>> 1cf928db1884f390f94cad8427243a24657c7d0c
