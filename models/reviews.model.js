const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reviewTable = mongoose.Schema({    
    _id: mongoose.Schema.Types.ObjectId,
    musicName:{type: String},
    review:{type: String},
    rating:{type:Number},
    userName:{type:String},
   
}
);

// Export the model
module.exports = mongoose.model('musicReviews', reviewTable);