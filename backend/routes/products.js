const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(__dirname, '..', 'data', 'products.json');

function readProducts() {
  const raw = fs.readFileSync(DATA_PATH);
  return JSON.parse(raw);
}

// GET all products (with optional search & category filter)
router.get('/', (req, res) => {
  const products = readProducts();
  const q = (req.query.q || '').toLowerCase();
  const category = req.query.category;

  let filtered = products.filter(p => {
    if (q && !(p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))) return false;
    if (category && p.category.toLowerCase() !== category.toLowerCase()) return false;
    return true;
  });

  res.json(filtered);
});

// GET single product by id
router.get('/:id', (req, res) => {
  const products = readProducts();
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);

  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

module.exports = router;
