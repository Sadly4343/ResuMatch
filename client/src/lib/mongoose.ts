import  mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: process.env.MONGODB_DB_NAME || 'ResuMatch',
        });
        isConnected = true;
        console.log('Mongodb connected for NextAuth');

    } catch (error: any) {
        console.error('Mongoose error', error.message);
    }
};