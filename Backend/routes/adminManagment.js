const express = require("express");
const router = express.Router();
const managmentController = require("../controllers/admin/adminManagment");


router.post("/managment/addCountry" , managmentController.postAddCountry);


module.exports = router;