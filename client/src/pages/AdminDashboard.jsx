import { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import './Dashboard.css';

function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchServices();
    fetchProviders();
    fetchBookings();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get('/admin/services');
      setServices(res.data);
    } catch {
      toast.error('Failed to load services');
    }
  };

  const fetchProviders = async () => {
    try {
      const res = await api.get('/admin/providers');
      setProviders(res.data);
    } catch {
      toast.error('Failed to load providers');
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get('/admin/bookings');
      setBookings(res.data);
    } catch {
      toast.error('Failed to load bookings');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/admin/services/${id}/status`, { status });
      toast.success(`Service ${status}`);
      fetchServices();
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <h2>Admin Panel</h2>

        {/* SERVICES */}
        <section>
          <h3>Service Approval</h3>
          {services.length === 0 ? <p>No services found.</p> : (
            services.map(service => (
              <div key={service._id} className="card">
                <h4>{service.name}</h4>
                <p><strong>Provider:</strong> {service.providerId?.name} ({service.providerId?.email})</p>
                <p><strong>Status:</strong> {service.status}</p>
                <p>{service.description}</p>
                <div className="card-actions">
                  {service.status === 'pending' && (
                    <>
                      <button onClick={() => handleStatusChange(service._id, 'approved')}>Approve</button>
                      <button onClick={() => handleStatusChange(service._id, 'rejected')}>Reject</button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </section>

        <hr />

        {/* PROVIDERS */}
        <section>
          <h3>Registered Providers</h3>
          {providers.length === 0 ? <p>No providers found.</p> : (
            <ul>
              {providers.map(p => (
                <li key={p._id}>{p.name} ({p.email})</li>
              ))}
            </ul>
          )}
        </section>

        <hr />

        {/* BOOKINGS */}
        <section>
          <h3>All Bookings</h3>
          {bookings.length === 0 ? <p>No bookings found.</p> : (
            bookings.map(b => (
              <div key={b._id} className="card">
                <h4>{b.serviceId?.name}</h4>
                <p><strong>User:</strong> {b.userId?.name} ({b.userId?.email})</p>
                <p><strong>Provider:</strong> {b.serviceId?.providerId?.name}</p>
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Time:</strong> {b.time}</p>
                <p><strong>Status:</strong> {b.status}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
