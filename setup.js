// Import database connection
const connection = require('./db');

// Function to drop users table if it exists
const dropUsersTable = () => {
    const query = `DROP TABLE IF EXISTS users`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error dropping users table:', err);
        } else {
            console.log('Users table dropped successfully.');
            createUsersTable();  // Recreate the table after it's dropped
        }
    });
};

// Function to create users table
const createUsersTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,  -- Store hashed password
            role ENUM('user', 'admin') NOT NULL DEFAULT 'user'  -- Add the role field
        )`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table created successfully.');
            insertSampleUsers();  // Insert sample users after table is created
        }
    });
};

// Function to insert sample users
const insertSampleUsers = () => {
    const query = `
        INSERT INTO users (username, password, role) VALUES
        ('admin', 'admin123', 'admin'),
        ('user', 'user123', 'user')
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error inserting sample users:', err);
        } else {
            console.log('Sample users inserted successfully.');
        }
    });
};

// Function to create products table
const createProductsTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10, 2) NOT NULL
        )`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error creating products table:', err);
        } else {
            console.log('Products table created successfully.');
            insertSampleProducts();
        }
    });
};

// Function to insert sample products
const insertSampleProducts = () => {
    const query = `
        INSERT INTO products (name, description, price) VALUES
        ('Laptop', 'A high-end gaming laptop', 1200.50),
        ('Smartphone', 'A latest-gen smartphone', 799.99),
        ('Headphones', 'Noise-cancelling headphones', 199.99),
        ('Tablet', 'A tablet with a 10-inch display', 299.99)
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error inserting sample products:', err);
        } else {
            console.log('Sample products inserted successfully.');
        }
    });
};

// Function to run all setup tasks
const runSetup = () => {
    dropUsersTable();  // First drop the table
    createProductsTable();  // Create products table after dropping users
};

// Execute the setup script
runSetup();
