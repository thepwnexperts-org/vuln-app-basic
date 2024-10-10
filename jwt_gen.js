const jwt = require('jsonwebtoken');

// Weak secret
const SECRET = '12345';  // Intentionally weak for demonstration purposes

// Function to generate JWT
function generateJWT(username, role) {
    // Create the token with weak secret
    const token = jwt.sign({ username: username, role: role }, SECRET, { algorithm: 'HS256' });
    console.log('Generated JWT:', token);
    return token;
}

// Example usage
generateJWT('admin', 'admin');

