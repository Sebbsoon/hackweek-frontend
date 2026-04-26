import { useAuth } from "@clerk/clerk-react";
import { deleteGallery } from "../api/api";

const GalleryCard = ({
  gallery,
  selectGallery,
}: {
  gallery: UserGallery;
  selectGallery: (gallery: UserGallery) => void;
}) => {
  const { getToken } = useAuth();

  async function handleDelete(id: string) {
    const token = await getToken();
    await deleteGallery(id, token ?? undefined);
  }

  return (
    <div>
      <h2>{gallery.title}</h2>
      <p>{gallery.description}</p>
      <button onClick={() => selectGallery(gallery)}>View Gallery</button>
      <button onClick={() => void handleDelete(gallery.id)}>Remove Gallery</button>
    </div>
  );
};

export default GalleryCard;
