const express = require('express');
const router = express.Router();
const adminPanelController = require('../../controllers/admin/adminPanel');
const { checkAuhtorized } = require('../../controllers/admin/adminAuth');
const verifyToken = require('../../middleware/verifyToken');

router.get(
	'/panel/getAdmins',
	verifyToken,
	checkAuhtorized,
	adminPanelController.getAllAdmins
);

router
	.route('/panel/wallet')
	.get(verifyToken, checkAuhtorized, adminPanelController.getWallet)
	.put(verifyToken, checkAuhtorized, adminPanelController.addIdToWallet)
	.delete(
		verifyToken,
		checkAuhtorized,
		adminPanelController.removeIdFromWallet
	);

router.post(
	'/panel/searchName',
	verifyToken,
	checkAuhtorized,
	adminPanelController.searchAdminByName
);
router.post(
	'/panel/getAdminsWithFilter',
	verifyToken,
	checkAuhtorized,
	adminPanelController.searchAdminByFilter
);
router.post(
	'/panel/getAdmin',
	verifyToken,
	checkAuhtorized,
	adminPanelController.getAdmin
);
router
	.route('/panel/editAdmin/:id')
	.get(verifyToken, checkAuhtorized, adminPanelController.getEditAdmin)
	.put(verifyToken, checkAuhtorized, adminPanelController.updateAdmin)
	.delete(verifyToken, checkAuhtorized, adminPanelController.deleteAdmin);

module.exports = router;
