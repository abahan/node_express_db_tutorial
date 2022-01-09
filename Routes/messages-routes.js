const express = require('express');
const lessons = require('../models/dbHelper');

const router = express.Router();

// all endpoints are for /api/messages/
router.delete("/:id", (req, res) => {
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

module.exports = router;