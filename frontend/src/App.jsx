import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Feed from './components/Feed';
import PostModal from './components/PostModal';
import Auth from './components/Auth';
import Admin from './components/Admin';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]); // Only retrieved conceptually here if we built an admin users fetch
  const [currentUser, setCurrentUser] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/auth';

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  const handleRegister = async (username, password, email) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { username, password, email });
      setCurrentUser(res.data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      setCurrentUser(res.data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || "Invalid credentials");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/auth');
  };

  const handleUpvote = async (id) => {
    if (!currentUser) return alert("You must be logged in to vote!");
    try {
      const res = await axios.put(`${API_URL}/posts/${id}/vote`, { userId: currentUser._id, type: 'up' });
      setPosts(posts.map(p => p._id === id ? res.data : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownvote = async (id) => {
    if (!currentUser) return alert("You must be logged in to vote!");
    try {
      const res = await axios.put(`${API_URL}/posts/${id}/vote`, { userId: currentUser._id, type: 'down' });
      if (res.data.deleted) {
        setPosts(posts.filter(p => p._id !== id));
      } else {
        setPosts(posts.map(p => p._id === id ? res.data : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReport = async (id) => {
    if (!currentUser) return alert("You must be logged in to report!");
    try {
      const res = await axios.put(`${API_URL}/posts/${id}/report`, { userId: currentUser._id });
      setPosts(posts.map(p => p._id === id ? res.data : p));
      alert("Post reported to administrators.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (postId, text) => {
    if (!currentUser) return alert("You must be logged in to comment!");
    try {
      const res = await axios.post(`${API_URL}/posts/${postId}/comment`, { author: currentUser.username, text });
      setPosts(posts.map(p => p._id === postId ? res.data : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPost = async (newPost) => {
    try {
      const res = await axios.post(`${API_URL}/posts`, newPost);
      setPosts([res.data, ...posts]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      setPosts(posts.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All Posts" || post.tag === selectedCategory;
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isAuthPage) {
    return <Auth onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="app-container">
      <Sidebar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory}
        openModal={() => setIsModalOpen(true)}
        currentUser={currentUser}
      />
      <div className="main-content">
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        
        <Routes>
          <Route path="/" element={
            <Feed 
              posts={filteredPosts} 
              onUpvote={handleUpvote} 
              onDownvote={handleDownvote}
              onReport={handleReport}
              onAddComment={handleAddComment}
              currentUser={currentUser} 
            />
          } />
          
          <Route path="/admin" element={
            currentUser && currentUser.isAdmin ? (
              <Admin posts={filteredPosts} users={users} onDeletePost={handleDeletePost} />
            ) : (
              <Navigate to="/" />
            )
          } />
        </Routes>
      </div>
      
      {isModalOpen && (
        <PostModal 
          closeModal={() => setIsModalOpen(false)} 
          addPost={handleAddPost} 
        />
      )}
    </div>
  )
}

export default App;
