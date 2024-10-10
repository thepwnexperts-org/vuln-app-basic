// app.js
const express = require('express');
const dotenv = require('dotenv');
const vulnRoutes = require('./routes/vuln');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Use the vulnerability routes
app.use('/vuln', vulnRoutes);

module.exports = app;
