import './HeroSection.css';

function HeroSection() {
  return (
    <div className="hero">
      <h1>What are you looking for?</h1>
      <input type="text" placeholder="Search for services..." />
      <p>From beauty and cleaning to plumbing and repair</p>
    </div>
  );
}

export default HeroSection;