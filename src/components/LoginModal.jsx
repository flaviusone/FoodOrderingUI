var React = require('react'),
    Modal = require('react-modal'),
    $ = require('jquery');

/**
 * Renders Login Modal
 * @param {Function} submitCallback
 */
module.exports = React.createClass({

  handleChange: function(event) {
    this.setState({inputValue: event.target.value});
  },

  render: function() {
    return <div>
      {this._renderModal()}
    </div>;
  },

  _renderModal: function() {
    return <Modal isOpen={true}
                  style={customStyles}>
      <h1>Login into app.</h1>
      <input type="text" onChange={this.handleChange} />
      <button onClick={this.onButtonClick}>Login</button>
    </Modal>;
  },

  onButtonClick: function() {
    var data = {
      username: this.state.inputValue
    };
    $.ajax({
      type: 'POST',
      url: '/login',
      data: data,
      dataType: 'json',
      success: this.onSuccess
    });
  },

  onSuccess: function(response) {
    var user = response.user;
    this.props.submitCallback(user.name, user.userId);
  }
});

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
