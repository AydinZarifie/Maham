const express = require('express');
const router = express.Router();

const adminPage_Controller = require('../../controllers/admin/adminPage');
const verifyToken = require("../../middleware/verifyToken");
    

// 2023/05/8 >> changed the logic of written code to 'mounting the routes'
//    "      >> added main functions to control estates
router
    .route('/estates')
    .get(verifyToken,adminPage_Controller.getAllEstates)
    .post(verifyToken,adminPage_Controller.createEstate );

router
    .route('/estates/:estateId')
    .get(verifyToken,adminPage_Controller.getEditEstate)
    .delete(verifyToken,adminPage_Controller.deleteEstate)
    .put(verifyToken,adminPage_Controller.updateEstate);

router
    .route('/estate/getCountries')
    .get(adminPage_Controller.getCountry);

router
    .route('/estate/getCities/:countryName')
    .get(adminPage_Controller.getCities);

router
    .route('/estates/addFilter')
    .post(verifyToken,adminPage_Controller.postFilter);

router
    .route("/estate/getAddEstateFilters")
    .get(adminPage_Controller.getAddEstateFilters);  
    
router
    .route("/getFilters")
    .get(adminPage_Controller.getAllFilters);

router
    .route('/generateMint')
    .post(adminPage_Controller.sendMint);



module.exports = router;
