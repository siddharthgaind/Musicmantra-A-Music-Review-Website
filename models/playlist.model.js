const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let playlistTable = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    playlist:{
    name: {type: String, required:true},
    createdBy:{type:String,required:true},
    addMusic:[{type:String}],
    visibility:{type:String,default:'Private'},
    description: {type: String},
}});

// Export the model
module.exports = mongoose.model('Playlist', playlistTable);