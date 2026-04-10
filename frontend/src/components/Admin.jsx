import { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

export default function Admin({ posts, users, onDeletePost }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/notifications');
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, []);

  const totalUsers = users ? users.length : 0;
  
  // Find highest category
  const categoryCounts = posts.reduce((acc, post) => {
    acc[post.tag] = (acc[post.tag] || 0) + 1;
    return acc;
  }, {});
  
  const mostActiveCategory = Object.entries(categoryCounts).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Monitor platform activity and manage feedback.</p>
      </div>
      
      <div className="admin-stats">
        <div className="stat-card">
          <h4>TOTAL USERS</h4>
          <span className="stat-value">{totalUsers}</span>
        </div>
        <div className="stat-card">
          <h4>TOTAL FEEDBACK</h4>
          <span className="stat-value">{posts.length}</span>
        </div>
        <div className="stat-card">
          <h4>MOST ACTIVE CATEGORY</h4>
          <span className="stat-value category-val">{mostActiveCategory}</span>
        </div>
      </div>

      <h2 style={{marginTop: '40px', marginBottom: '16px', fontSize: '20px', color: 'var(--text-dark)'}}>System Notifications</h2>
      <div className="notifications-list" style={{marginBottom: '40px'}}>
        {notifications.length === 0 ? (
          <p className="no-comments" style={{padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0'}}>No recent alerts from the system.</p>
        ) : (
          notifications.map(note => (
            <div key={note._id} className="notification-card" style={{padding: '16px', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', margin: '0 0 12px 0'}}>
              <span style={{fontWeight: 700, color: '#b91c1c', display: 'block'}}>{note.message}</span>
              <span style={{fontSize: '12px', color: '#991b1b', marginTop: '4px', display: 'block'}}>{new Date(note.createdAt).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>

      <h2 style={{marginBottom: '16px', fontSize: '20px', color: 'var(--text-dark)'}}>Manage Feedback</h2>
      <div className="admin-table-container">
        {posts.length === 0 ? (
          <div className="empty-state">No feedback available.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>CATEGORY</th>
                <th>CONTENT PREVIEW</th>
                <th>ENGAGEMENTS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => {
                const reportsCount = post.reportedBy ? post.reportedBy.length : 0;
                return (
                <tr key={post._id} style={{ backgroundColor: reportsCount > 0 ? '#fffbeb' : 'transparent' }}>
                  <td>#{post._id.toString().substring(post._id.toString().length - 4)}</td>
                  <td><span className="mini-tag">{post.tag}</span></td>
                  <td className="table-content-preview">
                    {reportsCount > 0 && <span style={{color: '#d97706', fontWeight: 800, marginRight: '8px'}}>[REPORTED]</span>}
                    {post.content.length > 60 ? post.content.substring(0, 60) + '...' : post.content}
                  </td>
                  <td>👍 {post.upvotedBy.length} | 👎 {post.downvotedBy.length}</td>
                  <td>
                    <button className="delete-btn" onClick={() => onDeletePost(post._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
