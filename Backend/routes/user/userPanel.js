const express = require('express');
const router = express.Router();
const userPanelController = require('../../controllers/user/userPanel');

router.route('/panel/assets').get(userPanelController.getMyAssets);

router.post('/panel/search/title', userPanelController.searchEstateByTitle);

router.post('/panel/search/filter', userPanelController.searchEstateByFilter);

router.patch('/panel/buy', userPanelController.onBuyEstate);

router.get('/panel/sellDetail', userPanelController.getEstateSellInfo);

router.patch('/panel/sell', userPanelController.onSellPosition);

router.patch('/panel/cancelSell', userPanelController.cancelSellPosition);

module.exports = router;
