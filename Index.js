const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        const serviceCollection = client.db('cardoctor').collection('services')
        const bookingCollection = client.db('cardoctor').collection('booking')


        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.post('/booking', async (req, res) => {
            const booking = req.body;
            console.log(booking)
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        })
        app.get('/booking', async (req, res) => {
            console.log(req.query.email)
            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email }
            }
            const result = await bookingCollection.find(query).toArray()
            res.send(result)
        })

        const options = {

            projection: { title: 1, price: 1, service_id: 1, img: 1 },
        };

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await serviceCollection.findOne(query, options);
            res.send(result)
        })

        app.patch('/booking/:id' , async(req, res) =>{
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)}
            const updatedBooking = req.body;
            console.log(updatedBooking)
            const updateDoc ={
                $set: {
                    status: updatedBooking.status
                }
            }
            const result = await bookingCollection.updateOne(filter, updateDoc)
            res.send(result)

        })

        app.delete('booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await bookingCollection.deleteOne(query);
            res.send(result);
        })

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