const express = require('express');
const router = express.Router();
const adminPage_Controller = require('../../controllers/admin/adminPage');

const verifyToken = require('../../middleware/verifyToken');

router
	.route('/estates')
	.get(verifyToken, adminPage_Controller.getAllEstates)
	.post(verifyToken, adminPage_Controller.createEstate);

router.route('/generateMint').post(adminPage_Controller.sendMint);

router
	.route('/estates/:estateId')
	.get(verifyToken, adminPage_Controller.getEditEstate)
	.delete(verifyToken, adminPage_Controller.deleteEstate)
	.put(verifyToken, adminPage_Controller.updateEstate);

router
	.route('/estate/getCountries')
	.get(verifyToken, adminPage_Controller.getAllCountries);

router
	.route('/estate/getCities/:countryName')
	.get(verifyToken, adminPage_Controller.getCities);

// estates or estate ?
router
	.route('/estates/addFilter')
	.post(verifyToken, adminPage_Controller.postFilter);

router
	.route('/estate/getAddEstateFilters')
	.get(verifyToken, adminPage_Controller.getAddEstateFilters);

// /getFilters or /estates/getFilters
router
	.route('/getFilters')
	.get(verifyToken, adminPage_Controller.getAllFilters);

router
	.route('/searchEstateByFilter')
	.post(verifyToken, adminPage_Controller.searchEstateByFilter);

router
	.route('/searchEstateByFilterName')
	.post(verifyToken, adminPage_Controller.searchEestatesByFilterName);

router.get('/getLockEstates', verifyToken, adminPage_Controller.getLockEstates);
router.get(
	'/getSellPositionEstates',
	verifyToken,
	adminPage_Controller.getSellPositionEstates
);
module.exports = router;
