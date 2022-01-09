const express = require('express');
const lessons = require('../models/dbHelper');

const router = express.Router();


// all endpoints are for /api/lessons/
router.post('/', (req, res) => {
    lessons.add(req.body)
        .then(lesson => {
            res.status(200).json(lesson);
        })
        .catch(err => {
            res.status(500).json({ message: "cannot add lesson " });
        });
});

router.get('/', (req, res) => {
    lessons.find()
        .then(lessons => {
            res.status(200).json(lessons);
        })
        .catch(err => {
            res.status(500).json({ message: "unable to retreave lessons" });
        });
});

router.get('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.patch('/:id', (req, res) => {
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


router.post("/:id/messages", (req, res) => {
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

router.get("/:id/messages", (req, res) => {
    const { id } = req.params;
    lessons.findLessonMessages(id)
    .then(lesson => {
        res.status(200).json(lesson);
    })
    .catch(err => {
        res.status(500).json({ message: "Error finding lesson!" });
    });
})

module.exports = router;