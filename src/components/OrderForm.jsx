var React = require('react'),
    MenuItemsList = require('./MenuItemsList.jsx'),
    ComponentTree = require('react-component-tree'),
    Button = require('react-bootstrap/lib/Button'),
    _ = require('lodash'),
    $ = require('jquery');

require('../styles/order-form.less');
require('../styles/bootstrap/css/bootstrap.min.css');

/**
 * Order form for room
 * @param  {Object[]} menu  The food menu
 */
module.exports = React.createClass({

  mixins: [ComponentTree.Mixin],

  getInitialState: function() {
    return {
      total: 0,
      orderedItems: [],
      counters: []
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (!_.isEmpty(nextProps.menu) && !_.isEqual(this.props.menu, nextProps.menu)) {
      this.setState({
        total: 0,
        orderedItems: [],
        counters: Array.apply(null, new Array(nextProps.menu.length))
                     .map(Number.prototype.valueOf, 0)
      });
    }
  },


  children: {
    menuItemsList: function() {
      return {
        component: MenuItemsList,
        menu: this.props.menu,
        counters: this.state.counters,
        onItemAdd: this.onItemAdd,
        onItemSubtract: this.onItemSubtract
      };
    }
  },

  render: function() {
    return <div className='order-form'>
      <Button className="order-form-list-order-button"
              bsStyle="primary" bsSize="small"
              onClick={this.onOrder}>Order food!
      </Button>
      <Button className="order-form-list-clear-button"
              bsStyle="primary" bsSize="small"
              onClick={this.onClear}>Clear
      </Button>
      <p className="order-form-list-total">
        Total: {this.state.total}
      </p>
      {this.loadChild('menuItemsList')}

    </div>;
  },

  onOrder: function() {
    var data = {
      userId: this.props.userId,
      orders: this.state.orderedItems
    };

    $.ajax({
      type: 'POST',
      url: '/submit_order',
      data: data,
      dataType: 'json'
    });
  },

  onClear: function() {
    this.setState({
      total: 0,
      orderedItems: [],
      counters: Array.apply(null, new Array(this.props.menu.length))
                     .map(Number.prototype.valueOf, 0)
    });
  },

  // Updates total with new added item
  onItemAdd: function(item) {
    var stateItems = this.state.orderedItems;
    stateItems.push(item);
    var newTotal = this.state.total;
    newTotal += item.price;
    var newCounters = this.state.counters;
    newCounters[item.index] += 1;
    this.setState({
      counters: newCounters,
      orderedItems: stateItems,
      total: newTotal
    });
  },

  // Updates total with new deleted item
  onItemSubtract: function(item) {
    var stateItems = this.state.orderedItems;
    stateItems.push(item);
    var newTotal = this.state.total;
    newTotal -= item.price;
    newTotal = newTotal < 0 ? 0 : newTotal;
    var newCounters = this.state.counters;
    newCounters[item.index] -= 1;
    this.setState({
      counters: newCounters,
      orderedItems: stateItems,
      total: newTotal
    });
  }
});
