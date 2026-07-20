import React, { Component } from 'react';

class Cart extends Component {
  render() {
    const { itemname, price } = this.props;
    return (
      <tr className="cart-row">
        <td className="item-name">{itemname}</td>
        <td className="item-price">${price.toFixed(2)}</td>
      </tr>
    );
  }
}

export default Cart;
