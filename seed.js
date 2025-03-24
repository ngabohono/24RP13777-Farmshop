const dbOperations = require('./database');

const sampleProducts = [
    { name: 'Fresh Carrots', price: 2.99, category: 'Vegetables', stock: 100 },
    { name: 'Organic Tomatoes', price: 3.99, category: 'Vegetables', stock: 75 },
    { name: 'Farm Fresh Eggs', price: 4.99, category: 'Dairy', stock: 50 },
    { name: 'Local Honey', price: 8.99, category: 'Specialty', stock: 30 },
    { name: 'Garden Spade', price: 19.99, category: 'Tools', stock: 15 },
    { name: 'Organic Apples', price: 3.49, category: 'Fruits', stock: 80 },
    { name: 'Fresh Milk', price: 3.99, category: 'Dairy', stock: 40 },
    { name: 'Pruning Shears', price: 24.99, category: 'Tools', stock: 20 },
    { name: 'Sweet Corn', price: 0.99, category: 'Vegetables', stock: 150 },
    { name: 'Strawberries', price: 4.99, category: 'Fruits', stock: 60 }
];

async function seedDatabase() {
    try {
        for (const product of sampleProducts) {
            await dbOperations.createProduct(product);
            console.log(`Added product: ${product.name}`);
        }
        console.log('Database seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();