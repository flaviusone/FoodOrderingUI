var _ = require('lodash'),
    roomFixture = require('../RoomThumbnail/base.js'),
    userFixture = require('../UserThumbnail/base.js');

var users = _.times(4, function() {
  return userFixture;
});


var rooms = _.times(4, function() {
  return roomFixture;
});

module.exports = {
  rooms: rooms,
  users: users
};
