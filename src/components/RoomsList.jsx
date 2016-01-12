var React = require('react'),
    RoomThumbnail = require('./RoomThumbnail.jsx'),
    ComponentTree = require('react-component-tree'),
    _ = require('lodash');

require('../styles/rooms-list.less');

/**
 * Renders a list of RoomThumbnails (+ create room)
 * @param {Function} onRoomJoin When a room is joined send id to parent.
 * @param {Object[]} rooms Array of roomConfigs
 * @param {Function} onRoomJoin callback
 */
module.exports = React.createClass({

  mixins: [ComponentTree.Mixin],

  children: {
    roomThumbnail: function(roomConfig, index) {
      return {
        component: RoomThumbnail,
        title: roomConfig.name,
        image: roomConfig.imgUrl,
        owner: '',
        lock_hour: '',
        oddBackground: !!(index % 2),
        onRoomJoin: this.props.onRoomJoin,
        key: index,
        id: roomConfig._id
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
