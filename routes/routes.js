'use strict';

var express = require('express'),
    router = express.Router(),
    db = require ('../db/db.js'),
    passport = require ('passport');

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
  passport.authenticate('facebook', { scope: ['email', 'basic_info', 'user_photos'] }));

router.get ('/login/facebook/callback', function (req, res, next){
  passport.authenticate ('facebook', {failureRedirect:'/login'},function (err, user, info){
    if (user != null)
    {
      req.login (user, function (err){
        if (err)
          res.redirect ('/login');
        else
          res.redirect('/login.html');
      });
    }
    else res.redirect ('/login');
  })(req, res, next);
}
);

router.get ('/get_user_info', function (req, res){
  res.status(200). send({status: 'done', user: {name: req.user.name, userId: req. user.__id,
                                                  imgUrl = req.user.imgUrl}});
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

router.post ('/join_room', function(req, res) {
  console.log ('join_room');
  if (req.body.oldRoom !== null) {
    db.removeUserFromRoom (req.body.userId, req.body.oldRoom,  function(err) {});
  }
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

module.exports = router;
