const userTable = require('../models/users.model');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10000;
const secret = 'siddharthgaind';


exports.newUserLogin = function (req, res, next) {
  let user = req.body.userName;
  console.log(`Creating new user ${user}`);

  userTable.findOne({ userName: req.body.userName }, function (err, part) {
    if (err) {
      console.log(`Error while searching for user ${req.body.userName}: ${err}`);
      res.status(500).send(err);
    }
    else if (part === null)//no user exists
    {
      let hash = bcrypt.hashSync(req.body.userPassword, saltRounds);

      const userLogin = new userTable({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        userPassword: hash,
        userType: req.body.userType,
        userStatus: req.body.userStatus,
        userIsVerified: req.body.userIsVerified,
      });
      userLogin.save();
      res.send("{message: User added successfully.}");
    }
    else { // user exists
      res.status(400).send(`Username ${req.body.userName} is already in use.`);
    }
  })
};


// Validate and issue a token to user
// using POST method to validate
exports.loginAuthenticate = function (req, res, next) {
  let user = req.body.userName;
  console.log(`Validating user ${user}`);
  userTable.findOne({ userName: req.body.userName }, function (err, part) {
    if (part === null) { // no user exist
      res.status(401).send(`Access denied for ${user}`);
      console.log('User does not exist.');
    }

    else {
      // calculate the hash from password and check against stored value
      if (bcrypt.compareSync(req.body.userPassword, part.userPassword)) {
        // Passwords match
        let payload = { userName: req.body.userName, admin: 0 }; 	// make payload for JWT
        let token = jwt.sign(payload, secret);		// make token
        res.json(token);						
        console.log('token: ' + token);
      }
      else {
        // Passwords doesn't match
        res.status(401).send(`Access denied for ${user}`);
        console.log('Hashes don\'t match');
      }

    }
  });
}