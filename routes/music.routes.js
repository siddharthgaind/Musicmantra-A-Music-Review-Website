const express = require('express');
const router = express.Router();
const music_controller = require('../controllers/music.controller');

router.post('/secure/addMusic', music_controller.add_music);
router.put('/secure/addReview/:music_title', music_controller.addReview);
router.put('/secure/addRating/:music_title', music_controller.addRating);
router.get('/open/getTopmusic', music_controller.getPopularMusic);
router.get('/open/getReviewFormusic/:music_title', music_controller.getReviews);
router.get('/open/searchmusic/:music_title', music_controller.searchMusic);

module.exports = router;