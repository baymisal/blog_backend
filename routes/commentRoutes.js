const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); 

// Add comment
router.post('/add', async (req, res) => {
  try {
    console.log('📥 Incoming comment data:', req.body);
    
    let { text, userId, blogId } = req.body;

    // Ensure correct types
    userId = parseInt(userId);
    blogId = parseInt(blogId);

    console.log(' Creating comment with:', { text, userId, blogId });

    const comment = await Comment.create({ text, userId, blogId });
    console.log('Comment created:', comment);

    res.status(201).json(comment);
  } catch (err) {
    console.error('Error in /add route:', err);
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
});

// Get comments by blogId
router.get('/blog/:blogId', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { blogId: req.params.blogId },
    });
    res.json(comments);
  } catch (err) {
    console.error(' Error fetching comments:', err);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

// Delete comment by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.destroy({ where: { id } });
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

module.exports = router;




