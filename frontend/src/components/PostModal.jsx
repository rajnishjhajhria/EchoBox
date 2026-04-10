import { useState } from 'react';
import './PostModal.css';

export default function PostModal({ closeModal, addPost }) {
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Student Life');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === '') return;
    addPost({ content, tag });
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>×</button>
        <h2>Share Your Feedback</h2>
        <p className="modal-subtitle">Your identity remains encrypted and completely anonymous.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category</label>
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value="Teacher">Teacher</option>
              <option value="Event">Event</option>
              <option value="Facility">Facility</option>
              <option value="Student Life">Student Life</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Your Feedback</label>
            <textarea 
              placeholder="What's on your mind? Be descriptive to help the community understand your concern or suggestion."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
            <button type="submit" className="submit-btn" disabled={!content.trim()}>Post Anonymously</button>
          </div>
        </form>
      </div>
    </div>
  );
}
