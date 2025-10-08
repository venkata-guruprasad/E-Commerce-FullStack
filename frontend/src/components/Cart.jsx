import React from 'react';
import { useCart } from '../context/CartContext';
import './styles/cart.css';

export default function Cart({ onClose, onCheckout }) {
    const { items, remove, updateQty, total } = useCart();

    return (
        <div className="cart-overlay">
            <div className="cart-panel">
                <button className="close" onClick={onClose}>Close</button>
                <h2>Your Cart</h2>
                {items.length === 0 ? <p>Cart is empty</p> : (
                    <div>
                        {items.map(i => (
                            <div className="cart-item" key={i.id}>
                                <img src={i.image} alt={i.name} />
                                <div className="meta">
                                    <h4>{i.name}</h4>
                                    <p>₹{i.price}</p>
                                    <div className="qty">
                                        <button onClick={() => updateQty(i.id, Math.max(1, i.qty - 1))}>-</button>
                                        <input value={i.qty} onChange={(e) => updateQty(i.id, Math.max(1, Number(e.target.value) || 1))} />
                                        <button onClick={() => updateQty(i.id, i.qty + 1)}>+</button>
                                        <button className="rm" onClick={() => remove(i.id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="cart-total">
                            <strong>Total: ₹{total}</strong>
                            <button className="checkout" onClick={onCheckout}>Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}