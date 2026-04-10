import { useState } from 'react';
import './Auth.css';

export default function Auth({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isLogin) {
      onLogin(username, password);
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address!");
        return;
      }
      onRegister(username, password, email);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="shield-icon">🛡️</div>
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="auth-subtitle">
          {isLogin ? 'Log in to continue to EchoBox' : 'Join the community securely and anonymously'}
        </p>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="your.name@university.edu"
                required={!isLogin} 
              />
            </div>
          )}
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Pick a unique alias"
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Enter your password"
              required 
            />
          </div>
          <button type="submit" className="auth-btn">
            {isLogin ? 'Sign In' : 'Join Anonymously'}
          </button>
        </form>
        
        <button className="toggle-btn" type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}
