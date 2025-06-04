const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

module.exports = async (req, res) => {
  try {
    await client.connect();
    const db = client.db('lifestyle_db');
    await db.collection('Apple Health').insertOne(req.body);
    res.status(200).send('Data saved');
  } catch (e) {
    res.status(500).send(`Error: ${e.message}`);
  } finally {
    await client.close();
  }
};