// Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <img
        src="/UrbanCare.png"
        alt="Logo"
        className="logo"
        onClick={handleLogoClick}
      />

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <Menu />
      </div>

      <div className={`links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        {token ? (
          <>
            {role === 'user' && (
              <Link to="/dashboard/user" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            )}
            {role === 'provider' && (
              <Link to="/dashboard/provider" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            )}
            {role === 'admin' && (
              <Link to="/dashboard/admin" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
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
