import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

function Navbar() {
  const { token, logout } = useAuth();
  const navigate=useNavigate();
  const { dark, toggleTheme } = useTheme();
  const handleclick=()=>{
    navigate('/');
  };
  return (
    <nav className="navbar">
      <img style={{cursor:'pointer'}}
      onClick={handleclick}
      alt="Navbar"
      src='https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_108,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1687285683825-e6cf23.jpeg'/>
      {/* <h1>Urban Company</h1> */}
      <div className="links">
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
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
