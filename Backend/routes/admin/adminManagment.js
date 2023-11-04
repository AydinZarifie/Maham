const express = require('express');
// const router = require('./adminPage');
const router = express.Router();
const managementController = require('../../controllers/admin/adminManagment');
const { checkAuhtorized } = require('../../controllers/admin/adminAuth');
const verifyToken = require('../../middleware/verifyToken');

router
	.route('/managment')
	.get(verifyToken, managementController.getAllCountries);

router
	.route('/managment/getCities/:countryName')
	.get(verifyToken, managementController.getAllCities);

router
	.route('/managment/addCountry')
	.post(verifyToken, managementController.postAddCountry);

router
	.route('/managment/addCity')
	.post(verifyToken, managementController.addCity);

router
	.route('/managment/lockUnLockEstate/:id')
	.post(verifyToken, managementController.lockUnLockEstate);

router
	.route('/managment/getEstates/:countryName/:cityName')
	.get(verifyToken, managementController.getEstates);

router
	.route('/managment/countriesInfo')
	.get(verifyToken, managementController.getCountriesInfo);

module.exports = router;
