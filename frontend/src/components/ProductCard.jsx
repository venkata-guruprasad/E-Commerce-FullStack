import React from 'react';
import { useCart } from '../context/CartContext';
import './styles/product.css'; // CSS unna case lo include cheyyandi

export default function ProductCard({ product }) {
    const { add } = useCart();

    const handleAdd = () => {
        add(product); 
        alert(`${product.name} is added to the cart ✅`);
    };

    return (
        <div className="card">
            <img src={product.image} alt={product.name} className="card-img" />
            <div className="card-body">
                <h3>{product.name}</h3>
                <p className="desc">{product.description}</p>
                <div className="bottom">
                    <strong>₹{product.price}</strong>
                    <button onClick={handleAdd} className="add-btn">Add</button>
                </div>
            </div>
        </div>
    );
}
