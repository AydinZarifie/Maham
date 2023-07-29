const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userAuthorizationController = require('../../controllers/user/authorization');

router
	.route('/sendVerificationCode')
	.post(
		[body('email').isEmail()],
		userAuthorizationController.sendVerificationCode
	);

router.route('/verifyCode').post(userAuthorizationController.verifyUser);

router.route('/authorization').get(userAuthorizationController.createUser);

module.exports = router;
