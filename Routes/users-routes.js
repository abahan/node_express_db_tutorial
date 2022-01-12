const express = require('express');
const users = require('../models/dbHelper');

const router = express.Router();

// all endpoints are for /api/users/




router.get('/', (req, res) => {
    users.findAllUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: `cannot find users : ${err}` });
        });
});

router.get('/:username', (req, res) => {

    const { username } = req.params;
    users.findUserByUsername(username)
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: "Username does not exist" });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: `cannot find user : ${err}` });
        });

});





module.exports = router;