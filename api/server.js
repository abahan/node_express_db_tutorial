const express = require('express');

const lessonRouter = require('../Routes/lessons-routes');

const messageRouter = require('../Routes/messages-routes');

const userRouter = require('../Routes/users-routes');


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "server working!" });
});

app.use('/api/lessons', lessonRouter);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);


module.exports = app;