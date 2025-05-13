const express = require('express');
const router = express.Router();
const RoleBlog = require('../models/RoleModel'); 

// Add a new role
router.post('/', async (req, res) => {
    try {
        const { roleName } = req.body;
        if (!roleName) {
            return res.status(400).json({ message: 'Role name is required' });
        }

        const newRole = await RoleBlog.create({ 
            roleName, 
            createdAt: new Date(), 
            updatedAt: new Date() 
        });

        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
