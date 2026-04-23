type Gallery = {
  id: string;
  user_id: string;
  title: string;
  images?: Image[];
};

type Image = {
  id: string;
  gallery_id: string;
  url: string;
};
const Gallery = ({ gallery }: { gallery: Gallery }) => {
  return (
    <div key={gallery.id}>
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
    </div>
  );
};
export default Gallery;
