const express = require('express');

const lessonRouter = require('../Routes/lessons-routes');

const messageRouter = require('../Routes/messages-routes');


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "working!" });
});

app.use('/api/lessons', lessonRouter);
app.use('/api/messages', messageRouter);


module.exports = app;