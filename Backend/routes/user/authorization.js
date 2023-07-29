const userAuthorizationController = require('../../controllers/user/authorization');
const express = require('express');
const router = express.Router();

router
	.route('/authorization')
	.post(userAuthorizationController.userAuthorization);

router.route('/verifyUser').post(userAuthorizationController.verifyUser);

module.exports = router;
