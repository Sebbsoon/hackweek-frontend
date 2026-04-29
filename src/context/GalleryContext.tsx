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

  // Start in loading state to avoid calling setState synchronously in the effect body
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  const { user } = useUser();

  useEffect(() => {
    let cancelled = false;

    getUsers()
      .then((data) => {
        if (cancelled) return;

        const normalizedUsers = Array.isArray(data)
          ? data
          : Array.isArray((data as { users?: User[] })?.users)
            ? (data as { users: User[] }).users
            : [];

        setUsers(normalizedUsers);
        setUsersError(null);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        if (cancelled) return;

        setUsers([]);
        setUsersError("Failed to load users. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setUsersLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (currentGallery) {
      getGalleryImages(currentGallery.id)
        .then((images) => {
          if (!cancelled) setGalleryImages(images);
        })
        .catch((error) => {
          console.error("Error fetching gallery images:", error);
          if (!cancelled) setGalleryImages([]);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [currentGallery]);

  const removeImageLocally = useCallback((imageId: string) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== imageId));
  }, []);

  const addImagesLocally = useCallback((images: Image[]) => {
    setGalleryImages((prev) => {
      const existingIds = new Set(prev.map((i) => i.id));
      const deduped = images.filter((i) => i?.id && !existingIds.has(i.id));
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

      usersLoading,
      usersError,

      galleryImages,
      setGalleryImages,
      removeImageLocally,
      addImagesLocally,
    }),
    [
      currentView,
      selectedUser,
      currentUser,
      currentGallery,
      users,
      usersLoading,
      usersError,
      galleryImages,
      removeImageLocally,
      addImagesLocally,
    ],
  );

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
};
