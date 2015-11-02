var React = require('react'),
    RoomThumbnail = require('./RoomThumbnail.jsx');

require('../styles/delivery.less');

/**
 * Main app container
 */
module.exports = React.createClass({
  render: function() {
    return <div className='delivery'>
      <div className='rooms'>
        <RoomThumbnail/>
        <RoomThumbnail/>
        <RoomThumbnail/>
      </div>
      <div className='chat'>
        Chat
      </div>
      <div className='user-list'>
        User-list
      </div>
    </div>;
  }
});
