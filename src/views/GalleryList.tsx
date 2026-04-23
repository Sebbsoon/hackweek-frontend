import img1 from "../assets/Gallery/20240226_235955.jpg";
import img2 from "../assets/Gallery/20250318_164818.jpg";
import img3 from "../assets/Gallery/Aqua.png";
import img4 from "../assets/Gallery/BW22.png";
import Gallery from "./Gallery";
import GalleryCard from "./GalleryCard";

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

const mockGalleries: Gallery[] = [
  {
    id: "1",
    user_id: "user1",
    title: "Vacation Photos",
    images: [
      { id: "1", gallery_id: "1", url: img1 },
      { id: "2", gallery_id: "1", url: img2 },
    ],
    description: "Photos from my recent vacation to the beach.",
  },
  {
    id: "2",
    user_id: "user2",
    title: "Family Album",
    images: [
      { id: "3", gallery_id: "2", url: img3 },
      { id: "4", gallery_id: "2", url: img4 },
    ],
    description: "Family photos from various events and gatherings.",
  },
];

const GalleryList = () => {
  return (
    <div>
      <h1>Gallery List</h1>
      <p>This is the gallery list page.</p>
      {mockGalleries.map((gallery) => (
        <>
          <GalleryCard key={gallery.id} gallery={gallery} />
          <Gallery key={gallery.id} gallery={gallery} />
        </>
      ))}
    </div>
  );
};
export default GalleryList;
