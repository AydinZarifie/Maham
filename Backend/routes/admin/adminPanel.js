const express = require("express");
const route = express.Router();
const adminPanelController = require("../../controllers/admin/adminPanel");

route.get("/panel/getLockEstates" , adminPanelController.getLockEstates);
route.get("/panel/getSellPositionEstates" , adminPanelController.getSellPositionEstates);
route.get("/panel/getAdmins" , adminPanelController.getAllAdmins);

module.exports = route