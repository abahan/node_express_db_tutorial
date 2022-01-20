const express = require('express');
const morgan = require('morgan'); // logger for tracking requests
const helmet = require('helmet'); // security for express secure headers
const cors = require('cors'); // cross origin resource sharing
//const session = require('express-session');
const lessonRouter = require('../Routes/lessons-routes');
const messageRouter = require('../Routes/messages-routes');
const authRouter = require('../auth/auth-routes');
const userRouter = require('../Routes/users-routes');
const restricted = require('../auth/restricted-middleware');
const path = require('path');

const app = express();
app.use(helmet());  // security for express secure headers
app.use(morgan('dev'));// dev is the default, tiny, common, short, default, tiny, dev
app.use(cors()); // cross origin resource sharing
app.use(express.static(path.join(__dirname, '../public')));

// const sessionConfig = {
//     name: 'monster', // cookie name
//     secret: process.env.SESSION_SECRET, // cookie secret to makes the cookie effective
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7,  // 1 week in milliseconds, time of cookie expiration
//         secure: false, // true if cookie should only be sent over HTTPS. 
//         httpOnly: true, // true if cookie should only be used over HTTP. true means no access to JavaScript to avoid hacking
//     },
//     resave: false,
//     saveUninitialized: true, // cookies will be saved automatically even if they are not modified
//                             // if set to false, then the cookie will be saved only if it is modified
//                             // false is must by law *GDPD Law European union* user has to give consent to cookies
// };
app.use(express.json());
// app.use(session(sessionConfig));

app.get('/', (req, res) => {
    //res.json({ message: "server working!" });
    res.sendFile(__dirname + '/index.html');
});

app.use('/api/auth', authRouter);
app.use('/api/lessons', restricted, lessonRouter); // create a midleware "restricted " to check if user is logged in
app.use('/api/messages', restricted, messageRouter);
app.use('/api/users', restricted, userRouter);


module.exports = app;