var React = require('react'),
    Message = require('./Message.jsx'),
    ComponentTree = require('react-component-tree'),
    _ = require('lodash');

require('../styles/message-list.less');

/**
 * Renders a list of messages.
 * @param  {Object[]} messages Array of object messages
 */
module.exports = React.createClass({

  mixins: [ComponentTree.Mixin],

  children: {
    message: function(messageInfo, index) {
      return {
        component: Message,
        user: messageInfo.user,
        text: messageInfo.text,
        key: index
      };
    }
  },

  render: function() {
    return <div className="message-list">
      {this._renderMessages()}
    </div>;
  },

  _renderMessages: function() {
    return _.map(this.props.messages, function(messageInfo, index) {
      return this.loadChild('message', messageInfo, index);
    }, this);
  }
});
