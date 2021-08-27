// Modules requis
const express = require('express');
const path = require('path');

//Mise en place de la sécurité
const cookieSession = require('cookie-session');
const helmet = require('helmet');
///ici rate limit
const nocache = require("nocache");

const app = express();
app.use(nocache());

//ici rate limit
app.use(helmet()); //Protection des entêtes Http

//Routes
//ici



//Accès à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Cookies en Http
const expiryDate = new Date( Date.now() + 60 * 60 * 1000); //1h

app.use(cookieSession({
  secret: 'sessionS3cur3',
  cookie : {
    secure : true,
    httpOnly : true,
    domain : 'http://localhost:8080',
    expires: expiryDate
  }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//Enregistre les routes dans l'app
///ici

module.exports = app;
