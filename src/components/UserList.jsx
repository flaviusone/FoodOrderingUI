var React = require('react'),
    UserThumbnail = require('./UserThumbnail.jsx'),
    ComponentTree = require('react-component-tree'),
    _ = require('lodash');

require('../styles/user-list.less');

/**
 * Renders a list of UserThumbnail
 * @param {Object[]} users Array of userConfigs
 */
module.exports = React.createClass({

  mixins: [ComponentTree.Mixin],

  children: {
    userThumbnail: function(userConfig, index) {
      return {
        component: UserThumbnail,
        userName: userConfig.name,
        avatar: userConfig.imgUrl,
        orders: _.find(this.props.userOrders, function(userOrder) {
          return userOrder._id === userConfig._id;
        }).orders,
        key: index
      };
    }
  },

  render: function() {
    return <div className="users-list">
     {this._renderUsers()}
    </div>;
  },

  _renderUsers: function() {
    return _.map(this.props.users, function(userConfig, index) {
      return this.loadChild('userThumbnail', userConfig, index);
    }, this);
  }
});
