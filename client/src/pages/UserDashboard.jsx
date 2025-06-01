import { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import './Dashboard.css';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    fetchBookings();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch (err) {
      console.error('Error loading user info:', err);
      toast.error('Failed to load user info');
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/me');
      setBookings(res.data);
    } catch (err) {
      toast.error('Failed to load bookings');
    }
  };

  if (!user) return <p>Loading your dashboard...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <h2>Welcome, {user.name} 👋</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p>This is your personal user dashboard.</p>

        <hr style={{ margin: '1.5rem 0' }} />

        <h3>Your Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <h4>{booking.serviceId?.name || 'Service deleted'}</h4>
              <p><strong>Provider:</strong> {booking.serviceId?.providerId?.name || 'Unknown'}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Notes:</strong> {booking.notes || '—'}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  style={{
                    color:
                      booking.status === 'approved'
                        ? 'green'
                        : booking.status === 'rejected'
                        ? 'red'
                        : '#555',
                    fontWeight: 'bold',
                  }}
                >
                  {booking.status.toUpperCase()}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
