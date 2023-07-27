const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const adminAuthController = require("../../controllers/admin/adminAuth");


router
    .route("/auth/signup")
    .post([body('email').isEmail(),body('password').trim().isLength({min : 4})] , adminAuthController.signUp)

router
    .route("/auth/login")
    .post(adminAuthController.logIn)

router
    .route("/auth/refresh")
    .get(adminAuthController.refreshToken)

router 
    .route("/auth/logout")
    .post(adminAuthController.logout)

router
    .route("/auth/verification")
    .post([body('email').isEmail()] , adminAuthController.verificationCode);


module.exports = router;