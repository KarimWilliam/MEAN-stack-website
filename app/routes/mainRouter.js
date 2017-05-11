var express=require('express');
var router =express.Router();
var homeController= require('../controllers/homeController');

router.post('/search',homeController.search);
router.post('/filter',homeController.filter);
router.post('/searchComp',homeController.searchComp);
router.post('/searchRate',homeController.searchRate);

module.exports= router;