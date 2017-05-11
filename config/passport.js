const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User =require('../app/controllers/userController');
const config=require('../config/database');
module.exports =function(passport){
    let opts={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload,done)=>{
       // console.log("enters");
        //console.log(jwt_payload);
        User.getUserById(jwt_payload._doc._id,(err,user)=>{
            if(err){
                return done(err,false);

            }
            if(user){
                return done(null,user);

            }else{
                return doNotTrack(null,false);
            }
        });
        
    }));
}