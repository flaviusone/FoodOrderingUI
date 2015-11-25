var _ = require('lodash'),
    userFixture = require('../UserThumbnail/base.js');

var users = _.times(4, function() {
  return userFixture;
});

module.exports = {
  users: users
};
