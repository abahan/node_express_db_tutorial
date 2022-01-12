const express = require('express');
const users = require('../models/dbHelper');
const bcjs = require('bcryptjs');

const router = express.Router();

// all endpoints are for /api/users/

router.post('/register', (req, res) => {
    const credentials = req.body;
    const { username, password } = credentials;
    if (!(username && password)) {
        return res.status(400).json({ message: "Please provide username and password" });
    }
    const hash = bcjs.hashSync(credentials.password, 10);
    credentials.password = hash;
    users.addUser(credentials)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            if (err.code === '23505') {
                return res.status(400).json({ message: "Username already exist" });
            }
            res.status(500).json({ message: `cannot register user : ${err}` });
        });

});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!(username && password)) {
        return res.status(400).json({ message: "username and password do not exist" });
    }
    users.findUserByUsername(username)
    .then(user => {
        if (user && bcjs.compareSync(password, user.password)) {
            
            req.session.user = {
                id: user.id,
                username: user.username
            };


            res.status(200).json({message: "login successful"});
        }else{
            res.status(401).json({message: "username and password do not match"});
        }
    }).catch(err => {
        res.status(500).json({ message: `cannot find user : ${err}` });
    });
});

module.exports = router;