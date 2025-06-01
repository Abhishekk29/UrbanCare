import { useEffect, useState } from 'react';
import api from '../services/api';
import './Home.css';
import HomeSection from '../components/HomeSection';
import ServiceCategories from '../components/ServiceCatergories';
import ImageGallery from '../components/ImageGallery';
import BookingForm from '../components/BookingForm';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const { token } = useAuth();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    api.get('/services').then(res => setServices(res.data));
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decoded.role);
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

  return (
    <div className="home">
      <HomeSection />
      <ServiceCategories />
      <ImageGallery />

      <h2>Available Services</h2>
      <div className="service-list">
        {services.map(service => (
          <div className="card" key={service._id}>
            <h3>{service.name}</h3>
            <p><b>Description:</b> {service.description}</p>
            <p><b>Location:</b> {service.location}</p>
            <p><b>Price:</b> ₹{service.price}</p>
            <button onClick={() => handleBook(service)}>Book Now</button>
          </div>
        ))}
      </div>

      {selectedService && userRole === 'user' && (
        <BookingForm service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  );
}

export default Home;
