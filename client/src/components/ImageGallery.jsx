import './ImageGallery.css';

const galleryImages = ['/uc_haircut.jpg', '/uc1.jpg', '/uc2.jpg'];

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
