const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized');
        return callback(null, database);
    }

    // Use a fallback MongoDB URI if the environment variable is not set
    const mongoUri = process.env.MONGODB_URI;
    
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', mongoUri);
    
    // Check if the URI is valid
    if (!mongoUri || typeof mongoUri !== 'string') {
        console.error('Invalid MongoDB URI:', mongoUri);
        console.log('Starting server without database connection...');
        return callback(null, null);
    }
    
    MongoClient.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000, // 5 second timeout
        connectTimeoutMS: 10000,
    })
    .then((client) => {
        console.log('Successfully connected to MongoDB');
        database = client.db(process.env.MONGODB_DB_NAME || 'resumatch');
        callback(null, database);
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        console.log('Starting server without database connection...');
        callback(null, null);
    });
};

const getDb = () => {
    if (!database) {
        throw Error('Database not initialized. Call initDb first.');
    }
    return database;
};

module.exports = {
    initDb,
    getDb
};
