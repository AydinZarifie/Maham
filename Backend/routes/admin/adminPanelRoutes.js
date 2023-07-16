const express = require('express');
const router = express.Router();
const adminPanelController = require('../../controllers/admin/adminPanelController');

router.post('/panel/findAdmin', adminPanelController.getAdmin);

router.post('/auth/login', adminPanelController.logIn);

router.post('/auth/verification', adminPanelController.verificationCode);

module.exports = router;
