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
	.get(managementController.getTopGainersEasy);
// .get(managementController.getTopGainers, managementController.getAllEstates);
router
	.route('/managment/getHighestVolume')
	.get(managementController.getHighestVolumeEasy);
// .get(
// 	managementController.getHighestVolume,
// 	managementController.getAllEstates
// );

router
	.route('/managment/getEstatesOfSelectedCountryCity')
	.get(managementController.getEstatesOfSelectedCountryCityEasy);
// .get(
// 	managementController.getEstatesOfSelectedCountryCity,
// 	managementController.getAllEstates
// );

router
	.route('/managment/getCountriesInfo')
	.get(managementController.getCountriesInfo);

module.exports = router;
