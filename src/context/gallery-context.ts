import { createContext } from "react";

export type GalleryContextValue = {
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  currentUser: User | null;
  currentGallery: UserGallery | null;
  setCurrentGallery: React.Dispatch<React.SetStateAction<UserGallery | null>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  galleryImages: Image[];
  setGalleryImages: React.Dispatch<React.SetStateAction<Image[]>>;
  removeImageLocally: (imageId: string) => void; 
};

export const GalleryContext = createContext<GalleryContextValue | undefined>(
  undefined,
);