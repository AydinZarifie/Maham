const express = require('express');
const router = express.Router();

const mainPage_Controller = require('../controllers/adminPage');

// 2023/05/8 >> changed the logic of written code to 'mounting the routes'
//    "      >> added main functions to control estates
router
    .route('/posts')
    .get(mainPage_Controller.getAllEstates)
    .post(mainPage_Controller.checkBody, mainPage_Controller.createEstate);

router
    .route('/posts/:id')
    .get(mainPage_Controller.getState)
    .patch(mainPage_Controller.updateState)
    .delete(mainPage_Controller.deleteState);

module.exports = router;
