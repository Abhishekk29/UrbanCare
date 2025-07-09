import { useEffect, useState } from 'react';
import api from '../services/api';
import './Dashboard.css';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [svcRes, provRes, bookRes] = await Promise.all([
        api.get('/admin/services'),
        api.get('/admin/providers'),
        api.get('/admin/bookings')
      ]);
      setServices(svcRes.data);
      setProviders(provRes.data);
      setBookings(bookRes.data);
    } catch (err) {
      console.error('Admin fetchData error:', err.response || err);
      toast.error('Failed to load admin data');
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.patch(`/admin/services/${id}/approve`);
      toast.success('Service approved');
      fetchData();
    } catch {
      toast.error('Approval failed');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.patch(`/admin/services/${id}/reject`);
      toast.success('Service rejected');
      fetchData();
    } catch (err) {
      toast.error('Rejection failed');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <h2>Welcome Admin 👨‍💼</h2>

        <h3>Pending Services</h3>
        {services.filter(s => !s.approved && !s.rejected).map(service => (
          <div className="card" key={service._id}>
            <h4>{service.name}</h4>
            <p>{service.description}</p>
            <p><b>Provider:</b> {service.providerId?.name} ({service.providerId?.email})</p>
            <button onClick={() => handleApprove(service._id)}>Approve</button>
            <button
              onClick={() => handleReject(service._id)}
              style={{ marginLeft: '0.5rem', backgroundColor: 'crimson', color: 'white' }}
            >
              Reject
            </button>
          </div>
        ))}

        <h3>All Providers</h3>
<table className="admin-providers-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    {providers.map(p => (
      <tr key={p._id}>
        <td>{p.name}</td>
        <td>{p.email}</td>
      </tr>
    ))}
  </tbody>
</table>


        <h3>All Bookings</h3>
        <table className="admin-bookings-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Provider</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.userId?.name}</td>
                <td>{b.serviceId?.name}</td>
                <td>{b.serviceId?.providerId?.name}</td>
                <td>{b.serviceId?.location}</td>
                <td><b>{b.status}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
