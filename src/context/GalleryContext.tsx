import { useUser } from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";
import { getUsers } from "../api/api";
import { GalleryContext } from "./gallery-context";

export const GalleryProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentView, setCurrentView] = useState<string>("home");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [currentGallery, setCurrentGallery] = useState<UserGallery | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useUser();

  useEffect(() => {
    let isMounted = true;

    getUsers()
      .then((data) => {
        if (isMounted) setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const currentUser = user
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
    }),
    [currentView, selectedUser, currentUser, currentGallery, users],
  );

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};