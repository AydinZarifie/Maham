const express = require("express");
const router = express.Router();
const transaction_controller = require("../../controllers/admin/transaction");


router.route("/transaction").post(transaction_controller.transaction);



module.exports = router