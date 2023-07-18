const express = require('express');
const router = express.Router();

const adminPage_Controller = require('../../controllers/admin/adminPage');
router
	.route('/estates')
	.get(adminPage_Controller.getAllEstates)
	.post(adminPage_Controller.createEstate);

router.route('/estates/generateMint').post(adminPage_Controller.sendMint);

router
	.route('/estates/:estateId')
	.get(adminPage_Controller.getEditEstate)
	.delete(adminPage_Controller.deleteEstate)
	.put(adminPage_Controller.updateEstate);

router.route('/estate/getCountries').get(adminPage_Controller.getAllCountries);

router
	.route('/estate/getCities/:countryName')
	.get(adminPage_Controller.getCities);

// estates or estate ?
router.route('/estates/addFilter').post(adminPage_Controller.postFilter);

router
	.route('/estate/getAddEstateFilters')
	.get(adminPage_Controller.getAddEstateFilters);

// /getFilters or /estates/getFilters
router.route('getFilters').get(adminPage_Controller.getAllFilters);

module.exports = router;
