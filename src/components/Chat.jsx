var React = require('react'),
    MessageList = require('./MessageList.jsx'),
    InputForm = require('./InputForm.jsx'),
    ComponentTree = require('react-component-tree'),
    _ = require('lodash');

import io from 'socket.io-client';
var socket = io('http://localhost:3000');

require('../styles/chat.less');

/**
 * Renders a list of messages and input form.
 * @param  {Integer} roomIndex
 * @param {String} userName
 * @param {Number} userID
 * @param {Number} roomId
 */
module.exports = React.createClass({

  mixins: [ComponentTree.Mixin],

  getInitialState: function() {
    return {
      messages: this._getInitialMessages()
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      messages: this._getInitialMessages()
    });
  },

  componentDidMount: function() {
    socket.on('chat', this._recieveMessage);
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
    //emit new message
    socket.emit('chat', {roomId: this.props.roomId,
                         userId: this.props.userId,
                         message: message.text});

    this.setState({messages: this.state.messages.concat(message)});
  },

  _recieveMessage: function(message) {
    var newMessage = {
      user: message.userName,
      text: message.message
    };
    if (newMessage.user === this.props.userName) {
      return;
    }
    this.setState({messages: this.state.messages.concat(newMessage)});
  },

  _getInitialMessages: function() {
    var preparedChatArray = [];
    if (this.props.chat.length === 0) {
      return this.props.chat;
    }

    _.forEach(this.props.chat, function(message) {
      var newMessage = {
        user: message.userName,
        text: message.message
      };
      preparedChatArray.push(newMessage);
    });

    return preparedChatArray;
  }
});
