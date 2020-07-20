'use strict';

const express = require('express');

// App
const app = express();

// JSON parse middleware
app.use(express.json())

// issues router
app.use("/api/issues", require('./routes/api/issues'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;
