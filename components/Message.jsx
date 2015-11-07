var React = require('react');

require('../styles/message.less');

/**
 * Renders a chat message.
 * @param  {String} user User name
 * @param {String} text Message text
 */
module.exports = React.createClass({
  render: function() {
    return <div className="message">
      <strong>{this.props.user}: </strong>
      <span>{this.props.text}</span>
    </div>;
  }
});
