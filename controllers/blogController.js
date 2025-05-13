const Blog = require('../models/BlogModel');
const User = require('../models/UserModel');

// Create a new blog
const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newBlog = await Blog.create({
            title,
            content,
            authorId: req.user.id,
            status: 'Draft'
        });

        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: {
                model: User,
                as: 'author',
                attributes: ['username', 'email']
            }
        });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByPk(id, {
            include: {
                model: User,
                as: 'author',
                attributes: ['username', 'email']
            }
        });

        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog', error });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, status } = req.body;

        const blog = await Blog.findByPk(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.status = status || blog.status;

        await blog.save();
        res.json({ message: 'Blog updated successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog', error });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByPk(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        await blog.destroy();
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};







