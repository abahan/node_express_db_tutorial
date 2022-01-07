const  express = require('express');
const lessons = require('./models/dbHelper');
const  app = express();
app.use(express.json());
// const {Client} = require('pg');
// require('dotenv').config({path:"process.env"});

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({message: "working!"});
});

app.post('/api/lessons', (req, res) => {
    lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson);
    })
    .catch(err => {
        res.status(500).json({message: "cannot add lesson "});
    });
});

app.get('/api/lessons', (req, res) => { 
    lessons.find()
    .then(lessons => {
        res.status(200).json(lessons);
    })
    .catch(err => {
        res.status(500).json({message: "unable to retreave lessons"});
    });
});


app.listen(PORT, () => {"Sever is running on port " + PORT});
