type Gallery = {
  id: string;
  user_id: string;
  title: string;
  images?: Image[];
  description?: string;
};

type Image = {
  id: string;
  gallery_id: string;
  url: string;
};

const GalleryCard = ({ gallery }: { gallery: Gallery }) => {
  return (
    <div key={gallery.id}>
      <h2>{gallery.title}</h2>
      <p>{gallery.description}</p>
    </div>
  );
};
export default GalleryCard;
