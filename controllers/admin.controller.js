const adminTable = require('../models/users.model');
const mongoose = require("mongoose");


exports.getAllUsers = function (req, res, next) {
    adminTable.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                Users: docs.map(doc => {
                    return {
                        userName: doc.userName,
                        userStatus: doc.userStatus,
                        userType: doc.userType,
                        userIsVerified: doc.userIsVerified,
                        _id: doc._id,
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err); res.status(500).json({ error: err });
        });
};

exports.changeUserStatus = function (req, res, next) {
    adminTable.countDocuments({ "userName": req.params.userName }, function (err, count) {
        console.log(req.params.userName + count);
        if (count > 0) {
            console.log(req.params.userName + count);
            adminTable.findOneAndUpdate({ "userName": req.params.userName }, { $set: { "userStatus": req.body.userStatus } }, function (err) {
                if (err) return next(err);
                res.send('User status has been changed.');
            });
        }
        else {
            res.send('User does not exist.');
        }
    });
};

exports.changeUserType = function (req, res, next) {
    adminTable.countDocuments({ "userName": req.params.userName }, function (err, count) {
        console.log(req.params.userName + count);
        if (count > 0) {
            console.log(req.params.userName + count);
            adminTable.findOneAndUpdate({ "userName": req.params.userName }, { $set: { "userType": req.body.userType } }, function (err) {
                if (err) return next(err);
                res.send('User type has been changed.');
            });
        }
        else {
            res.send('User does not exist.');
        }
    });
};