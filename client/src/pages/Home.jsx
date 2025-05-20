import services from '../data/services.json';
import './Home.css';
import HomeSection from '../components/HomeSection';
import ServiceCategories from '../components/ServiceCatergories';
import ImageGallery from '../components/ImageGallery';
function Home() {
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
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
