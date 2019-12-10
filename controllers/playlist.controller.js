const playlistTable = require('../models/playlist.model');
const mongoose = require("mongoose");

exports.createPlaylist = function (req, res, next) {
    const newPlaylist = new playlistTable({
        _id: new mongoose.Types.ObjectId(),
        playlist: {
            name: req.body.name,
            createdBy: req.body.createdBy,
            addMusic: req.body.addMusic,
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
    playlistTable.countDocuments({ "playlist.name": req.params.name }, function (err, count) {
        console.log(req.params.name + count);
        if (count > 0) {
            playlistTable.findOneAndUpdate({ "playlist.name": req.params.name }, { $set: { "playlist.description": req.body.description, "playlist.name": req.body.name } }, function (err) {
                if (err) return next(err);
                res.send('Description and Name of the playlist has been changed.');
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
                        description: doc.playlist.description,
                        addMusic: doc.playlist.addMusic,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5555/libraries/" + doc._id
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

exports.removePlaylist = async (req, res) => {
    try {
        const delPlaylist = await playlistTable.deleteOne({ "playlist.name": req.params.name });
        res.send('Playlist has been deleted.');
    }
    catch{
        res.status(400).send(error);
    }
}