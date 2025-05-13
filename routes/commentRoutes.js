const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

router.post('/add', async (req, res) => {
  try {
    const { text, userId, blogId } = req.body;
    const comment = await Comment.create({ text, userId, blogId });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
});

router.get('/blog/:blogId', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { blogId: req.params.blogId },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
});
// deletion

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.destroy({ where: { id } }); // or use mongoose: Comment.findByIdAndDelete(id)
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});


module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { Comment, Blog, User } = require('../models');
// const authenticate = require('../middleware/authMiddleware');

// // Create comment (logged-in users)
// router.post('/:blogId', authenticate, async (req, res) => {
//   const { blogId } = req.params;
//   const { text } = req.body;

//   try {
//     const comment = await Comment.create({
//       text,
//       blogId,
//       userId: req.user.id,
//     });

//     res.status(201).json(comment);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add comment' });
//   }
// });

// // Get comments for a blog
// router.get('/:blogId', async (req, res) => {
//   try {
//     const comments = await Comment.findAll({
//       where: { blogId: req.params.blogId },
//       include: [{ model: User, attributes: ['username'] }],
//       order: [['createdAt', 'DESC']],
//     });

//     res.json(comments);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch comments' });
//   }
// });

// // Delete a comment
// router.delete('/:commentId', authenticate, async (req, res) => {
//   const { commentId } = req.params;

//   try {
//     const comment = await Comment.findByPk(commentId);
//     if (!comment) return res.status(404).json({ error: 'Comment not found' });

//     if (comment.userId !== req.user.id) {
//       return res.status(403).json({ error: 'Not authorized to delete this comment' });
//     }

//     await comment.destroy();
//     res.json({ message: 'Comment deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Error deleting comment' });
//   }
// });

// module.exports = router;

