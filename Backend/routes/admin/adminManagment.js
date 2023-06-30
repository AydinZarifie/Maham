const express = require('express');
// const router = require('./adminPage');
const router = express.Router();
const managementController = require('../../controllers/admin/adminManagment');

router.route('/managment').get(managementController.getAllCountries);
router.route('/managment/addCountry').post(managementController.postAddCountry);
router.route('/managment/addCity').post(managementController.addCity);
router.route('/managment/getEstates/:cityName/:countryName').get(managementController.getEstates)
router.route('/managment/getCities/:countryName').get(managementController.getAllCities);
router.route('/managment/getEstates').get(managementController.getEstates);

module.exports = router 