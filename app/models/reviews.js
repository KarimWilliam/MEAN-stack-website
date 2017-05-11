var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewsSchema = new Schema({
    activity: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    title: {
        type: String,
        required: true
    }

});
const reviews = module.exports = mongoose.model('reviews', reviewsSchema);