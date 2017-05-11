let Review = require('../models/reviews');
var bodyParser = require('body-parser');
let reviewsController = {

    getReviews: function(req, res) {
        //var Activity = req.body._id;
        console.log("enters back end");
        var Activity = req.params.activity
        Review.find({ activity: Activity }, function(err, acc) {
            if (err) {
                console.log(err);
                throw err;
            } else {
                res.json(acc);
                console.log(acc);
            }
        });
    }
}

module.exports = reviewsController;