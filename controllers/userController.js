const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

//  Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Create user with hashed password
        const newUser = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),  // Hash password
            role: role || 'Guest'  // Ensure role is stored correctly
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                token: generateToken(newUser.id, newUser.role)  // ✅ Pass role to token
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate JWT token
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id)
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { registerUser, loginUser };
