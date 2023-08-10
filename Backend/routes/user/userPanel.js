const express = require('express');
const router = express.Router();
const userPanelController = require('../../controllers/user/userPanel');

router.route('/panel/assets').get(userPanelController.getMyAssets);

module.exports = router;
