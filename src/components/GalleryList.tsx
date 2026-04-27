import useGallery from "../hooks/useGallery";
import GalleryCard from "./GalleryCard";

const GalleryList = () => {
  const {selectedUser} = useGallery();
  const galleries = selectedUser?.galleries;

  return (
    <div> 
      <p>Selected user: {selectedUser?.username}</p>
      <h1>Gallery List</h1>
      <p>This is the gallery list page.</p>
      {galleries?.map((gallery) => (
        <GalleryCard key={gallery.id} gallery={gallery} />
      ))}
    </div>
  );
};
export default GalleryList;
