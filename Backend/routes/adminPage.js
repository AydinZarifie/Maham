const express = require('express');
const router = express.Router();

const adminPage_Controller = require('../controllers/admin/adminPage');

// 2023/05/8 >> changed the logic of written code to 'mounting the routes'
//    "      >> added main functions to control estates
router
    .route('/estates')
    .get(adminPage_Controller.getAllEstates)
    .post(adminPage_Controller.createEstate);

router
    .route('/estates/:id')
    .get(adminPage_Controller.getState)
    .patch(adminPage_Controller.updateState)
    .delete(adminPage_Controller.deleteState);

module.exports = router;
