const express = require('express');
const router = express.Router();
const adminPage_controller = require('../../controllers/admin/adminPage');
const verifyToken = require('../../middleware/verifyToken');

router
	.route('/estates')
	.get(verifyToken, adminPage_controller.getAllEstates)
	.post(verifyToken, adminPage_controller.createEstate);

router.route('/generateMint').post(adminPage_controller.sendMint);

router
	.route('/estates/searchByFilter')
	.get(adminPage_controller.searchEestatesByFilterName);

router
	.route('/estate/getCountries')
	.get(verifyToken, adminPage_controller.getAllCountries);

router
	.route('/estate/getCities/:countryName')
	.get(verifyToken, adminPage_controller.getCities);

// estates or estate ?
router
	.route('/estates/addFilter')
	.post(verifyToken, adminPage_controller.postFilter);

router
	.route('/estate/getAddEstateFilters')
	.get(verifyToken, adminPage_controller.getAddEstateFilters);

// /getFilters or /estates/getFilters
router
	.route('/getFilters')
	.get(verifyToken, adminPage_controller.getAllFilters);

router.get(
	'/estates/getLockEstates',
	verifyToken,
	adminPage_controller.getLockEstates
);
router.get(
	'/estates/getSellPositionEstates',
	verifyToken,
	adminPage_controller.getSellPositionEstates
);

router
	.route('/estates/:estateId')
	.get(adminPage_controller.getEditEstate)
	.delete(adminPage_controller.deleteEstate)
	.put(adminPage_controller.updateEstate);

module.exports = router;
