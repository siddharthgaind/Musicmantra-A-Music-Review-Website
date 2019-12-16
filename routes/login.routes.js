const express = require('express');
const router = express.Router();

const login_controller = require('../controllers/login.controller');

//urls for user login
router.post('/newEmail', login_controller.newEmail);
router.get('/verify', login_controller.newEmailVerify);
router.get('/verifyFalse', login_controller.oldUserEmailVerify);
router.post('/signIn', login_controller.newUserLogin);
router.post('/logIn', login_controller.loginAuthenticate);

module.exports = router;