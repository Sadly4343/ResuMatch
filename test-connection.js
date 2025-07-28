require('dotenv').config();
const { MongoClient } = require('mongodb');

async function test () {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('resumatch'); // explicitly specify DB name
    const users = await db.collection('users').find().toArray();
    console.log('Users found:', users);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

test();
