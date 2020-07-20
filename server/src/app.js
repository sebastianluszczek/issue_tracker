'use strict';

const express = require('express');
const cors = require('cors')

// App
const app = express();

// JSON parse middleware
app.use(express.json());

app.use(cors());

// issues router
app.use("/api/issues", require('./routes/api/issues'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;
