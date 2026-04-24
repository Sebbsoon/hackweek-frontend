import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

const CreateGallery = ({ createGallery }: { createGallery: (gallery: UserGallery) => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();
  

  function handleCreateGallery() {
    if (!user) return;
    const newGallery: UserGallery = {
        id: `gallery-${Date.now()}`,
        user_id: user.id,
        title,
        images: [],
        description,
    };
    console.log("Creating gallery:", newGallery);
    createGallery(newGallery);
}

  return (
    <div>
      <h1>Create Gallery</h1>
      <p>Create a new gallery here.</p>
      <input type="text" placeholder="Gallery Title" id="gallery-title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Gallery Description" id="gallery-description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <button onClick={handleCreateGallery} disabled={!title}>
        Create Gallery
      </button>
    </div>
  );
};

export default CreateGallery;