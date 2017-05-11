var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
const jwt = require('jsonwebtoken');
var userController = require('../controllers/userController');
const config = require('../../../final/config/database.js');
var session = require('express-session');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        creditCardNumber: req.body.creditCardNumber,
        isCompany: false
    });
    userController.addUser(newUser, (err, user) => {
        if (req.body.email == '' || req.body.email == null || req.body.name == null || req.body.name == '' || req.body.username == null || req.body.username == '' || req.body.password == '' || req.body.password == null) {
            res.json({ success: false, msg: 'please enter the missing field(s)' })
                //            console.log(err.name);
        } else {
            if (err) {
                            res.json({ success: false, msg: 'Username or Email already exists' });
            } else {
                console.log(user);
                res.json({ success: true, msg: 'user registered ' });
            }
        }
    });
});
router.post('/registerComp', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        location: req.body.location,
        isCompany: true,
        passOfEmail: req.body.passOfEmail
    });
    userController.addUser(newUser, (err, user) => {
        if (req.body.location == '' || req.body.location == null || req.body.email == null || req.body.email == '' || req.body.name == null || req.body.name == '' || req.body.username == null || req.body.username == '' || req.body.password == '' || req.body.password == null) {
            res.json({ success: false, msg: 'Ensure entities' })
        } else {
            if (err) {
                console.log(err);
                res.json({ success: false, msg: 'Username or Email already exists' });

            } else {
                //     console.log(req.session);
                //     console.log(req.session);
                res.json({ success: true, msg: 'user registered ' });

            }
        }
    });
});

//Login in controller
router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    //req.session = null;
if (req.body.username == null || req.body.username == '' || req.body.password == '' || req.body.password == null) {
            res.json({ success: false, msg: 'please enter the missing field(s)' })
                //            console.log(err.name);
        } 
    userController.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'user not found' })
        }
        userController.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                })

                //  console.log(token)
                if (!user.isBanned) {
                    //console.log(req.session.user);
                    //to save the data of user;
                    const token = jwt.sign(user, config.secret, {
                        expiresIn: 604800 // 1 week
                    })
                } else {
                    return res.json({ success: false, msg: 'You are banned from the server' })
                }

                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        isSuperAdmin: user.isSuperAdmin,
                        isAdmin: user.isAdmin,
                        isCompany: user.isCompany
                    }

                })
            } else {
                return res.json({ success: false, msg: 'Wrong password' })
            }
        })
    })
});

router.use(function(req, res, next) {
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    // console.log(req.headers['x-access-token']);
    if (token) {

        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.json({ success: false, message: "Token inValid" })
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({ success: false, message: "No Token provided" });
    }
})

router.post('/me', function(req, res) {
    res.send(req.decoded);
    //   console.log(req.decoded);
})

//superadmin Routes
router.put('/superban', userController.superban);
router.put('/superdeban', userController.superdeban);
router.put('/promote', userController.promote);
router.put('/demote', userController.demote);
//admin routes
router.put('/adminban', userController.adminBan);
router.put('/admindeban', userController.adminDeban);
router.post('/deleteReview', userController.deleteReview);

//userRoutes
router.get('/profile', passport.authenticate('jwt', { session: false }), userController.getProfile);
router.put('/editProfile', userController.editProfile);
router.get('/viewCompanies', userController.viewCompanies);

router.post('/addToFavourites/:_id', userController.addToFavourites);

router.put('/addToSubList/:companyName', userController.addToSubList);

router.get('/myFavourites', userController.myFavourites);
router.get('/mySubscribers', userController.mySubscribers);
//routing to add a new rating
router.post('/createrating/:_id', userController.addRating);

//user posting a review
router.post('/review/:activity', userController.addReviews);

module.exports = router;
