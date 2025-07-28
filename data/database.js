const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

let database;

const initDb = (callback) => {
    if (db) {
        console.log('Db is already init');
    return callback(null, db)   }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((clientCreation) => {
            client = clientCreation;
            db = client.db(process.env.MONGODB_DB_NAME || 'ResuMatch');
            callback(null, db);
        })
        .catch((err) => {
            callback(err);
        })
}

const getDatabase = () => {
    if (!db) {
        throw Error('database is not found')


    }
    return db;
}

module.exports = {
    initDb, getDatabase}