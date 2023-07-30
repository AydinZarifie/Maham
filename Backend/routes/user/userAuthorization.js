const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userAuthorizationController = require('../../controllers/user/userAuthorization');

router
	.route('/sendVerificationCode')
	.post(
		[body('email').isEmail()],
		userAuthorizationController.sendVerificationCode
	);

router
	.route('/userAuthorization')
	.get(userAuthorizationController.authorizeUser);

module.exports = router;
