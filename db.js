// db.js
const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "test",
    database: 'vuln_app'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection;
