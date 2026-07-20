import React, { Component } from 'react';
import Cart from './Cart';

class OnlineShopping extends Component {
  render() {
    const cartItems = [
      { itemname: 'Apple MacBook Pro M3', price: 1999.00 },
      { itemname: 'Sony WH-1000XM5 Headphones', price: 349.99 },
      { itemname: 'iPhone 15 Pro Max', price: 1199.00 },
      { itemname: 'Apple iPad Pro 12.9"', price: 1099.00 },
      { itemname: 'Keychron Q1 Mechanical Keyboard', price: 189.50 }
    ];

    const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0);

    return (
      <div className="online-shopping">
        <div className="shopping-card">
          <div className="shopping-header">
            <h2>🛒 Shopping Invoice</h2>
            <p className="shopping-subtitle">Cognizant DeepSkilling Lab - Class Components & Props</p>
          </div>
          
          <table className="shopping-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th className="text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <Cart key={index} itemname={item.itemname} price={item.price} />
              ))}
              <tr className="total-row">
                <td>Total Summary</td>
                <td className="item-price text-right">${totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default OnlineShopping;
