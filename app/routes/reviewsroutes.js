// require dependincies
const express = require('express');

var router = express.Router();
var reviewsController = require('../controllers/reviewsController');


// add routes
//getAllReviews
router.get('/review/:activity', reviewsController.getReviews);


// export router
module.exports = router;