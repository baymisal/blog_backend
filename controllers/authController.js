const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  RoleBlog  = require("../models/RoleModel");
const  User  = require("../models/UserModel");
require("dotenv").config();

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//regiter user

const registerUser = async (req, res) => {
  try {
      const { username, email, password, role } = req.body;

      const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();


      
      const roleData = await RoleBlog.findOne({ where: { roleName: formattedRole } });

      if (!roleData) {
        return res.status(400).json({ message: "Invalid role. Use 'Admin', 'Author', or 'Guest'." });

    }

      const userExists = await User.findOne({ where: { email } });
      if (userExists) return res.status(400).json({ message: "User already exists" });


      const user = await User.create({
          username,
          email,
          password,
          roleId: roleData.id  
      });

      res.status(201).json({
          _id: user.id,
          username: user.username,
          email: user.email,
          role: roleData.roleName,  
          token: generateToken(user.id, roleData.roleName),
      });
  } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

     
        const user = await User.findOne({
            where: { email },
            include: RoleBlog, 
        });

        if (!user) return res.status(400).json({ message: "User not found" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token with role
        const token = generateToken(user.id, user.RoleBlog.roleName);

        // Send response with token and role
        res.json({ token, role: user.RoleBlog.roleName });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { registerUser, loginUser };



