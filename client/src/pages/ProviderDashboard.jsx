import { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import './Dashboard.css';

function ProviderDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(err => {
        console.error('Error loading provider dashboard:', err);
        toast.error('Failed to load user info');
      });
  }, []);

  if (!user) return <p>Loading your dashboard...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <h2>Welcome, {user.name} 👋</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p>This is your provider dashboard. Soon you'll be able to manage your services here.</p>
      </div>
    </div>
  );
}

export default ProviderDashboard;
