const express = require('express');
// const router = require('./adminPage');
const router = express.Router();
const managementController = require('../controllers/admin/adminManagment');

router.route('/managment').get(managementController.getAllCountries);
router.route('/managment/addCountry').post(managementController.postAddCountry);
router.route('/managment/addCity').post(managementController.addCity);
router.route('/managment/getCities').get(managementController.getAllCities);

module.exports = router;
