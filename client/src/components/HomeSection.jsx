import { useState } from 'react';
import './HomeSection.css';
import { X } from 'lucide-react'; // Optional: uses lucide icon

function HomeSection({ serviceNames, onSearchSelect }) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredNames = serviceNames.filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (name) => {
    setQuery(name);
    setShowDropdown(false);
    onSearchSelect(name); // 👈 scroll + filter
  };

  const handleClear = () => {
    setQuery('');
    setShowDropdown(false);
    onSearchSelect(''); // 👈 reset to show all services
  };

  return (
    <div className="home-section">
      <h1>What are you looking for?</h1>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search for services..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
            if (e.target.value === '') onSearchSelect('');
          }}
          onFocus={() => setShowDropdown(true)}
        />
        {query && (
          <button className="clear-btn" onClick={handleClear}>
            <X size={18} />
          </button>
        )}
      </div>

      {showDropdown && query && (
        <ul className="dropdown">
          {filteredNames.length > 0 ? (
            filteredNames.map(name => (
              <li key={name} onMouseDown={() => handleSelect(name)}>
                {name}
              </li>
            ))
          ) : (
            <li>No results found</li>
          )}
        </ul>
      )}

      <p>From beauty and cleaning to plumbing and repair</p>
    </div>
  );
}

export default HomeSection;
