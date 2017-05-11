var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');

var nameValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z]+$/
    })
]
var descValidator = [
    validate({
        validator: 'isLength',
        arguments: [10, 150],
        message: 'Description must be between 10 characters to 150 characters'
    })
]

var numberOfapplicationsValidator = [
    validate({
        validator: 'matches',
        arguments: /^\d+$/,
        message: 'You have to insert Numbers DUDE'
    })
]
var ActivitySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true,
        validate: nameValidator

    },
    StartDate: {
        type: Date,
        default: Date.now
            //    required: true
    },
    EndDate: {
        type: Date
            //  required: true
    },
    location: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        validate: descValidator
    },
    numberOfApplicatons: {
        type: String,
        required: true,
        validate: numberOfapplicationsValidator
    },
    flag: {
        type: String,
        default: "0"
    },
    avgRating: {
        type: Number,
        default: 0
    },
    ratings: [{
        type: Schema.ObjectId,
        ref: 'rating' //could be like this or ratingSchema
    }],
    numberOfRatings: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: 0
    }

});
const Activity = module.exports = mongoose.model('activities', ActivitySchema);