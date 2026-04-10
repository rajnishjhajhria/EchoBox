import './Sidebar.css';

export default function Sidebar({ selectedCategory, setSelectedCategory, openModal, currentUser }) {
  const categories = ["All Posts", "Teacher", "Event", "Facility", "Student Life"];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">EchoBox</h1>
      </div>
      
      {currentUser ? (
        <button className="post-btn" onClick={openModal}>+ Post Feedback</button>
      ) : (
        <div className="login-prompt">Login to post feedback</div>
      )}
      
      <nav className="category-nav">
        <h3 className="nav-title">CATEGORIES</h3>
        <ul>
          {categories.map(cat => (
            <li 
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="anonymity-shield">
        <div className="shield-icon">🛡️</div>
        <h4>ANONYMITY SHIELD ACTIVE</h4>
        <p>Your identity is encrypted and kept entirely safe from public view.</p>
      </div>
    </aside>
  );
}
