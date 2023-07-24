const express = require('express');
// const router = require('./adminPage');
const router = express.Router();
const managementController = require('../../controllers/admin/adminManagment');
const adminAuthController = require('../../controllers/admin/adminAuth');
const verifyToken = require('../../middleware/verifyToken');

router
	.route('/managment')
	.get(verifyToken, managementController.getAllCountries);

router
	.route('/managment/getCities/:countryName')
	.get(verifyToken, managementController.getAllCities);

router
	.route('/managment/getEstates')
	.get(verifyToken, managementController.getAllEstates);

router
	.route('/managment/addCountry')
	.post(verifyToken, managementController.postAddCountry);

router
	.route('/managment/addCity')
	.post(verifyToken, managementController.addCity);

router
	.route('/managment/getEstates/:countryName/:cityName')
	.get(verifyToken, managementController.getEstatesOfCC);

module.exports = router;
