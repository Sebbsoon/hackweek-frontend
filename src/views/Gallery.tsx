import ImageUpload from "./ImageUpload";

const Gallery = ({ gallery, addImageToGallery }: { gallery: UserGallery | null; addImageToGallery: (galleryId: string, image: Image) => void }) => {
  if (!gallery) {
    return <p>Gallery not found.</p>;
  }

  return (
    <div >
      <h2>{gallery.title}</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {gallery.images?.map((image) => (
          <img
            style={{ maxWidth: 100 }}
            key={image.id}
            src={image.url}
            alt="Gallery"
          />
        ))}
      </div>
      <ImageUpload galleryId={gallery.id} addImageToGallery={addImageToGallery}/>
    </div>
  );
};
export default Gallery;
