const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true }
}, { timestamps: true });

const PostSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  content: { type: String, required: true },
  upvotedBy: [{ type: String }],
  downvotedBy: [{ type: String }],
  commentList: [CommentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
