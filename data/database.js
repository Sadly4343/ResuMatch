const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

let db;
let client;

const initDb = (callback) => {
    if (db) {
        console.log('Database is already initialized');
        return callback(null, db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((clientConnection) => {
            client = clientConnection;
            db = client.db('resumatch'); // Specify your database name
            console.log('Database connected successfully!');
            callback(null, db);
        })
        .catch((err) => {
            console.error('Database connection error:', err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!db) {
        throw new Error('Database is not initialized. Call initDb first.');
    }
    return db;
};

module.exports = {
    initDb,
    getDatabase
};