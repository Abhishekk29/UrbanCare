import { useEffect, useRef, useState } from 'react';
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
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const { token } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    api.get('/services').then(res => {
      setServices(res.data);
      setFilteredServices(res.data); // Show all initially
    });

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

  const handleSearchSelect = (serviceName) => {
    const matched = services.filter(s =>
      s.name.toLowerCase().includes(serviceName.toLowerCase())
    );
    setFilteredServices(matched);

    // 🔁 Scroll after services updated
    setTimeout(() => {
      servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleResetSearch = () => {
    setFilteredServices(services);
  };

  const serviceNames = [...new Set(services.map(s => s.name))];

  return (
    <div className="home">
      <HomeSection
        serviceNames={serviceNames}
        onSearchSelect={handleSearchSelect}
        onReset={handleResetSearch}
      />

      <ServiceCategories onCategoryClick={() => servicesRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <ImageGallery />

      <h2 ref={servicesRef}>Available Services</h2>
      <div className="service-list">
        {filteredServices.length > 0 ? (
          filteredServices.map(service => (
            <div className="card" key={service._id}>
              <h3>{service.name}</h3>
              <p><b>Description:</b> {service.description}</p>
              <p><b>Location:</b> {service.location}</p>
              <p><b>Price:</b> ₹{service.price}</p>
              <button onClick={() => handleBook(service)}>Book Now</button>
            </div>
          ))
        ) : (
          <p>No services found for this search.</p>
        )}
      </div>

      {selectedService && userRole === 'user' && (
        <BookingForm service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  );
}

export default Home;
