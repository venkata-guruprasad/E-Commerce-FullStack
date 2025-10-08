import React from 'react';
import { useCart } from '../context/CartContext';
import './styles/header.css';

export default function Header({ onShowCart }){
  const { items } = useCart();
  const count = items.reduce((s,i) => s + i.qty, 0);
  return (
    <header className="se-header">
      <div className="container header-inner">
        <h1 className="logo">Shopeasy</h1>
        <nav>
          <button onClick={onShowCart} className="cart-btn">Cart ({count})</button>
        </nav>
      </div>
    </header>
  );
}
