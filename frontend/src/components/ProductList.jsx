import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './styles/product.css';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [q, setQ] = useState('');

    useEffect(() => {
        // try backend first
        fetch('http://localhost:4000/api/products')
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(data => setProducts(data))
            .catch(() => {
                import('../data/products').then(mod => setProducts(mod.PRODUCTS));
            });
    }, []);

    const filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()));

    return (
        <div className="container">
            <div className="search-row">
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products..." />
            </div>
            <div className="product-grid">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
}
