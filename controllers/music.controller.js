const musicTable = require('../models/music.model');
const mongoose = require("mongoose");
const reviewTable = require('../models/reviews.model');
const playlistTable = require('../models/playlist.model');
const { musicTablejoi, editMusicTablejoi } = require('../controllers/validator')

//Add new Music
exports.addMusic = function (req, res, next) {
    console.log(req.body);
    const { error } = musicTablejoi(req.body);
    if (error) return res.status(401).send(error.details[0].message)
    console.log(error)
    const newMusic = new musicTable({
        _id: new mongoose.Types.ObjectId(),
        musicAttributes: {
            musicName: req.body.musicName,
            artist: req.body.artist,
            year: req.body.year,
            genre: req.body.genre,
            album: req.body.album,
        },
        musicVisibilty: req.body.musicVisibilty,
        avgRating: req.body.avgRating,
    }).save();
    const musicInReiewTable = new reviewTable({
        _id: new mongoose.Types.ObjectId(),
        musicName: req.body.musicName,
        reviews: req.body.musicReview,
        userName: req.body.userName,
    })
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

//Add Review
exports.addReview = function (req, res, next) {
    reviewTable.countDocuments({ "musicName": req.params.musicName }, function (err, count) {
        console.log(req.params.musicName + count);

        if (count > 0) {
            console.log(req.params.musicName + count);

            const newReview = new reviewTable({
                _id: new mongoose.Types.ObjectId(),
                musicName: req.params.musicName,
                review: req.body.review,
                userName: req.body.userName,
                rating: req.body.rating
            })
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "Review/Rating added successfully.",
                        song_title: result.song_title,
                        review: result.review,
                        rating: result.rating
                    });
                })
                .catch(err => {
                    console.log(err); res.status(500).json({ error: err });
                });
        }
        else {
            res.send('Music does not exists.');
        }
    });
};
//Add rating
exports.addRating = function (req, res, next) {
    musicTable.countDocuments({ "musicName": req.params.musicName }, function (err, count) {
        console.log(req.params.musicName + count);

        if (count > 0) {
            console.log(req.params.musicName + count);
            reviewTable.findOneAndUpdate({ "musicName": req.params.musicName }, { $set: { "rating": req.body.rating } }, function (err) {
                if (err) return next(err);
                res.send('Rating added for the music.');
            });
        }
        else {
            res.send('Music does not exists.');
        }
    });
};

//Get music from its name
exports.getMusicFromName = function (req, res, next) {
    musicTable.count({ "musicAttributes.musicName": req.params.musicName }, function (err, count) {
        if (count > 0) {
            const musicName = req.params.musicName;
            musicTable.findOne({ 'musicAttributes.musicName': musicName })
                .select('musicAttributes review')
                .exec()
                .then(doc => {
                    console.log("From database", doc);
                    if (doc) {
                        res.status(200).json({
                            songs: doc,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:5555/api'
                            }
                        });
                    }
                })
        }
        else { res.send('This Song Doesnt Exist'); }
    });
};

//Get all music list
exports.getAllMusic = function (req, res, next) {
    musicTable.find()
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
                        avgRating: doc.musicAttributes.avgRating,
                        musicVisibilty: doc.musicVisibilty,
                        _id: doc._id
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err); res.status(500).json({ error: err });
        });
};

//get all music for users
exports.getAllMusicForUser = function (req, res, next) {
    musicTable.find({ "musicVisibilty": { $ne: "No" } })
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
                        avgRating: doc.musicAttributes.avgRating,
                        musicVisibilty: doc.musicVisibilty,
                        _id: doc._id
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err); res.status(500).json({ error: err });
        });
};

//get popular music
exports.getPopularMusic = function (req, res, next) {
    musicTable.find({ 'avgRating': { $gte: 3 } })
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
                        avgRating: doc.musicAttributes.avgRating,
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

//get a particular music
exports.getMusicFromName = function (req, res, next) {
    musicTable.count({ "musicAttributes.musicName": req.params.musicName, "musicVisibilty": { $ne: "No" } }, function (err, count) {
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
                                url: 'http://localhost:5555/api'
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

//Get reviews
exports.getReviewsForMusic = function (req, res, next) {
    reviewTable.count({ "musicName": req.params.musicName }, function (err, count) {
        if (count > 0) {
            const musicName = req.params.musicName;
            reviewTable.find({ 'musicName': musicName })
                .select('review rating userName')
                .exec()
                .then(doc => {
                    console.log("From database", doc);
                    if (doc) {
                        res.status(200).json({
                            Music: doc,
                            });
                    }
                })
        }
        else {
            res.send('Music does not exists.');
        }
    });
};

//Get all reviews
exports.getReviewsForAllMusic = function (req, res, next) {
    reviewTable.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                Music: docs.map(doc => {
                    return {
                        musicName: doc.musicName,
                        review: doc.review,
                        rating: doc.rating,
                        userName: doc.userName
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err); res.status(500).json({ error: err });
        });
};

//search music
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

//change music attribute
exports.changeMusicAttribute = function (req, res, next) {
    let object = {
        year: req.body['musicAttributes.year'],
        genre: req.body['musicAttributes.createdBy'],
        visibilty: req.body['musicAttributes.musicVisibilty'],
        artist: req.body['musicAttributes.artist'],
        album: req.body['musicAttributes.album']
    }
    console.log(object)
    const { error } = editMusicTablejoi(object);
    console.log(req.body);
    if (error) return res.status(401).send(error.details[0].message)
    console.log(error)
    musicTable.countDocuments({ "musicAttributes.musicName": req.params.musicName }, function (err, count) {
        console.log(req.params.musicName + count);

        if (count > 0) {
            console.log(req.params.musicName + count);
            musicTable.findOneAndUpdate({ "musicAttributes.musicName": req.params.musicName }, { $set: req.body }, function (err) {
                if (err) return next(err);
                res.send('Music updated.');
            });
        }
        else { res.send('Music does not exists.'); }
    });
};

//dete music
exports.deleteMusic = async (req, res) => {

    try {
        const sum1 = await musicTable.countDocuments({ "musicAttributes.musicName": req.params.musicName });
        const sum2 = await reviewTable.countDocuments({ "musicName": req.params.musicName });
        const sum3 = await playlistTable.countDocuments({ "musicName": req.params.musicName });


        //if(count1>0 && count2>0 && count3>0){
        const deleteMusic = await musicTable.remove({ "musicAttributes.musicName": req.params.musicName });
        const deleteReview = await reviewTable.remove({ "musicName": req.params.musicName });
        const updatePlaylist = await playlistTable.updateMany({ "musicName": req.params.musicName }, { $pull: { Music: req.params.musicName } }, { returnOriginal: false });
        res.send('Music deleted successfully.');

    }
    catch{ res.status(400).send(error); }
}
