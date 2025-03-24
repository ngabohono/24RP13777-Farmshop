const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database instance
const db = new sqlite3.Database(path.join(__dirname, 'farmshop.db'), (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            category TEXT NOT NULL,
            stock INTEGER NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Error creating products table:', err);
        } else {
            console.log('Products table initialized');
        }
    });
}

// Database operations
const dbOperations = {
    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM products', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    createProduct: (product) => {
        return new Promise((resolve, reject) => {
            const { name, price, category, stock } = product;
            db.run(
                'INSERT INTO products (name, price, category, stock) VALUES (?, ?, ?, ?)',
                [name, price, category, stock],
                function(err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, ...product });
                }
            );
        });
    },

    updateProduct: (id, product) => {
        return new Promise((resolve, reject) => {
            const { name, price, category, stock } = product;
            db.run(
                'UPDATE products SET name = ?, price = ?, category = ?, stock = ? WHERE id = ?',
                [name, price, category, stock, id],
                (err) => {
                    if (err) reject(err);
                    resolve({ id, ...product });
                }
            );
        });
    },

    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM products WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
};

module.exports = dbOperations;