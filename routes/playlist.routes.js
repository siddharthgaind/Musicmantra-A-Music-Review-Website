 
const express = require('express');
const router = express.Router();
const playlist_controller = require('../controllers/playlist.controller');

router.post('/secure/playlist', playlist_controller.createPlaylist);
router.put('/secure/playlist/:name', playlist_controller.editPlaylist);
router.put('/secure/addToPlaylist/:name', playlist_controller.addMusicToPlaylist);
router.put('/secure/visibility/:name', playlist_controller.setVisibility);
router.put('/secure/removeFromPlaylist/:name', playlist_controller.removeFromPlaylist);
router.get('/secure/playlists', playlist_controller.getAllPlaylist);
router.get('/secure/userPlaylist/:userName', playlist_controller.getPlaylistforUser);
router.delete('/secure/removePlaylist/:name', playlist_controller.removePlaylist);

module.exports = router;