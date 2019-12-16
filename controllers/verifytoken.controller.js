//verify token
const jwt = require('jsonwebtoken');
const secret = 'siddharthgaind';

module.exports = function(req, res, next) {

    const jwtToken = req.header('authToken');
    if(!jwtToken) return res.status(401).send('Access Denied !!');
    try {
        const verify =jwt.verify(jwtToken, secret);
        req.usr = verify;
        next();
    } catch (error) {res.status(400).send('Invalid Token !');}
}