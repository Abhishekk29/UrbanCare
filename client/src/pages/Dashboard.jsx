import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const mockBookings = [
  {
    id: 'b001',
    service: 'Plumber',
    date: '2025-05-10',
    status: 'Completed',
    price: 500
  },
  {
    id: 'b002',
    service: 'Electrician',
    date: '2025-05-14',
    status: 'Scheduled',
    price: 400
  }
];

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.email}</h2>
      <button className="logout-btn" onClick={logout}>Logout</button>

      <h3>Your Bookings</h3>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {mockBookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.service}</td>
              <td>{booking.date}</td>
              <td>{booking.status}</td>
              <td>₹{booking.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
