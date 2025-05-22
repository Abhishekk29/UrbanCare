import services from '../data/services.json';
import './Home.css';
import { useState } from 'react';
import HomeSection from '../components/HomeSection';
import ServiceCategories from '../components/ServiceCatergories';
import ImageGallery from '../components/ImageGallery';
import { useAuth } from '../context/AuthContext';
import BookingForm from '../components/BookingForm';
import { toast } from 'react-toastify';
function Home() {
  const { token } = useAuth();
  const [selectedService, setSelectedService] = useState(null);
  const handleBook = (service) => {
    if (!token) {
      toast.warning('Please login or register first');
    } else {
      // TODO: Open booking form/modal here
      setSelectedService(service);
    }
  };
  const closeForm = () => setSelectedService(null);
  return (
    <div className="home">
            <div>
      <HomeSection />
      <ServiceCategories />
      <ImageGallery/>
    </div>

      <h2>Available Services</h2>
      <div className="service-list">
        {services.map(service => (
          <div className="card" key={service.id}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p><b>Location:</b> {service.location}</p>
            <p><b>Price:</b> ₹{service.price}</p>
            <button onClick={() => handleBook(service)}>Book Now</button>
          </div>
        ))}
      </div>
      {/* Booking Form Modal */}
      {selectedService && (
        <BookingForm service={selectedService} onClose={closeForm} />
      )}
    </div>
  );
}

export default Home;
