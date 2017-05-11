var express=require('express');
var router =express.Router();
var adController=require('../controllers/adController');

router.post('/createad',adController.createad);
router.get('/check/ads',adController.getAllAds);

module.exports = router;