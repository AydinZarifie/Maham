const express = require('express');
const router = express.Router();

const mainPage_Controller = require('../controllers/admin/adminPage');

// 2023/05/8 >> changed the logic of written code to 'mounting the routes'
//    "      >> added main functions to control estates
router
    .route('/posts')
    .get(mainPage_Controller.getAllEstates)
    .post(mainPage_Controller.createEstate);

router
    .route('/posts/:estateId')
    .get(mainPage_Controller.getEditEstate)
    .delete(mainPage_Controller.deleteState)
    .put(mainPage_Controller.editEstate)
 

module.exports = router;
