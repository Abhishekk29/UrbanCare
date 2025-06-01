import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import './ServiceForm.css';

function EditServiceForm({ service, onClose, onUpdated }) {
  const [form, setForm] = useState(service);
  const [closing, setClosing] = useState(false); // 👈 new

  useEffect(() => {
    setForm(service);
  }, [service]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put(`/services/${service._id}`, form);
      toast.success('Changes updated successfully ✅');
      onUpdated();
      handleClose();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 300); // ⏳ wait for animation
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className={`modal-card ${closing ? 'slide-out' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <h2>Edit Service</h2>
        <form onSubmit={handleSubmit} className="form-group">
          <label>Service Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />

          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} required />

          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required />

          <label>Price (₹)</label>
          <input name="price" value={form.price} onChange={handleChange} type="number" required />

          <div className="edit-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditServiceForm;
