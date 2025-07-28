const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB_NAME || 'resumatch',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('Mongodb connected for NextAuth');



    } catch (error) {
        console.error('Mongoose error', error.message);
    }
}

module.exports = connectDB;