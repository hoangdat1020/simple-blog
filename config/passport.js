const passport = require('passport');
const localStrategy= require('passport-local').Strategy;
const User = require('../models/user.model');
module.exports= function(app){
	app.use(passport.initialize())
	app.use(passport.session())
	passport.serializeUser(function(user, done) {
	  done(null, user.id);});//ghi du lieu ra session qu atruong user.id
		passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});

	passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({username }, function (err, user){
      if (err) { return done(err); }
      if (!user) {
        return done(null,false,{ message: 'Incorrect username.' });
      }
      user.comparePassword(password,(err,isMatch)=>{
      	if(err) return done(null,{ message: 'Wrong'});
      	if(!isMatch) return done(null,false,{message:'invalid pass'});
      	return done(null, user);
      });
      
    });
  }));
};
