// ServiceCategories.jsx
import './ServiceCategories.css';

const categories = [
  { name: 'Plumbing at Home', image: '/plumber.webp' },
  { name: 'Cleaning', image: '/cleaning.webp' },
  { name: 'Appliance Repair', image: '/Appliances.webp' },
];

function ServiceCategories({ onCategoryClick }) {
  return (
    <div className="categories">
      {categories.map(cat => (
        <div className="category-card" key={cat.name} onClick={onCategoryClick}>
          <img src={cat.image} alt={cat.name} />
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ServiceCategories;
