const jwt = require('jsonwebtoken');
const email = require('../controllers/auth')
const secret = 'siddharthgaind';

exports.sessionToken = function (req, res, next) {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'cookie not set'
        });
    }
};

//api for external auth
exports.externalAuth = function (req, res, next) {
    let email1;
    email1 = email.favorite()
    console.log(email1);
    let payload = { userName: email1, admin: 0 }; 	// make up a payload for JWT
    let jwttoken = jwt.sign(payload, secret);
    console.log(jwttoken);
    res.cookie('token', jwttoken);
    res.cookie('userName', email1);
    res.redirect("http://localhost:4200/externalauth")

};