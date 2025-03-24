const express = require('express');
const app = express();
const dbOperations = require('./database');

// Middleware for parsing JSON bodies
app.use(express.json());

// Error handling middleware
const errorHandler = (err, req, res) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
};

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await dbOperations.getAllProducts();
        res.json(products);
    } catch (err) {
        errorHandler(err, res);
    }
});

// GET single product
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await dbOperations.getProductById(parseInt(req.params.id));
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        errorHandler(err, res);
    }
});

// POST new product
app.post('/api/products', async (req, res) => {
    try {
        const { name, price, category, stock } = req.body;
        if (!name || !price || !category || !stock) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const product = await dbOperations.createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        errorHandler(err, res);
    }
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await dbOperations.getProductById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const updatedProduct = await dbOperations.updateProduct(id, {
            name: req.body.name || product.name,
            price: req.body.price || product.price,
            category: req.body.category || product.category,
            stock: req.body.stock || product.stock
        });
        res.json(updatedProduct);
    } catch (err) {
        errorHandler(err, res);
    }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await dbOperations.getProductById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await dbOperations.deleteProduct(id);
        res.status(204).send();
    } catch (err) {
        errorHandler(err, res);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    errorHandler(err, req, res);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});