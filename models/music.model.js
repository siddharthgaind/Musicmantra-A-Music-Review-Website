const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let musicTable = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    musicAttributes:{
    musicName: { type: String, required:true, unique: true},
    artist:{type:String,required:true},
    year:{type:String},
    genre:{type:String},
    album: { type: String},
    //reviews: 
    //   [{musicReview:{type: String},
    //       userName:{type:String},
    //       musicRating:{type:Number}
    //    }],
    avgRating:{type:Number},
    musicVisibilty:{type:String}
}}
);

musicTable.index({'$**': 'text'});



// Export the model
module.exports = mongoose.model('Music', musicTable);