var React = require('react'),
    MessageList = require('./MessageList.jsx'),
    InputForm = require('./InputForm.jsx'),
    OrderForm = require('./OrderForm.jsx'),
    ComponentTree = require('react-component-tree'),
    _ = require('lodash');

import io from 'socket.io-client';
var socket = io('https://foodordering.herokuapp.com/');

var initialMessages = false;

require('../styles/chat.less');

/**
 * Renders a list of messages and input form.
 * @param  {Integer} roomIndex
 * @param {String} userName
 * @param {Number} userId
 * @param {Number} roomId
 * @param {Object[]} menu restaruant menu
 */
module.exports = React.createClass({

  mixins: [ComponentTree.Mixin],

  getInitialState: function() {
    return {
      messages: []//this._getInitialMessages()
    };
  },

  // shouldComponentUpdate: function(nextProps) {
  //   return  nextProps.chat.length > this.props.chat.length ||
  //           nextProps.roomId !== this.props.roomId;
  // },

  componentWillReceiveProps: function(nextProps) {
    if (!initialMessages || nextProps.roomId !== this.props.roomId) {
      initialMessages = true;
      this.setState({
        messages: this._getInitialMessages(nextProps)
      });
    }
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
    },

    orderForm: function() {
      return {
        component: OrderForm,
        menu: this.props.menu,
        userId: this.props.userId
      };
    }
  },

  render: function() {
    return <div className="chat-component">
      {this.loadChild('orderForm')}
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
    if ((newMessage.user === this.props.userName) || (message.roomId != this.props.roomId)) {
      return;
    }
    this.state.messages.push(newMessage);
    this.forceUpdate();
    //this.setState({messages: this.state.messages.concat(newMessage)});
  },

  _getInitialMessages: function(props) {
    var preparedChatArray = [];
    if (props.chat.length === 0) {
      return props.chat;
    }

    _.forEach(props.chat, function(message) {
      var newMessage = {
        user: message.userName,
        text: message.message
      };
      preparedChatArray.push(newMessage);
    });

    return preparedChatArray;
  }
});
