const express = require("express");
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware"); 
const authorizeRoles = require("../middleware/authorizeRoles"); 

const router = express.Router();

router.post("/", protect, authorizeRoles("author" , "admin"), createBlog);  // ✅ Only authors can create blogs
router.get("/", getAllBlogs);  // Public (anyone can view)
router.get("/:id", getBlogById);  // Public (anyone can view)
router.put("/:id", protect, authorizeRoles("author" , "admin"), updateBlog);  // ✅ Only authors can update
router.delete("/:id", protect, authorizeRoles("author" , "admin"), deleteBlog);  // ✅ Only authors can delete

module.exports = router;

