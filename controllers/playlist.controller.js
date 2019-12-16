const playlistTable = require('../models/playlist.model');
const mongoose = require("mongoose");
const { playlistTablejoi, editPlaylist } = require('../controllers/validator')

//create a new playlist
exports.createPlaylist = function (req, res, next) {
    const { error } = playlistTablejoi(req.body);
    if (error) return res.status(401).send(error.details[0].message)
    console.log(error)
    const newPlaylist = new playlistTable({
        _id: new mongoose.Types.ObjectId(),
        playlist: {
            name: req.body.name,
            createdBy: req.body.createdBy,
            addMusic: req.body.addMusic,
            visibility: req.body.visibility,
            description: req.body.description,
        },
    });
    newPlaylist
        .save()
        .then(result => {
            console.log(result); res.status(201).json({
                message: "Playlist created successfully.",
                musicAttributes: {
                    _id: result._id,
                }
            });
        })
        .catch(err => {
            console.log(err); res.status(500).json({ error: err });
        });
};

//edit a playlist
exports.editPlaylist = function (req, res, next) {
    console.log(req.body['playlist.description']);
    let object = {
        description: req.body['playlist.description'],
        createdBy: req.body['playlist.createdBy'],
        visibility: req.body['playlist.visibility']
    }
    const { error } = editPlaylist(object);
    if (error) return res.status(401).send(error.details[0].message)
    console.log(error)
    playlistTable.countDocuments({ "playlist.name": req.params.name }, function (err, count) {
        console.log(req.params.name + count);
        if (count > 0) {
            playlistTable.findOneAndUpdate({ "playlist.name": req.params.name }, { $set: req.body }, function (err) {
                if (err) return next(err);
                res.send('Name and description of the playlist has been changed.');
            });
        }
        else {
            res.send('Playlist does not exists.');
        }
    });
};

//add music to a playlist
exports.addMusicToPlaylist = function (req, res, next) {
    playlistTable.countDocuments({ "playlist.name": req.params.name }, function (err, count) {
        console.log(req.params.name + count);

        if (count > 0) {
            playlistTable.findOneAndUpdate({ "playlist.name": req.params.name }, { $push: { "playlist.addMusic": req.body.addMusic } }
                , function (err) {
                    if (err) return next(err);
                    res.send('Music has been added to' + req.params.name + 'playlist.');
                });
        }
        else {
            res.send('Music does not exists.');
        }
    });
};

//remove music from playlist
exports.removeFromPlaylist = function (req, res) {
    playlistTable.countDocuments({ "playlist.name": req.params.name }, function (err, count) {
        if (count > 0) {
            playlistTable.findOneAndUpdate({ "playlist.name": req.params.name }, { $pull: { "playlist.addMusic": req.body.addMusic } }, function (err) {
                if (err) return next(err);
                res.send('Music removed successfully from' + req.params.name + 'playlist.');
            });
        }
        else {
            res.send('Music does not exists.');
        }
    });
};

//set visibility of music
exports.setVisibility = function (req, res, next) {
    playlistTable.countDocuments({ "playlist.name": req.params.name }, function (err, count) {
        if (count > 0) {
            playlistTable.findOneAndUpdate({ "playlist.name": req.params.name }, { $addToSet: { "playlist.visibility": req.body.visibility } }, function (err) {
                if (err) return next(err);
                res.send('Visibility for playlist changed ' + req.params.name);
            });
        }
        else {
            res.send('Playlist does not exists.');
        }
    });
};

//get all playlists
exports.getAllPlaylist = function (req, res, next) {
    playlistTable.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                Playlist: docs.map(doc => {
                    return {
                        name: doc.playlist.name,
                        createdBy: doc.playlist.createdBy,
                        addMusic: doc.playlist.addMusic,
                        visibility: doc.playlist.visibility,
                        description: doc.playlist.description,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5555/api/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err); res.status(500).json({ error: err });
        });
};

//get playlist for a user
exports.getPlaylistforUser = function (req, res, next) {
    playlistTable.find({ 'playlist.createdBy': req.params.userName })
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                Playlist: docs.map(doc => {
                    return {
                        name: doc.playlist.name,
                        description: doc.playlist.description,
                        addMusic: doc.playlist.addMusic,
                        visibility: doc.playlist.visibility,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5555/api/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err); res.status(500).json({ error: err });
        });
};

//remove playlist
exports.removePlaylist = async (req, res) => {
    try {
        const deletePlaylist = await playlistTable.deleteOne({ "playlist.name": req.params.name });
        res.send('Playlist has been deleted.');
    }
    catch{
        res.status(400).send(error);
    }
}