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

  componentWillUpdate: function() {
    var node = this.getDOMNode();
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight ===
        node.scrollHeight;
  },

  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      var node = this.getDOMNode();
      node.scrollTop = node.scrollHeight;
    }
  },

  render: function() {
    return <div className="message-list">
      {this.props.messages.length > 0 ? this._renderMessages() : null}
    </div>;
  },

  _renderMessages: function() {
    return _.map(this.props.messages, function(messageInfo, index) {
      return this.loadChild('message', messageInfo, index);
    }, this);
  }
});
