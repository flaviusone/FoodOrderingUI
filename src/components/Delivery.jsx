var React = require('react'),
    ComponentTree = require('react-component-tree'),
    RoomsList = require('./RoomsList.jsx'),
    DataFetch = require('../mixins/data-fetch.js'),
    UserList = require('./UserList.jsx'),
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

  componentDidMount: function() {
    $.ajax({
      type: 'GET',
      url: '/get_user_info',
      data: {},
      dataType: 'json',
      success: this.onLoginCallback
    });
  },

  children: {
    roomsList: function() {
      return {
        component: RoomsList,
        dataUrl: '/get_rooms',
        rooms: this._getRooms(),
        curentRoom: this.state.roomId,
        onRoomJoin: this.onRoomJoin
      };
    },

    chat: function() {
      return {
        component: Chat,
        userName: this.state.userName,
        userId: this.state.userId,
        roomId: this.state.roomId,
        chat: this.state.chat,
        menu: this.state.menu
      };
    },

    userList: function() {
      return {
        component: UserList,
        users: this.state.users,
        userOrders: this.state.roomId ? this._getUserOrders() : null
      };
    }
  },

  getDefaultProps: function() {
    return {dataUrl: '/get_rooms'};
  },

  getInitialState: function() {
    return {
      roomId: null,
      users: [],
      chat: []
    };
  },

  render: function() {
    return this._renderAppComponents();
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

  _getUserOrders: function() {
    if (this.state.data) {
      return this.state.data.userOrders;
    } else {
      return null;
    }
  },

  _getRooms: function() {
    if (this.state.data) {
      return _.sortBy(this.state.data.rooms, 'name');
    } else {
      return null;
    }
  },

  onRoomJoin: function(roomId) {
    var data = {
      oldRoom: this.state.roomId,
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

  onLoginCallback: function(response) {
    this.setState({
      userId: response.user.userId,
      userName: response.user.name
    });
  },

  onRoomJoinSuccess: function(roomId, response) {
    var room = _.find(this.state.data.rooms,
        function(room) { return room._id === roomId; });
    this.setState({
      users: response.users,
      roomId: roomId,
      chat: room.chat,
      menu: response.restaurant.menu
    });
  }
});
