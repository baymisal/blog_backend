const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RoleBlog = require("../models/RoleModel");
const User = require("../models/UserModel");
require("dotenv").config();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register user
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

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,  // save hashed password!
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

// Login user
const loginUser = async (req, res) => {
  try {
    console.log("Login attempt received with data:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: RoleBlog,
    });

    if (!user) {
      console.log("User not found with email:", email);
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id, user.RoleBlog.roleName);

    console.log("Login success for user:", email);
    res.json({ token, role: user.RoleBlog.roleName });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };




