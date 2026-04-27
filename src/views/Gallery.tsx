import useGallery from "../hooks/useGallery";
import ImageUpload from "../components/ImageUpload";

const Gallery = () => {
  const { currentGallery: gallery, currentUser } = useGallery();


  const addImageToGallery = (galleryId: string, image: Image) => {
    console.log("Adding image to gallery", galleryId, image);
    // Here you would typically make an API call to add the image to the gallery
  };

  
  if (!gallery) {
    return <p>Gallery not found.</p>;
  }

  return (
    <div>
      <h2>{gallery.title}</h2>
      <h3>{gallery.description}</h3>
      <h4> Gallery owner: {gallery.userId}</h4>
      <p>is curr user: {gallery.userId === currentUser?.id}</p>
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
      {gallery.userId === currentUser?.id && (
        <ImageUpload
          galleryId={gallery.id}
          addImageToGallery={(id, image) => {
            console.log(id, image);
            return addImageToGallery(id, image);
          }}
        />
      )}
    </div>
  );
};
export default Gallery;
