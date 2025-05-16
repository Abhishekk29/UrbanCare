import { useState } from 'react';
import api from '../services/api';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registration successful');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
      <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
        <option value="user">User</option>
        <option value="provider">Service Provider</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
