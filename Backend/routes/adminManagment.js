const express = require('express');
// const router = require('./adminPage');
const router = express.Router();
const managementController = require('../controllers/admin/adminManagment');

router.route('/managment').get(managementController.getAllCountries);

router.route('/managment/addCountry').post(managementController.postAddCountry);

module.exports = router;
