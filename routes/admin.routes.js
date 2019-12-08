const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/admin.controller');


router.get('/admin/getAllUsers', admin_controller.getAllUsers);
router.put('/admin/changeUserStatus/:userName', admin_controller.changeUserStatus);
router.put('/admin/changeUserType/:userName', admin_controller.changeUserType);

module.exports = router;