var React = require('react'),
    Delivery = require('./components/Delivery.jsx');

React.render(React.createElement(Delivery, {pollInterval: 5000}), document.getElementById('root'));
