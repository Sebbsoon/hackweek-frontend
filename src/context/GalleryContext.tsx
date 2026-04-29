import { useUser } from "@clerk/clerk-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { getGalleryImages, getUsers } from "../api/api";
import { GalleryContext } from "./gallery-context";

export const GalleryProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentView, setCurrentView] = useState<string>("home");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [galleryImages, setGalleryImages] = useState<Image[]>([]);
  const [currentGallery, setCurrentGallery] = useState<UserGallery | null>(
    null,
  );
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useUser();

  useEffect(() => {
    console.log("GalleryContext state updated:", {
      currentView,
      selectedUser,
      currentGallery,
      users,
      galleryImages,
    });
  }, [currentView, selectedUser, currentGallery, users, galleryImages]);

  useEffect(() => {
    let isMounted = true;

    getUsers()
      .then((data) => {
        if (!isMounted) return;

        const normalizedUsers = Array.isArray(data)
          ? data
          : Array.isArray((data as { users?: User[] })?.users)
            ? (data as { users: User[] }).users
            : [];

        setUsers(normalizedUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        if (isMounted) setUsers([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (currentGallery) {
      getGalleryImages(currentGallery.id)
        .then((images) => {
          if (isMounted) setGalleryImages(images);
        })
        .catch((error) => {
          console.error("Error fetching gallery images:", error);
          if (isMounted) setGalleryImages([]);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [currentGallery]);

  const removeImageLocally = useCallback((imageId: string) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== imageId));
  }, []);

  const addImagesLocally = useCallback((images: Image[]) => {
    setGalleryImages((prev) => {
      const existingIds = new Set(prev.map((i) => i.id));
      const deduped = images.filter((i) => i?.id && !existingIds.has(i.id));
      // Put newly uploaded images first (change ordering if you prefer)
      return [...deduped, ...prev];
    });
  }, []);

  const currentUser =
    user && Array.isArray(users)
      ? (users.find((u) => u.clerkUserId === user.id) ?? null)
      : null;

  const value = useMemo(
    () => ({
      currentView,
      setCurrentView,
      selectedUser,
      setSelectedUser,
      currentUser,
      currentGallery,
      setCurrentGallery,
      users,
      setUsers,
      galleryImages,
      setGalleryImages,
      removeImageLocally,
      addImagesLocally, // NEW
    }),
    [
      currentView,
      selectedUser,
      currentUser,
      currentGallery,
      users,
      galleryImages,
      removeImageLocally,
      addImagesLocally,
    ],
  );

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
};
