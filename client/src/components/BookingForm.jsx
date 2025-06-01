import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import './BookingForm.css';

function BookingForm({ service, onClose }) {
  const [form, setForm] = useState({
    date: '',
    time: '',
    location: '',
    notes: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = async () => {
    const now = new Date();
    const selectedDate = new Date(`${form.date}T${form.time}`);

    if (selectedDate < now) {
      toast.error('You cannot book in the past');
      return false;
    }

    try {
      const res = await api.get('/bookings/check', {
        params: {
          serviceId: service._id,
          date: form.date,
          time: form.time,
        },
      });
      if (res.data.exists) {
        toast.error('This service is already booked at this time');
        return false;
      }
    } catch {
      toast.error('Validation error');
      return false;
    }

    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!(await validate())) return;

    try {
      await api.post('/bookings', {
        serviceId: service._id,
        ...form,
      });
      toast.success('Booking confirmed ✅');
      onClose();
    } catch (err) {
      toast.error('Booking failed');
      console.error(err);
    }
  };

  return (
    <div className="booking-overlay" onClick={onClose}>
      <div className="booking-form" onClick={e => e.stopPropagation()}>
        <h3>Book: {service.name}</h3>
        <form onSubmit={handleSubmit}>
          <label>Date:</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />

          <label>Time:</label>
          <input type="time" name="time" value={form.time} onChange={handleChange} required />

          <label>Location:</label>
          <input type="text" name="location" value={form.location} onChange={handleChange} required />

          <label>Notes:</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any instructions?" />

          <div className="booking-actions">
            <button type="submit">Confirm Booking</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
