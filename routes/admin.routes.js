const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/admin.controller');
const verifytoken=require('../controllers/verifytoken.controller');

router.get('/admin/getAllUsers',verifytoken, admin_controller.getAllUsers);
router.put('/admin/changeUserStatus/:userName',verifytoken, admin_controller.changeUserStatus);
router.put('/admin/changeUserType/:userName',verifytoken, admin_controller.changeUserType);

module.exports = router;