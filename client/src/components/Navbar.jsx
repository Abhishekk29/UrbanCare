import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();

  // ✅ Decode role from JWT token
  let role = null;
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      role = decoded.role;
    } catch (err) {
      console.error('Invalid token');
    }
  }

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <img
        style={{ cursor: 'pointer', height: '130px', objectFit: 'contain'  }}
        onClick={handleLogoClick}
        alt="Logo"
        src="./UrbanCare_Logo (1).png"
      />

      <div className="links">
        <Link to="/">Home</Link>

        {token ? (
          <>
            {role === 'user' && (
              <Link to="/dashboard/user">Dashboard</Link>
            )}
            {role === 'provider' && (
              <Link to="/dashboard/provider">Dashboard</Link>
            )}
            {role === 'admin' && (
  <Link to="/dashboard/admin">Dashboard</Link>
            )}

            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
             <Link to="/admin">Admin</Link>
          </>
        )}


        <button className="theme-toggle" onClick={toggleTheme}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
