import { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import './ServiceForm.css';

function ServiceForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    category: '', // dropdown now
  });

  const categories = ['Plumbing', 'Electrician', 'Cleaning', 'Painting', 'AC Repair'];

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/services', form);
      toast.success('Service added!');
      setForm({ name: '', description: '', price: '', location: '', category: '' });
      onCreated();
    } catch (err) {
      toast.error('Failed to add service');
    }
  };

  return (
    <form className="service-form" onSubmit={handleSubmit}>
      <h3>Add New Service</h3>

      <input name="name" placeholder="Service Name" value={form.name} onChange={handleChange} required />

      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />

      <input name="price" placeholder="Price (₹)" type="number" value={form.price} onChange={handleChange} required />

      <input name="location" placeholder="City (e.g. Mumbai)" value={form.location} onChange={handleChange} required />

      <label htmlFor="category">Category:</label>
<select
  className="dropdown"
  id="category"
  name="category"
  value={form.category}
  onChange={handleChange}
  required
>
  <option value="">-- Select Category --</option>
  {categories.map(cat => (
    <option key={cat} value={cat}>{cat}</option>
  ))}
</select>


      <button type="submit">Add Service</button>
    </form>
  );
}

export default ServiceForm;
