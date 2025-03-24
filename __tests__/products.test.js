const request = require('supertest');
const express = require('express');
const app = express();
const dbOperations = require('../database');

// Mock database operations
jest.mock('../database');

// Import routes
app.use(express.json());
app.get('/api/products', async (req, res) => {
    try {
        const products = await dbOperations.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await dbOperations.createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

describe('Product API Endpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/products', () => {
        it('should return all products', async () => {
            const mockProducts = [
                { id: 1, name: 'Test Product 1', price: 10.99, category: 'Test', stock: 100 },
                { id: 2, name: 'Test Product 2', price: 20.99, category: 'Test', stock: 50 }
            ];

            dbOperations.getAllProducts.mockResolvedValue(mockProducts);

            const response = await request(app).get('/api/products');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
            expect(dbOperations.getAllProducts).toHaveBeenCalled();
        });

        it('should handle errors', async () => {
            dbOperations.getAllProducts.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/products');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Internal server error' });
        });
    });

    describe('POST /api/products', () => {
        it('should create a new product', async () => {
            const newProduct = {
                name: 'New Product',
                price: 15.99,
                category: 'Test',
                stock: 75
            };

            const createdProduct = { id: 1, ...newProduct };
            dbOperations.createProduct.mockResolvedValue(createdProduct);

            const response = await request(app)
                .post('/api/products')
                .send(newProduct);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(createdProduct);
            expect(dbOperations.createProduct).toHaveBeenCalledWith(newProduct);
        });

        it('should handle errors during product creation', async () => {
            const newProduct = {
                name: 'New Product',
                price: 15.99,
                category: 'Test',
                stock: 75
            };

            dbOperations.createProduct.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .post('/api/products')
                .send(newProduct);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Internal server error' });
        });
    });
});