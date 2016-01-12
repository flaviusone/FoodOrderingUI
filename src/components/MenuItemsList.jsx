var React = require('react'),
    MenuItemThumbnail = require('./MenuItemThumbnail.jsx'),
    ComponentTree = require('react-component-tree'),
    Button = require('react-bootstrap/lib/Button'),
    _ = require('lodash');

require('../styles/menuitems-list.less');
require('../styles/bootstrap/css/bootstrap.min.css');

/**
 * Renders a list of MenuItemThumbnails + Total
 * @param {Function} onOrderPress callback
 * @param {Object[]} menu Array of menuitems
 * @package {Number[]} counters
 */
module.exports = React.createClass({

  mixins: [ComponentTree.Mixin],

  children: {
    menuItemThumbnail: function(menuitem, index) {
      return {
        component: MenuItemThumbnail,
        name: menuitem.name,
        counter: this.props.counters[index],
        index: index,
        image: require('../../assets/img/menu_placeholder.png'),
        description: menuitem.description,
        quantity: menuitem.quantity,
        price: menuitem.price,
        oddBackground: !!(index % 2),
        onItemAdd: this.onItemAdd,
        onItemSubtract: this.onItemSubtract,
        key: index
      };
    }
  },

  render: function() {
    return <div className="menuitems-list">
     {this._renderMenuItems()}
    </div>;
  },

  _renderMenuItems: function() {
    return _.map(this.props.menu, function(menuitem, index) {
      return this.loadChild('menuItemThumbnail', menuitem, index);
    }, this);
  },

  // Updates total with new added item
  onItemAdd: function(item) {
    this.props.onItemAdd(item);
  },

  // Updates total with new deleted item
  onItemSubtract: function(item) {
    this.props.onItemSubtract(item);
  }

});
