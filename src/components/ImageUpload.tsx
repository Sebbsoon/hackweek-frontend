import { useAuth, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { addImageToGallery } from "../api/api";

const ImageUpload = ({ galleryId }: { galleryId: string }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) return;

    try {
      setIsUploading(true);
      setError(null);

      const token = await getToken();

      await addImageToGallery(
        galleryId,
        {
          file,
          title: title.trim(),
          description: description.trim() || undefined,
        },
        token ?? undefined,
      );

      setFile(null);
      setTitle("");
      setDescription("");
    } catch (e) {
      console.error("Image upload failed:", e);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) return <div>Please log in to upload images.</div>;

  return (
    <>
      <h1>Upload Images</h1>
      <p>Upload your images to gallery {galleryId} here.</p>

      <div>
        <input type="file" accept="image/*" onChange={handleChange} />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleUpload}
          disabled={!file || !title.trim() || isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {error && <p>{error}</p>}
    </>
  );
};

export default ImageUpload;
