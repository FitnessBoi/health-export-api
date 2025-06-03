const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { 
  tls: true,
  tlsAllowInvalidCertificates: false,
  serverSelectionTimeoutMS: 30000 
});

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    app.post('/health-data', async (req, res) => {
      const apiKey = req.headers['authorization'];
      if (apiKey !== 'Bearer HealthDataSecure2025') {
        return res.status(403).send('Forbidden');
      }
      try {
        const db = client.db('lifestyle_db');
        await db.collection('Apple Health').insertOne(req.body);
        res.status(200).send('Data saved');
      } catch (e) {
        res.status(500).send('Error');
      } finally {
        await client.close();
      }
    });

    app.listen(process.env.PORT || 3000, () => console.log('Server running'));
  } catch (e) {
    console.error('Failed to connect to MongoDB:', e);
  }
}

startServer();