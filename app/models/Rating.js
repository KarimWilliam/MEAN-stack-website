var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = mongoose.Schema({
    activityID:{
        type:Schema.ObjectId,
        ref:'Activity',        
        required:true
    },
    registeredUserID:{
        type: Schema.ObjectId,
        ref: 'user',     
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
});

var Rating=mongoose.model("ratings",ratingSchema);

module.exports=Rating;