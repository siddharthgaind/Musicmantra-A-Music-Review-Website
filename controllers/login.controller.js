const userTable = require('../models/users.model');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10000;
const secret = 'siddharthgaind';
const joi = require('joi');
const { loginTable } = require('../controllers/validator')

//login for new user
exports.newUserLogin = function (req, res, next) {
  console.log(req.body)
  const { error } = loginTable(req.body)
  console.log(error)
  if (error) return res.status(401).send(error.details[0].message)
  let newuser = req.body.userName;
  console.log(`Creating new user ${newuser}`);

  userTable.findOne({ userName: req.body.userName }, function (err, part) {
    if (err) {
      console.log(`Error while searching user ${req.body.userName}: ${err}`);
      res.status(500).send(err);
    }
    else if (part === null) {
      console.log(`User does not exists.`);
      console.log(req.body.userPassword);
      console.log(saltRounds);

      let hash = bcrypt.hashSync(req.body.userPassword, saltRounds);

      const userLogin = new userTable({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        userPassword: hash,
        userStatus: 'Active',
        userType: 'Normal',
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
    else {
      res.status(400).send(`Username ${req.body.userName} is already in use.`);
    }
  })
};

var nodemailer = require("nodemailer");
var rand, mailOptions, host, link, usr;

var smtpTransport = nodemailer.createTransport({
  user: "musicateuphonic@gmail.com",
  service: "gmail",
  auth: {
    pass: "musicateuphonic123"
  }
});

exports.newEmail = async (req, res, next) => {

  const { error } = loginTable(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if email already exist
  const checkEmail = await userTable.findOne({ userName: req.body.userName });
  if (checkEmail) return res.status(400).send('Email already exists !!!');
  //Password hashing
  console.log(req.body)
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.userPassword, salt);

  usr = new userTable({
    userName: req.body.userName,
    userPassword: hashed,
    userType: "Normal",
    userStatus: "Activated",
    userIsVerified: false
  })
  try {
    const createdUser = await usr.save();
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://" + host + "/api/verify?email=" + usr.userName + "&id=" + rand;
    mailOptions = {
      from: 'Do Not Reply <musicateuphonic_do_not_reply@gmail.com>',
      to: req.body.userName,
      subject: "Please confirm your Email account",
      html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {

      if (error) { console.log(error); res.status(400).send(error); }
      else {
        console.log("Message sent");
        res.json({ user: usr._id });
      }
    });
  } catch (error) { res.status(400).send(error); }
}

exports.newEmailVerify = async (req, res, next) => {
  console.log("entered")
  console.log(req.protocol + ":/" + req.get('host'));

  if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
    console.log("Information is from Authentic email");
    console.log(req.query.id);
    console.log(req.query.user);

    if (req.query.id == rand) {
      console.log("email verified");
      const create = await userTable.findOneAndUpdate({ _id: req.query.email }, { $set: { userIsVerified: true } });
      res.set('location', 'http://localhost:4200/');
      res.status(301).send()
      // res.send("Email verified, you can login now..")
    }
    else {
      console.log("email is not verified");
      res.status(400).send('email is not verified');
    }
  }
  else {
    res.status(400).send('Request from unknown source.');
  }
};

exports.oldUserEmailVerify = async (req, res, next) => {
    const email= req.query.email;
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="http://"+req.get('host')+"/api/verify?email="+email+"&id="+rand;
    mailOptions={
        from: 'Do Not Reply <musicateuphonic_do_not_reply@gmail.com>',
        to : email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
        res.status(400).send(error);
    }else{
        res.send("Email resent");
        }
    }); 
}

// Validate and issue a token to user
// using POST method to validate
exports.loginAuthenticate = function (req, res, next) {
  console.log(req.body)
  const { error } = loginTable(req.body)
  console.log(error)
  if (error) return res.status(401).send(error.details[0].message)
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
            userType: part.userType,
            userStatus: part.userStatus,
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