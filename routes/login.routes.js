const express = require('express');
const router = express.Router();
const login_controller = require('../controllers/login.controller');

router.post('/login', login_controller.newUserLogin);
router.post('/signin', login_controller.loginAuthenticate);

module.exports = router;