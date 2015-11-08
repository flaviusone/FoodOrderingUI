var _ = require('lodash');

module.exports = {
  roomIndex: 0,
  state: {
    messages: _.times(10, function() {
      return {
        user: 'Brebex',
        text: 'Ce zici bosica?'
      };
    })
  }
};
