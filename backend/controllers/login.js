const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models'); 

const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

//Routes
exports.signup = function(req, res) {
      // Params
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;
      const bio = req.body.bio;

    if (!PASSWORD_REGEX.test(password)) { 
        return res.status(400).json({ 'error': 'password invalid (must lenght 4 - 8 and include 1 number at least' });
    }

    models.User.findOne({
        attributes: ['email'],
        where: {email: email}
    })
    .then(function(userFound) {
            if(!userFound) {
                bcrypt.hash(password, 10, function( err, hash ) {
                    var newUser = models.User.create({
                        email: email,
                        username: username,
                        password: hash,
                        bio: bio,
                        isAdmin: 0
                    })
                    .then(newUser => { res.status(201).json({ 'userId': newUser.id })
                    })
                    .catch(err => res.status(500).json({ 'error': err }));
                });

            }else {
                return res.status(409).json({ 'error': 'user already exist' });
            }
    })
    .catch(err => res.status(500).json({ 'error': 'unable to verify user' }));

}

exports.login = (req, res) => {  //On récupère l'utilisateur de la base de données
    //params
    const email = req.body.email;
    const password = req.body.password;

    models.User.findOne({
        where: {email: email}
    })
    .then(function(userFound) {
        if (userFound) {
            bcrypt.compare(password, userFound.password, function( err, valid ) {
                if(valid) {
                    return res.status(200).json({
                        'userId': userFound.id,
                        'token': jwtUtils.generateTokenForUser(userFound)
                    });
                }else {
                    return res.status(403).json({ 'error': 'invalid password' });
                }
            });
        }else {
            return res.status(404).json({ 'error': 'user not existe in DB' });
        }
    })
    .catch(err => res.status(500).json({ 'error': 'unable to verify user' }));
}
