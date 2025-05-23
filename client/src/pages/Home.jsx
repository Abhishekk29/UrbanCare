import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import BookingForm from '../components/BookingForm';
import { useEffect, useState } from 'react';
import services from '../data/services.json';
import ServiceCategories from '../components/ServiceCatergories';
import ImageGallery from '../components/ImageGallery';
import HomeSection from '../components/HomeSection';
import './Home.css';

function Home() {
  const { token } = useAuth();
  const [selectedService, setSelectedService] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decoded.role);
    } else {
      setUserRole(null);
    }
  }, [token]);

  const handleBook = (service) => {
    if (!token) {
      toast.warning('Please login or register first');
    } else if (userRole !== 'user') {
      toast.info('Only customers can book services');
    } else {
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

      {/* Show Booking Form only for logged-in users with role 'user' */}
      {selectedService && userRole === 'user' && (
        <BookingForm service={selectedService} onClose={closeForm} />
      )}
    </div>
  );
}

export default Home;
