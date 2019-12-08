const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/login.routes');
const music = require('./routes/music.routes');
const playlist = require('./routes/playlist.routes');
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
app.use(cors());
app.use('/api', user);
app.use('/api', music);
app.use('/api', playlist);

let port = 5555;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
