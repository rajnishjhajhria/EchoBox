import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header({ searchQuery, setSearchQuery, currentUser, onLogout }) {
  const location = useLocation();

  return (
    <header className="main-header">
      <div className="header-tabs">
        <Link to="/" className={`tab ${location.pathname === '/' ? 'active' : ''}`}>Feed</Link>
        {currentUser?.isAdmin && (
          <Link to="/admin" className={`tab ${location.pathname === '/admin' ? 'active' : ''}`}>Admin</Link>
        )}
      </div>
      
      <div className="header-actions">
        {location.pathname === '/' && (
          <div className="search-bar">
            <span className="search-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search archive..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        
        {currentUser ? (
          <div className="user-profile">
            <span className="username">@{currentUser.username}</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/auth" className="login-link">Login</Link>
        )}
      </div>
    </header>
  );
}
