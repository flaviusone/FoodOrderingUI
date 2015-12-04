var React = require('react'),
    MessageList = require('./MessageList.jsx'),
    InputForm = require('./InputForm.jsx'),
    ComponentTree = require('react-component-tree');

require('../styles/chat.less');

/**
 * Renders a list of messages and input form.
 * @param  {Integer} roomIndex
 * @param {String} userName
 * @param {Number} userID
 */
module.exports = React.createClass({

  mixins: [ComponentTree.Mixin],

  getInitialState: function() {
    return {
      messages: []
    };
  },

  children: {
    messageList: function() {
      return {
        component: MessageList,
        messages: this.state.messages
      };
    },

    inputForm: function() {
      return {
        component: InputForm,
        onMessageSubmit: this.onMessageSubmit,
        user: this.props.userName
      };
    }
  },

  render: function() {
    return <div className="chat-component">
      {this.loadChild('messageList')}
      {this.loadChild('inputForm')}
    </div>;
  },

  onMessageSubmit: function(message) {
    this.setState({messages: this.state.messages.concat(message)});
  }
});
