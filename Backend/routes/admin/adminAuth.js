const express = require("express");
const router = express.Router();
const {body} = require("express-validator");

const adminAuthController = require("../../controllers/admin/adminAuth");


router.post("/signup" ,
[
    body('email').isEmail(),
    body('password').trim().isLength({min : 4}),

] ,adminAuthController.signUp);

router.get("/login" , adminAuthController.logIn);

module.exports = router;