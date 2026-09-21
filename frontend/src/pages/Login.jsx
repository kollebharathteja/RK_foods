import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    
    // Hardcoded admin credentials (in production, this should be handled by backend)
    if (email === 'bharathteja9192@gmail.com' && password === 'Kollebh@r@th9192') {
      // Store authentication status
      localStorage.setItem('isAdminAuthenticated', 'true');
      localStorage.setItem('adminEmail', email);
      console.log('Login successful, navigating to admin');
      navigate('/admin');
    } else {
      console.log('Invalid credentials');
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <p className="login-subtitle">RK Foods Administration</p>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        
        <p className="login-note">
          🔒 Secure admin access for RK Foods management
        </p>
      </div>
    </div>
  );
}

export default Login;