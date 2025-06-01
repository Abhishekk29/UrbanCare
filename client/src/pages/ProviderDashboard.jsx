import { useEffect, useState } from 'react';
import api from '../services/api';
import ServiceForm from '../components/ServiceForm';
import { toast } from 'react-toastify';
import './Dashboard.css';
import EditServiceForm from '../components/EditServiceForm';

function ProviderDashboard() {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user && user._id) {
      fetchMyServices(user._id);
    }
  }, [user]);

const [editing, setEditing] = useState(null); // stores the service being edited

  const loadUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch (err) {
      console.error('Error loading provider dashboard:', err);
      toast.error('Failed to load user info');
    }
  };

  const fetchMyServices = async (providerId) => {
    try {
      const res = await api.get('/services');
      const filtered = res.data.filter(s => s.providerId?._id === user._id);
      setServices(filtered);
    } catch (err) {
      toast.error('Failed to load services');
    }
  };

  const handleDelete = async (id) => {
  if (window.confirm('Delete this service?')) {
    try {
      await api.delete(`/services/${id}`);
      toast.success('Service deleted');
      fetchMyServices(user._id);
    } catch (err) {
      toast.error('Deletion failed');
    }
  }
};


  if (!user) return <p>Loading your dashboard...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <h2>Welcome, {user.name} 👋</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <hr style={{ margin: '1rem 0' }} />

        <ServiceForm onCreated={() => fetchMyServices(user._id)} />

        <h3>Your Services</h3>
        <div className="service-list">
          {services.length > 0 ? (
            services.map(service => (
              <div className="card" key={service._id}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p><strong>Location:</strong> {service.location}</p>
                <p><strong>Price:</strong> ₹{service.price}</p>
                 <div className="card-actions">
      <button onClick={() => setEditing(service)}>Edit</button>
      <button onClick={() => handleDelete(service._id)}>Delete</button>
    </div>
              </div>
            ))
          ) : (
            <p>You haven't added any services yet.</p>
          )}
        </div>
      </div>
      {editing && (
      <EditServiceForm
        service={editing}
        onClose={() => setEditing(null)}
        onUpdated={() => fetchMyServices(user._id)}
      />
    )}
    </div>
  );
}

export default ProviderDashboard;
