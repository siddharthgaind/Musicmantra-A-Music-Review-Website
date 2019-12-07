const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reviewTable = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    song_name:{type: String},
    song_review:{type: String},
    user_name:{type:String},
    
}
);

// Export the model
module.exports = mongoose.model('songsReviews', reviewTable);