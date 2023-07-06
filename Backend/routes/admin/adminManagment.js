const express = require('express');
// const router = require('./adminPage');
const router = express.Router();
const managementController = require('../../controllers/admin/adminManagment');
const adminAuthController = require('../../controllers/admin/adminAuth');
// const adminVerifyToken = require('../../middleware/verify-token');

router
	.route('/managment')
	.get(adminAuthController.protect, managementController.getAllCountries);

router.route('/managment/addCountry').post(managementController.postAddCountry);

router
	.route('/managment/getCities/:countryName')
	.get(managementController.getAllCities);

router.route('/managment/addCity').post(managementController.addCity);

router
	.route('/managment/getEstates')
	// .get(managementController.getEstatesOfSelectedCountryCityEasy);
	.get(managementController.getAllEstates);

router
	.route('/managment/getEstates/:countryName/:cityName')
	.get(managementController.getEstatesOfCCEasy);
// .get(managementController.getEstatesOfCC, managementController.getAllEstates);

router
	.route('/managment/getTopGainers')
	// .get(managementController.getTopGainersEasy);
	.get(managementController.getTopGainers, managementController.getAllEstates);

router
	.route('/managment/getHighestVolume')
	// .get(managementController.getHighestVolumeEasy);
	.get(
		managementController.getHighestVolume,
		managementController.getAllEstates
	);

router
	.route('/managment/getCountriesInfo')
	.get(managementController.getCountriesInfo);

module.exports = router;
