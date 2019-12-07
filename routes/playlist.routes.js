 
const express = require('express');
const router = express.Router();
const playlist_controller = require('../controllers/playlist.controller');

router.post('/secure/playlist', playlist_controller.createPlaylist);
router.put('/secure/playlist/:musicName', playlist_controller.editPlaylist);
router.put('/secure/addToPlaylist/:musicName', playlist_controller.addMusicToPlaylist);
router.put('/secure/Visibilty/:musicName', playlist_controller.setVisibility);
router.put('/secure/removeFromPlaylist/:musicName', playlist_controller.musicRemove);

module.exports = router;