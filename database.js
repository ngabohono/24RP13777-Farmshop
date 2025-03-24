const { Pool } = require('pg');

// Create a new database pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
    initializeDatabase();
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Initialize database tables
async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                category TEXT NOT NULL,
                stock INTEGER NOT NULL
            )
        `);
        console.log('Products table initialized');
    } catch (err) {
        console.error('Error creating products table:', err);
    }
}

// Database operations
const dbOperations = {
    getAllProducts: async () => {
        const result = await pool.query('SELECT * FROM products');
        return result.rows;
    },

    getProductById: async (id) => {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    },

    createProduct: async (product) => {
        const { name, price, category, stock } = product;
        const result = await pool.query(
            'INSERT INTO products (name, price, category, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, category, stock]
        );
        return result.rows[0];
    },

    updateProduct: async (id, product) => {
        const { name, price, category, stock } = product;
        const result = await pool.query(
            'UPDATE products SET name = $1, price = $2, category = $3, stock = $4 WHERE id = $5 RETURNING *',
            [name, price, category, stock, id]
        );
        return result.rows[0];
    },

    deleteProduct: async (id) => {
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
    }
};

module.exports = dbOperations;