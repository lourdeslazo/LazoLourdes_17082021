const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { //On vérifie le token 
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.SECRETTOKEN);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId != userId) {
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifié !'})
    }
};