var _ = require('lodash');

module.exports = {
  messages: _.times(10, function() {
    return {
      user: 'Brebex',
      text: 'Ce zici bosica?'
    };
  })
};
