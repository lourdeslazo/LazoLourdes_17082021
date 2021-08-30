const express = require('express');
const router = express.Router();

const loginCtrl = require('../controllers/login');
const limitUser = require('../utils/limiter');

//routes
router.post('/signup', loginCtrl.signup);
router.post('/login', limitUser.limiter, loginCtrl.login);

module.exports = router;