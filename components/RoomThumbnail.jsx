var React = require('react');

require('../styles/room-thumbnail.less');

/**
 * Renders room thumbnail
 * @param {String} title Food company name
 * @param {String} image Food company logo
 * @param {String} owner Room owner
 * @param {String} lock_hour Room lock hour
 */
module.exports = React.createClass({

  render: function() {
    return <div className="room-thumbnail">
      {this.props.image ? this._renderLogo() : null}
      {this._renderInfo()}
    </div>;
  },

  _renderLogo: function() {
    return <img className="room-thumbnail-logo" src={this.props.image}/>;
  },

  _renderInfo: function() {
    return <div className="room-thumbnail-info">
      <p className="room-thumbnail-title">
        {this.props.title}
      </p>
      <p className="room-thumbnail-owner">
        Owner: {this.props.owner}
      </p>
      <p className="room-thumbnail-lock-hour">
        {this.props.lock_hour}
      </p>
      <div className="room-thumbnail-join-button">
      Join
      </div>
    </div>;
  }


});
