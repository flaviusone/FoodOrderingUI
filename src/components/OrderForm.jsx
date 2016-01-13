var React = require('react'),
    MenuItemsList = require('./MenuItemsList.jsx'),
    ComponentTree = require('react-component-tree'),
    InputForm = require('./InputForm.jsx'),
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
      counters: [],
      menu: []
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (!_.isEmpty(nextProps.menu) && !_.isEqual(this.props.menu, nextProps.menu)) {
      this.setState({
        total: 0,
        orderedItems: [],
        menu: _.map(nextProps.menu, function(menuitem) {
          menuitem.counter = 0;
          return menuitem;
        })
      });
    }
  },


  children: {
    menuItemsList: function() {
      return {
        component: MenuItemsList,
        menu: this.state.menu,
        counters: this.state.counters,
        onItemAdd: this.onItemAdd,
        onItemSubtract: this.onItemSubtract
      };
    },
    inputForm: function() {
      return {
        component: InputForm,
        onMessageSubmit: this.onSearch,
        user: this.props.userName
      };
    }
  },

  render: function() {
    return <div className='order-form'>
      <Button className="order-form-list-order-button"
              bsStyle="primary" bsSize="small"
              onClick={this.onOrder}>Order food!
      </Button>
      {this.loadChild('inputForm')}
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
      menu: _.map(this.state.menu, function(menuitem) {
        menuitem.counter = 0;
        return menuitem;
      })
    });
  },

  // Updates total with new added item
  onItemAdd: function(item) {
    var stateItems = this.state.orderedItems;
    stateItems.push(item);
    var newTotal = this.state.total;
    newTotal += item.price;
    var newMenu = this.state.menu;
    newMenu[item.index].counter += 1;
    this.setState({
      menu: newMenu,
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
    var newMenu = this.state.menu;
    newMenu[item.index].counter -= 1;
    this.setState({
      menu: newMenu,
      orderedItems: stateItems,
      total: newTotal
    });
  },

  onSearch: function(value) {
    var newMenu;
    if (value.text === '') {
      newMenu = _.map(this.props.menu, function(menuitem) {
        menuitem.counter = 0;
        return menuitem;
      });
    }else {
      newMenu = _.filter(this.state.menu, function(menuitem) {
        if (_.contains(menuitem.name, value.text) ||
            _.contains(menuitem.description, value.text)) {
          return true;
        }
      });
    }
    this.setState({
      menu: newMenu
    });
  }
});
