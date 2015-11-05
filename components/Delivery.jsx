var React = require('react'),
    RoomThumbnail = require('./RoomThumbnail.jsx'),
    ComponentTree = require('react-component-tree'),
    _ = require('lodash');

require('../styles/delivery.less');

/**
 * Main app container
 */
module.exports = React.createClass({

  mixins: [ComponentTree.Mixin],

  children: {
    roomThumbnail: function(roomConfig) {
      return {
        component: RoomThumbnail,
        title: roomConfig.title,
        image: roomConfig.image,
        owner: roomConfig.owner,
        lock_hour: roomConfig.lock_hour
      };
    }
  },

  render: function() {
    return <div className='delivery'>

      <div className='rooms'>
        {this._renderRooms()}
      </div>
      <div className='chat'>
        Chat
      </div>
      <div className='user-list'>
        User-list
      </div>
    </div>;
  },

  _renderRooms: function() {
    return _.map(this.props.rooms, function(roomConfig) {
      return this.loadChild('roomThumbnail', roomConfig);
    }, this);
  }
});
