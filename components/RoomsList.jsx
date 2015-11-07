var React = require('react'),
    RoomThumbnail = require('./RoomThumbnail.jsx'),
    ComponentTree = require('react-component-tree'),
    _ = require('lodash');

require('../styles/rooms-list.less');

/**
 * Renders a list of RoomThumbnails (+ create room)
 * @param {Function} onRoomJoin When a room is joined send id to parent.
 * @param {Object[]} rooms Array of roomConfigs
 */
module.exports = React.createClass({

  mixins: [ComponentTree.Mixin],

  children: {
    roomThumbnail: function(roomConfig, index) {
      return {
        component: RoomThumbnail,
        title: roomConfig.title,
        image: roomConfig.image,
        owner: roomConfig.owner,
        lock_hour: roomConfig.lock_hour,
        oddBackground: !!(index % 2),
        key: index
      };
    }
  },

  render: function() {
    return <div className="rooms-list">
     {this._renderRooms()}
    </div>;
  },

  _renderRooms: function() {
    return _.map(this.props.rooms, function(roomConfig, index) {
      return this.loadChild('roomThumbnail', roomConfig, index);
    }, this);
  }
});
