var React = require('react'),
    ComponentTree = require('react-component-tree'),
    RoomsList = require('./RoomsList.jsx'),
    _ = require('lodash');

require('../styles/delivery.less');

/**
 * Main app container
 * Ce primeste asta prin props o sa faca prin get cred.
 */
module.exports = React.createClass({

  mixins: [ComponentTree.Mixin],

  children: {
    roomsList: function() {
      return {
        component: RoomsList,
        rooms: this._getRooms()
      };
    }
  },

  render: function() {
    return <div className='delivery'>

      <div className='rooms'>
        {this.loadChild('roomsList')}
      </div>
      <div className='chat'>
        Chat
      </div>
      <div className='user-list'>
        User-list
      </div>
    </div>;
  },

  _getRooms: function() {
    return this.props.rooms;
  }
});
