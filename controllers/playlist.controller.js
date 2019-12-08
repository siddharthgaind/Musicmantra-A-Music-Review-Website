const playlistTable = require('../models/playlist.model');
const mongoose = require("mongoose");

exports.createPlaylist = function (req, res, next) {
    const newPlaylist = new playlistTable({
        _id: new mongoose.Types.ObjectId(),
        playlist: {
            name: req.body.name,
            createdBy: req.body.createdBy,
            addedMusic: req.body.addedMusic,
            visibilty: req.body.visibilty,
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

exports.editPlaylist = function (req, res, next) {
    playlistTable.countDocuments({ "playlistName": req.params.name }, function (err, count) {
        console.log(req.params.name + count);
        if (count > 0) {
            playlistTable.findOneAndUpdate({ "playlist.name": req.params.name }, { $set: { "playlist.description": req.body.description, "playlist.name": req.body.name } }, function (err) {
                if (err) return next(err);
                res.send('Description and name of the playslist has been changed.');
            });
        }
        else {
            res.send('Playlist does not exists.');
        }
    });
};

exports.addMusicToPlaylist = function (req, res, next) {
    playlistTable.countDocuments({ "playlist.name": req.params.name }, function (err, count) {
        console.log(req.params.name + count);

        if (count > 0) {
            playlistTable.findOneAndUpdate({ "playlist.name": req.params.name }, { $push: { "playlist.addedMusic": req.body.addedMusic } }
                , function (err, library) {
                    if (err) return next(err);
                    res.send('Music has been added to playlist ' + req.params.name);
                });
        }
        else {
            res.send('Music does not exists.');
        }
    });
};

exports.removeFromPlaylist = function (req, res) {
    playlistTable.countDocuments({ "playlist.name": req.params.name }, function (err, count) {
        if (count > 0) {
            playlistTable.findOneAndUpdate({ "playlist.name": req.params.name }, { $pull: { "playlist.addedMusic": req.body.addedMusic } }, function (err) {
                if (err) return next(err);
                res.send('Music removed successfully from playlist ' + req.params.namee);
            });
        }
        else {
            res.send('Music does not exists.');
        }
    });
};

exports.setVisibility = function (req, res, next) {
    playlistTable.countDocuments({ "playlist.name": req.params.name }, function (err, count) {
        if (count > 0) {
            playlistTable.findOneAndUpdate({ "playlist.name": req.params.name }, { $set: { "playlist.visibilty": req.body.visibilty } }, function (err) {
                if (err) return next(err);
                res.send('Visibility for playlist changed ' + req.params.name);
            });
        }
        else {
            res.send('Playlist does not exists.');
        }
    });
};