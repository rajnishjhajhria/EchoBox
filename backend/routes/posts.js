const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Notification = require('../models/Notification');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vote logic
router.put('/:id/vote', async (req, res) => {
  try {
    const { userId, type } = req.body; // type: 'up' or 'down'
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ error: 'Not found' });
    
    const hasUpvoted = post.upvotedBy.includes(userId);
    const hasDownvoted = post.downvotedBy.includes(userId);

    if (type === 'up') {
      if (hasUpvoted) {
        post.upvotedBy = post.upvotedBy.filter(id => id !== userId);
      } else {
        post.upvotedBy.push(userId);
        post.downvotedBy = post.downvotedBy.filter(id => id !== userId);
      }
    } else if (type === 'down') {
      if (hasDownvoted) {
        post.downvotedBy = post.downvotedBy.filter(id => id !== userId);
      } else {
        post.downvotedBy.push(userId);
        post.upvotedBy = post.upvotedBy.filter(id => id !== userId);
      }
    }

    // Auto-Delete Logic
    if (post.downvotedBy.length >= 100) {
      await Post.findByIdAndDelete(post._id);
      await Notification.create({ 
        message: `System Action: Post "${post.content.substring(0, 30)}..." was automatically taken down for reaching 100 downvotes.` 
      });
      return res.json({ deleted: true, _id: post._id });
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Report a post
router.put('/:id/report', async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    
    if (!post.reportedBy.includes(userId)) {
      post.reportedBy.push(userId);
      await post.save();
    }
    
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add comment
router.post('/:id/comment', async (req, res) => {
  try {
    const { author, text } = req.body;
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ error: 'Not found' });
    
    post.commentList.push({ author, text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
