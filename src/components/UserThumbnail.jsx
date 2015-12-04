var React = require('react'),
    _ = require('lodash');

require('../styles/user-thumbnail.less');

/**
 * Renders room thumbnail
 * @param {String} userName User name
 * @param {String} avatar User avatar
 * @param {Object[]} orders What user ordered
 */
module.exports = React.createClass({

  render: function() {
    return <div className='user-thumbnail'>
      {this.props.avatar ? this._renderAvatar() : null}
      {this._renderInfo()}
    </div>;
  },

  _renderAvatar: function() {
    return <img className="user-thumbnail-avatar" src={this.props.avatar}/>;
  },

  _renderInfo: function() {
    var ordersArray = _.map(this.props.orders, function(order) {
      return order.name;
    });
    var orders = ordersArray.join(' ');
    return <div className="user-thumbnail-info">
      <p className="user-thumbnail-name">
        {this.props.userName}
      </p>
      <p className="user-thumbnail-order">
        Ordered: {orders}
      </p>
    </div>;
  }


});
