const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const adminPanelController = require('../../controllers/admin/adminPanel');

router.get('/panel/getLockEstates', adminPanelController.getLockEstates);
router.get(
	'/panel/getSellPositionEstates',
	adminPanelController.getSellPositionEstates
);
router.get('/panel/getAllAdmins', adminPanelController.getAllAdmins);
router.get('/panel/getAdmin', adminPanelController.getAdmin);
router.get('/panel/getCurrentAdmin', adminPanelController.currentAdmin);
router.get('/panel/searchAdmins', adminPanelController.searchAdmins);
router.get('/panel/searchName', adminPanelController.searchName);
router
	.route('/panel/updateAdmin')
	.put(body('email').isEmail(), adminPanelController.updateAdmin);
// email validation not working

router.delete('/panel/deleteAdmin/:id', adminPanelController.deleteAdmin);

module.exports = router;
