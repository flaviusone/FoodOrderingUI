'use strict';

var express = require('express'),
    router = express.Router(),
    db = require ('../db/db.js'),
    passport = require ('passport');
    // FacebookStrategy = require('passport-facebook').Strategy;

// passport.serializeUser(function(user, done) {
//   console.log('serializeUser')
//   done(null, user.username);
// });

// passport.deserializeUser(function (id, done) {
//   console.log ('deserializeUser');
//   db.getUserByUsername (id, function (err, user){
//     done (err, user);
//   });
// });

// passport.use('facebook', new FacebookStrategy({
//   clientID        : '1720002968285873',
//   clientSecret    : 'c9fd63902ab5d170d2ade08ebe8324a6',
//   callbackURL     : 'http://localhost:3000/login/facebook/callback'
//   },
 
//   // facebook will send back the tokens and profile
//   function(access_token, refresh_token, profile, done) {
//     // asynchronous
//     process.nextTick(function() {
     
//       // find the user in the database based on their facebook id
//       db.getUserByUsername (profile.id, function (err, user){
//         // if there is an error, stop everything and return that
//         // ie an error connecting to the database
//         if (err)
//            return done(err);
//         // if the user is found, then log them in
//         if (user) 
//           return done (null, user); // user found, return that user
//         else
//         {
//           db.addUser (profile.id, profile.displayName, function (err){
//             if (err)
//               return done (err)
//             else
//             {
//               db.getUserByUsername (profile.id, function (err, user){
//                 return done (err, user);
//               });
//             }
//           });
//         }
//       });
//     });
//   })
// );

/* GET home page. */
// router.post ('/login', function(req, res) {
//   db.getUserByUsername (req.body.username, function(err, user) {
//     if (err || !user) {
//       res.status (200).send ({status: 'error'});
//     } else {
//       var userData = {name: user.name, userId: user._id};
//       res.status (200).send ({status: 'done', user: userData});
//     }
//   });
// });

// route for facebook authentication and login
// different scopes while logging in
router.get('/login',
  passport.authenticate('facebook', { scope : 'email' }));
 
router.get ('/login/facebook/callback', function (req, res, next){
  passport.authenticate ('facebook', {failureRedirect:'/login'},function (err, user, info){
    if (user != null) 
    {
      req.login (user, function (err){
        if (err)
          res.redirect ('/login');
        else
          res.redirect('/');
      });
    }
    else res.redirect ('/login');
  })(req, res, next);
}
);

router.get ('/get_user_info', function (req, res){
  res.status(200). send({status: 'done', user: {name: req.user.name, userId: req. user.__id}});
});

router.get ('/get_rooms', function(req, res) {
  db.getAllRooms (function(err, rooms) {
    if (err) {
      res.status (200).send ({status: 'error'});
    } else {
      db.getAllUsers (function(err, users) {
        if (err)
          res.status (200).send ({status: 'error'});
        else {
          res.status (200).send ({status: 'done', rooms: rooms, userOrders: users});
        }
      });
    }
  });
});

router.get ('/get_ioana', function(req, res) {
  console.log(req.user);
  db.getAllRooms (function(err, rooms) {
    if (err) {
      res.status (200).send ({status: 'error'});
    } else {
      db.getAllUsers (function(err, users) {
        if (err)
          res.status (200).send ({status: 'error'});
        else {
          res.status (200).send ({status: 'done', rooms: rooms, userOrders: users});
        }
      });
    }
  });
});

router.post ('/join_room', function(req, res) {
  console.log(req.user);
  db.addUserToRoom (req.body.userId, req.body.roomId, function(err) {
    if (err) {
      res.status (200).send ({status: 'error'});
    } else {
      db.getRoomById (req.body.roomId, function(err, room) {
        if (err) {
          res.status (200).send ({status: 'error'});
        } else {
          db.getRestaurantById (room.restaurantId, function(err, restaurant) {
            if (err) {
              res.status (200).send ({status: 'error'});
            } else {
              db.getUsersByRoomId (req.body.roomId, function (err, users){
                if (err)
                  res.status (200).send ({status: 'error'});
                else
                {
                  res.status (200).send ({status: 'done', restaurant: restaurant, users: users});
                }
              });
            }
          });
        }
      });
    }
  });
});

router.post ('/orders_info', function(req, res) {
  db.getUsersByRoomId (req.body.roomId, function(err, users) {
    if (err || !users) {
      res.status (200).send ({status: 'error'});
    } else {
      res.status (200).send ({status: 'done', users: users});
    }
  });
});

router.post ('/submit_order', function(req, res) {
  db.addOrdersToUser (req.body.userId, req.body.orders, function(err) {
    if (err) {
      res.status (200).send ({status: 'error'});
    } else {
      res.status (200).send ({status: 'done'});
    }
  });
});

router.post ('/add_room', function(req, res) {
  db.addRoom (req.body.userId, req.body.hourLimit, req.body.restaurantId,
    function(err) {
      if (err) {
        res.status (200).send ({status: 'error'});
      } else {
        res.status(200).send ({status: 'done'});
      }
    });
});



// router.get ('/', function(req, res) {
//   res.sendFile('index.html');
// });

module.exports = router;
