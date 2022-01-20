const jwt = require('jsonwebtoken');

module.exports = user => {
    // we need 3 things to generate a token: secret, payload, options
    const payload = {
        id: user.id,
        username: user.username
        // you can add mor data here but NOT confidintial one
    }
    const secret = process.env.SESSION_SECRET;
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options);
}