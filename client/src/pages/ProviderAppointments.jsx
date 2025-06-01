import { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import './Dashboard.css';

function ProviderAppointments() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/bookings/appointments');
      setBookings(res.data);
    } catch (err) {
      toast.error('Failed to load appointments');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status`, { status });
      toast.success(`Booking ${status}`);
      fetchAppointments(); // Refresh list
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <h2>Your Appointments</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <h4>{booking.serviceId?.name}</h4>
              <p><strong>User:</strong> {booking.userId?.name} ({booking.userId?.email})</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Notes:</strong> {booking.notes || '—'}</p>
              <p><strong>Status:</strong> {booking.status.toUpperCase()}</p>

              {booking.status === 'pending' && (
                <div className="booking-actions">
                  <button onClick={() => handleStatusUpdate(booking._id, 'approved')}>Approve</button>
                  <button onClick={() => handleStatusUpdate(booking._id, 'rejected')}>Reject</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProviderAppointments;
