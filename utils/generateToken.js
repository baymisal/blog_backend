const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },  //  Include role in the token
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

module.exports = generateToken;
