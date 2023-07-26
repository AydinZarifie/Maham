const express = require("express");
const router = express.Router();
const adminPanelController = require("../../controllers/admin/adminPanel");


router.get("/panel/getLockEstates" , adminPanelController.getLockEstates);
router.get("/panel/getSellPositionEstates" , adminPanelController.getSellPositionEstates);
router.get("/panel/getAdmins" , adminPanelController.getAllAdmins);
router.post("/panel/searchName" , adminPanelController.searchAdminWithName);
router.post("/panel/getAdminsWithFilter" , adminPanelController.serachWithFilters);

router
    .route("/panel/getEditAdmin/:id")
    .get(adminPanelController.getEditCurrentAdmin)  
    .put(adminPanelController.updateAdmin)
    .delete(adminPanelController.deleteAdmin);


module.exports = router