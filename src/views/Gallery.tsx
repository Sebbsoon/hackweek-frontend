import ImageUpload from "./ImageUpload";

const Gallery = ({
  gallery,
  addImageToGallery,
  currentUser,
}: {
  gallery: UserGallery | null;
  addImageToGallery: (galleryId: string, image: Image) => void;
  currentUser: User | null;
}) => {
  if (!gallery) {
    return <p>Gallery not found.</p>;
  }

  return (
    <div>
      <h2>{gallery.title}</h2>
      <h3>{gallery.description}</h3>
      <h4> Gallery owner: {gallery.user_id}</h4>
      <p>is curr user: {gallery.user_id===currentUser?.id}</p>
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
      {gallery.user_id === currentUser?.id && (
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
