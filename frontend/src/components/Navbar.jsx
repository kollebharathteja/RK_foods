import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminEmail');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          RK Foods
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="nav-link">Admin</Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Admin Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;