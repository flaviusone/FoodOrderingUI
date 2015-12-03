var React = require('react'),
    ComponentTree = require('react-component-tree'),
    RoomsList = require('./RoomsList.jsx'),
    DataFetch = require('../mixins/data-fetch.js'),
    UserList = require('./UserList.jsx'),
    LoginModal = require('./LoginModal.jsx'),
    Chat = require('./Chat.jsx'),
    _ = require('lodash');

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
        rooms: this._getRooms()
      };
    },

    chat: function() {
      return {
        component: Chat,
        roomIndex: 42
      };
    },

    userList: function() {
      return {
        component: UserList,
        users: this._getUsers()
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
    return {renderModal: true};
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

  onLoginCallback: function(userName, userID) {
    // set state cu userID si remove modal
    this.setState({renderModal: false});
    return;
  },

  _getRooms: function() {
    if (this.state.data) {
      return this.state.data.rooms;
    } else {
      return null;
    }
  },

  _getUsers: function() {
    var userFixture = require('../../fixtures/UserThumbnail/base.js');

    return _.times(4, function() {
      return userFixture;
    });
  }
});
