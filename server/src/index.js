'use strict';

const express = require('express');
const connectDb = require('./utils/connection')

// Constants
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

// App
const app = express();

// JSON parse middleware
app.use(express.json())

// issues router
app.use("/api/issues", require('./routes/api/issues'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, HOST, () => {
    console.log(`Service running on http://${HOST}:${PORT}`);
});

connectDb().then(() => {
    console.log("MongoDb connected");
});