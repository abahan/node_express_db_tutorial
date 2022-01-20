module.exports = (req, res, next) => {
    console.log('session object: ', req.session);
    
    if (req.session.user && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
} ;