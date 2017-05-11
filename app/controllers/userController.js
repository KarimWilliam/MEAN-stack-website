let User = require('../models/user');
let bcrypt = require('bcryptjs');
let Review = require('../models/reviews');
let Rating = require('../models/Rating');
let Activity = require('../models/Activity');
let RegisteredUser = require('../models/user');
var temp;
let userController = {
    getUserById: function(id, callback) {
        User.findById(id, callback);

    },

    getUserByUsername: function(username, callback) {
        const query = { username: username };
        User.findOne(query, callback);
    },

    addUser: function(newUser, callback) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    },
    comparePassword: function(candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        });

    },

    superban: function(req, res) {
        if (req.body.username == null || req.body.username == '')
            return res.json({ success: false, msg: 'Please, Enter Username !' })
        if (req.decoded._doc.isSuperAdmin) {
            User.findOneAndUpdate({ username: req.body.username }, { isBanned: true }, {}, function(err) {
                // End session
                if (err) {
                    return res.json({ success: false, msg: 'Error Occured, User not banned !' })
                } else {
                    return res.json({ success: true, msg: 'Banned successfully (Y)' })
                }
            });
        } else {
            return res.json({ success: true, msg: 'You are not a super admin !' })
        }
    },
    superdeban: function(req, res) {
        if (req.body.username == null || req.body.username == '')
            return res.json({ success: false, msg: 'Please, Enter Username !' })
        if (req.decoded._doc.isSuperAdmin) {
            User.findOneAndUpdate({ username: req.body.username }, { isBanned: false }, {}, function(err) {
                // End session
                if (err) {
                    throw err;
                } else {
                    return res.json({ success: true, msg: 'Unbanned successfully (Y)' })
                }
            });
        } else {
            return res.json({ success: true, msg: 'You are not a super admin !' })
        }
    },
    promote: function(req, res) {
        if (req.body.username == null || req.body.username == '')
            return res.json({ success: false, msg: 'Please, Enter Username !' })

        if (req.decoded._doc.isSuperAdmin) {
            User.findOneAndUpdate({ username: req.body.username }, { isAdmin: true }, {}, function(err) {
                if (err) {
                    throw err;
                } else {
                    return res.json({ success: true, msg: 'Promoted successfully (Y)' })
                }
            });
        } else {
            return res.json({ success: true, msg: 'You are not a super admin !' })

        }

    },
    demote: function(req, res) {
        if (req.body.username == null || req.body.username == '')
            return res.json({ success: false, msg: 'Please, Enter Username !' })

        if (req.decoded._doc.isSuperAdmin) {
            User.findOneAndUpdate({ username: req.body.username }, { isAdmin: false }, {}, function(err) {
                if (err) {
                    throw err;
                } else {
                    return res.json({ success: true, msg: 'Demoted successfully (Y)' })
                }
            });
        } else {
            return res.json({ success: true, msg: 'You are not a super admin !' })

        }



    },

    adminBan: function(req, res) {
        if (req.body.username == null || req.body.username == '')
            return res.json({ success: false, msg: 'Please, Enter Username !' })
        else {
            User.findOneAndUpdate({ username: req.body.username, isSuperAdmin: false }, { isBanned: true }, {}, function(err, isSuperAdmin) {
                // End session
                if (err) {
                    return res.json({ success: false, msg: 'Error Occured, User not banned !' })
                }
                //if(!result){
                //               return res.json({success:false,msg:'User not found !'})
                //        }
                // else{
                if (!isSuperAdmin) {
                    return res.json({ success: false, msg: 'You can not ban an admin !' })
                } else {
                    return res.json({ success: true, msg: 'Banned successfully (Y)' })
                }
                //   }
            });
        }

    },

    adminDeban: function(req, res) {

        if (req.body.username == null || req.body.username == '')
            return res.json({ success: false, msg: 'Please, Enter Username !' })

        else {
            User.findOneAndUpdate({ username: req.body.username, isSuperAdmin: false }, { isBanned: false }, {}, function(err, isSuperAdmin) {
                // End session
                if (err) {
                    return res.json({ success: false, msg: 'Error Occured, Unbanning failed !' })
                }
                if (!isSuperAdmin) {
                    return res.json({ success: false, msg: 'You do not have this privilege' })
                } else {
                    return res.json({ success: true, msg: 'Unbanned successfully' })
                }
            });
        }
    },


    deleteReview: function(req, res) {
        reviews.findOneAndRemove({ id: req.body.id }, {}, function(err) {
            // End session
            if (err)
                return res.json({ success: false, msg: 'Error Occured, Deletion failed !' })
            else
                return res.json({ success: true, msg: 'Review deleted successfully' })
        });
    },

    editProfile: function(req, res,callback) {
        console.log(req.body)
        if (req.body.password == '' || req.body.password == null||req.body.name == '' || req.body.name == null||req.body.email == '' || req.body.email == null||req.body.creditCardNumber == '' || req.body.creditCardNumber == null) {
            res.json({ success: false, message: 'please enter the missing field(s)' });
        } 
        else
        {
        User.findById(req.decoded._doc._id, function(err, user) {
            if (user == null) {
                console.log('yes');
            } else {
                user.email = req.body.email;
                user.name = req.body.name;
                user.password = req.body.password;
                user.creditCardNumber = req.body.creditCardNumber;
                console.log(user);
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) res.send(err);
                user.password = hash;
                user.save(callback);
                console.log("Finish");
            });
        });
            }
        })
        }
    },
    //add to Favourite.
    addToFavourites: function(req, res) {
        var id = req.param._id;

        Activity.findOne({ _id: req.params._id }, function(err, act) {
            User.findOne({ _id: req.decoded._doc._id }, { fav_list: { $elemMatch: { companyName: act.companyName, name: act.Name, location: act.location, price: act.price } } }, function(err, user) {
                var e = user.fav_list;
                if (e[0] != undefined) {
                    if (checking(e, act.companyName, act.Name, act.location, act.price)) {
                        res.json({ success: false, message: 'You have already added it to your list' });
                    }
                } else {
                    User.update({ username: req.decoded._doc.username }, { $push: { fav_list: { companyName: act.companyName, name: act.Name, location: act.location, date: act.StartDate, price: act.price } } },
                        function(err) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json({ success: true });
                            }
                        })
                }
            })

        });
    },
    //getting my Favourite list
    myFavourites: function(req, res) {
        User.findById(req.decoded._doc._id, function(err, user) {
            if (err)
                return res.json({ success: false, msg: "You don't have favorite list" });
            else
                return res.json({ data:user.fav_list,success: true, msg: "You don't have favorite list" });
        })
    },

//adding to sublist
    addToSubList: function(req, res) {
        var nameC= req.params.companyName;
        var enter=req.decoded._doc.email;
        
        User.findById(req.decoded._doc._id, function(err, user) {
            if (err)
                console.log(err);
             else {
                user.sub_List.push({ name:nameC });
                user.save(function(err) {
                    if (err)
                        res.send(err);
          });
            }
        })
        User.findOne({name: nameC}, function(err, user) {
            console.log(user);
             if (err)
                console.log(err);
             else {
                user.subs.push(enter);
                user.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Bear updated!' });
                });
            }
        })
        

    },
    viewCompanies: function(req, res) {
        User.find({ 'isCompany': 'true' }, function(err, companies) {
            if (err)
                throw err;
            else
                res.json(companies);
        })
    },
    mySubscribers: function(req, res) {
        User.findById(req.decoded._doc._id, function(err, user) {
            if (err)
                return res.json({ success: false, msg: "You don't have subscribers" })
            else
            {
                return res.json({ data:user.sub_List,success: true, msg: "ADDED" });
            }
        })
    },
    getProfile: function(req, res, next) {
        temp = req.user;
        res.json({ user: req.user });
    },


    //add rating function that creates a new rating in the ratings collection and adds its id in the array list of the corresponding activity and calculates the avgRating of that activity
    addRating: function(req, res) {
        let rating = new Rating({
            activityID: req.params._id,
            registeredUserID: req.decoded._doc._id,
            rating: req.body.rating
        });
        Rating.create(rating, function(err, acc) {
            if (err) {
                res.send(err.message);
                console.log(err);
            } else {
                Activity.findById(acc.activityID, (err, activity) => {
                    activity.numberOfRatings += 1;
                    activity.ratings.push(rating._id);
                    activity.avgRating = (((activity.numberOfRatings - 1) * activity.avgRating) + rating.rating) / activity.numberOfRatings;
                    Activity.findByIdAndUpdate(rating.activityID, activity, {}, (err, res) => {
                        if (err) {
                            throw err;
                        } else {
                            console.log('Updated');
                        }
                    });

                });

                res.json(acc);
            }
        })
    },

    addReviews: function(req, res) {
        //    console.log('HIIII');
        var revs = new Review;

        revs.activity = req.params.activity;
        console.log(req.decoded);

        revs.client = req.decoded._doc.username;

        revs.content = req.body.content;

        revs.title = req.body.title;

        if (req.body.content == null || req.body.content == '' ||req.body.title == '' || req.body.title == null) {
            res.json({ success: false, message: 'please provide all fields' });
        }
        else{

        Review.create(revs, function(err, acc) {
            if (err) {
                console.log(err);
                res.json({ success: false, msg: 'an error has occured' })
            } else {
                res.json({ success: true, msg: 'your review was posted successfully' })
            }
        });
        }
    }



}
var checking = function(e, companyName, Name, location, price) {
    console.log(companyName)
    if (e[0].companyName == companyName && e[0].name == Name && e[0].location == location && e[0].price == price)
        return true;
    else
        return false;
}
module.exports = userController;