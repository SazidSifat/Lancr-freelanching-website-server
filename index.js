require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
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
        await client.connect();

        app.post('/addtask', (req, res) => {

            const data = req.body
            console.log(data);

        })



        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {


    }
}
run().catch(console.dir);



  app.get('/', (req, res) => {

            res.send("hello")

        })



app.listen(port, () => {
    console.log(`App lostening On port ${port}`);
})