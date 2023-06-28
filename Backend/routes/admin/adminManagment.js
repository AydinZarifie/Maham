const express = require('express');
// const router = require('./adminPage');
const router = express.Router();
const managementController = require('../../controllers/admin/adminManagment');

router.route('/managment').get(managementController.getAllCountries);

router.route('/managment/addCountry').post(managementController.postAddCountry);

router
	.route('/managment/addCity/:countryName')
	.post(managementController.addCity);

router
	.route('/managment/getTopGainers')
	.get(managementController.getTopGainers, managementController.getAllCities);

router
	.route('/managment/getHighestVolume')
	.get(
		managementController.getHighestVolume,
		managementController.getAllCities
	);

router
	.route('/managment/getEstatesOfSelectedCountryCity')
	.get(
		managementController.getEstatesOfSelectedCountryCity,
		managementController.getAllCities
	);

module.exports = router;
