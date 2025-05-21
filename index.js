require('dotenv').config()
const express = require('express');
const app = express()
const port = process.env.PORT



app.get('/', (req, res) => {
    res.send("Hello Sazid ")
})

app.listen(port, () => {
    console.log(`App lostening On port ${port}`);
})