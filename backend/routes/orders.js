const express = require('express');
const router = express.Router();

let orders = []; // in-memory store

// POST create order
router.post('/', (req, res) => {
  const { name, email, address, items, total } = req.body;

  if (!name || !email || !items || items.length === 0) {
    return res.status(400).json({ error: 'Invalid order body' });
  }

  const order = {
    id: 'o' + (orders.length + 1),
    name,
    email,
    address,
    items,
    total,
    createdAt: new Date()
  };

  orders.push(order);
  res.status(201).json({ message: 'Order placed', order });
});

// GET all orders
router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;
