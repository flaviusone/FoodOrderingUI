var React = require('react'),
    ComponentTree = require('react-component-tree'),
    RoomsList = require('./RoomsList.jsx'),
    DataFetch = require('../mixins/data-fetch.js'),
    UserList = require('./UserList.jsx'),
    LoginModal = require('./LoginModal.jsx'),
    Chat = require('./Chat.jsx'),
    _ = require('lodash'),
    $ = require('jquery');

require('../styles/delivery.less');

/**
 * Main app container
 * Ce primeste asta prin props o sa faca prin get cred.
 */
module.exports = React.createClass({

  mixins: [DataFetch, ComponentTree.Mixin],

  children: {
    roomsList: function() {
      return {
        component: RoomsList,
        dataUrl: '/get_rooms',
        rooms: this._getRooms(),
        onRoomJoin: this.onRoomJoin
      };
    },

    chat: function() {
      return {
        component: Chat,
        userName: this.state.userName,
        userId: this.state.userId,
        roomId: this.state.roomId,
        chat: this.state.chat
      };
    },

    userList: function() {
      return {
        component: UserList,
        users: this.state.users
      };
    },

    loginModal: function() {
      return {
        component: LoginModal,
        submitCallback: this.onLoginCallback
      };
    }
  },

  getDefaultProps: function() {
    return {dataUrl: '/get_rooms'};
  },

  getInitialState: function() {
    return {
      renderModal: true,
      roomId: null,
      users: [],
      chat: []
    };
  },

  render: function() {
    return this.state.renderModal ? this.loadChild('loginModal')
                                  : this._renderAppComponents();
  },

  _renderAppComponents: function() {
    return <div className='delivery'>
      <div className='rooms'>
        {this.loadChild('roomsList')}
      </div>
      <div className='chat'>
        {this.loadChild('chat')}
      </div>
      <div className='user-list'>
        {this.loadChild('userList')}
      </div>
    </div>;
  },

  onLoginCallback: function(userName, userId) {
    // set state cu userId si remove modal
    this.setState({
      renderModal: false,
      userId: userId,
      userName: userName
    });
  },

  _getRooms: function() {
    if (this.state.data) {
      return this.state.data.rooms;
    } else {
      return null;
    }
  },

  onRoomJoin: function(roomId) {
    var data = {
      roomId: roomId,
      userId: this.state.userId
    };
    $.ajax({
      type: 'POST',
      url: '/join_room',
      data: data,
      dataType: 'json',
      success: this.onRoomJoinSuccess.bind(this, roomId)
    });
  },

  onRoomJoinSuccess: function(roomId, response) {
    var room = _.find(this.state.data.rooms,
        function(room) { return room._id === roomId; });
    this.setState({
      users: response.users,
      roomId: roomId,
      chat: room.chat
    });
  },
});
