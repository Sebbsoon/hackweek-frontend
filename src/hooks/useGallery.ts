import { useContext } from "react";
import { GalleryContext } from "../context/gallery-context";

const useGallery = () => {
  const ctx = useContext(GalleryContext);
  if (!ctx) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return ctx;
};

export default useGallery;
