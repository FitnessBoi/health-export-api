const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

app.post('/airthings-data', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('airthings');
    await db.collection('sensors').insertOne(req.body);
    res.status(200).send('Data saved');
  } catch (e) {
    res.status(500).send('Error');
  }
});

app.listen(process.env.PORT || 3000);