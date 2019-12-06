const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let songTable = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    songAttributes:{
    song_name: { type: String, required:true, unique: true},
    artist:{type:String,required:true},
    year:{type:String},
    genre:{type:String},
    album: { type: String},
    evaluation: 
        [{song_review:{type: String},
           user_name:{type:String},
           song_rating:{type:Number}
        }],
        
    },
    

song_visibilty:{type:String}

});

songTable.index({'$**': 'text'});



// Export the model
module.exports = mongoose.model('Song', songTable);