/**
 * A simple mixin for making data requests.
 *
 * @returns {ReactMixin}
 */
var _onErrorCallback = function() {};

module.exports = require('react-data-fetch')({
  crossDomain: true,
  onError: function globalErrorCallback() {
    _onErrorCallback.apply(this, arguments);
  }
});

// XXX: we're modifying the `react-data-fetch` module here.
module.exports.setOnErrorCallback = function(cb) {
  _onErrorCallback = cb;
};
