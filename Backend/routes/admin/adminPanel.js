const express = require('express');
const router = express.Router();
const adminPanelController = require('../../controllers/admin/adminPanel');

router.get('/panel/getLockEstates', adminPanelController.getLockEstates);
router.get(
	'/panel/getSellPositionEstates',
	adminPanelController.getSellPositionEstates
);
router.get('/panel/getAdmins', adminPanelController.getAllAdmins);
router.get('/panel/getCurrentAdmin', adminPanelController.currentAdmin);
router.get('/panel/searchAdmins', adminPanelController.searchAdmins);
router.get('/panel/searchName', adminPanelController.searchName);

module.exports = router;
