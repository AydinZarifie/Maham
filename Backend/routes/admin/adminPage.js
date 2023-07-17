const express = require('express');
const router = express.Router();

const adminPage_Controller = require('../../controllers/admin/adminPage');

// 2023/05/8 >> changed the logic of written code to 'mounting the routes'
//    "      >> added main functions to control estates
router
    .route('/estates')
    .get(adminPage_Controller.getAllEstates)
    .post(adminPage_Controller.createEstate );

router
    .route('/estates/:estateId')
    .get(adminPage_Controller.getEditEstate)
    .delete(adminPage_Controller.deleteEstate)
    .put(adminPage_Controller.updateEstate);

router
    .route('/estate/getCountries')
    .get(adminPage_Controller.getCountry);

router
    .route('/estate/getCities/:countryName')
    .get(adminPage_Controller.getCities);

router
    .route('/estates/addFilter')
    .post(adminPage_Controller.postFilter);

router
    .route("/estate/getAddEstateFilters")
    .get(adminPage_Controller.getAddEstateFilters);  
    
router
    .route("/getFilters")
    .get(adminPage_Controller.getAllFilters);



module.exports = router;
