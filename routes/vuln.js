// routes/vuln.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../db'); // Assume we have a db setup


router.get('/products', (req, res) => {
    const query = "SELECT * FROM products";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching products');
        }
        res.json(results);
    });
});

// Vulnerable: Price Manipulation (Server-Client Side Security)
router.post('/purchase', (req, res) => {
    const { productId, price } = req.body;
    const query = `INSERT INTO purchases (product_id, price) VALUES ('${productId}', '${price}')`;

    db.query(query, (err, result) => {
        if (err) return res.status(500).send('Database error');
        res.send('Purchase completed!');
    });
});

router.get('/purchases', (req, res) => {
    const query = "SELECT * FROM purchases";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching purchases');
        }
        res.json(results);
    });
});

// Vulnerable: SQL Injection
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    db.query(query, (err, result) => {
        if (err) return res.status(500).send('Database error');
        if (result.length > 0) {
            res.send('Login successful!');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Vulnerable: Weak JWT and Improper Authentication
router.post('/auth', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ username: 'admin', role: 'admin' }, '12345', { algorithm: 'HS256' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Vulnerable: Authorization Bypass
router.get('/admin', (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, '12345');  // Vulnerable: Weak JWT secret
    console.log(decoded);
    if (decoded.role === 'admin') {
        res.send('Welcome to the admin panel!' + decoded.username);
    } else {
        res.status(403).send('Access denied');
    }
});

// Vulnerable: No Rate Limiting on Login Attempts
router.post('/login-nolimit', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    db.query(query, (err, result) => {
        if (err) return res.status(500).send('Database error');
        if (result.length > 0) {
            res.send('Login successful!');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Vulnerable: Exposing .env and No Security Headers
router.get('/config', (req, res) => {
    res.json({
        databasePassword: process.env.DB_PASS,  // Sensitive data exposure
        adminSecret: process.env.ADMIN_SECRET
    });
});

// Vulnerable: Password
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;

    db.query(query, (err, result) => {
        if (err) return res.status(500).send('Database error');
        res.send('User registered successfully!');
    });
});

module.exports = router;
