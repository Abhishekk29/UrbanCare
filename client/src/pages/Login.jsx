import { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await api.post('/auth/login', { email, password });
    const token = res.data.token;

    // ✅ Decode token BEFORE calling login()
    let role = null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      role = payload.role;

      if (role === 'admin') {
        toast.error('Admins must log in from the Admin page.');
        return;
      }
    } catch (err) {
      console.error('Invalid token decode:', err);
      toast.error('Invalid token');
      return;
    }

    login(token);
    toast.success('Login successful');

    // Redirect based on role
    if (role === 'provider') {
      navigate('/dashboard/provider');
    } else if (role === 'user') {
      navigate('/dashboard/user');
    } else {
      toast.error('Unknown role');
    }

  } catch (err) {
    console.error('Login error:', err);
    toast.error(err.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>

        <h2><LogIn size={22} strokeWidth={3} /> Login </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
