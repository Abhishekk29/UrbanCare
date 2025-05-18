import './ImageGallery.css';

const galleryImages = ['/AC.webp', '/electrician.webp', '/haircut.jpg'];

function ImageGallery() {
  return (
    <div className="gallery">
      {galleryImages.map((src, i) => (
        <img key={i} src={src} alt={`Gallery ${i + 1}`} />
      ))}
    </div>
  );
}

export default ImageGallery;
