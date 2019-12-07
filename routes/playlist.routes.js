 
const express = require('express');
const router = express.Router();
const playlist_controller = require('../controllers/playlist.controller');

router.put('/secure/playlist/:music_title', playlist_controller.edit_playlist);
router.put('/secure/addToPlaylist/:music_title', playlist_controller.add_songs_playlist);
router.post('/secure/playlist', playlist_controller.create_playlist);
router.put('/secure/Visibilty/:music_title', playlist_controller.set_visibility);
router.put('/secure/removeFromPlaylist/:music_title', playlist_controller.song_remove);

module.exports = router;