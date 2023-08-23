const express = require('express');
const router = express.Router();
const userPanelController = require('../../controllers/user/userPanel');

router.route('/panel/getCountries').get(userPanelController.getCountries);
router.route('/panel/getCities/:countryName').get(userPanelController.getCities);

module.exports = router;
