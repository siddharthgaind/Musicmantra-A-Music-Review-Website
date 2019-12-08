 
const express = require('express');
const router = express.Router();
const playlist_controller = require('../controllers/playlist.controller');

router.post('/secure/playlist', playlist_controller.createPlaylist);
router.put('/secure/playlist/:name', playlist_controller.editPlaylist);
router.put('/secure/addToPlaylist/:name', playlist_controller.addMusicToPlaylist);
router.put('/secure/visibility/:name', playlist_controller.setVisibility);
router.put('/secure/removePlaylist/:name', playlist_controller.removeFromPlaylist);

module.exports = router;