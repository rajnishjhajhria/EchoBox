import { useState } from 'react';
import './Feed.css';

export default function Feed({ posts, onUpvote, onDownvote, onReport, onAddComment, currentUser }) {
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [commentText, setCommentText] = useState("");

  const toggleComments = (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
      setCommentText("");
    }
  };

  const submitComment = (e, postId) => {
    e.preventDefault();
    if(commentText.trim()) {
      onAddComment(postId, commentText);
      setCommentText("");
    }
  };

  return (
    <main className="feed-container">
      <div className="feed-content">
        
        {/* Weekly Highlight Card */}
        <div className="highlight-card">
          <div className="highlight-badge">⭐️ WEEKLY HIGHLIGHT</div>
          <h2>Your voice shaped the new campus cafe hours</h2>
          <p>
            We've heard your requests! After overwhelming feedback through EchoBox, 
            the campus cafe will now remain open until 2 AM to support your late-night study sessions.
          </p>
        </div>

        {/* Feedback Posts */}
        <div className="posts-list">
          {posts.length === 0 ? (
            <div className="empty-state">No feedback found. Try adjusting your filters.</div>
          ) : (
            posts.map(post => {
              const hasUpvoted = currentUser ? post.upvotedBy.includes(currentUser._id) : false;
              const hasDownvoted = currentUser ? post.downvotedBy.includes(currentUser._id) : false;
              const isExpanded = expandedPostId === post._id;
              const comments = post.commentList || [];

              return (
              <article key={post._id} className="post-card">
                <div className="post-tag">{post.tag}</div>
                <p className="post-content">{post.content}</p>
                
                <div className="post-metrics">
                  <button 
                    className={`metric ${hasUpvoted ? 'active-vote' : ''}`} 
                    onClick={() => onUpvote(post._id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={hasUpvoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    {post.upvotedBy.length}
                  </button>
                  <button 
                    className={`metric ${hasDownvoted ? 'active-vote' : ''}`} 
                    onClick={() => onDownvote(post._id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={hasDownvoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2"></path>
                    </svg>
                    {post.downvotedBy.length}
                  </button>
                  <button className="metric" onClick={() => toggleComments(post._id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    {comments.length} Comments
                  </button>
                  <button className="metric" onClick={() => onReport(post._id)} title="Report Post">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                      <line x1="4" y1="22" x2="4" y2="15"></line>
                    </svg>
                    Report
                  </button>
                </div>
                
                {isExpanded && (
                  <div className="comments-section">
                    {comments.length === 0 ? (
                      <div className="no-comments">No comments yet. Be the first to share your thoughts!</div>
                    ) : (
                      comments.map(c => (
                        <div key={c._id || c.id} className="comment-item">
                          <span className="comment-author">@{c.author}</span>
                          <span className="comment-text">{c.text}</span>
                        </div>
                      ))
                    )}
                    
                    <form className="comment-input-container" onSubmit={(e) => submitComment(e, post._id)}>
                      <input 
                        type="text" 
                        className="comment-input" 
                        placeholder={currentUser ? "Write a comment..." : "Login to join the discussion"}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        disabled={!currentUser}
                      />
                      <button type="submit" className="comment-submit" disabled={!currentUser || !commentText.trim()}>Post</button>
                    </form>
                  </div>
                )}
                
              </article>
            )})
          )}
        </div>
      </div>
    </main>
  );
}
