const express = require('express');
const router = express.Router();
const login_controller = require('../controllers/login.controller');

router.post('/signIn', login_controller.newUserLogin);
router.post('/logIn', login_controller.loginAuthenticate);

module.exports = router;