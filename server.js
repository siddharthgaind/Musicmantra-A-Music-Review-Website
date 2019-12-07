const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user.route');
const music = require('./routes/music.route');
const playlist = require('./routes/playlist.route');
const reviews = require('./routes/reviews.route')
const app = express();
var cors = require('cors');

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url='mongodb+srv://sgaind2:vvFeF8hZfxZiPUZV@cluster0-o8fcm.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dev_db_url,{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>console.log('connected to mongoose!!!'))
.catch((err)=>console.log(err));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use('/api', user);
app.use('/api', music);
app.use('/api', playlist);
app.use('/api', reviews);

let port = 5555;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
