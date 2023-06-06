const express = require('express');
const router = express.Router();

const adminPageController = require('../controllers/admin/adminPageController');

// 2023/05/8 >> changed the logic of written code to 'mounting the routes'
//    "      >> added main functions to control estates
router
    .route('/estates')
    .get(adminPageController.getAllEstates)
    .post(adminPageController.createEstate);

router
    .route('/estates/:estateId')
    .get(adminPageController.getState)
    .put(adminPageController.updateState)
    .delete(adminPageController.deleteState);

module.exports = router;
