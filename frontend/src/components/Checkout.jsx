import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './styles/checkout.css';

export default function Checkout({ onDone }) {
    const { items, total, clear } = useCart();
    const [form, setForm] = useState({ name: '', email: '', address: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.address) {
            setMessage('Please fill all fields');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('https://e-commerce-fullstack-backend-3xul.onrender.com/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, items, total })
            });
            const data = await res.json();
            if (res.ok) {
                clear();
                setMessage('Order placed! ID: ' + (data.order?.id || '—'));
                // stay here until user clicks Back
            } else {
                setMessage(data.error || 'Failed to place order');
            }
        } catch (err) {
            setMessage('Server error');
        } finally { setLoading(false); }
    };

    return (
        <div className="container">
            <h2>Checkout</h2>
            <form className="checkout-form" onSubmit={submit}>
                <label>Name <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
                <label>Email <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
                <label>Address <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></label>
                <div className="summary">Total: <strong>₹{total}</strong></div>
                <button type="submit" disabled={loading}>{loading ? 'Placing...' : 'Place order'}</button>
                {message && <p className="msg">{message}</p>}
            </form>

            {/* ✅ Back button */}
            <button className="back-btn" onClick={onDone} style={{ marginTop: '10px' }}>
                ⬅ Back to Shopping
            </button>
        </div>
    )
}
