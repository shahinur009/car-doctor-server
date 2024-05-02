const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())






var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-tzkxhjy-shard-00-00.6ypdnj9.mongodb.net:27017,ac-tzkxhjy-shard-00-01.6ypdnj9.mongodb.net:27017,ac-tzkxhjy-shard-00-02.6ypdnj9.mongodb.net:27017/?ssl=true&replicaSet=atlas-c13nm0-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Car Doctor is Running')
})

app.listen(port, () => {
    console.log(`Car Doctor Server Is Running on Port ${port}`)
})