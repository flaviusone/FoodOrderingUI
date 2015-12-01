var React = require('react');

require('../styles/input-form.less');

/**
 * Input form for chat
 * @param  {Function} onSubmit Callback
 */
module.exports = React.createClass({

  getInitialState: function() {
    return {text: ''};
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var message = {
      user: this.props.user,
      text: this.state.text
    };
    this.props.onMessageSubmit(message);
    this.setState({text: ''});
  },

  changeHandler(e) {
    this.setState({text: e.target.value});
  },

  render: function() {
    return <div className='input-form'>
      <form className='input-form-form' onSubmit={this.handleSubmit}>
          <input
              className='input'
              onChange={this.changeHandler}
              value={this.state.text}/>
      </form>
    </div>;
  }
});
