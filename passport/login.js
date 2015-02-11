var LocalStrategy = require('passport-local').Strategy;
var User = require('../public/model/user');


module.exports = function(passport){
  passport.use('login', new LocalStrategy({ passReqToCallback: true },

  function(req, username, password, done) {
  console.log('there' + username + password + '-----------');
    User.findOne({'username': username},
    function(err, user) {
      if(err) {
        console.log('err');
        return done(err);
      }

      if(!user) {
        console.log('user not found-------------------1');
        return done(null, false, req.flash('massage', 'User Not fount'));
      }

      if(!isValidPassword(user, password)) {
        console.log('password invalid');
        return done(null, false, req.flash('message', 'Invalid Password'));
      }

      return done(null, user);
    })
  }));

  var isValidPassword = function(user, password){
    return password == user.password;
  }
};