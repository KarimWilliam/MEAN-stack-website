var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
    Company_name: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Duration: {
        type: Date,
        default: Date.now
            //    required: true
    }
});
const Activity = module.exports = mongoose.model('activities', ActivitySchema);
