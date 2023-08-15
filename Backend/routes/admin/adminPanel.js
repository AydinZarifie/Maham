const express = require('express');
const router = express.Router();
const adminPanelController = require('../../controllers/admin/adminPanel');

router.get('/panel/getLockEstates', adminPanelController.getLockEstates);
router.get(
	'/panel/getSellPositionEstates',
	adminPanelController.getSellPositionEstates
);
router.get('/panel/getAdmins', adminPanelController.getAllAdmins);
router.post('/panel/search/name', adminPanelController.searchAdminByName);
router.post('/panel/search/filter', adminPanelController.searchAdminByFilter);

router
	.route('/panel/editAdmin/:id')
	.get(adminPanelController.getEditAdmin)
	.put(adminPanelController.updateAdmin)
	.delete(
		adminPanelController.restrictTo('superAdmin'),
		adminPanelController.deleteAdmin
	);

module.exports = router;
