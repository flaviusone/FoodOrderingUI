'use strict'

var passport = require ('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    db = require ('./db/db.js');

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (id, done) {
  db.getUserByUsername (id, function (err, user){
    done (err, user);
  });
});

passport.use('facebook', new FacebookStrategy({
  clientID        : '1720002968285873',
  clientSecret    : 'c9fd63902ab5d170d2ade08ebe8324a6',
  callbackURL     : 'http://localhost:3000/login/facebook/callback',
  //profileFields   : ['id', 'name','photos', 'emails', 'username', 'displayName']
  },
 
  // facebook will send back the tokens and profile
  function(access_token, refresh_token, profile, done) {
    // asynchronous
    process.nextTick(function() {
     
      // find the user in the database based on their facebook id
      //console.log( "https://graph.facebook.com/" + profile.username + "/picture" + "?width=200&height=200" + "&access_token=" + accessToken);
      db.getUserByUsername (profile.id, function (err, user){
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
           return done(err);
        // if the user is found, then log them in
        if (user) 
          return done (null, user); // user found, return that user
        else
        {
          var imgUrl = 'http://graph.facebook.com/' + profile.id + '/picture';
          db.addUser (profile.id, profile.displayName, imgUrl, function (err){
            if (err)
              return done (err)
            else
            {
              db.getUserByUsername (profile.id, function (err, user){
                return done (err, user);
              });
            }
          });
        }
      });
    });
  })
);
