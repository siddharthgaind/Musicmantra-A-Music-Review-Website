const express = require('express');
const router = express.Router();
// const joi=require('joi');
// const valid=require('../controllers/joi-validator')
// const expressJoi = require('express-joi-validator');
const login_controller = require('../controllers/login.controller');

router.post('/signIn', login_controller.newUserLogin);
router.post('/logIn', login_controller.loginAuthenticate);

module.exports = router;