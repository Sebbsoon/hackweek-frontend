import { useAuth } from "@clerk/clerk-react";
import { deleteGallery } from "../api/api";
import useGallery from "../hooks/useGallery";

const GalleryCard = ({ gallery }: { gallery: UserGallery }) => {
  const { getToken } = useAuth();
  const { setCurrentView, setCurrentGallery } = useGallery();
  async function handleDelete(id: string) {
    const token = await getToken();
    await deleteGallery(id, token ?? undefined);
  }
  const handleOnClick = () => {
    setCurrentGallery(gallery);
    setCurrentView("gallery");
  };

  return (
    <div>
      <button onClick={() => handleOnClick()}>
        <h2>{gallery.title}</h2>
      </button>
      <p>{gallery.description}</p>
      <button onClick={() => void handleDelete(gallery.id)}>
        Remove Gallery
      </button>
    </div>
  );
};

export default GalleryCard;
