require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT


app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.mongoDbUSER}:${process.env.mongoDbPASS}@cluster0.fflfquf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();

        const taskCollection = client.db("taskDb").collection("tasks")

        app.post('/addtask', async (req, res) => {
            const data = req.body
            const result = await taskCollection.insertOne(data)
            res.send(result)
        })


        app.get('/feature-task', async (req, res) => {
            const result = await taskCollection.find().sort({ deadline: 1 }).limit(6).toArray()
            res.send(result)
        })


        app.get('/all-task', async (req, res) => {
            const result = await taskCollection.find().toArray()
            
            res.send(result)
        })

        app.get('/all-task/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) };
            const result = await taskCollection.findOne(query)
            res.send(result)
        })

        app.get('/my-task/:email', async (req, res) => {
            const userEmail = req.params.email;
            const result = await taskCollection.find({ userEmail }).toArray()
            res.send(result)
        })

        app.delete('/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await taskCollection.deleteOne(query)
            res.send(result)
        })





        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {


    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`App lostening On port ${port}`);
})