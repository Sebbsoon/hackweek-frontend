const GalleryCard = ({ gallery, selectGallery }: { gallery: UserGallery; selectGallery: (gallery: UserGallery) => void }) => {
  return (
    <div>
      <h2>{gallery.title}</h2>
      <p>{gallery.description}</p>
      <button onClick={() => selectGallery(gallery)}>View Gallery</button>
    </div>
  );
};
export default GalleryCard;
