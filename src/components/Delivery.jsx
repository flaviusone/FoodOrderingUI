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
        roomIndex: 42,
        userName: this.state.userName,
        userId: this.state.userId,
        roomId: this.state.roomId
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
      users: []
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

  // _getUsers: function() {
  //   var data = {
  //     roomId: this.state.roomId
  //   };
  //   $.ajax({
  //     type: 'POST',
  //     url: '/login',
  //     data: data,
  //     dataType: 'json',
  //     success: this.onSuccess
  //   });
  //   var userFixture = require('../../fixtures/UserThumbnail/base.js');

  //   return _.times(4, function() {
  //     return userFixture;
  //   });
  // }
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
    this.setState({
      users: response.users,
      roomId: roomId
    });
  }
});
