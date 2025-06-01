import { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import './ServiceForm.css';

function ServiceForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    price: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/services', form);
      toast.success('Service created successfully');
      setForm({ name: '', description: '', category: '', location: '', price: '' });
      onCreated(); // 🔁 trigger reload in parent
    } catch (err) {
      toast.error('Failed to create service');
    }
  };

  return (
    <form className="service-form" onSubmit={handleSubmit}>
      <h3>Add a New Service</h3>
      <div className="form-group">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Service Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
        <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price (₹)" required />
        <button type="submit">Create Service</button>
      </div>
    </form>
  );
}

export default ServiceForm;
