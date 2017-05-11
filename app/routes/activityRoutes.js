const express = require('express');

var router = express.Router();

var activitiesController = require('../controllers/activitiesController');
//var commentController = require('../controllers/commentController');
//var ratingController = require('../controllers/ratingController')


// add routes
//getAllActivitiesWhichIsActive

/*router.get('/:name/trash', activitiesController.searchDeleted);
 */


//addActivity
router.post('/addActivities', activitiesController.addActivities);

//get All Activities
router.get('/Activities/:companyName', activitiesController.searchActivity);

//view Deleted Activities
router.get('/trash/:companyName', activitiesController.searchDeleted);

//activate Deleted Activities
router.put('/update/:_id', activitiesController.activateActivity);

//delete Activity
router.put('/Activities/:_id', activitiesController.deleteActivity);

//view Activity
router.get('/view/:_id', activitiesController.viewActivity);

//Updating Activity 
///the 4 next routes for updating Activity 
router.post('/editName/:_id', activitiesController.updateName);

router.post('/editLoc/:_id', activitiesController.updateLoc);

router.post('/editNum/:_id', activitiesController.updateNum);

router.post('/editDesc/:_id', activitiesController.updateDesc);


//post Comments.
//router.post('/:_reviewID', commentController.addComments);

//getCOMMENTS
//router.get('/:_reviewID/comments', commentController.getComments);
//routing to call the get getTopRatedActivities function
router.post('/top', activitiesController.getTopRatedActivities);
//routing to add a new rating
//router.post('/createrating', ratingController.addRating);

// export router
module.exports = router;