 function Gallery({ images }) {
  return (
    <>
      <h2 className="section-title">
        Event Gallery
      </h2>

      <div className="gallery-grid">

        {images.map(
          (image, index) => (
            <img
              key={index}
              src={image}
              alt="gallery"
            />
          )
        )}

      </div>
    </>
  );
}

export default Gallery;