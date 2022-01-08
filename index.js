const express = require('express');
const lessons = require('./models/dbHelper');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({ message: "working!" });
});

app.post('/api/lessons', (req, res) => {
    lessons.add(req.body)
        .then(lesson => {
            res.status(200).json(lesson);
        })
        .catch(err => {
            res.status(500).json({ message: "cannot add lesson " });
        });
});

app.get('/api/lessons', (req, res) => {
    lessons.find()
        .then(lessons => {
            res.status(200).json(lessons);
        })
        .catch(err => {
            res.status(500).json({ message: "unable to retreave lessons" });
        });
});

app.get('/api/lessons/:id', (req, res) => {
    lessons.findById(req.params.id)
        .then(lesson => {
            if (lesson) {
                res.status(200).json(lesson);
            } else {
                res.status(404).json({ message: "lesson not found" });  // 404 is not found
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Unable to perform operation!" });
        });
});

app.delete('/api/lessons/:id', (req, res) => {
    const { id } = req.params;
    lessons.remove(id).then(count => {
        if (count > 0) {
            res.status(200).json({ message: "lesson successfully deleted." });
        } else {
            res.status(404).json({ message: "Unable to locate record." });
        }

    }).catch(err => {
        res.status(500).json({ message: "unable to remove lesson" });
    });

});

app.patch('/api/lessons/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    lessons.update(id, changes).then(lesson => {
        if (lesson) {
            res.status(200).json(lesson);
        } else {
            res.status(404).json({ message: "Unable to locate record." });
        }

    }).catch(err => {
        res.status(500).json({ message: "Error in the operation!" });
    });
});







app.listen(PORT, () => { "Sever is running on port " + PORT });
