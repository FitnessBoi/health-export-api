const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 30000 });

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const apiKey = req.headers['authorization'];
  if (apiKey !== 'Bearer HealthDataSecure2025') {
    return res.status(403).send('Forbidden');
  }

  try {
    await client.connect();
    const db = client.db('lifestyle_db');
    await db.collection('Apple Health').insertOne(req.body);
    res.status(200).send('Data saved');
  } catch (e) {
    res.status(500).send('Error');
  } finally {
    await client.close();
  }
};
