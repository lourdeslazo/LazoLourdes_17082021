const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//Router
router.get('/userId', userCtrl.findOneProfil);
router.get('/', auth, userCtrl.findAllProfil);
router.delete('/:userId', auth, userCtrl.deleteOneUser);

module.exports = router;