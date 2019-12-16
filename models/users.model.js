const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userTable = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    userName: { type: String, required:true, index: { unique: true }},
    userPassword:{type:String,required:true},
    userType:{type:String},
    userStatus: { type: String},
    userIsVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userTable);