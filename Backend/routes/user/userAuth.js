const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userAuthController = require('../../controllers/user/userAuth');

router
	.route('/auth/signup')
	.post(
		[body('email').isEmail(), body('password').trim().isLength({ min: 4 })],
		userAuthController.signupUser
	);

router.route('/auth/login').post(userAuthController.loginUser);

router.route('/auth/refresh').get(userAuthController.userRefreshToken);

router.route('/auth/logout').post(userAuthController.logoutUser);

router
	.route('/auth/verification')
	.post([body('email').isEmail()], userAuthController.userVerificationCode);

router
	.route('/auth/googleLogin')
	.post(userAuthController.loginGoogle);

module.exports = router;
