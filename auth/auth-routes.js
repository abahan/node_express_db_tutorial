const express = require('express');
//const https = require('https');
const users = require('../models/dbHelper');
const bcjs = require('bcryptjs');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
//// all endpoints are for /api/users/

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

router.post('/login',(req, res) => {
    const { username, password } = req.body;
    if (!(username && password)) {
        return res.status(400).json({ message: "username and password do not exist "+ username});
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

router.get('/logout', (req, res) => {
    if (req.session) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "cannot logout" });
        } else {
        res.status(200).json({ message: "successfully logout" });
    };
    })
   }else {
       res.status(200).json({ message: "Not logged in " });
   }
});

module.exports = router;