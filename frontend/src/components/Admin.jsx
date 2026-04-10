import './Admin.css';

export default function Admin({ posts, users, onDeletePost }) {
  const totalPosts = posts.length;
  const totalUsers = users.length;
  
  // Calculate most active category
  const categoryCounts = posts.reduce((acc, post) => {
    acc[post.tag] = (acc[post.tag] || 0) + 1;
    return acc;
  }, {});
  
  let mostActiveCategory = "None";
  let maxCount = 0;
  for (const [cat, count] of Object.entries(categoryCounts)) {
    if (count > maxCount) {
      mostActiveCategory = cat;
      maxCount = count;
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Monitor platform activity and manage feedback.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="stat-value">{totalUsers}</div>
        </div>
        <div className="stat-card">
          <h3>Total Feedback</h3>
          <div className="stat-value">{totalPosts}</div>
        </div>
        <div className="stat-card">
          <h3>Most Active Category</h3>
          <div className="stat-value">{mostActiveCategory}</div>
        </div>
      </div>

      <div className="posts-management">
        <h3>Manage Feedback</h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Content Preview</th>
                <th>Engagements</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id}>
                  <td>#{post._id.toString().slice(-4)}</td>
                  <td><span className="mini-tag">{post.tag}</span></td>
                  <td className="table-content-preview">
                    {post.content.length > 60 ? post.content.substring(0, 60) + '...' : post.content}
                  </td>
                  <td>👍 {post.upvotedBy.length} | 👎 {post.downvotedBy.length}</td>
                  <td>
                    <button className="delete-btn" onClick={() => onDeletePost(post._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No feedback available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
