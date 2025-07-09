import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  const decoded = JSON.parse(atob(token.split('.')[1]));

  // For Admin-only route
  if (window.location.pathname.startsWith('/dashboard/admin') && decoded.role !== 'admin') {
    return <Navigate to="/admin" />;
  }

  return children;
}
export default PrivateRoute;
