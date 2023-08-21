const express = require('express');
const router = express.Router();
const adminPanelController = require('../../controllers/admin/adminPanel');
const verifyToken = require("../../middleware/verifyToken");
router.get('/panel/getLockEstates', verifyToken,adminPanelController.getLockEstates);
router.get(
	'/panel/getSellPositionEstates', verifyToken,
	adminPanelController.getSellPositionEstates
);
router.get('/panel/getAdmins', verifyToken ,adminPanelController.getAllAdmins);
router.post('/panel/searchName',  verifyToken,adminPanelController.searchAdminByName);
router.post('/panel/getAdminsWithFilter', verifyToken,adminPanelController.searchAdminByFilter);
router.post('/panel/getAdmin' ,  verifyToken,adminPanelController.getAdmin);	
router
	.route('/panel/editAdmin/:id')
	.get(verifyToken,adminPanelController.getEditAdmin)
	.put(verifyToken,adminPanelController.updateAdmin)
	.delete(verifyToken,adminPanelController.deleteAdmin);

module.exports = router;
