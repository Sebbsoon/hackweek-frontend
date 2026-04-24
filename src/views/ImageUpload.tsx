import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

type ImageUploadRequest = {
  file: File;
  galleryId: string;
  userId: string;
  title: string;
  description?: string;
};

const ImageUpload = ({
  galleryId,
  addImageToGallery,
}: {
  galleryId: string;
  addImageToGallery: (galleryId: string, image: Image) => void;
}) => {
  const { user } = useUser();
  const [file, setFile] = useState<File | undefined | null>(null);
  const [title, setTitle] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
  };
  const handleUpload = () => {
    console.log("Upload button clicked");
    const newRequest: ImageUploadRequest = {
      file: file!,
      galleryId: galleryId,
      userId: user!.id,
      title: title,
    };

    console.log("New upload request:", newRequest);
    setFile(undefined);
    setTitle("");
    addImageToGallery(galleryId, {
      id: `img-${Date.now()}`,
      gallery_id: galleryId,
      url: URL.createObjectURL(newRequest.file),
      title: newRequest.title,
    });
  };
  if (!user) return <div>Please log in to upload images.</div>;
  return (
    <>
      <h1>Upload Images</h1>
      <p>Upload your images here.</p>
      <div>
        <input type="file" onChange={handleChange} />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleUpload} disabled={!file || !title}>
          Upload
        </button>
      </div>
    </>
  );
};

export default ImageUpload;
