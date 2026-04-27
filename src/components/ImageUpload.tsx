import { useAuth, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { addImageToGallery } from "../api/api";

const ImageUpload = ({ galleryId }: { galleryId: string }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      setError(null);

      const token = await getToken();
      const sharedTitle = title.trim();

      await Promise.all(
        files.map((file) =>
          addImageToGallery(
            galleryId,
            {
              file,
              title: sharedTitle || file.name,
              description: description.trim() || undefined,
            },
            token ?? undefined,
          ),
        ),
      );

      setFiles([]);
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
        <input type="file" accept="image/*" multiple onChange={handleChange} />
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
        <button onClick={handleUpload} disabled={files.length === 0 || isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {isUploading && <p>Uploading images, please wait...</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default ImageUpload;
