var React = require('react'),
    classSet = require('classnames');

require('../styles/menuitem-thumbnail.less');

/**
 * Renders room thumbnail
 * @param {String} name
 * @param {String} image
 * @param {String} description
 * @param {String} quantity
 * @param {String} price
 * @param {Boolean} oddBackground Dictates thumbnail color
 * @param {Function} onItemAdd callback
 * @param {Function} onItemSubstract callback
 */
module.exports = React.createClass({

  render: function() {
    var classes = classSet({
      'menuitem-thumbnail': true,
      'oddBackground': this.props.oddBackground
    });
    return <div className={classes}>
      {this.props.image ? this._renderLogo() : null}
      {this._renderInfo()}
    </div>;
  },

  _renderLogo: function() {
    return <img className="menuitem-thumbnail-logo" src={this.props.image}/>;
  },

  _renderInfo: function() {
    return <div className="menuitem-thumbnail-info">
      <p className="menuitem-thumbnail-title">
        {this.props.name}
      </p>
      <p className="menuitem-thumbnail-description">
        {this.props.description}
      </p>
      <div className="menuitem-thumbnail-numbers">
        <p className="menuitem-thumbnail-quantity">
          {this.props.quantity}
        </p>
        <p className="menuitem-thumbnail-price">
          {this.props.price}
        </p>
      </div>
      <div className="menuitem-thumbnail-buttons">
        <img src={require('../../assets/img/add_item.png')}
             className="menuitem-thumbnail-add-item">
        </img>
        <img src={require('../../assets/img/remove_item.png')}
             className="menuitem-thumbnail-remove-item">
        </img>
      </div>
    </div>;
  }
});
