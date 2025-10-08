import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { useCart } from './context/CartContext';

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const cart = useCart();

  return (
    <>
      <Header onShowCart={() => setShowCart(true)} />
      <main style={{ paddingTop: 20 }}>
        {!checkout ? (
          <ProductList />
        ) : (
          <Checkout onDone={() => setCheckout(false)} />
        )}
      </main>

      {showCart && (
        <Cart
          onClose={() => setShowCart(false)}
          onCheckout={() => {
            setShowCart(false);
            setCheckout(true);
          }}
        />
      )}
    </>
  );
}