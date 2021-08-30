// Modules required
const express = require('express');
const path = require('path');

//Security
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const nocache = require('nocache');
const xssClean = require('xss-clean'); 

const app = express();

//Routes
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');


//Access to API from anywhere
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(nocache()); 
app.use(helmet()); //Http protection
app.use(xssClean());

//Cookies in Http
const expiredDate = new Date(Date.now() + 60 * 60 * 1000); //1h

app.use(cookieSession({
  secret: 'sessionS3cur3',
  cookie : {
    secure : true,
    httpOnly : true,
    domain : 'http://localhost:8080',
    expires: expiredDate
  }
})
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//Save routes in the app
app.use('/api/auth', loginRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;
