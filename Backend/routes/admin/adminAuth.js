const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const adminAuthController = require('../../controllers/admin/adminAuth');

router.post(
	'/auth/signup',
	[body('email').isEmail(), body('password').trim().isLength({ min: 4 })],
	adminAuthController.signUp
);

router.post('/auth/login', adminAuthController.logIn);

router.post('/auth/verification', adminAuthController.verificationCode);

module.exports = router;
