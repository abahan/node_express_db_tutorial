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


app.post("/api/lessons/:id/messages", (req, res) => {
    const { id } = req.params;
    const msg = req.body;
    if (!msg.lesson_id) {
        msg.lesson_id = parseInt(id, 10); // id here is string, we need to make it integer. so use parseInt and base 10

        //msg["lesson_id"] = parseInt(id,10); another way to access the id column
    }
    lessons.findById(id)
        .then(lesson => {
            if (!lesson) {
                res.status(404).json({ message: "Invalid id" });
            }
            // check for all the required fields
            if (!msg.sender || !msg.text) {
                res.status(400).json({ message: "Must provide both Sender and Text values" });
            }else{

            lessons.addMessage(msg, id)
                .then(message => {
                    if (message) {
                        res.status(200).json(message);
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: "Failed to add message" });

                });
        }})
        .catch(err => {
            res.status(500).json({ message: "Error finding lesson!" });
        });

});

app.get("/api/lessons/:id/messages", (req, res) => {
    const { id } = req.params;
    lessons.findLessonMessages(id)
    .then(lesson => {
        res.status(200).json(lesson);
    })
    .catch(err => {
        res.status(500).json({ message: "Error finding lesson!" });
    });
})


app.delete("/api/messages/:id", (req, res) => {
    const { id } = req.params;
    lessons.removeMessage(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: `Message with id ${id} successfully deleted` });
        } else {
            res.status(404).json({ message: "Error Retreaving messages!" });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Error deleting messages!" });
    });
});

app.listen(PORT, () => { "Sever is running on port " + PORT });
