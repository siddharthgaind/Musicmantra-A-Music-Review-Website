const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let playlistTable = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    playlist:{
    title: { type: String, required:true, unique: true},
    createdBy:{type:String,required:true},
    songs:[{type:String}],
    visibilty:{type:String},
    description: { type: String},
}});

// Export the model
module.exports = mongoose.model('Playlist', playlistTable);