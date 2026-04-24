import GalleryCard from "./GalleryCard";

const GalleryList = ({ galleries, selectGallery }: { galleries: UserGallery[]; selectGallery: (gallery: UserGallery) => void }) => {
  return (
    <div> 
      <h1>Gallery List</h1>
      <p>This is the gallery list page.</p>
      {galleries.map((gallery) => (
        <GalleryCard key={gallery.id} gallery={gallery} selectGallery={selectGallery} />
      ))}
    </div>
  );
};
export default GalleryList;
