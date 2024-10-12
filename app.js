const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const vulnRoutes = require('./routes/vuln');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Allow CORS for all origins and all methods
app.use(cors({
    origin: '*',  // Allow requests from any origin
    methods: '*',  // Allow all HTTP methods
    allowedHeaders: '*',  // Allow all headers
    credentials: true  // Allow credentials (e.g., cookies)
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the vulnerability routes
app.use('/vuln', vulnRoutes);

// Serve index.html on the root route "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
