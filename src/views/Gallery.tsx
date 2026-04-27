import useGallery from "../hooks/useGallery";
import ImageUpload from "../components/ImageUpload";
import { deleteImageFromGallery } from "../api/api";
import { useAuth } from "@clerk/clerk-react";

const Gallery = () => {
  const {
    currentGallery: gallery,
    currentUser,
    galleryImages,
    removeImageLocally,
  } = useGallery();
  const { getToken } = useAuth();

  if (!gallery) {
    return <p>Gallery not found.</p>;
  }
  const handleDelete = async (id: string) => {
    const token = await getToken();

    deleteImageFromGallery(id, token ?? undefined);
    removeImageLocally(id);
  };

  return (
    <div>
      <h2>{gallery.title}</h2>
      <h3>{gallery.description}</h3>
      <p>
        gallery id {gallery.userId} current user {currentUser?.id}
      </p>

      <h4> Gallery owner: {gallery.userId}</h4>
      <p>is curr user: {gallery.userId === currentUser?.id}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        {galleryImages?.map((image) => (
          <>
            <img
              style={{ maxWidth: 100 }}
              key={image.id}
              src={image.thumbnailUrl}
              alt="Gallery"
            />
            {gallery.userId === currentUser?.id && (
              <button key={image.id} onClick={() => handleDelete(image.id)}>
                Delete image
              </button>
            )}
          </>
        ))}
      </div>
      {gallery.userId === currentUser?.id && (
        <ImageUpload galleryId={gallery.id} />
      )}
    </div>
  );
};
export default Gallery;
