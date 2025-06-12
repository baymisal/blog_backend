const express = require("express");
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

const router = express.Router();

router.post("/", protect, authorizeRoles("author", "admin"), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", protect, authorizeRoles("author", "admin"), updateBlog);
router.delete("/:id", protect, authorizeRoles("author", "admin"), deleteBlog);

module.exports = router;


