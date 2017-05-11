let Activity = require('../models/Activity');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var session = require('express-session')
var User = require('../models/user');

"use strict"
let activitiesController = {
    //addActivity
    addActivities: function(req, res) {
        var Activ = new Activity;

        Activ.companyName = req.body.username;

        Activ.Name = req.body.Name;

        Activ.StartDate = req.body.StartDate

        Activ.EndDate = req.body.EndDate
        Activ.location = req.body.location
        Activ.desc = req.body.desc
        Activ.numberOfApplicatons = req.body.numberOfApplicatons;
        // console.log(Activ);
        if (Activ.Name == null || Activ.Name == '' || Activ.location == '' || Activ.location == null ||
            Activ.desc == null || Activ.desc == '' || Activ.numberOfApplicatons == null || Activ.numberOfApplicatons == '') {
            res.json({ success: false, message: "Ensure fields Dude" })
        } else {
            Activity.create(Activ, function(err, acc) {
                if (err) {
                    if (err.errors.Name) {
                        res.json({ success: false, message: 'Name ' + err.errors.Name.message })
                    } else {
                        if (err.errors.desc) {
                            res.json({ success: false, message: err.errors.desc.message })
                        } else {
                            if (err.errors.numberOfApplicatons) {
                                res.json({ success: false, message: err.errors.numberOfApplicatons.message })
                            }
                        }
                    }
                } else {
                    res.json({ success: true, message: "Activity Created" })
                }
            });

            //this method for sending an email when the company adds any new activity
            sendingEmail(Activ.companyName);
        }
    },
    //search for all activities in this company
    searchActivity: function(req, res) {
        var companyName = req.params.companyName;
        Activity.find({ companyName: companyName, flag: "0" }, { flag: 0, numberOfRatings: 0, ratings: 0, companyName: 0, StartDate: 0 }, function(err, acc) {
            if (err) {
                throw err;
            } else {
                res.json(acc);
            }
        });
    },
    //the next four for updating an activity.
    updateName: (req, res) => {

        var id = req.params._id;
        var query = { _id: id };
        console.log(req.body);
        var update = {
            Name: req.body.Name
        }
        if (req.body.Name == null || req.body.Name == '') {
            res.json({ success: false, message: 'Please insert a Name' });

        } else {
            Activity.findOneAndUpdate(query, update, {}, function(err, data) {
                if (err) {
                    res.json({ success: false, message: err.errors.Name.message });

                } else {
                    res.json({ success: true, message: 'The name is Updated successfully....' });

                }
            });
        }
    },

    updateLoc: (req, res) => {

        var id = req.params._id;
        var query = { _id: id };
        console.log(req.body);
        var update = {
            location: req.body.location
        }
        if (req.body.location == null || req.body.location == '') {
            res.json({ success: false, message: 'Please insert a location' });

        } else {
            Activity.findOneAndUpdate(query, update, {}, function(err, data) {
                if (err) {
                    res.json({ success: false, message: err.errors.location.message });

                } else {
                    res.json({ success: true, message: 'The Location is Updated successfully....' });
                }
            });
        }
    },

    updateNum: (req, res) => {

        var id = req.params._id;
        var query = { _id: id };
        console.log(req.body);
        var update = {
            numberOfApplicatons: req.body.numberOfApplicatons
        }
        if (req.body.numberOfApplicatons == null || req.body.numberOfApplicatons == '') {
            res.json({ success: false, message: 'Please insert a Number' });

        } else {
            Activity.findOneAndUpdate(query, update, {}, function(err, data) {
                if (err) {
                    res.json({ success: false, message: err.errors.numberOfApplicatons.message });
                } else {
                    res.json({ success: true, message: 'The Number is Updated successfully....' });
                }
            });
        }
    },

    updateDesc: (req, res) => {

        //   console.log('holahere');
        var id = req.params._id;
        var query = { _id: id };
        // console.log(req.body);
        var update = {
            desc: req.body.desc
        }
        if (req.body.desc == null || req.body.desc == '') {
            res.json({ success: false, message: 'Please insert a Description' });

        } else {
            Activity.findOneAndUpdate(query, update, {}, function(err, data) {
                if (err) {
                    res.json({ success: false, message: err.errors.desc.message });

                } else {
                    res.json({ success: true, message: 'The Description is Updated successfully....' });

                }
            });
        }
    },
    //activated Deleted Activity
    activateActivity: (req, res) => {
        var id = req.params._id;
        var query = { _id: id };
        var update = {
            flag: "0"
        }
        Activity.findOneAndUpdate(query, update, {}, function(err, res) {
            if (err) {
                throw err;
            } else {
                console.log('UpdatedBruh');
            }
        });
    },

    //delete Activity
    deleteActivity: function(req, res) {
        var id = req.params._id;
        var name = { _id: id };
        var update = {
            flag: "1"
        };
        Activity.findOneAndUpdate(name, update, [], function(err, res) {
            if (err) {
                throw err;
            } else {
                console.log('Deleted');
            }
        });
    },

    //view Activity
    viewActivity: function(req, res) {
        var id = req.params._id;
        Activity.find({ _id: id }, function(err, acc) {
            if (err) {
                throw err;
            } else {
                res.json(acc);
            }
        });
    },
    //search for deleted activities
    searchDeleted: function(req, res) {
        var companyName = req.params.companyName;
        Activity.find({ companyName: companyName, flag: "1" }, function(err, acc) {
            if (err) {
                throw err;
            } else {
                res.json(acc);
            }
        });
    },

    //console.log(places.find(category));       
    //activities.find({ companyName: companyName, flag: "0" }, callback);

    //A function that finds the top rated activities and storts them by avgRating
     getTopRatedActivities: function(req, res) {

            console.log("calls getTopRatedActivities")
            Activity.find(function(err, activities) {
                if (err) {
                    res.send(err.message);
                    console.log(err);
                } else {
                    console.log(activities)
                    res.json(activities);
                    // res.redirect('/'); //b3d may3ml rating hayrg3 le fen
                }
            }).sort({ avgRating: -1 }).limit(5);
        }

}



module.exports = activitiesController;

//this method for sending an email when the company adds any new activity
var email;
var password;
var subs;
var sendingEmail = function(name) {
    //console.log(name);
    User.find({ name: name }, function(err, objs) {
        if (err) throw err;
        var returnable_name;
        email = objs[0].email;
        password = objs[0].passOfEmail;
        subs = objs[0].subs;
        let HelperOptions = {
            from: email,
            to: subs,
            subject: 'A notification from ' + name,
            text: 'Hello , we have a new activity please check our page to get more details about it , Thanks'
        };
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25,
            auth: {
                user: email,
                pass: password
            }
        });
        transporter.sendMail(HelperOptions, (error, info) => {
            if (error) throw error;
        })
    })

}