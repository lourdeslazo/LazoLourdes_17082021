var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'lourdes12345';

//exports functions
module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
            JWT_SIGN_SECRET,
            {
                expiresIn: '1h'
            })
    }
}