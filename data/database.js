const dotenv = require('dotenv');
<<<<<<< HEAD
const { MongoClient} = require('mongodb');

dotenv.config();


let db;
let client;

const initDb = (callback) => {
    if (db) {
        console.log('Db is already init');
    return callback(null, db)   }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((clientCreation) => {
            client = clientCreation;
            db = client.db(process.env.MONGODB_DB_NAME || 'ResuMatch');
            callback(null, db);
=======
const { CancellationToken } = require('mongodb');

dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const intDb = (callback) => {
    if (database) {
        console.log('Db is already init');
    return callback(null, database);    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client;
            callback(null, database);

>>>>>>> 1cf928db1884f390f94cad8427243a24657c7d0c
        })
        .catch((err) => {
            callback(err);
        })
}

const getDatabase = () => {
<<<<<<< HEAD
    if (!db) {
=======
    if (!database) {
>>>>>>> 1cf928db1884f390f94cad8427243a24657c7d0c
        throw Error('database is not found')


    }
<<<<<<< HEAD
    return db;
}

module.exports = {
    initDb, getDatabase}
=======
    return database;
}

module.exports = {
    intDb, getDatabase}
>>>>>>> 1cf928db1884f390f94cad8427243a24657c7d0c
