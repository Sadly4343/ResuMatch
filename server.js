const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./data/database')
const dotenv = require('dotenv');

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

app.get('/api/users', (req, res) => {
    res.json({ users: [] });
})





mongodb.intDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(PORT, () => {
            console.log(`Running on the port ${PORT}`);
        })
    }
})