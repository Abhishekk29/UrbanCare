import './BookingForm.css';

function BookingForm({ service, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const booking = Object.fromEntries(formData);
    console.log('Booking submitted:', booking);
    onClose(); // Close form after submit (for now)
  };

  return (
    <div className="booking-overlay">
      <div className="booking-form">
        <h3>Book: {service.name}</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="serviceId" value={service._id || service.id} />
          <label>
            Date:
            <input type="date" name="date" required />
          </label>
          <label>
            Time:
            <input type="time" name="time" required />
          </label>
          <label>
            Location:
            <input type="text" name="location" required />
          </label>
          <label>
            Notes:
            <textarea name="notes" placeholder="Any special instructions?" />
          </label>
          <button type="submit">Confirm Booking</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
