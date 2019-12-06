const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

let UserTable = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_name: { type: String, required:true, index: { unique: true }},
    user_password:{type:String,required:true},
    user_type:{type:String},
    user_status: { type: String},
    isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserTable);