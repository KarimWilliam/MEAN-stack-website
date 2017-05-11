var expressValidator = require('express-validator');
//var mongojs = require('mongojs');
//var db = mongojs('finalProject', ['companies','advertisements','activites']);
var bodyParser = require('body-parser');
var mongoose=require('mongoose');

let adController={
  createad:function(req,res) {
    var n =0;
    var newlink = req.body.newlink;
    var company = req.body.company;
    var duration = req.body.duration;
    var newAd = { link: newlink,
      duration : duration}


    user.count({}, function(err, c) {
      console.log(c);
      user.find({}, function(err,doc)
    {
     for(var i=0;i<c;i++)
     {

       n= n+ doc[i].ads.length;
     }
   })})

  if(n<15) //how many ads will we have?
  {

  user.findOne(
    {Company_name : req.body.company},
      function(err,doc){
        console.log(doc);
        if(doc.ads != null){
        var curlist = doc.ads
      }
      else {  var curlist = []};
        curlist.push(newlink)

        user.findAndModify({
          query:{Company_name : company},
          update: {$set: {ads : curlist}},
          new: true
        }, function (err, doc, lastErrorObject) {

  if(err) {


    res.render('profile' , {
      company:doc,
      error: "we dont currently have an empty place for your ad :("
    });


      }  else {

        var newnewlink = {link : newlink,  duration : duration};
      ads.insert(newnewlink,function(err,result){

        //  res.render('profile' , {
      //      company:company // not sure what to pass for profile yet.
    //      });
        })


      }

      })



    })
  }
  },


  getAllAds:function(req,res) {
    var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  }
  if(mm<10){
      mm='0'+mm;
  }
  var today = dd+'/'+mm+'/'+yyyy;

    ads.find( {},
      function(err,doc){
  if(doc.duration == today)
  {
  ads.dropIndex(
      {duration : today},
        function(err,doc){
  })

      }
  })

  }

}
module.exports = adController;