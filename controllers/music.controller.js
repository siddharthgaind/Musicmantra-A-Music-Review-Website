const musicTable = require('../models/music.model');
const mongoose = require("mongoose");
const reviewTable = require('../models/reviews.model');

exports.addMusic = function (req, res, next) {
    const newMusic = new musicTable({
        _id: new mongoose.Types.ObjectId(),
        musicAttributes: {
            musicName: req.body.musicName,
            artist: req.body.artist,
            year: req.body.year,
            genre: req.body.genre,
            album: req.body.album,
            musicVisibilty: req.body.musicVisibilty,
            avgRating: req.body.avgRating,
        }
    }).save();
    const musicInReiewTable = new reviewTable({
        _id: new mongoose.Types.ObjectId(),
        musicName: req.body.musicName,
        reviews: req.body.musicReview,
        userName: req.body.userName,
    })
        // newMusic,musicInReiewSchema
        .save()
        .then(result => {
            console.log(result); res.status(201).json({
                message: "Music created successfully.",
                musicAttributes: {
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:5555/api/secure" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err); res.status(500).json({ error: err });
        });
};

exports.addReview = function (req, res, next) {
    reviewTable.countDocuments({ "musicName": req.params.musicName }, function (err, count) {
        console.log(req.params.musicName + count);

        if (count > 0) {
            console.log(req.params.musicName + count);
            reviewTable.findOneAndUpdate({ "musicName": req.params.musicName }, { $set: { "reviews": req.body.reviews } }, function (err, library) {
                if (err) return next(err);
                res.send('Review added for the music.');
            });
        }
        else {
            res.send('Music does not exists.');
        }
    });
};

exports.addRating = function (req, res, next) {
    musicTable.countDocuments({ "musicAttributes.musicName": req.params.musicName }, function (err, count) {
        console.log(req.params.musicName + count);

        if (count > 0) {
            console.log(req.params.musicName + count);
            musicTable.findOneAndUpdate({ "musicAttributes.musicName": req.params.musicName }, { $set: { "musicAttributes.musicRating": req.body.musicRating } }, function (err, library) {
                if (err) return next(err);
                res.send('Rating added for the music.');
            });
        }
        else {
            res.send('Music does not exists.');
        }
    });
};


exports.getPopularMusic = function (req, res, next) {
    musicTable.find({ 'musicAttributes.avgRating': { $gte: 3 } })
        .limit(10)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                Music: docs.map(doc => {
                    return {
                        musicName: doc.musicAttributes.musicName,
                        artist: doc.musicAttributes.artist,
                        album: doc.musicAttributes.album,
                        year: doc.musicAttributes.year,
                        genre: doc.musicAttributes.genre,
                        //musicReview: [doc.reviews[0].musicReview],
                        // musicRating: [doc.reviews[0].musicRating],
                        avgRating: doc.musicAttributes.avgRating,
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


exports.getMusicFromName = function (req, res, next) {
    musicTable.count({ "musicAttributes.musicName": req.params.musicName }, function (err, count) {
        if (count > 0) {
            const musicName = req.params.musicName;
            musicTable.findOne({ 'musicAttributes.musicName': musicName })
                .select('musicAttributes musicReview')
                .exec()
                .then(doc => {
                    console.log("From database", doc);
                    if (doc) {
                        res.status(200).json({
                            Music: doc,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:5555/libraries'
                            }
                        });
                    }
                })
        }
        else {
            res.send('Music does not exists.');
        }
    });
};

exports.getReviewsForMusic = function (req, res, next) {
    reviewTable.count({ "musicName": req.params.musicName }, function (err, count) {
        if (count > 0) {
            const musicName = req.params.musicName;
            reviewTable.find({ 'musicName': musicName })
                .select('musicReview')
                .exec()
                .then(doc => {
                    console.log("From database", doc);
                    if (doc) {
                        res.status(200).json({
                            Music: doc,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:5555/libraries'
                            }
                        });
                    }
                })
        }
        else {
            res.send('Music does not exists.');
        }
    });
};

exports.searchMusic = function (req, res, next) {
    musicTable.find({ $text: { $search: req.params.musicName } })
        .limit(10)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                Music: docs.map(doc => {
                    return {
                        musicName: doc.musicAttributes.musicName,
                        artist: doc.musicAttributes.artist,
                        album: doc.musicAttributes.album,
                        // musicReview: doc.reviews.musicReview],
                        // musicRating: [doc.reviews.musicRating],
                        year: doc.musicAttributes.year,
                        genre: doc.musicAttributes.genre,
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
