const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/api/products', async (req, res) => {
  try {
    const { category, search } = req.query;

    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

router.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
});

router.post('/api/products', async (req, res) => {
  try {
    const { name, category, price, oldPrice, rating, tag, color, description, stock, isFeatured } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Name, category, and price are required' });
    }

    const newProduct = await Product.create({
      name,
      category,
      price,
      oldPrice: oldPrice || price,
      rating: rating || 4.5,
      tag: tag || 'New',
      color: color || 'sand',
      description: description || '',
      stock: stock || 0,
      isFeatured: isFeatured || false,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
});

module.exports = router;
