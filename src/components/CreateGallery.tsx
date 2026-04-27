import { useAuth, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import type { CreateGalleryPayload } from "../api/api";

const CreateGallery = ({
  createGallery,
}: {
  createGallery: (gallery: CreateGalleryPayload, token?: string) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();
  const { getToken } = useAuth();

  async function handleCreateGallery() {
    if (!user) return;

    const token = await getToken();

    const newGallery = {
      user_id: user.id,
      title,
      images: [],
      description,
    };

    console.log("Creating gallery:", newGallery);
    createGallery(newGallery, token ?? undefined);
  }

  return (
    <div>
      <h1>Create Gallery</h1>
      <p>Create a new gallery here.</p>
      <input
        type="text"
        placeholder="Gallery Title"
        id="gallery-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Gallery Description"
        id="gallery-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleCreateGallery} disabled={!title}>
        Create Gallery
      </button>
    </div>
  );
};

export default CreateGallery;
