const userAuthorizationController = require("../../controllers/user/authorization");
const express = require("express");
const route = express.Router();


route
    .route("/authorization")
    .post(userAuthorizationController.authorizationUser);



module.exports = route