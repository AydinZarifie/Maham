const express = require('express');
const router = express.Router();
const adminPanelController = require('../../controllers/admin/adminPanel');

router.get('/panel/getAdmins', adminPanelController.getAllAdmins);
router.post('/panel/searchName', adminPanelController.searchAdminByName);
router.post(
	'/panel/getAdminsWithFilter',
	adminPanelController.searchAdminByFilter
);
router.post('/panel/getAdmin', adminPanelController.getAdmin);
router
	.route('/panel/editAdmin/:id')
	.get(adminPanelController.getEditAdmin)
	.put(adminPanelController.updateAdmin)
	.delete(adminPanelController.deleteAdmin);

module.exports = router;
