var _ = require('lodash'),
    roomFixture = require('../RoomThumbnail/base.js');

var rooms = _.times(4, function() {
  return roomFixture;
});

module.exports = {
  rooms: rooms
};
