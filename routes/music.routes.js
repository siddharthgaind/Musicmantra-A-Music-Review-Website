const express = require('express');
const router = express.Router();
const music_controller = require('../controllers/music.controller');

router.post('/secure/addMusic', music_controller.addMusic);
router.put('/secure/addReview/:musicName', music_controller.addReview);
router.put('/secure/addRating/:musicName', music_controller.addRating);
router.get('/secure/getAllMusic', music_controller.getAllMusic);
router.get('/open/getPopularMusic', music_controller.getPopularMusic);
router.get('/open/getReviewsForMusic/:musicName', music_controller.getReviewsForMusic);
router.get('/open/searchMusic/:musicName', music_controller.searchMusic);

module.exports = router;