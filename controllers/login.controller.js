const userTable = require('../models/users.model');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10000;
const secret = 'siddharthgaind';


exports.newUserLogin = function (req, res, next) {
  let newuser = req.body.userName;
  console.log(`Creating new user ${newuser}`);

  userTable.findOne({ userName: req.body.userName }, function (err, part) {
    if (err) {
      console.log(`Error while searching user ${req.body.userName}: ${err}`);
      res.status(500).send(err);
    }
    else if (part === null)//no user exists
    {
      console.log(`User does not exists.`);
      console.log(req.body.userPassword);
      console.log(saltRounds);

      let hash = bcrypt.hashSync(req.body.userPassword, saltRounds);

      const userLogin = new userTable({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        userPassword: hash,
        user_status: 'Active',
        user_type: 'Normal',
      });
      userLogin.save()
        .then(result => {
          console.log(result);
          let payload = { userName: req.body.userName, admin: 0 }; 	// make payload for JWT
          let token = jwt.sign(payload, secret);		// make a token
          console.log('token: ' + token);
          res.status(201).json({
            message: "New user created succesfully.",
            newUser: {
              _id: result._id,
              userName: result.userName,
              token: token,
            }
          });
        })
        .catch(err => {
          console.log(err); res.status(500).json({ error: err });
        });
    }
    else { // user already exists
      res.status(400).send(`Username ${req.body.userName} is already in use.`);
    }
  })
};

// Validate and issue a token to user
// using POST method to validate
exports.loginAuthenticate = function (req, res, next) {
  let newuser = req.body.userName;
  console.log(`Validating user ${newuser}`);
  userTable.findOne({ userName: req.body.userName }, function (err, part) {
    if (part === null) {
      res.status(401).send(`Access denied for ${newuser}`);
      console.log('User does not exist.');
    }

    else {
      // get the hash from password and check against stored value
      if (bcrypt.compareSync(req.body.userPassword, part.userPassword)) {
        // if passwords match
        let payload = { userName: req.body.userName, admin: 0 }; 	// make payload for JWT
        let token = jwt.sign(payload, secret);		// make token
        res.status(201).json({
          message: "User logged in succesfully.",
          newUser: {
            userName: part.userName,
            userIsVerified: part.userIsVerified,
            userStatus: part.userStatus,
            userType: part.userType,
            token: token,

          }
        });
        console.log('token: ' + token);
      }
      else {
        // passwords do not match
        res.status(401).send(`Access denied for ${newuser}`);
        console.log('Hashes do not match');
      }
    }
  });
}