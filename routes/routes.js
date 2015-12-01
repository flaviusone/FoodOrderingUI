// var debug = require ('debug') ('food-server:routes');
var express = require('express'),
    router = express.Router(),
    db = require ('../db/db.js');

db ();

/* GET home page. */
router.post ('/login', function(req, res) {

  db.getUserByUsername (req.body.username, function(err, user) {
    if (err) {
      res.status (200).send ({status: 'error'});
    } else {
      var userData = {name: user.name, userId: user._id};
      res.status (200).send ({status: 'done', user: userData});
    }
  });
});

router.get ('/get_rooms', function(req, res) {
  db.getAllRooms (function(err, rooms) {
    if (err) {
      res.status (200).send ({status: 'error'});
    } else {
      res.status (200).send ({status: 'done', rooms: rooms});
    }
  });
});

router.post ('/join_room', function(req, res) {
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
              res.status (200).send ({status: 'done', restaurant: restaurant});
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

module.exports = router;