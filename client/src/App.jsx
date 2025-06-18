import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './pages/UserDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import { ToastContainer } from 'react-toastify';
import ProviderAppointments from './pages/ProviderAppointments';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
  const token = localStorage.getItem('token');
  let role = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      role = decoded.role;
    } catch (err) {
      console.error('Invalid token');
    }
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="dashboard/user"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="dashboard/provider"
              element={
                <PrivateRoute>
                  <ProviderDashboard />
                </PrivateRoute>
              }
            />
            <Route
  path="dashboard/provider/appointments"
  element={
    <PrivateRoute>
      <ProviderAppointments />
    </PrivateRoute>
  }
/>
<Route path="/admin" element={<AdminLogin />} />
<Route path="/dashboard/admin" element={
  <PrivateRoute>
    <AdminDashboard />
  </PrivateRoute>
} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
