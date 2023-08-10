const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const adminAuthController = require('../../controllers/admin/adminAuth');
const verifyToken = require('../../middleware/verifyToken');

router
	.route('/auth/signup')
	.post(
		[body('email').isEmail(), body('password').trim().isLength({ min: 4 })],
		adminAuthController.signupAdmin
	);

router.route('/auth/login').post(adminAuthController.loginAdmin);

router.route('/auth/refresh').get(adminAuthController.adminRefreshToken);

router.route('/auth/logout').post(adminAuthController.logoutAdmin);

router
	.route('/auth/verification')
	.post([body('email').isEmail()], adminAuthController.adminVerificationCode);

router
	.route("/auth/profile")
	.get(verifyToken,adminAuthController.editAdminProfileInfo);

module.exports = router;
